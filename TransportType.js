import React from 'react';
import { StyleSheet, Text, View, Dimensions, TextInput } from 'react-native';
import Button from 'react-native-button';
import { Actions } from 'react-native-router-flux';

export default class TransportType extends React.Component {
    constructor(props){
        super(props);
    }

    render() {
        return (
            <View style={styles.mainContainer}>
                <View style={styles.textContainer}>
                    <Text style={styles.mainText}>How do you plan on traveling to work?
                    Do you drive a car, or do you use public transportation (walking,
                    biking, bus, etc...)</Text>
                </View>
                {/*Container to hold the two button types */}
                <View style={styles.fillContainer}>
                    <Button style={styles.buttonDesign} onPress={()=>this.carPressed()}>
                    Car
                    </Button>
                    <Button style={styles.buttonDesign} onPress={()=>this.publicPressed()}>
                    Public Transport
                    </Button>
                </View>

            </View>
        );
    }

    //Handle the press for the car.
    carPressed(){
        //Head to the range page marking that the user is non public (travelVal = 0).
        //Also sending the userinfo object.
        Actions.RangePage({
            travelVal: 0,
            userInfo: this.props.userInfo,
        });
    }

    //Handle the press for the public transport.
    publicPressed(){
        //Head to the range page marking that the user is public (travelVal = 1).
        //Also sending the userinfo object.
        Actions.RangePage({
            travelVal: 1,
            userInfo: this.props.userInfo,
        });
    }

}
const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#1E2027',
        padding: 10,
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
    mainText:{
        fontSize: 22,
        textAlign: 'center',
        top: 20,
        color: '#d6d6d6',
        fontFamily: 'Roboto-Thin'
    },
    bottomContainer:{
        flex: 1,
        justifyContent: 'flex-end',
        marginBottom: 0
    },
    buttonDesign:{
        fontSize: 30,
        fontWeight: 'normal',
        fontFamily: 'Roboto-Thin',
        padding: 10,
        margin: 30,
        width: Dimensions.get('window').width * 0.70,
        color: '#fff',
        borderRadius: 30,
        borderColor: '#a9fcd4',
        borderWidth: 1,
    },
});
