import React, { Component } from 'react'
import { AppRegistry, StyleSheet, Text, View } from 'react-native'
import Button from 'react-native-button'
import Swiper from 'react-native-swiper'
import { Actions } from 'react-native-router-flux'

export default class BusOptions extends Component {

    constructor(props){
        super(props);
        /**
         * Populate the bus routes array with appropriate routes.
         *
         * { [SkillLabel, selectedBoolean, opacity], ... }
         */
        this.busList = [];
        for (var i = 1; i < 20; i++){
            this.busList.push(new BusElement(i + "", false, 1));
        }
        this.busList.push(new BusElement("24", false, 1));
        this.busList.push(new BusElement("28", false, 1));
        this.busList.push(new BusElement("37", false, 1));
        this.busList.push(new BusElement("44", false, 1));
        this.busList.push(new BusElement("48", false, 1));
        this.busList.push(new BusElement("50", false, 1));
        this.busList.push(new BusElement("60", false, 1));


        //Routes that the user actually selects.
        this.userList= [];

        //State to hold the user and bus list.
        this.state={
            busList: this.busList,
            userList: this.userList,
        }

        this.buttonText = "Next";
        if(props.editing){
            this.buttonText = "Confirm";
        }
    }

    /**
     * Used for when the user goes back to edit the bus information. Wait for the
     * component to mount and then auto select the routes that they already have
     * selected.
     * @return {Promise} [description]
     */
    async componentDidMount() {
        this.busAccessCopy = this.props.userInfo.busAccess;
        this.props.userInfo.busAccess = [];
        this.selectUserLabels();
    }

    render(){
        return (
            <View style={styles.mainContainer}>
                <Text style={styles.largeText}>Bus Lines</Text>
                <Text style={styles.mainText}>Please select what bus lines
                you have access to (if any).</Text>

                <View style={styles.labelContainer}>
                {
                    this.busList.map(( item, key ) =>
                    (
                        <Text
                        onPress={() => this.labelSelected(key)}
                        key = {key}
                        style = { [styles.label, { opacity: this.state.busList[key].opacity } ] }>
                        { item.label }
                        </Text>
                    ))
                }
                </View>

                <View style={styles.bottomContainer}>
                    <Button style={styles.buttonDesign} onPress={()=>this.nextPressed()}>
                    {this.buttonText}
                    </Button>
                </View>
            </View>
        );
    }

    /**
     * Modify the visuals of the label that is selected at index i.
     *
     * @param  {[type]} i index of the selected label
     */
    labelSelected(i){
        //Modify the state of the selected item based on if it is selected or not...
        if (!this.busList[i].isSelected){
            this.busList[i].opacity = 0.4;
            this.busList[i].isSelected = true;
            this.userList.push(this.busList[i]);
        }
        else{
            this.busList[i].opacity = 1;
            this.busList[i].isSelected = false;
            this.removeUserLabel(this.busList[i].label);
        }

        this.updateState();
    }

    /**
     * Set the state to the newly updated list.
     *
     * https://reactjs.org/docs/react-component.html#state
     * https://stackoverflow.com/questions/42029477/how-to-update-array-state-in-react-native/42029551
     */
    updateState(){
        this.setState({
            busList: this.busList,
            userList: this.userList,
        })
    }

    /**
     * Remove the label from the userlist that the user selects.
     * @param  {[type]} l label content
     */
    removeUserLabel(l){
        for (var i = 0; i < this.userList.length; i++){
            if (this.userList[i].label.localeCompare(l) == 0){
                this.userList.splice(i, 1);
                break;
            }
        }
        //Update the state after the label has been remvoed from the list.
        this.updateState();
    }

    /**
     * Auto select labels for the user (Used for when the user goes back to edit).
     */
    selectUserLabels(){
        for (var i = 0; i < this.busAccessCopy.length; i++){
            this.labelSelected(this.getLabelIndex(this.busAccessCopy[i]));
        }
    }

    /**
     * Get the index in the list that some label is sitting at
     * @param  {[type]} l Label value to search for.
     * @return {[type]}   index of where the label sits at.
     */
    getLabelIndex(l){
        for (var i = 0; i < this.busList.length; i++){
            if (this.busList[i].label.localeCompare(l) == 0){
                console.log(i);
                return i;
            }
        }
    }

    /**
     * Handle the press of the next button.
     */
    nextPressed(){
        //Update the state of the userinfo object.
        this.setInfoObj();
        Actions.AdditionalInfo({userInfo: this.props.userInfo});
    }

    /**
     * Update the user info object with the selected bus values.
     */
    setInfoObj(){
        for (var i = 0; i < this.userList.length; i++){
            this.props.userInfo.busAccess.push(this.userList[i].label);
        }
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#1E2027',
        padding: 10

    },
    labelContainer:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
    },
    label:{
        fontSize: 25,
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
        marginBottom: 30,
        color: '#d6d6d6',
        fontFamily: 'Roboto-Thin'
    },
    mainText:{
        fontSize: 18,
        textAlign: 'center',
        color: '#d6d6d6',
        fontFamily: 'Roboto-Thin'
    },
    bottomContainer:{
        flex: 1,
        justifyContent: 'flex-end',
        marginBottom: 10
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
})

AppRegistry.registerComponent('grandjobs', () => Swiper);

/**
 * Class for storing text element attributes.
 */
class BusElement{
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
