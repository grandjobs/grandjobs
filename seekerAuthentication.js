import * as React from 'react'
import { StyleSheet, Dimensions, Text, View, ScrollView, TextInput, Alert} from 'react-native'
import Button from 'react-native-button'
import {Linking, WebBrowser} from 'expo'
import { firebase } from './db'
import { Actions } from 'react-native-router-flux'

//delete later
import UserInfo from './UserInfo.js';

//Static webpage to hold a reCAPTCHA object
const captchaUrl = `https://job-push-fbb6a.firebaseapp.com/captcha.html?appurl=${Linking.makeUrl('')}`

export default class seekerAuthentication extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            user: undefined,
            phone: '',
            confirmationResult: undefined,
            code: '',
        }
		//Firebase magic to check if someone is already logged in
        firebase.auth().onAuthStateChanged(user => {
			this.setState({user})
        })
    }
	
	//Sends phone number to the static captch page hosted on Firebase
    onPhoneComplete = async () => {
        var testPattern = new RegExp("^(\\+1)?(\\d{10}){1}$")
		
		if (testPattern.test(this.state.phone)) {
			let phone = this.state.phone
			
			if (phone.substring(0,2) != '+1') {
				phone = '+1' + phone
			}
			
			let token = null
			const listener = ({url}) => {
				WebBrowser.dismissBrowser()
				const tokenEncoded = Linking.parse(url).queryParams['token']
				if (tokenEncoded)
					token = decodeURIComponent(tokenEncoded)
			}
			Linking.addEventListener('url', listener)
			await WebBrowser.openBrowserAsync(captchaUrl)
			Linking.removeEventListener('url', listener)
			if (token) {
				const captchaVerifier = {
					type: 'recaptcha',
					verify: () => Promise.resolve(token)
				}
				try {
					const confirmationResult = await firebase.auth().signInWithPhoneNumber(phone, captchaVerifier)
					this.setState({confirmationResult})
				} catch (e) {
					console.warn(e)
				}
			}
		} else {
			Alert.alert('Invalid Phone Number')
		}
	}
	
    onSignIn = async () => {
        const {confirmationResult, code} = this.state
        try {
            await confirmationResult.confirm(code)
        } catch (e) {
            console.warn(e)
        }
    }
	
    onSignOut = async () => {
        try {
			this.setState({ registered: undefined })
            await firebase.auth().signOut()
        } catch (e) {
            console.warn(e)
        }
    }

	//If an user is unregistered this function will direct them to the account setup flow
	directToAccountSetup = async () => {
        Actions.AccountSetup({uid : this.state.user['uid']});
    }
	
	//Function to check whether a phone number has a registered account in our database
	//and set the registered state variable appropriately
	async componentDidUpdate() {
		if(this.state.user) {
			var uid = this.state.user['uid']
			let rootRef = firebase.database().ref()
			let userRef = rootRef.child('USERS')
			
			try {
				userRef.once('value')
					.then(snapshot => {
						if(snapshot.child(uid).exists()) {
							var userInfo = new UserInfo();
							
							//user home page
							Actions.UserInfoPage({'userInfo': userInfo});
						}
					})
			} catch (e) {
				console.warn(e)
			}
		}
	}

    render() {
		/* Signed in */
		if (this.state.user) {
			return (
			   <View style={styles.mainContainer}>
					<View style={styles.textContainer}>
						<Text style={styles.largeText}>HELLO!</Text>
						<Text style={styles.mainText}>It looks like you don't have an account</Text>
						<Text style={styles.mainText}>Click the button below to set on up!</Text>
					</View>
					<View style={styles.bottomContainer}>
						<Button
							style={styles.buttonDesign}
							onPress={this.directToAccountSetup}
						>
							Create Account
						</Button>
					</View>
				</View>
			)
		}
		
		/* Sign in case */
		if (!this.state.confirmationResult) {
			return (
				<View style={styles.mainContainer}>
					<View style={styles.textContainer}>
						<Text style={styles.largeText}>Sign In</Text>
						<Text style={styles.mainText}>All you need is a phone number :)</Text>
					</View>
					<View style={styles.fillContainer}>
						<TextInput 
							style={styles.inputText}
							placeholder='Phone Number'
							onChangeText={(phone) => this.setState({phone})}
							keyboardType="phone-pad"
							selectTextOnFocus={true}
						/>
					</View>
					<View style={styles.bottomContainer}>
						<Button
							style={styles.buttonDesign}
							onPress={this.onPhoneComplete}
							/* title="Next" */
						>
							Next
						</Button>
					</View>
				</View>
			);
		}
		/* Screen to enter confirmation code from SMS */
		else {
			return (
				<View style={styles.mainContainer}>
					<View style={styles.textContainer}>
						<Text style={styles.largeText}>Enter Confirmation Code</Text>
						<Text style={styles.mainText}>You should have recieved a text</Text>
					</View>
					<View style={styles.fillContainer}>
						<TextInput 
							style={styles.inputText}
							placeholder='SMS Code'
							onChangeText={(code) => this.setState({code})}
							value={this.state.code}
							keyboardType="numeric"
							selectTextOnFocus={true}
						/>
					</View>
					<View style={styles.bottomContainer}>
						<Button
						onPress={this.onSignIn}
						title="Sign in"
						style={styles.buttonDesign}
						>
						Submit
						</Button>
					</View>
				</View>
			)
		}
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
        fontFamily: 'sans-serif-thin'
    },
    mainText:{
        fontSize: 25,
        textAlign: 'center',
        top: 20,
        color: '#d6d6d6',
        fontFamily: 'sans-serif-thin'
    },
    inputText:{
        borderColor: '#fff',
        color: '#fff',
        fontSize: 25,
        textAlign: 'center',
        color:'white',
        fontFamily: 'sans-serif-thin',
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
        fontFamily: 'sans-serif-thin',
        padding: 10,
        margin: 30,
        width: 150,
        color: '#fff',
        borderRadius: 30,
        borderColor: '#a9fcd4',
        borderWidth: 1,
    },
});