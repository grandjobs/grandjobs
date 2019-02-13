import React from 'react';
import { StyleSheet, Text, View, Dimensions, TextInput } from 'react-native';
import Button from 'react-native-button';
// import { TextInput } from 'react-native-paper';
import PhoneInput from 'react-native-phone-input';
import { Actions } from 'react-native-router-flux'

export default class EmployerHomepage extends React.Component {
    render() {
      //const { navigate } = this.props.navigation;
        return (
            <View style={styles.mainContainer}>
                <View style={styles.textContainer}>
                    <Text style={styles.largeText}>Welcome</Text>
                    <Text style={styles.mainText}>Here are your updates</Text>
                </View>
                <View style={styles.buttonContainer}>
                <Button style={styles.buttonDesign} onPress={()=>this.homePressed()}>
                Homepage
                </Button>
                </View>
                <View style={styles.fillContainer}>
                <Text style={styles.mainText}>Job Listings and</Text>
                <Text style={styles.mainText}>Notifications Here</Text>
                </View>

            </View>
        );
    }

    homePressed(){

      Actions.StartPage();
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
        top: (Dimensions.get('window').height * 0.7)
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
        fontFamily: 'Arial'
    },
    mainText:{
        fontSize: 25,
        textAlign: 'center',
        top: 20,
        color: '#d6d6d6',
        fontFamily: 'Arial'
    },
    buttonDesign:{
        fontSize: 25,
        fontFamily: 'Arial',
        padding: 10,
        margin: 30,
        width: 300,
        color: '#d6d6d6',
        borderRadius: 30,
        backgroundColor: '#121212',
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
});
