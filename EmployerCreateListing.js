import React from 'react';
import { StyleSheet, Text, View, Dimensions, TextInput, Alert, TouchableOpacity, SafeAreaView } from 'react-native';
import Button from 'react-native-button';
import { Actions } from 'react-native-router-flux'

export default class EmployerCreateListing extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      jobTitle: '',
      jobLocation: '',
      jobDetails: '',
      addtionalDetails: ''
    };
  }

    render() {
        return (
          <SafeAreaView style = {styles.mainContainer}>
            <View style={styles.mainContainer}>
                <View style={styles.textContainer}>
                    <Text style={styles.largeText}>Great!</Text>
                    <Text style={styles.mainText}>Lets create a listing.</Text>
                </View>
                <View style={styles.fillContainer}>
                    {/*// <Text style={{textAlign: 'right', color: 'white'}}>Phone:</Text> */}
                    {/* // <PhoneInput ref='phone' style={styles.inputPhone} textStyle={{fontSize: 18, color:'white', fontFamily: 'sans-serif-thin', }}/>*/}
                    <TextInput style={styles.inputText}
                        onChangeText={(jobTitle) => this.setState({jobTitle})}
                        selectTextOnFocus={true}
                        placeholderTextColor="#fff"
                        placeholder='Job Title'
                    />
                    <TextInput style={styles.inputText}
                        onChangeText={(jobLocation) => this.setState({jobLocation})}
                        selectTextOnFocus={true}
                        placeholderTextColor="#fff"
                        placeholder='Job Location'
                    />
                    <TextInput style={styles.inputText2}
                        onChangeText={(jobDetails) => this.setState({jobDetails})}
                        selectTextOnFocus={true}
                        placeholderTextColor="#fff"
                        placeholder='Job Details'
                        multiline = {true}

                    />
                    <TextInput style={styles.inputText2}
                        onChangeText={(additionalDetails) => this.setState({additionalDetails})}
                        selectTextOnFocus={true}
                        placeholder='Additional Details'
                        placeholderTextColor="#fff"
                        multiline = {true}
                    />
                    <View style={styles.textContainer}>
                    <Button style={styles.buttonDesign} onPress={()=>this.createPressed()}>
                    Create Listing
                    </Button>
                    <Button style={styles.buttonDesign} onPress={()=>this.cancelPressed()}>
                    Cancel
                    </Button>
                    </View>
                </View>
            </View>
            </SafeAreaView>
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

        // justifyContent: 'center'
    },
    textContainer:{
        top: Dimensions.get('window').height * 0.005,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonContainer:{
        alignItems: 'center',
        top: Dimensions.get('window').height * 0.005
    },
    fillContainer:{
        top: Dimensions.get('window').height * 0.05,
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
    buttonDesign:{
        fontSize: 20,
        fontWeight: 'normal',
        fontFamily: 'Roboto-Thin',
        padding: 10,
        margin: 10,
        width: 200,
        color: '#fff',
        borderRadius: 30,
        borderColor: '#a9fcd4',
        borderWidth: 1,
    },
    inputText:{
        borderColor: '#fff',
        color: '#fff',
        fontSize: 25,
        textAlign: 'center',
        color:'white',
        fontFamily: 'Roboto-Thin',
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
        fontFamily: 'Roboto-Thin',
        padding: 65,
        margin: 5,
        borderWidth: 1,
        borderRadius: 30,
        width: Dimensions.get('window').width * 0.8,
        height: Dimensions.get('window').height * 0.18
    },
});
