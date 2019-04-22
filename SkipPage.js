import React from 'react';
import { StyleSheet, Text, View, Dimensions, TextInput} from 'react-native';
import Button from 'react-native-button';
import { Actions } from 'react-native-router-flux';
import { firebase } from './db'


export default class SkipPage extends React.Component {

    constructor(props) {
        super(props);

        //State to keep track of the information the user enters in the fields.
        this.state = {
            firstNameText: '',
            lastNameText: '',
            emailText: ''
        };
    }
    render() {
        return (
            <View style={styles.mainContainer}>
                {/*Container for the text...*/}
                <View style={styles.textContainer}>
                    <Text style={styles.largeText}>Thats all we need!</Text>
                    <Text style={styles.mainText}>You can now go to your homepage</Text>
                    <Text style={styles.mainText}>or add additional information to</Text>
                    <Text style={styles.mainText}>your profile for more matches!</Text>
                </View>
                {/*Container to hold all of the input fields.*/}
                <View style={styles.fillContainer}/>
                {/*Container for setting the button to be at the bottom of the page*/}
                <View style={styles.bottomContainer}>
                    <Button style={styles.buttonDesign} onPress={()=>this.continuePressed()}>
                    Continue Setup
                    </Button><Button style={styles.buttonDesign} onPress={()=>this.skipPressed()}>
                    Skip to Homepage
                    </Button>
                </View>
            </View>
        );
    }

    continuePressed(){
        Actions.MapsPage({userInfo: this.props.userInfo})
    }

    skipPressed(){
            let rootRef = firebase.database().ref()
            let userRef = rootRef.child('USERS')
            newAccountRef = userRef.child(this.props.userInfo.uid)
            newAccountRef.set({
                'Desired Shift' : this.props.userInfo.shift,
                'Desired Employement Length' : this.props.userInfo.employmentTerm,
                'Travel' : {
                    'Type': "",
                    'Range': ""
                },
                'Email' : "",
                'First Name' : "",
                'Last Name' : "",
                'Home Location' : {
                    'Latitude' : 0.0,
                    'Longitude' : 0.0
                },
                'Skills' : this.props.userInfo.skills,
                'Phone Number': this.props.userInfo.phoneNum
            })

        Actions.UserHomePage();
    }
}

const styles = StyleSheet.create({
	mainContainer: {
        flex: 1,
        backgroundColor: '#1E2027',
        justifyContent: 'center',
        alignItems: 'center'
    },
    textContainer:{
        top: Dimensions.get('window').height * 0.05
    },
    fillContainer:{
        top: Dimensions.get('window').height * 0.20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    largeText:{
        fontSize: 65,
        textAlign: 'center',
        top: 20,
        color: '#d6d6d6',
        fontFamily: 'Roboto-Thin'
    },
    mainText:{
        fontSize: 25,
        textAlign: 'center',
        top: 20,
        color: '#d6d6d6',
        fontFamily: 'Roboto-Thin'
    },
    inputText:{
        borderColor: '#fff',
        color: '#fff',
        //fontSize: 25,
        textAlign: 'center',
        color:'white',
        fontFamily: 'Roboto-Thin',
        padding: 10,
        margin: 20,
        borderWidth: 1,
        borderRadius: 30,
        width: Dimensions.get('window').width * 0.8
    },
    bottomContainer:{
        flex: 1,
        justifyContent: 'flex-end',
        marginBottom: 0
    },
    buttonDesign:{
        fontSize: 20,
        fontWeight: 'normal',
        fontFamily: 'Roboto-Thin',
        padding: 10,
        margin: 30,
        width: 150,
        color: '#fff',
        borderRadius: 30,
        borderColor: '#a9fcd4',
        borderWidth: 1,
    },
});