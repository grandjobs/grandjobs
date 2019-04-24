import React from 'react';
import { StyleSheet, Text, View, Dimensions, TextInput} from 'react-native';
import Button from 'react-native-button';
import { Actions } from 'react-native-router-flux';
import { firebase } from './db'

export default class AdditionalInfo extends React.Component {

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
                    <Text style={styles.mainText}>Almost Done!!</Text>
                </View>
                {/*Container to hold all of the input fields.*/}
                <View style={styles.fillContainer}>
                    <TextInput style={styles.inputText}
                        selectTextOnFocus={true}
                        placeholder='First Name (Optional)'
                        //Update the state when the field is changed
                        onChangeText={(firstNameText) => this.setState({firstNameText})}
                    />
                    <TextInput style={styles.inputText}
                        selectTextOnFocus={true}
                        placeholder='Last Name (Optional)'
                        //Update the state when the field is changed
                        onChangeText={(lastNameText) => this.setState({lastNameText})}
                    />
                    <TextInput style={styles.inputText}
                        selectTextOnFocus={true}
                        placeholder='Email (Optional)'
                        //Update the state when the field is changed
                        onChangeText={(emailText) => this.setState({emailText})}
                    />
                </View>

                {/*Container for setting the button to be at the bottom of the page*/}
                <View style={styles.bottomContainer}>
                    <Button style={styles.buttonDesign} onPress={()=>this.nextPressed()}>
                        Finish!
                    </Button>
                </View>
            </View>
        );
    }

    //Handle the next button press.
    nextPressed(){
        let rootRef = firebase.database().ref()
		let userRef = rootRef.child('USERS')
		newAccountRef = userRef.child(global.GloablUID)
        newAccountRef.set({
            'Desired Shift' : this.props.userInfo.shift,
            'Desired Employement Length' : this.props.userInfo.employmentTerm,
            'Travel' : {
                'Type': 'public',
                'Bus Routes': this.props.userInfo.busAccess,
                'Range': this.props.userInfo.homeRange
            },
            'Email' : this.state.emailText,
            'First Name' : this.state.firstNameText,
            'Last Name' : this.state.lastNameText,
            'Home Location' : {
                'Latitude' : this.props.userInfo.homeLat,
                'Longitude' : this.props.userInfo.homeLong
            },
            'Skills' : this.props.userInfo.skills,
            'Phone Number': this.props.userInfo.phoneNum
        })

        Actions.UserHomePage({userInfo: this.props.userInfo});
    }
}

const styles = StyleSheet.create({
	mainContainer: {
        flex: 1,
        backgroundColor: '#1E2027',
        // padding: 10,
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
    inputPhone:{
        borderColor: '#fff',
        color: '#fff',
        padding: 12,
        margin: 20,
        borderWidth: 1,
        borderRadius: 30,
        textAlign: 'center',
        width: Dimensions.get('window').width * 0.8,
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