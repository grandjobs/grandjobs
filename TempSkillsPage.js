import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Dimensions
} from 'react-native';

import Swiper from 'react-native-swiper';

const styles = StyleSheet.create({
    labelContainer:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
    },
    wrapper: {
    },
    slide1: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1E2027',
    },
    slide2: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#1E2027',
    },
    slide3: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#1E2027',
    },
    label:{
        fontSize: 20,
        textAlign: 'center',
        color: '#d6d6d6',
        fontFamily: 'Roboto-Thin',
        borderWidth: 1,
        borderColor: '#a9fcd4',
        borderRadius: 30,
        marginTop: 25,
        marginHorizontal: 5,
        paddingHorizontal: 20,
    },
    largeText:{
        fontSize: 65,
        textAlign: 'center',
        top: 30,
        marginBottom: 60,
        color: '#d6d6d6',
        fontFamily: 'Roboto-Thin'
    },
    mainText:{
        fontSize: 18,
        textAlign: 'center',
        top: 0,
        color: '#d6d6d6',
        fontFamily: 'Roboto-Thin'
    },
})

export default class TempSkillsPage extends Component {
    render(){
        return (
            <Swiper style={styles.wrapper} loop={false}>
                <View style={styles.slide1}>
                    <Text style={[styles.largeText, {top:0, marginBottom: 0}]}>Your Skills</Text>
                    <Text
                        style={styles.mainText}>
                        Our goal is to find your skills. Select a minimum
                        of 4 total skills from our list. The more you select the easier
                        it will be for us to find you jobs!
                    </Text>
                </View>
                <View style={styles.slide2}>
                    <Text style={styles.largeText}>Skills</Text>
                    <View style={styles.labelContainer}>
                        <Text style={styles.label}>Plumbing</Text>
                        <Text style={styles.label}>Focused</Text>
                        <Text style={styles.label}>Organized</Text>
                        <Text style={styles.label}>Public Speaking</Text>
                        <Text style={styles.label}>Travel</Text>
                        <Text style={styles.label}>Technoloy</Text>
                        <Text style={styles.label}>Programming</Text>
                        <Text style={styles.label}>Flexible Hours</Text>
                    </View>
                </View>
                <View style={styles.slide3}>
                    <Text style={styles.largeText}>Certifications</Text>
                </View>
            </Swiper>
        );
    }
}

AppRegistry.registerComponent('grandjobs', () => Swiper);
