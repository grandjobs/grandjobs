import React from 'react';
import { StyleSheet, Text, View, ScrollView, Alert,Dimensions, TextInput,Platform, TouchableOpacity, FlatList, SafeAreaView } from 'react-native';
import Button from 'react-native-button';
import { Actions } from 'react-native-router-flux';
import { DrawerNavigator } from 'react-navigation';
import { Card, CardTitle, CardContent, CardAction, CardButton, CardImage } from 'react-native-cards';
import Drawer from 'react-native-drawer';
import SideMenu from 'react-native-side-menu';
import { firebase } from './db';


let arr = [];
let key_arr = [];

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



export default class EmployerSideReplies extends React.Component {

    constructor(props){
        super(props);
        arr = [];
        key_arr = [];

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
            // this.setState({ companyName : companyInfo['Company Name'] })
            // this.setState({ companyLocation : companyInfo['Company Location'] })
          })
          } catch (e) {
              console.warn(e)
          }


    //     try{
    //   let employerJobRef = rootRef.child('EMPLOYERS').child(this.props.uid).child('JOBS')
    //   if (employerJobRef != undefined) {
    //     employerJobRef.once('value')
    //       .then(snapshot => {
    //         let jobs = snapshot.val()
    //
    //       Object.keys(jobs).forEach(key=>{
    //         //have to figure out how to add this key when pushing to array
    //     //    console.log(key);
    //         arr.push(jobs[key]);
    //         key_arr.push(key);
    //       })
    //
    //
    //       console.log(arr);
    //       console.log(key_arr);
    //     })
    //
    //   }
    // }
    // catch (e) {
    //     console.warn(e)
    // }

  }

    viewPressed(){
      Actions.ViewSeekerProfile();
    }

    // renderReplyCards(){
    //
    //   var elements = [];
    //
    //
    //   for(let i = 0; i < arr.length; i++){
    //
    //
    //     elements.push(<Card isDark = {true} style={styles.cardStyle}>
    //         <CardTitle
    //         title= "New Reply"/>
    //         <CardContent text={"Job Title: " + arr[i]['JobTitle']}/>
    //         <CardContent text={"Job Location: " + arr[i]['JobLocation']}/>
    //         <CardAction
    //         separator={true}
    //         inColumn={false}>
    //         <CardButton
    //         onPress={() => this.deletePosting(i)}
    //         title="Remove "
    //         color="#a9fcd4"
    //         />
    //         </CardAction>
    //     </Card>);
    //
    //   }
    //
    //   return(
    //     elements
    //   );
    //
    // }

    render() {
      const myMenu = <UserMenu/>;
              return (
            <SideMenu menu = {myMenu} bounceBackOnOverdraw={false} edgeHitWidth={Dimensions.get('window').width}>
                <View style={styles.mainContainer}>
                    <View style={styles.textContainer}>
                        <Text style={styles.largeText}>Grand Jobs</Text>
                        <Text style={styles.mainText}>Replies</Text>
                    </View>
                    <ScrollView style={{width: Dimensions.get('window').width * 0.90}}>

                        <Card isDark = {true} style={styles.cardStyle}>
                            <CardTitle
                            title= "New Reply"
                            />
                            <CardContent text={"Position: Professor"}/>
                            <CardContent text={"Name: Tom"}/>
                            <CardAction
                            separator={true}
                            inColumn={false}>
                            <CardButton
                            onPress={()=>this.viewPressed()}
                            title="View "
                            color="#a9fcd4"
                            />
                            <CardButton
                            onPress={() => this.deleteCard()}
                            title="Dismiss "
                            color="#a9fcd4"
                            />
                            </CardAction>
                        </Card>

                        <Card isDark = {true} style={styles.cardStyle}>
                            <CardTitle
                            title= "New Reply"
                            />
                            <CardContent text={"Position: Professor"}/>
                            <CardContent text={"Name: Dave"}/>
                            <CardAction
                            separator={true}
                            inColumn={false}>
                            <CardButton
                            onPress={() => this.viewPressed()}
                            title="View "
                            color="#a9fcd4"
                            />
                            <CardButton
                            onPress={() => this.deleteCard()}
                            title="Dismiss "
                            color="#a9fcd4"
                            alignSelf="right"
                            />
                            </CardAction>
                        </Card>

                        <Card isDark = {true} style={styles.cardStyle}>
                            <CardTitle
                            title= "New Reply"
                            />
                            <CardContent text={"Position: Professor"}/>
                            <CardContent text={"Name: Phil"}/>
                            <CardAction
                            separator={true}
                            inColumn={false}>
                            <CardButton
                            onPress={() => this.viewPressed()}
                            title="View "
                            color="#a9fcd4"
                            />
                            <CardButton
                            onPress={() => this.deleteCard()}
                            title="Dismiss "
                            color="#a9fcd4"
                            />
                            </CardAction>
                        </Card>

                        <Card isDark = {true} style={styles.cardStyle}>
                            <CardTitle
                            title= "New Reply"
                            />
                            <CardContent text={"Position: Network Administrator"}/>
                            <CardContent text={"Name: Mike"}/>
                            <CardAction
                            separator={true}
                            inColumn={false}>
                            <CardButton
                            onPress={() => this.viewPressed()}
                            title="View "
                            color="#a9fcd4"
                            />
                            <CardButton
                            onPress={() => this.deleteCard()}
                            title="Dismiss "
                            color="#a9fcd4"
                            />
                            </CardAction>
                        </Card>

                        <Card isDark = {true} style={styles.cardStyle}>
                            <CardTitle
                            title= "New Reply"
                            />
                            <CardContent text={"Position: Network Administrator"}/>
                            <CardContent text={"Name: Gary"}/>
                            <CardAction
                            separator={true}
                            inColumn={false}>
                            <CardButton
                            onPress={() => this.viewPressed()}
                            title="View "
                            color="#a9fcd4"
                            />
                            <CardButton
                            onPress={() => this.deleteCard()}
                            title="Dismiss "
                            color="#a9fcd4"
                            />
                            </CardAction>
                        </Card>



                    </ScrollView>
                </View>
            </SideMenu>
        );
    }

    deleteCard(){
      Alert.alert(
      'Delete',
      'Are you sure you want to delete this reply?',
      [
        {text:'Delete',onPress:()=>console.log('delete')},
        {text:'Cancel',onPress:()=>console.log('cancel pressed')}
      ]
    )
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
      //logout pressed
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
