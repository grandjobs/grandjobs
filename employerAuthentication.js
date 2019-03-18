import * as React from 'react'
import { StyleSheet, Dimensions, Text, View, ScrollView, TextInput, Alert} from 'react-native'
import Button from 'react-native-button';
import { firebase } from './db'
import { Actions } from 'react-native-router-flux';

export default class employerAuthentication extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
			userType: undefined,
            user: undefined,
            email: '',
			passwd: '',
			repasswd: '',
            confirmationResult: undefined,
            code: '',
			registered: undefined
        }
		//Firebase magic to check if someone is already logged in
        firebase.auth().onAuthStateChanged(user => {
            this.setState({user})
        })
    }
	
    onEmailChange = (email) => {
        this.setState({email})
    }
	
	onPasswordChange = (passwd) => {
        this.setState({passwd})
    }
	
	onRePasswordChange = (repasswd) => {
        this.setState({repasswd})
    }
	
    submitNewUser = async () => {
		if (this.state.passwd == this.state.repasswd) {
			try {
				await firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.passwd)
				Actions.Employers({uid : this.state.user['uid']});
			} catch (e) {
				Alert.alert(
					'Input Error',
					e.message,
					[
						{text: 'OK', onPress: () => console.log('OK Pressed')},
					],
					{cancelable: false},
				);
			}
		} else {
			Alert.alert(
				'Input Error',
				'Passwords must match',
				[
					{text: 'OK', onPress: () => console.log('OK Pressed')},
				],
				{cancelable: false},
			);
		}
    }
	
	submitReturningUser = async () => {
		try {
			await firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.passwd)
			Actions.EmployerHomepage({uid : this.state.user['uid']});
		} catch (e) {
			Alert.alert(
				'Input Error',
				e.message,
				[
					{text: 'OK', onPress: () => console.log('OK Pressed')},
				],
				{cancelable: false},
			);
		}
    }
	
	returningUser = () => {
		this.setState({ userType: 'returning'})
	}
	
	newUser = () => {
		this.setState({ userType: 'new'})
	}

    render() {
		if (this.state.userType == 'returning' && this.state.user == undefined) {
			return (
			   <View style={styles.mainContainer}>
					<View style={styles.textContainer}>
						<Text style={styles.mainText}>Please enter your email address </Text>
						<Text style={styles.mainText}>and password</Text>
					</View>
					<View style={styles.fillContainer}>
						<TextInput 
							style={styles.inputText}
							placeholder='Email Address'
							onChangeText={this.onEmailChange}
							value={this.state.email}
							selectTextOnFocus={true}
						/>
						<TextInput 
							style={styles.inputText}
							placeholder='Password'
							onChangeText={this.onPasswordChange}
							value={this.state.passwd}
							selectTextOnFocus={true}
						/>
					</View>
					<View style={styles.bottomContainer}>
						<Button
							style={styles.buttonDesign}
							onPress={this.submitReturningUser}
						>
							Login
						</Button>
					</View>
				</View>
			)
		} else if (this.state.userType == 'new' && this.state.user == undefined) {
			return (
			   <View style={styles.mainContainer}>
					<View style={styles.textContainer}>
						<Text style={styles.mainText}>Please enter an email address </Text>
						<Text style={styles.mainText}>and password</Text>
					</View>
					<View style={styles.fillContainer}>
						<TextInput 
							style={styles.inputText}
							placeholder='Email Address'
							onChangeText={this.onEmailChange}
							value={this.state.email}
							selectTextOnFocus={true}
						/>
						<TextInput 
							style={styles.inputText}
							placeholder='Password'
							onChangeText={this.onPasswordChange}
							value={this.state.passwd}
							selectTextOnFocus={true}
						/>
						<TextInput 
							style={styles.inputText}
							placeholder='Re-enter Password'
							onChangeText={this.onRePasswordChange}
							value={this.state.repasswd}
							selectTextOnFocus={true}
						/>
					</View>
					<View style={styles.bottomContainer}>
						<Button
							style={styles.buttonDesign}
							onPress={this.submit}
						>
							Submit
						</Button>
					</View>
				</View>
			)
		} else if (this.state.user){
			return (
			   <View style={styles.mainContainer}>
					<View style={styles.textContainer}>
						<Text style={styles.mainText}>Goto employer account setup</Text>
					</View>
				</View>
			)
		} else {
			return (
			   <View style={styles.mainContainer}>
					<View style={styles.textContainer}>
						<Text style={styles.largeText}>I am a...</Text>
					</View>
					<View style={styles.bottomContainer}>
						<Button
							style={styles.buttonDesign}
							onPress={this.returningUser}
						>
							Returning User
						</Button>
						<Button
							style={styles.buttonDesign}
							onPress={this.newUser}
						>
							New User
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
    bottomContainer:{
        flex: 1,
        justifyContent: 'flex-end',
        marginBottom: 100
    },
    buttonDesign:{
        fontSize: 20,
        fontFamily: 'sans-serif-thin',
        padding: 10,
        margin: 30,
        width: 250,
        color: '#fff',
        borderRadius: 30,
        borderColor: '#a9fcd4',
        borderWidth: 1,
    },
});