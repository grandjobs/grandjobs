import * as React from 'react'
import { StyleSheet, Dimensions, Text, View, ScrollView, TextInput} from 'react-native'
import Button from 'react-native-button';
import {Linking, WebBrowser} from 'expo'
import { firebase } from './db'
import { Actions } from 'react-native-router-flux';

const captchaUrl = `https://job-push-fbb6a.firebaseapp.com/captcha.html?appurl=${Linking.makeUrl('')}`

export default class authSol extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            user: undefined,
            phone: '',
            confirmationResult: undefined,
            code: '',
			registered: 'false'
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
        this.reset()
    }
    onSignOut = async () => {
        try {
            await firebase.auth().signOut()
        } catch (e) {
            console.warn(e)
        }
    }
	
	firebaseCheckForUser = async () => {
		console.log('step 1')
		
		let registered = false
		let uid = this.state.user['uid']
		let rootRef = firebase.database().ref()
		let userRef = rootRef.child('USERS')
		
		try {
            userRef.once('value')
				.then(function(snapshot) {
					registered = snapshot.child(uid).exists();
					this.setState({ registered })
				})
        } catch (e) {
            console.warn(e)
        }
	}
	
	userCheckDidMount = async () => {
		console.log('here')
		
		try {
            const registered = await this.firebaseCheckForUser()
			this.setState({ registered })
        } catch (e) {
            console.warn(e)
        }
	}
	
	directToAccountSetup = async () => {
        Actions.AccountSetup({uid: uid});
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
			this.firebaseCheckForUser()
			
			if (this.state.registered) {
				if (this.state.registered == true) {
					return (
					   <View style={styles.mainContainer}>
							<View style={styles.textContainer}>
								<Text style={styles.largeText}>You are signed in!</Text>
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
				} else {
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
			console.log('whyyy')
			console.log('whyyyyy')
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