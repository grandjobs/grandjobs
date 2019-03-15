import React from 'react';
import { StyleSheet, Text, View, Dimensions, TextInput, Alert } from 'react-native';
import Button from 'react-native-button';
import { Actions } from 'react-native-router-flux'

export default class Employers extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      Email: '',
      companyName: '',
      companyLocation: '',
      Password: '',
      confirmPassword: ''
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
                        onChangeText={(Email) => this.setState({Email})}
                        selectTextOnFocus={true}
                        placeholder='Email Address'
                        placeholderTextColor="#fff"
                    />
                    <TextInput style={styles.inputText}
                        onChangeText={(companyName) => this.setState({companyName})}
                        selectTextOnFocus={true}
                        placeholderTextColor="#fff"
                        placeholder='Company Name'
                    />
                    <TextInput style={styles.inputText}
                        onChangeText={(companyLocation) => this.setState({companyLocation})}
                        selectTextOnFocus={true}
                        placeholderTextColor="#fff"
                        placeholder='Company Location'
                    />
                    <TextInput style={styles.inputText}
                        onChangeText={(Password) => this.setState({Password})}
                        selectTextOnFocus={true}
                        placeholderTextColor="#fff"
                        placeholder='Password'

                    />
                    <TextInput style={styles.inputText}
                        onChangeText={(confirmPassword) => this.setState({confirmPassword})}
                        placeholderTextColor="#fff"
                        selectTextOnFocus={true}
                        placeholder='Confirm Password'
                    />
                    <View style={styles.buttonContainer}>
                    <Button style={styles.buttonDesign} onPress={()=>this.createPressed()}>
                    Create Account
                    </Button>
                    </View>
                </View>
            </View>
        );
    }

    createPressed(){
      console.log(this.state.Password);
      Alert.alert(
        'Confirm Information',
        'Create Account?',
        [
          {text:'OK',onPress:()=>this.checkForm()},
          {text:'Cancel',onPress:()=>console.log('cancel pressed')}
        ]
      )
    }

    checkForm(){
  //     if(this.state.Email != "" && this.state.companyName != "" &&
  //   this.state.companyLocation != "" && this.state.Password != "" &&
  // this.state.confirmPassword != "" && this.state.confirmPassword == this.state.Password){
  //   Actions.EmployerHomepage();
  // }
  if(1==1){
    Actions.EmployerHomepage();
  }
  else{
    Alert.alert(
      'Please fill all forms and make sure both passwords match.'
    )
    console.log("error");
  }
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
        top: Dimensions.get('window').height * 0.09
    },
    fillContainer:{
        top: Dimensions.get('window').height * 0.15,
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
    buttonDesign:{
        fontSize: 20,
        fontWeight: 'normal',
        fontFamily: 'Roboto-Thin',
        padding: 10,
        margin: 30,
        width: 200,
        color: '#fff',
        borderRadius: 30,
        borderColor: '#a9fcd4',
        borderWidth: 1,
    },
});
