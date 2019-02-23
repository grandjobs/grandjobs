import React from 'react';
import { StyleSheet, Text, View, Dimensions, TextInput, Alert } from 'react-native';
import Button from 'react-native-button';
// import { TextInput } from 'react-native-paper';
import PhoneInput from 'react-native-phone-input';
import { Actions } from 'react-native-router-flux'


export default class SideMenu extends React.Component {
    constructor(props) {
        super(props);

    };

    render() {
        return (
            <View style={styles.container}>
                <Text>menu items go here</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'stretch',
        backgroundColor: '#F5FCFF',
        paddingRight: 20,
        paddingLeft: 20,
        paddingBottom: 10,
    },

});
