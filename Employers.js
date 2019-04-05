import React from 'react';
import { StyleSheet, Text, View, Dimensions, TextInput, Alert } from 'react-native';
import Button from 'react-native-button';
import { Actions } from 'react-native-router-flux'
import { firebase } from './db'

export default class Employers extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      companyName: '',
      companyLocation: '',
    };
  }

    render() {
		return (
            <View style={styles.mainContainer}>
                <View style={styles.textContainer}>
                    <Text style={styles.largeText}>Awesome!</Text>
                    <Text style={styles.mainText}>Lets fill out some information.</Text>
                </View>
                <View style={styles.fillContainer}>
                    <TextInput style={styles.inputText}
                        onChangeText={(companyName) => this.setState({companyName})}
                        selectTextOnFocus={true}
                        placeholderTextColor="#fff"
                        placeholder='Company Name'
                    />
                    <TextInput style={styles.inputText}
                        onChangeText={(companyLocation) => this.setState({companyLocation})}
                        selectTextOnFocus={true}
                        placeholderTextColor="#fff"
                        placeholder='Company Location'
                    />
                    <View style={styles.buttonContainer}>
                    <Button style={styles.buttonDesign} onPress={()=>this.createPressed()}>
                    Create Account
                    </Button>
                    </View>
                </View>
            </View>
        );
    }

    createPressed(){
      Alert.alert(
			'Confirm Information',
			'Create Account?',
			[
				{text:'OK',onPress:()=>this.checkForm()},
				{text:'Cancel',onPress:()=>console.log('cancel pressed')}
			]
		)
    }

    checkForm(){
		if (this.state.companyName != "" && this.state.companyLocation != "") {
			let rootRef = firebase.database().ref()
			let employerRef = rootRef.child('EMPLOYERS')
			newAccountRef = employerRef.child(this.props.uid).set({'Company Name' : this.state.companyName, 'Company Location' : this.state.companyLocation})
			Actions.EmployerHomepage({uid : this.state.user['uid']});
		} else{
			Alert.alert(
				'Please fill all forms.'
			)
			console.log("error");
		}
	}
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#1E2027',
        padding: 10,
        // justifyContent: 'center'
    },
    textContainer:{
        top: Dimensions.get('window').height * 0.05
    },
    buttonContainer:{
        alignItems: 'center',
        top: Dimensions.get('window').height * 0.15
    },
    fillContainer:{
        top: Dimensions.get('window').height * 0.15,
        justifyContent: 'center',
        alignItems: 'center'
    },
    bottomContainer:{
        flex: 1,
        justifyContent: 'flex-end',
        marginBottom: 0
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
        fontSize: 25,
        textAlign: 'center',
        color:'white',
        fontFamily: 'Roboto-Thin',
        padding: 13,
        margin: 5,
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
    buttonDesign:{
        fontSize: 20,
        fontWeight: 'normal',
        fontFamily: 'Roboto-Thin',
        padding: 10,
        margin: 30,
        width: 200,
        color: '#fff',
        borderRadius: 30,
        borderColor: '#a9fcd4',
        borderWidth: 1,
    },
});
