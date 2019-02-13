import React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import Button from 'react-native-button'
import {createStackNavigator, createAppNavigator} from 'react-navigation';
import { Actions } from 'react-native-router-flux'

export default class StartPage extends React.Component {

    render() {
        return (
            <View style={styles.mainContainer}>
                <View style={styles.textContainer}>
                    <Text style={styles.mainText}>I am looking for...</Text>
                </View>
                <View style={styles.buttonContainer}>
                    <Button style={styles.buttonDesign} onPress={()=>this.employerPressed()}>
                    Employers
                    </Button>
                    <Button style={styles.buttonDesign} onPress={()=>this.jobsPressed()}>
                    Jobs
                    </Button>
                </View>
            </View>
        );
    }


    jobsPressed(){
        Actions.AccountSetup();
    }

    employerPressed(){
        Actions.Employers();
    }
}

// const AppNavigator = createStackNavigator(
//   {
//     Home: HomeScreen,
//     Details: DetailsScreen
//   },
//   {
//     initialRouteName: "Home"
//   }
// );

// export default createAppContainer(AppNavigator);

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#1E2027',
        // justifyContent: 'center'
    },
    textContainer:{
        top: Dimensions.get('window').height * 0.05
    },
    buttonContainer:{
        alignItems: 'center',
        top: (Dimensions.get('window').height * 0.3)
    },
    mainText:{
        fontSize: 50,
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
});
