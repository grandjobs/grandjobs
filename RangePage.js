import React from 'react'
import { StyleSheet, Text, View, Dimensions, Slider } from 'react-native'
import Button from 'react-native-button'
import { Actions } from 'react-native-router-flux'

export default class Range extends React.Component {

    constructor(props) {
        super(props);

        //State to hold the range of the user (default to 15)
        this.state = {
            range: 15
        }
    }

    render() {
        return (
            <View style={styles.mainContainer}>
                <View style={styles.textContainer}>
                    <Text style={styles.mainText}>
                    How far are you willing to be from your home? (In miles)
                    </Text>
                </View>

                {/*Container to hold the slider*/}
                <View style={styles.sliderContainer}>
                    {/*Text to display the current user selected range.*/}
                    <Text style={styles.largeText}>
                    {this.state.range}
                    </Text>
                    {/*Slider for the user to adjust.*/}
                    <Slider style={styles.sliderStyle}
                        step={1}
                        minimumValue={1}
                        maximumValue={50}
                        value={this.state.range}
                        onValueChange={val => this.setState({ range: val })}
                        onSlidingComplete={ val => console.log(this.state.range)}
                    />
                </View>

                {/*Container to hold the button to the bottom of the screen*/}
                <View style={styles.bottomContainer}>
                    <Button style={styles.buttonDesign} onPress={()=>this.nextPressed()}>
                    Next
                    </Button>
                </View>

            </View>
        );
    }

    //Handle the press of the next button
    nextPressed(){
        //Grab the users desired range.
        this.props.userInfo.homeRange = this.state.range;

        //Car/Private Transportation
        if (this.props.travelVal == 0){
            this.props.userInfo.travelType = 'Car'
            Actions.AdditionalInfo({userInfo: this.props.userInfo})
        }
        //Public Transportation
        else if (this.props.travelVal == 1){
            this.props.userInfo.travelType = 'Bus'
            Actions.BusPage({userInfo: this.props.userInfo})
        }
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
        top: Dimensions.get('window').height * 0.05,
    },
    fillContainer:{
        justifyContent: 'center',
        alignItems: 'center'
    },
    mainText:{
        fontSize: 25,
        textAlign: 'center',
        margin: 10,
        color: '#d6d6d6',
        fontFamily: 'Roboto-Thin'
    },
    largeText:{
        fontSize: 80,
        textAlign: 'center',
        color: '#d6d6d6',
        fontFamily: 'Roboto-Thin',
        marginBottom: 100,
    },
    milesContainer:{
        flexDirection: 'row'
    },
    bottomContainer:{
        flex: 1,
        justifyContent: 'flex-end',
        marginBottom: 0
    },
    sliderContainer:{
        flex: 1,
        margin: 30,
        justifyContent: 'center'
    },
    sliderStyle:{
        width: Dimensions.get('window').height * 0.40,
    },
    buttonDesign:{
        fontSize: 20,
        fontWeight: 'normal',
        fontFamily: 'Roboto-Thin',
        padding: 10,
        margin: 30,
        width: Dimensions.get('window').width * 0.65,
        color: '#fff',
        borderRadius: 30,
        borderColor: '#a9fcd4',
        borderWidth: 1,
    },
});
