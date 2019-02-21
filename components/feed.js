import React, { Component } from 'react';

import {
    StyleSheet,
    Text,
    View,
    Image,
    Button
} from 'react-native';

const Feed = ({ home, index }) => {
    return (
        <View style={styles.home_item}>
            <View style={styles.home_text}>
                <View style={styles.text_container}>
                    {getPretext(home)}
                    <Text style={styles.title}>{home.title}</Text>
                    <Text>{home.summary}</Text>
                </View>
            </View>
            <View style={styles.home_photo}>
                <Image source={home.image} style={styles.photo} />
            </View>
        </View>
    );
}

function getPretext(home) {
    if (home.pretext) {
        return (
            <Text style={styles.pretext}>{home.pretext}</Text>
        );
    }
}

const styles = StyleSheet.create({
    home_item: {
        flex: 1,
        flexDirection: 'row',
        paddingRight: 20,
        paddingLeft: 20,
        paddingTop: 30,
        paddingBottom: 30,
        borderBottomWidth: 1,
        borderBottomColor: '#E4E4E4'
    },
    home_text: {
        flex: 2,
        flexDirection: 'row',
        padding: 10
    },
    pretext: {
        color: '#3F3F3F',
        fontSize: 16
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#000',
    },
    text_container: {
        flex: 3
    },
    home_photo: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    photo: {
        width: 120,
        height: 120
    }

});

export default Feed;