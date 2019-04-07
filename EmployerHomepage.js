import React from 'react';
import { StyleSheet, Text, Alert, View, ScrollView, Dimensions, TextInput,Platform, TouchableOpacity, FlatList, SafeAreaView } from 'react-native';
import Button from 'react-native-button';
import { Actions } from 'react-native-router-flux';
import { DrawerNavigator } from 'react-navigation';
import { Card, CardTitle, CardContent, CardAction, CardButton, CardImage } from 'react-native-cards';
import Drawer from 'react-native-drawer';
import SideMenu from 'react-native-side-menu';
import { firebase } from './db'
import Dialog from "react-native-dialog";




const menu = [
    { 'title': 'Home',
    id: 'one'},
    { 'title': 'Replies',
    id: 'two'},
    { 'title': 'Create',
    id: 'three'},
    { 'title': 'Log Out',
    id: 'four'}
]

let arr = [];
let key_arr = [];

export default class EmployerHomepage extends React.Component {

    constructor(props){
        super(props);


		    this.state = {
          companyName: '',
          companyLocation: '',
          refresh: false,
          showLocationDialog: false,
          showEmailDialog: false,

        };

    }

	async componentDidMount() {
		console.log(this.state.user)
		let rootRef = firebase.database().ref()
		let userRef = rootRef.child('EMPLOYERS').child(this.props.uid)

		try {
            userRef.once('value')
				.then(snapshot => {
					companyInfo = snapshot.val()

					console.log('Loaded name: ' + companyInfo['Company Name'])
					this.setState({ companyName : companyInfo['Company Name'] })
					this.setState({ companyLocation : companyInfo['Company Location'] })
				})
        } catch (e) {
            console.warn(e)
        }


      try{
    let employerJobRef = rootRef.child('EMPLOYERS').child(this.props.uid).child('JOBS')
    if (employerJobRef != undefined) {
      employerJobRef.once('value')
      	.then(snapshot => {
        	let jobs = snapshot.val()

        Object.keys(jobs).forEach(key=>{
          //have to figure out how to add this key when pushing to array
      //    console.log(key);
          arr.push(jobs[key]);
          key_arr.push(key);
        })


        console.log(arr);
        console.log(key_arr);
    	})

    }
  }
  catch (e) {
      console.warn(e)
  }

}

fbPush(){
console.log(this.state.companyLocation);
let rootRef = firebase.database().ref();
let userRef = rootRef.child('EMPLOYERS');
    //TODO: Get UID from props?
EmployerAccountRef = userRef.child(this.props.uid);
EmployerAccountRef.update({
  'Company Location' : this.state.companyLocation,
});
}



    render() {
      const myMenu = <UserMenu uid={this.props.uid}/>;
      return (
            <SideMenu menu = {myMenu}>

            <Dialog.Container visible={this.state.showLocationDialog}>
            <Dialog.Title>Location</Dialog.Title>
            <Dialog.Description>
            Please enter your location.
            </Dialog.Description>

            <Dialog.Input placeholder="location" wrapperStyle={{borderColor: '#000000', borderBottomWidth: 2}}
            onChangeText={companyLocation => this.setState({companyLocation})}/>
            <Dialog.Button label="Confirm " onPress={() => this.confirmLocationEdit()}/>
            <Dialog.Button label="Cancel " onPress={() => this.closeLocation()}/>
            </Dialog.Container>

            <View style={styles.mainContainer}>
                <View style={styles.textContainer}>
                    <Text style={styles.largeText}>Grand Jobs</Text>
                    <Text style={styles.mainText}>Homepage</Text>
                </View>
                <ScrollView style={{width: Dimensions.get('window').width * 0.90}}>

                    <Card isDark = {true} style={styles.cardStyle}>
                        <CardTitle
                        title= "Profile"
                        />
                        <CardContent text={"Company Name: " + this.state.companyName}/>
                        <CardContent text={"Location: " + this.state.companyLocation}/>
                        <CardAction
                        separator={true}
                        inColumn={false}>
                        <CardButton
                        onPress={() => this.editLocation()}
                        title="Edit "
                        color="#a9fcd4"
                        />
                        </CardAction>
                    </Card>

                    {this.renderJobCards()}

                </ScrollView>
            </View>
            </SideMenu>
            );
  }

