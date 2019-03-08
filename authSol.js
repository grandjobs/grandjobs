import * as React from 'react'
import { StyleSheet, Dimensions, Text, View, ScrollView, TextInput} from 'react-native'
import Button from 'react-native-button';
import {Linking, WebBrowser} from 'expo'
import { firebase } from './db'
import { Actions } from 'react-native-router-flux';

//Static webpage to hold a reCAPTCHA object
const captchaUrl = `https://job-push-fbb6a.firebaseapp.com/captcha.html?appurl=${Linking.makeUrl('')}`

export default class authSol extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            user: undefined,
            phone: '',
            confirmationResult: undefined,
            code: '',
			registered: undefined
        }
		//Firebase magic to check if someone is already logged in
        firebase.auth().onAuthStateChanged(user => {
            this.setState({user})
        })
    }
	
	//Handles input for phone number to translate to state value
    onPhoneChange = (phone) => {
        this.setState({phone})
    }
	
	//Sends phone number to the static captch page hosted on Firebase
    onPhoneComplete = async () => {
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
            const {phone} = this.state
            //fake firebase.auth.ApplicationVerifier
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
    }
	
	//Handles input for SMS confirmation code to translate to state value
    onCodeChange = (code) => {
        this.setState({code})
    }
	
    onSignIn = async () => {
        const {confirmationResult, code} = this.state
        try {
            await confirmationResult.confirm(code)
        } catch (e) {
            console.warn(e)
        }
		
		//need to figure out why we reset here..I'm sure this will cause issues down the road especially
		//with my heavy modifications to the file from its original implementation
        this.reset()
    }
	
    onSignOut = async () => {
        try {
			this.setState({ registered: undefined })
            await firebase.auth().signOut()
        } catch (e) {
            console.warn(e)
        }
    }
	
	//Function to check whether a phone number has a registered account in our database
	//and set the registered state variable appropriately
	firebaseCheckForUser = async () => {
		let registered = false
		var uid = this.state.user['uid']
		let rootRef = firebase.database().ref()
		let userRef = rootRef.child('USERS')
		console.log('Checking Firebase for uid ' + uid)
		
		try {
            userRef.once('value')
				.then(snapshot => {
					registered = snapshot.child(uid).exists();
					console.log('Registered set as ' + registered)
					this.setState({ registered })
				})
        } catch (e) {
            console.warn(e)
        }
	}
	
	//If an user is unregistered this function will direct them to the account setup flow
	directToAccountSetup = async () => {
        Actions.AccountSetup({uid : this.state.user['uid']});
    }
	
    reset = () => {
        this.setState({
            phone: '',
            phoneCompleted: false,
            confirmationResult: undefined,
            code: ''
        })
    }

    render() {
		/* Signed in */
		if (this.state.user) {
			console.log('entering difficult stuff')
			console.log('Registered: ' + this.state.registered)
			
			if (this.state.registered == undefined) {
				console.log('check')
				this.firebaseCheckForUser()
			}
			
			//Already has an account with us
			if (this.state.registered) {
				if (this.state.registered == true) {
					console.log(this.state)
					
					return (
					   <View style={styles.mainContainer}>
							<View style={styles.textContainer}>
								<Text style={styles.largeText}>You are signed in! </Text>
								<Text style={styles.largeText}>TODO send to homepage </Text>
							</View>
							<View style={styles.bottomContainer}>
								<Button
									style={styles.buttonDesign}
									onPress={this.onSignOut}
								>
									Sign out
								</Button>
							</View>
						</View>
					)
				}
			} 
			
			//Does not already have an account with us
			else if (this.state.registered == false) {
				console.log(this.state)
				
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
			} else {
				return (
					<View>
						<Text>we waiting on stuff yo</Text>
					</View>
				)
			}
		} 
		/* Sign in case */
		if (!this.state.confirmationResult && !this.state.user) {
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
							onChangeText={this.onPhoneChange}
							value={this.state.phone}
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
							onChangeText={this.onCodeChange}
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