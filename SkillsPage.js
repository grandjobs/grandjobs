import React from 'react';
import { StyleSheet, Text, View, Dimensions, TextInput, Picker } from 'react-native';
import Button from 'react-native-button';
// import { TextInput } from 'react-native-paper';
import PhoneInput from 'react-native-phone-input';

export default class AccountSetup extends React.Component {
    state={
        textValue: 'Skill ',
        count: 0,
        prevDisabled: true,
        prevOpacity: 0.5,
        nextDisabled: false,
        nextOpacity: 1.0,
    }

    render() {
        return (
            <View style={styles.mainContainer}>
                <View style={styles.textContainer}>
                    <Text style={styles.largeText}>Your Skills</Text>
                    <Text
                        style={styles.mainText}>
                        Our goal is to find your skills. Select a minimum
                        of X total skills from our list. The more you select the easier
                        it will be for us to find you jobs!
                    </Text>
                    <Button style={styles.mainButtonDesign}>
                    {this.state.textValue} {this.state.count}
                    </Button>

                </View>
                <View style={styles.buttonContainer}>
                    <Button style={[styles.buttonDesign, {opacity: this.state.prevOpacity}]}
                        onPress={()=>this.prevPressed()}
                        disabled={this.state.prevDisabled}>
                        Prev
                    </Button>
                    <Button style={[styles.buttonDesign, {opacity: this.state.nextOpacity}]}
                        onPress={()=>this.nextPressed()}
                        disabled={this.state.nextDisabled}>
                        Next
                    </Button>
                </View>
            </View>
        );
    }

    nextPressed(){
        console.log('Category A.');
        this.setState({
            count: this.state.count + 1,
            prevDisabled: false,
            prevOpacity: 1.0
        })
        if (this.state.count >= 5-1){
            this.setState({
                nextDisabled: true,
                nextOpacity: 0.5
            })
        }
    }

    prevPressed(){
        console.log('Category A.');
        this.setState({
            count: this.state.count - 1,
            nextDisabled: false,
            nextOpacity: 1.0
        })
        if (this.state.count <= 1){
            this.setState({
                prevDisabled: true,
                prevOpacity: 0.5
            })
        }
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#1E2027',
        padding: 20
    },
    textContainer:{
        top: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonContainer:{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    largeText:{
        fontSize: 65,
        textAlign: 'center',
        top: 20,
        color: '#d6d6d6',
        fontFamily: 'sans-serif-thin'
    },
    mainText:{
        fontSize: 18,
        textAlign: 'center',
        top: 20,
        color: '#d6d6d6',
        fontFamily: 'sans-serif-thin'
    },
    mainButtonDesign:{
        fontSize: 35,
        fontFamily: 'sans-serif-thin',
        textAlignVertical: "center",
        height: 200,
        marginTop: 70,
        marginBottom: 20,
        width: 200,
        color: '#fff',
        borderRadius: 200,
        borderColor: '#a9fcd4',
        borderWidth: 1,
    },
    buttonDesign:{
        fontSize: 20,
        fontFamily: 'sans-serif-thin',
        padding: 10,
        width: 80,
        color: '#fff',
        borderRadius: 30,
        borderColor: '#a9fcd4',
        borderWidth: 1,
    },
});
