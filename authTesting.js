import React from 'react';
import { StyleSheet, Text, View, Dimensions, TextInput, Alert } from 'react-native';
import Button from 'react-native-button';
import PhoneInput from 'react-native-phone-input';
import { Actions } from 'react-native-router-flux'
import { db } from './db';

export default class authTesting extends React.Component {
    state = { phone: ''}
	
	handleSignUp = () => {
		console.log('handleSignUp')
	}
	
	render() {
        return (
			<View style={styles.container}>
				<View style={styles.fillContainer}>
					<TextInput
						placeholder='Phone Number'
						autoCapitalize='none'
						style={styles.textInput}
						onChangeText={phone => this.setState({ phone })}
						value={this.state.phone}
					/>
					<Button title="Sign Up" onPress={this.handleSignUp} style={styles.buttonDesign} />
				</View>
			</View>
		);
    }
}
	
const styles = StyleSheet.create({	
	container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
	},
	inputText:{
        borderColor: '#fff',
        color: '#fff',
        fontSize: 25,
        textAlign: 'center',
        color:'white',
        fontFamily: 'Arial',
        padding: 13,
        margin: 5,
        borderWidth: 1,
        borderRadius: 30,
        width: Dimensions.get('window').width * 0.8
    },
	buttonDesign:{
        fontSize: 25,
        fontFamily: 'Arial',
        padding: 10,
        margin: 30,
        width: 300,
        color: '#bc1c1c',
        borderRadius: 30,
        backgroundColor: '#121212',
    },
	fillContainer:{
        top: Dimensions.get('window').height * 0.20,
        justifyContent: 'center',
        alignItems: 'center'
    },
});