import React from 'react';
import { StyleSheet, Text, View, Dimensions, TextInput } from 'react-native';
import Button from 'react-native-button';
import { Actions } from 'react-native-router-flux';
import UserInfo from './UserInfo.js';
import { firebase } from './db'


export default class AccountSetup extends React.Component {

    render() {
        return (
            <View style={styles.mainContainer}>
                <Text style={styles.largeText} onPress={()=>this.homePressed()}>Home Page</Text>
                <View
                    style={{
                        borderBottomColor: '#d6d6d6',
                        borderBottomWidth: 1,
                    }}
                />
                <Text style={styles.largeText} onPress={()=>this.contactedPressed()}>Contacted Companies</Text>
                <View
                    style={{
                        borderBottomColor: '#d6d6d6',
                        borderBottomWidth: 1,
                    }}
                />
				<Text style={styles.largeText} onPress={()=>this.onSignOut()}>Sign Out(temp)</Text>
                <View
                    style={{
                        borderBottomColor: '#d6d6d6',
                        borderBottomWidth: 1,
                    }}
                />
                <Text style={styles.largeText} onPress={()=>this.infoPressed()}>My Info</Text>
            </View>
        );
    }

    homePressed(){
        console.log("Home");
        Actions.UserHomePage();
    }

    infoPressed(){
        console.log("Info");
        // Actions.UserInfoPage();
    }

    contactedPressed(){
        console.log("Contacted");
    }
	
	onSignOut = async () => {
        try {
            await firebase.auth().signOut().then( () => {
				Actions.StartPage()
			});
        } catch (e) {
            console.warn(e)
        }
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#0D1120',
        paddingTop: 40,
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
        fontSize: 25,
        textAlign: 'center',
        color: '#d6d6d6',
        fontFamily: 'Roboto-Thin',
        padding: 20,
    },
});
