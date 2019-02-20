import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Dimensions
} from 'react-native';

import Swiper from 'react-native-swiper';

export default class TempSkillsPage extends Component {

    constructor(){
        super();
        /**
         * The items array is populated with the list of skills.
         * The state of these skills is also populated in the array.
         * Basic array construction:
         *
         * { [SkillLabel, selectedBoolean, opacity], ... }
         */
        this.skills = [];
        for (let i = 0; i < 25; i++){
            this.skills.push(new SkillElement("Skill " + i, false, 1));
        }

        this.certs = [];
        for (let i = 0; i < 13; i++){
            this.certs.push(new SkillElement("Cert " + i, false, 1));
        }

        /* This is for modifying the contents of the text elements on the screen.
        Basically just feedback for the user when clicked.
         */
        this.state={
            skills: this.skills,
            certs: this.certs,
        }
    }

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
                    {
                        this.skills.map(( item, key ) =>
                        (
                            <Text
                            onPress={() => this.labelSelected(0, key)}
                            key = {key}
                            style = { [styles.label, { opacity: this.state.skills[key].opacity } ] }>
                            { item.label }
                            </Text>
                        ))
                    }
                    </View>
                </View>
                <View style={styles.slide3}>
                    <Text style={styles.largeText}>Certifications</Text>
                    <View style={styles.labelContainer}>
                    {
                        this.certs.map(( item, key ) =>
                        (
                            <Text
                            onPress={() => this.labelSelected(1, key)}
                            key = {key}
                            style = { [styles.label, { opacity: this.state.certs[key].opacity } ] }>
                            { item.label }
                            </Text>
                        ))
                    }
                    </View>
                </View>
            </Swiper>
        );
    }

    /**
     * [labelSelected description]
     * @param  {[type]} type  Type of label selected
     *                        0 --> Skill
     *                        1 --> Cert
     *                        2 --> ???
     *
     * @param  {[type]} i index of the selected label
     */
    labelSelected(type, i){
        switch(type){
            case 0:
                //Modify the state of the selected item based on if it is selected or not...
                if (!this.skills[i].isSelected){
                    this.skills[i].opacity = 0.4;
                    this.skills[i].isSelected = true;
                }
                else{
                    this.skills[i].opacity = 1;
                    this.skills[i].isSelected = false;
                }
                break;
            case 1:
                //Modify the state of the selected item based on if it is selected or not...
                if (!this.certs[i].isSelected){
                    this.certs[i].opacity = 0.4;
                    this.certs[i].isSelected = true;
                }
                else{
                    this.certs[i].opacity = 1;
                    this.certs[i].isSelected = false;
                }
                break;
        }

        /**
         * Set the state to the newly updated list.
         *
         * (Apparently this is the proper way to do this. I guess you're not
         * allowed to modify the index of the state, so you have to reset the entire
         * variable)
         *
         * https://reactjs.org/docs/react-component.html#state
         * https://stackoverflow.com/questions/42029477/how-to-update-array-state-in-react-native/42029551
         */
        this.setState({
            skills: this.skills,
            certs: this.certs

        })
    }
}

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

AppRegistry.registerComponent('grandjobs', () => Swiper);

/**
 * Class for storing text element attributes.
 */
class SkillElement{
    /**
     * Constructor for the SkillElement class
     * @param {[type]}  text        Text of the label
     * @param {Boolean} isSelected  Is this label selected by the user?
     * @param {[type]}  opacity     Opacity of this label (lowered when selected)
     */
  constructor(text, isSelected, opacity) {
    this.label = text;
    this.isSelected = isSelected;
    this.opacity = opacity;
  }
}
