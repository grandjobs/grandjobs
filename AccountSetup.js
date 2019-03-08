import React from 'react';
import { StyleSheet, Text, View, Dimensions, TextInput } from 'react-native';
import Button from 'react-native-button';
import { Actions } from 'react-native-router-flux';
import UserInfo from './UserInfo.js';


export default class AccountSetup extends React.Component {
    constructor() {
        super();
        this.state = {
            phoneText: '',
            firstNameText: '',
            lastNameText: '',
            emailText: ''
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
                    {/*// <Text style={{textAlign: 'right', color: 'white'}}>Phone:</Text> */}
                    {/* // <PhoneInput ref='phone' style={styles.inputPhone} textStyle={{fontSize: 18, color:'white', fontFamily: 'sans-serif-thin', }}/>*/}
                    <TextInput style={styles.inputText}
                        keyboardType='numeric'
                        selectTextOnFocus={true}
                        placeholder='Phone #'
                        onChangeText={(phoneText) => this.setState({phoneText})}
                    />
                    <TextInput style={styles.inputText}
                        selectTextOnFocus={true}
                        placeholder='First Name (Optional)'
                        onChangeText={(firstNameText) => this.setState({firstNameText})}

                    />
                    <TextInput style={styles.inputText}
                        selectTextOnFocus={true}
                        placeholder='Last Name (Optional)'
                        onChangeText={(lastNameText) => this.setState({lastNameText})}
                    />
                    <TextInput style={styles.inputText}
                        selectTextOnFocus={true}
                        placeholder='Email (Optional)'
                        onChangeText={(emailText) => this.setState({emailText})}
                    />
                </View>

                <View style={styles.bottomContainer}>
                    <Button style={styles.buttonDesign} onPress={()=>this.nextPressed()}>
                    Next
                    </Button>
                </View>
            </View>
        );
    }

    nextPressed(){
        var userInfo = new UserInfo();
        userInfo.phoneNum = this.state.phoneText;
        userInfo.firstName = this.state.firstNameText;
        userInfo.lastName = this.state.lastNameText;
        userInfo.email = this.state.emailText;

        Actions.SkillPage({userInfo: userInfo});
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
        fontSize: 25,
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
