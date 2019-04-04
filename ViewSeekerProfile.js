import React from 'react';
import { StyleSheet, Text, View, Dimensions,ScrollView, TextInput, Alert, TouchableOpacity, SafeAreaView, Platform } from 'react-native';
import Button from 'react-native-button';
import { Actions } from 'react-native-router-flux'
import { firebase } from './db'

export default class ViewSeekerProfile extends React.Component {

  constructor(props){
    super(props);

  }

    render() {
        return (
          <ScrollView style = {styles.mainContainer}>
            <View style={styles.mainContainer}>
                <View style={styles.textContainer}>
                <Text style={styles.largeText}>Tom</Text>
                <Text style={styles.mainText}>Professor</Text>
                </View>
                <View style={styles.textContainer}>
                <Text style={styles.descriptionText}>          </Text>
                <Text style={styles.mainText}>Phone:</Text>
                <Text style={styles.descriptionText}>          </Text>
                <Text style={styles.descriptionText}>616-999-9999</Text>
                <Text style={styles.descriptionText}>          </Text>
                <Text style={styles.mainText}>Qualifications</Text>
                <Text style={styles.descriptionText}>          </Text>
                <Text style={styles.descriptionText}> Master's Degree in Mathematics</Text>
                <Text style={styles.descriptionText}>          </Text>
                <Text style={styles.mainText}>Skills</Text>
                <Text style={styles.descriptionText}>          </Text>
                <View style={styles.buttonRowContainer}>
                <Button style={styles.buttonDesign} onPress={console.log("hello")}>
                Skill 1
                </Button>
                <Button style={styles.buttonDesign} onPress={console.log("hello")}>
                Skill 2
                </Button>
                </View>
                <View style = {styles.buttonRowContainer}>
                <Button style={styles.buttonDesign} onPress={console.log("hello")}>
                Skill 3
                </Button>
                <Button style={styles.buttonDesign} onPress={console.log("hello")}>
                Skill 4
                </Button>
                </View>
                </View>
                <View style={styles.fillContainer}>

                    <Button style={styles.buttonDesign} onPress={()=>this.contactPressed()}>
                    Contact
                    </Button>
                    <Button style={styles.buttonDesign} onPress={()=>this.cancelPressed()}>
                    Cancel
                    </Button>

                </View>
            </View>
            </ScrollView>
        );
    }

    cancelPressed(){
      Actions.EmployerSideReplies();

    }
    contactPressed(){
      Actions.EmployerSideReplies();
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        paddingTop: Platform.OS === 'android' ? 25 : 0,
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
    buttonRowContainer:{
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between'
    },
    fillContainer:{
        top: Dimensions.get('window').height * 0.05,
        justifyContent: 'center',
        alignItems: 'center'
    },
    bottomContainer:{
        flex: 1,
        justifyContent: 'flex-end',
        marginBottom: 0
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
        color: '#a9fcd4',
        fontFamily: 'Roboto-Thin'
    },
    descriptionText:{
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
        textAlignVertical: 'top',
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
