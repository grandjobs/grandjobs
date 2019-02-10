import React from 'react';
import { StyleSheet, Text, View, Dimensions, TextInput } from 'react-native';
import Button from 'react-native-button';
// import { TextInput } from 'react-native-paper';
import PhoneInput from 'react-native-phone-input';

export default class AccountSetup extends React.Component {
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
                    />
                    <TextInput style={styles.inputText}
                        selectTextOnFocus={true}
                        placeholder='First Name (Optional)'
                    />
                    <TextInput style={styles.inputText}
                        selectTextOnFocus={true}
                        placeholder='Last Name (Optional)'
                    />
                    <TextInput style={styles.inputText}
                        selectTextOnFocus={true}
                        placeholder='Email (Optional)'
                    />
                </View>
            </View>
        );
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
    inputText:{
        borderColor: '#fff',
        color: '#fff',
        fontSize: 25,
        textAlign: 'center',
        color:'white',
        fontFamily: 'Arial',
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
});
