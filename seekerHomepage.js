import React, { Component } from 'react';

import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    Button
} from 'react-native';

import Feed from './components/Feed';

export default class home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            home_items: [
                {
                    pretext: 'Located 1 mile from you!',
                    title: 'Company X',
                    summary: 'Hiring a full-time game developer',
                    image: require('./assets/Images/Vanamo.png'),
                },
                {
                    pretext: '',
                    title: 'Soda co.',
                    summary: 'Looking for someone to stock vending machines in the Grand Rapids area',
                    image: require('./assets/Images/Fanta.jpg')
                },
                {
                    pretext: 'Matches your skills!',
                    title: 'Coffee co.',
                    summary: 'Hiring a full-time barista',
                    image: require('./assets/Images/coffee.jpg')
                },

            ]
        };
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <View style={styles.header_text}>
                        <Text style={styles.header_text_label}>Activity Feed</Text>
                    </View>
                    <View style={styles.whitespace}></View>
                </View>

                <ScrollView style={styles.home_container}>
                    {this.renderHome()}
                </ScrollView>

            </View>
        );
    }

    renderHome() {
        return this.state.home_items.map((home, index) => {
            return <Feed key={index} index={index} home={home} />
        });
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    header: {
        flexDirection: 'row',
        backgroundColor: '#FFF',
        padding: 20,
        justifyContent: 'space-between',
        borderBottomColor: '#E1E1E1',
        borderBottomWidth: 1
    },
    whitespace: {
        flex: 1
    },
    instruction: {
        alignSelf: 'center',
        marginTop: 5
    },
    header_text: {
        flex: 1,
        alignSelf: 'center'
    },
    header_text_label: {
        fontSize: 20,
        textAlign: 'center'
    },
    home_container: {
        flex: 1,
        flexDirection: 'column'
    },
});
