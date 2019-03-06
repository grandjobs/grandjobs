import React from 'react';
import { StyleSheet, Text, View, Dimensions, TextInput, Alert } from 'react-native';
import Button from 'react-native-button';
import { Actions } from 'react-native-router-flux'

export default class EmployerCreateListing extends React.Component {
    render() {
        return (
            <View style={styles.mainContainer}>
                <View style={styles.textContainer}>
                    <Text style={styles.largeText}>Great!</Text>
                    <Text style={styles.mainText}>Lets create a listing.</Text>
                </View>
                <View style={styles.fillContainer}>
                    {/*// <Text style={{textAlign: 'right', color: 'white'}}>Phone:</Text> */}
                    {/* // <PhoneInput ref='phone' style={styles.inputPhone} textStyle={{fontSize: 18, color:'white', fontFamily: 'sans-serif-thin', }}/>*/}
                    <TextInput style={styles.inputText}
                        selectTextOnFocus={true}
                        placeholderTextColor="#fff"
                        placeholder='Job Title'
                    />
                    <TextInput style={styles.inputText}
                        selectTextOnFocus={true}
                        placeholderTextColor="#fff"
                        placeholder='Job Details'
                    />
                    <TextInput style={styles.inputText}
                        selectTextOnFocus={true}
                        placeholderTextColor="#fff"
                        placeholder='Job Location'
                    />
                    <TextInput style={styles.inputText2}
                        selectTextOnFocus={true}
                        placeholder='Additional Details'
                        placeholderTextColor="#fff"
                        multiline = {true}
                    />
                    <View style={styles.buttonContainer}>
                    <Button style={styles.buttonDesign} onPress={()=>this.createPressed()}>
                    Create Listing
                    </Button>
                    <Button style={styles.buttonDesign} onPress={()=>this.cancelPressed()}>
                    Cancel
                    </Button>
                    </View>
                </View>
            </View>
        );
    }

    cancelPressed(){
      Alert.alert(
        'Cancel',
        'Cancel Listing?',
        [
          {text:'OK',onPress:()=>Actions.EmployerHomepage()},
          {text:'Cancel',onPress:()=>console.log('cancel pressed')}
        ]
      )
    }
    createPressed(){
      Actions.EmployerHomepage();
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
        top: Dimensions.get('window').height * 0.0075
    },
    fillContainer:{
        top: Dimensions.get('window').height * 0.10,
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
    inputText2:{
        borderColor: '#fff',
        color: '#fff',
        fontSize: 25,
        textAlign: 'center',
        color:'white',
        fontFamily: 'Arial',
        padding: 75,
        margin: 5,
        borderWidth: 1,
        borderRadius: 30,
        width: Dimensions.get('window').width * 0.8,
        height: Dimensions.get('window').height * 0.3
    },
});
