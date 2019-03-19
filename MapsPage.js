import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, Dimensions } from 'react-native';
import MapView, { Marker, CallOut } from 'react-native-maps';
import Button from 'react-native-button';
import { Actions } from 'react-native-router-flux';


export default class TempSkillsPage extends Component {

    constructor(props){
        super(props);

        this.state = {
            markerLat: 0,
            markerLong: 0,
            disable: true,
            opac: 0,
        }
    }

    handlePress(e){
        this.setState({
            markerLat: e.nativeEvent.coordinate.latitude,
            markerLong: e.nativeEvent.coordinate.longitude,
            disable: false,
            opac: 1,
        })
    }

    nextPressed(){
        this.props.userInfo.homeLat = this.state.markerLat;
        this.props.userInfo.homeLong = this.state.markerLong;
        Actions.TransportType({userInfo: this.props.userInfo});
    }

    render(){
        return (
            <View style={styles.mainContainer}>
                <Text style={styles.largeText}>Location</Text>

                <Text style={styles.mainText}>
                Next, we will need a home address so we know how close you are to
                available jobs. If you don't want to share your home address,
                you can also drop a pin in the map below to an area near your house.
                </Text>

                <View style={styles.bottomContainer}>
                    <MapView
                        style={styles.mapStyle}
                        region={{
                            latitude: 42.9634,
                            longitude: -85.6681,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421
                        }}
                        onPress={e => this.handlePress(e)}
                        >
                        <Marker coordinate={{latitude: this.state.markerLat, longitude: this.state.markerLong}}/>
                    </MapView>

                    <Button style={[styles.buttonDesign, {opacity: this.state.opac}]}
                    disabled={this.state.disable}
                    onPress={()=>this.nextPressed()}>
                    Next
                    </Button>
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
        justifyContent: 'center',
        overflow: 'hidden',

        alignItems: 'center'
    },
    mapStyle:{
        height: Dimensions.get('window').height * 0.50,
        width: Dimensions.get('window').width * 0.90,
        margin: 10
    },
    largeText:{
        fontSize: 65,
        textAlign: 'center',
        top: 20,
        color: '#d6d6d6',
        fontFamily: 'Roboto-Thin'
    },
    mainText:{
        fontSize: 18,
        textAlign: 'center',
        top: 20,
        color: '#d6d6d6',
        fontFamily: 'Roboto-Thin',
        margin: 10
    },
    bottomContainer:{
        flex: 1,
        justifyContent: 'flex-end',
        marginBottom: Dimensions.get('window').width * 0.05,
        alignItems: 'center',
    },
    buttonDesign:{
        fontSize: 20,
        fontWeight: 'normal',
        fontFamily: 'Roboto-Thin',
        padding: 10,
        margin: 30,
        width: 150,
        color: '#fff',
        borderRadius: 30,
        borderColor: '#a9fcd4',
        borderWidth: 1,
    },
});
