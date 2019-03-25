import React from 'react';
import { StyleSheet, Text, View, Dimensions, ImageBackground } from 'react-native';
import Button from 'react-native-button'
import {createStackNavigator, createAppNavigator} from 'react-navigation';
import { Actions } from 'react-native-router-flux';
import { firebase } from './db'
import { Font } from 'expo';
import UserInfo from './UserInfo.js';


export default class StartPage extends React.Component {
    constructor(props) {
        super(props)
        
		//Firebase magic to check if someone is already logged in
        firebase.auth().onAuthStateChanged(user => {
            this.setState({user})
			
			if(user) {
				var uid = this.state.user['uid']
				let rootRef = firebase.database().ref()
				console.log('Checking Firebase for uid ' + uid)
				
				try {
					rootRef.once('value')
						.then(snapshot => {
							let seeker = snapshot.child('USERS').child(uid).exists();
							let employer = snapshot.child('EMPLOYERS').child(uid).exists();
							
							if (seeker) {
								Actions.UserHomePage({uid : this.state.user['uid']});
								console.log('seeker')
							} else if (employer) {
								console.log('employer')
								Actions.EmployerHomepage({uid : this.state.user['uid']});
							}
						})
				} catch (e) {
					console.warn(e)
				}
				
				
				
			}
        })
    }
	
	
	state = {
        fontLoaded: false,
    };

    async componentWillMount() {
        await Font.loadAsync({
            'Roboto-Thin': require('./assets/fonts/Roboto-Thin.ttf'),
        });
        this.setState({fontLoaded: true});
    }

	
	
    render() {
		return (
			this.state.fontLoaded ? (
				<ImageBackground source={require('./assets/Images/city-blur.png')}  style={{width: '100%', height: '100%'}}>
					<View style={styles.mainContainer}>
						<View style={styles.textContainer}>
							<Text style={styles.mainText}>I am looking for...</Text>
						</View>
						<View style={styles.buttonContainer}>
							<Button style={styles.buttonDesign} onPress={()=>this.employerAuthentication()}>
							Employees
							</Button>
							<Button style={styles.buttonDesign} onPress={()=>this.seekerAuthentication()}>
							Jobs
							</Button>
						</View>
					</View>
				</ImageBackground>
			) : null
		);
    }

    seekerAuthentication(){
        Actions.seekerAuthentication();
    }

    employerAuthentication(){
        Actions.employerAuthentication();
    }
	
	onSignOut = async () => {
        try {
			this.setState({ registered: undefined })
            await firebase.auth().signOut()
			this.reset()
        } catch (e) {
            console.warn(e)
        }
    }
	
	reset = () => {
        this.setState({
            user: undefined
        })
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        // backgroundColor: '#1E2027',
        // justifyContent: 'center'
    },
    textContainer:{
        top: Dimensions.get('window').height * 0.05
    },
    buttonContainer:{
        alignItems: 'center',
        top: (Dimensions.get('window').height * 0.45)
    },
    mainText:{
        fontSize: 50,
        textAlign: 'center',
        top: 20,
        color: '#fff',
        fontFamily: 'Roboto-Thin'
    },
    buttonDesign:{
        fontSize: 25,
        fontWeight: 'normal',
        padding: 10,
        margin: 30,
        width: 300,
        color: '#fff',
        borderRadius: 30,
        borderColor: '#fff',
        borderWidth: 1,
        fontFamily: 'Roboto-Thin'
        // opacity: 10,
        // backgroundColor: 'rgba(18, 18, 18, 0.5)',
    },
});
