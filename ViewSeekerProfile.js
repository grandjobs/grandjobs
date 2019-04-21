import React from 'react';
import { StyleSheet, Text, View, ScrollView, Dimensions, TextInput } from 'react-native';
import Button from 'react-native-button';
import { Actions } from 'react-native-router-flux';
import call from 'react-native-phone-call';
import { firebase } from './db'

  let arr = [];
  let phonenumber = "";

export default class ViewSeekerProfile extends React.Component {



    constructor(props) {
        super(props);

        this.state = {
          Name: 'Interested User',
          phoneNumber: '',
          skills: [],

        };

    //    this.jobInfo = this.props.jobInfo;
    }

    async componentDidMount() {
      let rootRef = firebase.database().ref()

        try{
      let userRef = rootRef.child('USERS').child(this.props.useridkey)
      if (userRef != undefined) {
        userRef.once('value')
          .then(snapshot => {
            let userinformation = snapshot.val()

            arr = [];

          this.setState({phoneNumber: userinformation["Phone Number"]})
          this.setState({skills: userinformation["Skills"]})
          if(userinformation["First Name"] != "" && userinformation["Last Name"] != ""){
          this.setState({Name: userinformation["First Name"] + " " + userinformation["Last Name"]})
          }

        })

      }
    }
    catch (e) {
        console.warn(e)
    }

  }

    render() {
        return (
            <View style={styles.mainContainer}>
                <Text style={styles.largeText}>{this.state.Name}</Text>
                <Text style={styles.mainText}>Below is the list of skills of the user. Press contact to call.</Text>
                {/*Main ScrollView for the jobs*/}
                <ScrollView style={styles.infoContainer}>
                    {/*Map the description of the jobs to the text.*/}

                    <Text style={[styles.sectionText, {paddingBottom: 0, paddingTop: 10 }]}>Skills</Text>
                    {/*Map the skills of the job to the screen*/}
                    <View style={styles.skillsContainer}>
                        {
                            this.state.skills.map(( item, key ) =>
                            (
                                <Text
                                key = {key}
                                style = {styles.skillLabel}>
                                {item}
                                </Text>
                            ))
                        }
                    </View>


                    {/*Container to anchor the buttons to the bottom of the screen.*/}
                    <Text style={[styles.sectionText, {paddingBottom: 0, paddingTop: 10 }]}>Phone Number</Text>

                    <Text
                    style = {styles.descripText}>
                    {this.state.phoneNumber}
                    </Text>

                    <View style={styles.bottomContainer}>
                        <Button style={styles.buttonDesign} onPress={()=>this.contactPressed()}>
                        Contact
                        </Button>
                        <Button style={styles.buttonDesign} onPress={()=>this.backPressed()}>
                        Back
                        </Button>
                    </View>

                </ScrollView>
            </View>
        );
    }



    /**
     * Handler for the user contacting this job.
     * @return {[type]} [description]
     */
    contactPressed(){

      const args = {
        number: this.state.phoneNumber, // String value with the number to call
        prompt: false // Optional boolean property. Determines if the user should be prompt prior to the call
      }

      call(args).catch(console.error)
    }

    /**
     * Handler for the user exiting this job.
     * @return {[type]} [description]
     */
    backPressed(){
        Actions.EmployerSideReplies();
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#1E2027',
        // padding: 10,
        alignItems: 'center'
    },
    infoContainer:{
        flex: 1,
        paddingHorizontal: 20,
    },
    skillsContainer:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        paddingVertical: 20,
    },
    largeText:{
        paddingTop: Dimensions.get('window').height * 0.02,
        fontSize: 65,
        textAlign: 'center',
        color: '#d6d6d6',
        fontFamily: 'Roboto-Thin'
    },
    mainText:{
        fontSize: 40,
        textAlign: 'center',
        paddingBottom: 10,
        color: '#a9fcd4',
        fontFamily: 'Roboto-Thin'
    },
    descripText:{
        fontSize: 25,
        textAlign: 'center',
        color: '#d6d6d6',
        fontFamily: 'Roboto-Thin',
        paddingBottom: 10,
        paddingTop: 10,
    },
    distanceText:{
        fontSize: 25,
        color: '#d6d6d6',
        fontFamily: 'Roboto-Thin',
        paddingBottom: 10
    },
    sectionText:{
        fontSize: 25,
        color: '#d6d6d6',
        fontFamily: 'Roboto-Thin',
        textDecorationLine: 'underline',
        padding: 20,
        textAlign: 'center',
    },
    skillLabel:{
        fontSize: 22,
        textAlign: 'center',
        color: '#d6d6d6',
        fontFamily: 'Roboto-Thin',
        borderWidth: 1,
        borderColor: '#a9fcd4',
        borderRadius: 30,
        paddingHorizontal: 20,
        marginTop: 25,
        marginHorizontal: 5,
    },
    bottomContainer:{
        flex: 1,
        justifyContent: 'flex-end',
        marginBottom: 10,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
    },
    buttonDesign:{
        fontSize: 20,
        fontWeight: 'normal',
        fontFamily: 'Roboto-Thin',
        padding: 10,
        marginVertical: 30,
        width: 150,
        color: '#fff',
        borderRadius: 30,
        borderColor: '#a9fcd4',
        borderWidth: 1,
        marginHorizontal: 10,
    },

});
