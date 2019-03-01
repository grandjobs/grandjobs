import React from 'react';
import { StyleSheet, Text, View, Dimensions, ImageBackground } from 'react-native';
import Button from 'react-native-button'
import {createStackNavigator, createAppNavigator} from 'react-navigation';
import { Actions } from 'react-native-router-flux';
import { Font } from 'expo';


export default class StartPage extends React.Component {
    state = {
        fontLoaded: false,
    };

    async componentWillMount() {
        await Font.loadAsync({
            'Roboto-Thin': require('./assets/fonts/Roboto-Thin.ttf'),
        });
        this.setState({fontLoaded: true});
    }

    render() {
        return (
            this.state.fontLoaded ? (
                <ImageBackground source={require('./assets/Images/city-blur.png')}  style={{width: '100%', height: '100%'}}>
                    <View style={styles.mainContainer}>
                        <View style={styles.textContainer}>
                            <Text style={styles.mainText}>I am looking for...</Text>
                        </View>
                        <View style={styles.buttonContainer}>
                            <Button style={styles.buttonDesign} onPress={()=>this.employerPressed()}>
                            Employees
                            </Button>
                            <Button style={styles.buttonDesign} onPress={()=>this.jobsPressed()}>
                            Jobs
                            </Button>
                        </View>
                    </View>
                </ImageBackground>
            ) : null

        );
    }

    jobsPressed(){
        Actions.TransportType();
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
        // backgroundColor: '#1E2027',
        // justifyContent: 'center'
    },
    textContainer:{
        top: Dimensions.get('window').height * 0.05
    },
    buttonContainer:{
        alignItems: 'center',
        top: (Dimensions.get('window').height * 0.45)
    },
    mainText:{
        fontSize: 50,
        textAlign: 'center',
        top: 20,
        color: '#fff',
        fontFamily: 'Roboto-Thin'
    },
    buttonDesign:{
        fontSize: 25,
        fontWeight: 'normal',
        padding: 10,
        margin: 30,
        width: 300,
        color: '#fff',
        borderRadius: 30,
        borderColor: '#fff',
        borderWidth: 1,
        fontFamily: 'Roboto-Thin'
        // opacity: 10,
        // backgroundColor: 'rgba(18, 18, 18, 0.5)',
    },
});