  renderJobCards(){

    var elements = [];


    for(let i = 0; i < arr.length; i++){


      elements.push(<Card isDark = {true} style={styles.cardStyle}>
          <CardTitle
          title= "Created Listing"/>
          <CardContent text={"Job Title: " + arr[i]['JobTitle']}/>
          <CardContent text={"Job Location: " + arr[i]['JobLocation']}/>
          <CardAction
          separator={true}
          inColumn={false}>
          <CardButton
          onPress={() => this.deletePosting(i)}
          title="Remove "
          color="#a9fcd4"
          />
          </CardAction>
      </Card>);

    }

    return(
      elements
    );

  }


    editLocation(){
        this.setState({
            showLocationDialog: true,

        })

    }


    deletePosting(id){
      console.log(id);
      Alert.alert(
      'Delete',
      'Are you sure you want to delete this posting?',
      [
        {text:'Delete',onPress:()=>this.deleteCardFB(id)},
        {text:'Cancel',onPress:()=>console.log('cancel pressed')}
      ]
    )
    }


    deleteCardFB(id){

      let rootRef = firebase.database().ref();
      rootRef.child('EMPLOYERS').child(this.props.uid).child('JOBS').child(key_arr[id]).remove();
      key_arr.splice(id,1);
      console.log(key_arr);
      this.setState({
          refresh: true,

      })

    }



    confirmLocationEdit(){
      this.fbPush();
      this.setState({
          showLocationDialog: false,
      })
    }

    closeLocation(){
        this.setState({
            showLocationDialog: false,
        })
    }


}

class UserMenu extends React.Component{

  constructor(props){
      super(props);
  }

  onSignOut = async () => {
        try {
            await firebase.auth().signOut().then( () => {
				Actions.StartPage()
			});
        } catch (e) {
            console.warn(e)
        }
    }

  render(){
    return(
      <SafeAreaView style = {sideStyles.menuContainer}>

      <View style={sideStyles.menuContainer}>
          <FlatList
              style={{ flex: 1.0 }}
              data={menu}
              extraData={this.state}
              renderItem={({ item, index }) => {
                  return (
                      <TouchableOpacity style={sideStyles.menuTitleContainer}
                      onPress={()=>this.onPress(item, index)}>
                          <Text style={sideStyles.menuTitle}
                              key={index}>
                              {item.title}
                          </Text>
                      </TouchableOpacity>


                  )
              }}
              keyExtractor={item => item.id}
/>
      </View>
      </SafeAreaView>
    );
  }

  onPress(item, index){
    if(index == 0){
      //home pressed
      Actions.EmployerHomepage();
    }
    if(index == 1){
      //replies pressed
      Actions.EmployerSideReplies();
    }
    if(index == 2){
      //create pressed
      Actions.EmployerCreateListing({uid: this.props.uid});
    }
    if(index == 3){
      this.onSignOut()
    }
  }

}

const sideStyles = StyleSheet.create({

  menuContainer: {
      flex: 1.0,
      backgroundColor: '#34363c',
      paddingTop: Platform.OS === 'android' ? 25 : 0
  },
  menuTitleContainer: {
      alignItems: 'center',
      height: 60,
      width:'100%',
      flexDirection:'row',
      borderBottomWidth: 1,
      borderBottomColor: '#d6d6d6',

  },
  menuTitle: {
      width:'100%',
      textAlign: 'center',
      color: 'white',
      fontSize: 25,
      fontFamily: 'Roboto-Thin',
      alignSelf: 'center',
      padding: 20,
  },

});

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#1E2027',
        // padding: 10,
        alignItems: 'center'
    },
    drawerContainer:{
        flex: 1,
        backgroundColor: '#dcdfe5',
        // padding: 10,
        alignItems: 'center'
    },
    largeText:{
        fontSize: 65,
        textAlign: 'center',
        marginTop: 20,
        color: '#d6d6d6',
        fontFamily: 'Roboto-Thin'
    },
    mainText:{
        fontSize: 25,
        textAlign: 'center',
        color: '#d6d6d6',
        fontFamily: 'Roboto-Thin',
        marginBottom: 20,
    },
    cardStyle:{
        backgroundColor: '#34363c',
        borderRadius: 10,
    },

});
