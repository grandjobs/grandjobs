import React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { Dropdown } from 'react-native-material-dropdown';
import Button from 'react-native-button';
import { Actions } from 'react-native-router-flux';
import UserInfo from './UserInfo.js';

export default class Elimination extends React.Component {
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
                    <Text style={styles.largeText}>Awesome!</Text>
                    <Text style={styles.mainText}>We have a few questions about</Text>
                    <Text style={styles.mainText}>what kind of work you are seeking</Text>
                </View>
                {/*Container to hold all of the input fields.*/}
                <View style={styles.fillContainer}>
					<Dropdown
                        baseColor='#ffffff'
                        textColor='#ffffff'
                        itemColor='#000000'
                        disabledItemColor='#000000'
                        selectedItemColor='#000000'
                        containerStyle={{
                            width: 300
                        }}
                        onChangeText={(value) => this.setState({shift: value})}
                        label='What shift do you work?'
                        data={[{
                            value: '1st Shift',
                        }, {
                            value: '2nd Shift',
                        }, {
                            value: '3rd Shift',
                        }]}
					/>
                    <Dropdown
                        baseColor='#ffffff'
                        textColor='#ffffff'
                        itemColor='#000000'
                        disabledItemColor='#000000'
                        selectedItemColor='#000000'
                        containerStyle={{
                            width: 300
                        }}
                        onChangeText={(value) => this.setState({employmentTerm: value})}
                        label='How long are you looking to work?'
                        data={[{
                            value: 'Less than 6 months',
                        }, {
                            value: '6 months - 1 year',
                        }, {
                            value: 'More than a year',
                        }]}
					/>
                </View>

                {/*Container for setting the button to be at the bottom of the page*/}
                <View style={styles.bottomContainer}>
                    <Button 
                        style={!this.state.employmentTerm || !this.state.shift ? styles.disabledButton : styles.buttonDesign}
                        onPress={()=>this.nextPressed()}
                        disabled={!this.state.employmentTerm || !this.state.shift}
                    >
                    Next
                    </Button>
                </View>
            </View>
        );
    }

    //Handle the next button press.
    nextPressed(){
        //Create the user info object that will hold all information that the user
        //Gives the application.
        var userInfo = new UserInfo();
        userInfo.shift = this.state.shift;
        userInfo.employmentTerm = this.state.employmentTerm;
		userInfo.phoneNum = this.props.phone;
        userInfo.firstName = this.state.firstNameText;
        userInfo.lastName = this.state.lastNameText;
        userInfo.email = this.state.emailText;
		userInfo.uid = this.props.uid;

        //Head to the next page (also passing the userInfo object).
        Actions.SkillsPage({userInfo: userInfo});
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
        opacity: 1
    },
    disabledButton: {
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
        opacity: 0.2
    }
});
