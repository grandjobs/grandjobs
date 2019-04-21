import React from 'react';
import { StyleSheet, RefreshControl,Text, Alert, View, ScrollView, Dimensions, TextInput,Platform, TouchableOpacity, FlatList, SafeAreaView } from 'react-native';
import Button from 'react-native-button';
import { Actions } from 'react-native-router-flux';
import { DrawerNavigator } from 'react-navigation';
import { Card, CardTitle, CardContent, CardAction, CardButton, CardImage } from 'react-native-cards';
import Drawer from 'react-native-drawer';
import SideMenu from 'react-native-side-menu';
import { firebase } from './db'
import Dialog from "react-native-dialog";
import Geocoder from 'react-native-geocoding';




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

let reply_arr = [];
let arr = [];
let job_arr = [];

let index_values = [];

export default class EmployerHomepage extends React.Component {



    constructor(props){
        super(props);
        arr = [];
        reply_arr = [];
        job_arr = [];

//global.GloablUID

		    this.state = {
          companyName: '',
          companyLocation: '',
          showLocationDialog: false,
          showEmailDialog: false,
          key: 1,
          refreshing: false,

        };

    }


	async componentDidMount() {

		let rootRef = firebase.database().ref()
		let userRef = rootRef.child('EMPLOYERS').child(global.GloablUID)


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
    let employerJobRef = rootRef.child('EMPLOYERS').child(global.GloablUID).child('JOBS')
    if (employerJobRef != undefined) {
      employerJobRef.once('value')
      	.then(snapshot => {
        	let jobs = snapshot.val()

          arr = [];
          job_arr = [];
          reply_arr = [];

        Object.keys(jobs).forEach(key=>{

      if(jobs[key]['Replies'] !== undefined){


          for(let j = 0; j < 10000; j++){
          if(jobs[key]['Replies'][j] !== undefined){
    //        console.log(j);
          reply_arr.push(jobs[key]['Replies'][j]);
          arr.push(jobs[key]['JobTitle']);
          job_arr.push(key);
          index_values.push(j);
        }
      }
      }

        })

    //    console.log(index_values);
  //      console.log(arr);
    //  console.log(arr["Replies"]);

    //      console.log(reply_arr);
  //  console.log(job_arr);
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
EmployerAccountRef = userRef.child(global.GloablUID);
EmployerAccountRef.update({
  'Company Location' : this.state.companyLocation,
});


}


    render() {


      const myMenu = <UserMenu uid={global.GloablUID}/>;

      return (
            <SideMenu menu = {myMenu} bounceBackOnOverdraw={false} edgeHitWidth={Dimensions.get('window').width}>

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
                    <Text style={styles.mainText}>Replies</Text>
                </View>
                <ScrollView
                refreshControl= {
                  <RefreshControl
                  refreshing = {this.state.refresh}
                  onRefresh={() => this.refreshScreen()}
                  snapToStart = {true}
                />
              }
                  key = {this.state.key}
                  style={{width: Dimensions.get('window').width * 0.90}}
                >


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

  //    console.log(arr[i]['JobTitle']);
  //    console.log(arr[i]['Replies']);


      elements.push(<Card isDark = {true} style={styles.cardStyle}>
                            <CardTitle
                            title= "New Reply"
                            />
                            <CardContent text={"Position: " + arr[i]}/>

                            <CardAction
                            separator={true}
                            inColumn={false}>
                            <CardButton
                            onPress={() => this.viewPressed(reply_arr[i])}
                            title="View "
                            color="#a9fcd4"
                            />
                            <CardButton
                            onPress={() => this.deletePosting(i)}
                            title="Remove "
                            color="#a9fcd4"
                            alignSelf="right"
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

    viewPressed(id){
      console.log({useridkey: id});
      Actions.ViewSeekerProfile({useridkey: id});
    }


    deletePosting(id){
      console.log(id);
      Alert.alert(
      'Delete',
      'Are you sure you want to delete this reply?',
      [
        {text:'Delete',onPress:()=>this.deleteCardFB(id)},
        {text:'Cancel',onPress:()=>console.log('cancel pressed')}
      ]
    )
    }

    refreshScreen(){

    this.setState({ refresh: true });
    this.componentDidMount().then(()=>{
      this.setState({refresh: false});
    });
    }


    deleteCardFB(id){

      console.log(id);
  //    console.log(reply_arr[id]);
    //  console.log(job_arr[id]);

      let rootRef = firebase.database().ref();

      rootRef.child('EMPLOYERS').child(global.GloablUID).child('JOBS').child(job_arr[id]).child('Replies').child(index_values[id]).remove();
      reply_arr.splice(id,1);
    //  console.log(reply_arr);
      arr = [];
      reply_arr = [];
      job_arr = [];
      index_values = [];
      this.componentDidMount();
      this.setState({ key: Math.random() });



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
      Actions.EmployerHomepage({uid: this.props.uid});
    }
    if(index == 1){
      //replies pressed
      Actions.EmployerSideReplies({uid: this.props.uid});
    }
    if(index == 2){
      //create pressed
      Actions.EmployerCreateListing({uid: this.props.uid});
    }
    if(index == 3){
      //sign out pressed
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
