import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, Dimensions } from 'react-native';
import MapView from 'react-native-maps';


export default class TempSkillsPage extends Component {

    render(){
        return (
            <MapView
            style={{flex: 1}}
            region={{
                latitude: 42.9634,
                longitude: -85.6681,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421
            }}
            />
        );
    }
}
