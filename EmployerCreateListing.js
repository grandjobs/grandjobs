import React from 'react';
import { StyleSheet,ScrollView, Text, View, Dimensions, TextInput, Alert, TouchableOpacity, SafeAreaView, Platform } from 'react-native';
import Button from 'react-native-button';
import { Actions } from 'react-native-router-flux'
import { firebase } from './db'
import Geocode from "react-geocode";
import Swiper from 'react-native-swiper';

export default class EmployerCreateListing extends React.Component {

  constructor(props){
    super(props);


    this.skills = [];
    for (let i = 0; i < 21; i++){
        this.skills.push(new SkillElement("Skill " + i, false, 1));
    }

    //Similar logic for Certifications.
    this.certs = [];
    for (let i = 0; i < 13; i++){
        this.certs.push(new SkillElement("Cert " + i, false, 1));
    }

    //Skills that the user actually selects.
    this.userSkills = [];

    this.state = {
      jobTitle: '',
      jobLocation: '',
      jobDetails: '',
      addtionalDetails: '',
      formType: 'formFill',
      skills: this.skills,
      certs: this.certs,
      userSkills: this.userSkills,
    };

  }

  changeFormFill = () => {
		this.setState({ formType: 'formFill'})
	}

	changeSkillsList = () => {
		this.setState({ formType: 'skillsList'})
	}


    render() {
      if (this.state.formType == 'formFill') {
        return (
          <View style={styles.slide4}>
              <Text style={[styles.largeText, {marginBottom: 20}]}>Create Listing</Text>
              <Text
                  style={styles.mainText}>
                  Please fill out all forms, then advance to the next page.
              </Text>
                <View style={styles.fillContainer}>
                    {/*// <Text style={{textAlign: 'right', color: 'white'}}>Phone:</Text> */}
                    {/* // <PhoneInput ref='phone' style={styles.inputPhone} textStyle={{fontSize: 18, color:'white', fontFamily: 'sans-serif-thin', }}/>*/}
                    <TextInput style={styles.inputText}
                        onChangeText={(jobTitle) => this.setState({jobTitle})}
                        selectTextOnFocus={true}
                        placeholderTextColor="#fff"
                        placeholder='Job Title'
                    />
                    <TextInput style={styles.inputText}
                        onChangeText={(jobLocation) => this.setState({jobLocation})}
                        selectTextOnFocus={true}
                        placeholderTextColor="#fff"
                        placeholder='Job Location'
                    />
                    <TextInput style={styles.inputText2}
                        onChangeText={(jobDetails) => this.setState({jobDetails})}
                        selectTextOnFocus={true}
                        placeholderTextColor="#fff"
                        placeholder='Job Details'
                        multiline = {true}

                    />
                    <TextInput style={styles.inputText2}
                        onChangeText={(additionalDetails) => this.setState({additionalDetails})}
                        selectTextOnFocus={true}
                        placeholder='Additional Details'
                        placeholderTextColor="#fff"
                        multiline = {true}
                    />
                    <View style={styles.fillContainer}>
                    <Button style={styles.buttonDesign} onPress={()=>this.changeSkillsList()}>
                    Choose Skills
                    </Button>
                    <Button style={styles.buttonDesign} onPress={()=>this.cancelPressed()}>
                    Cancel
                    </Button>
                    </View>
                </View>
            </View>

        );
    }
    if(this.state.formType == 'skillsList'){
      return (
          //Wrap the entire page in "Wrapper". This allows for the sliding
          //mechanism throughout the page.
          <Swiper style={styles.wrapper} loop={false}>

              {/*first slide of the wrapper*/}
              <View style={styles.slide2}>
                  <Text style={styles.largeText}>Skills</Text>
                  <View style={styles.labelContainer}>
                  {/*
                  Mapping each item in the loaded list of skills to the
                  labels on the page.
                  */}
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
              {/*second slide of the wrapper*/}
              <View style={styles.slide3}>
                  <Text style={styles.largeText}>Certifications</Text>
                  <View style={styles.labelContainer}>
                  {/*
                  Mapping each item in the loaded list of Certifications to the
                  labels on the page.
                  */}
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
              <View style={styles.slide4}>
                  <Text style={[styles.largeText, {marginBottom: 20}]}>Selected</Text>
                  <Text
                      style={styles.mainText}>
                      These are the currently selected Skills and Certifications. Must choose more than 3.
                  </Text>
                  <View style={styles.labelContainer}>
                  {/*
                  Mapping each item in the list of user selected skills to the
                  labels on the page. (This shrinks and expands as the user
                  selects and deselects labels)
                  */}
                  {
                      this.userSkills.map(( item, key ) =>
                      (
                          <Text
                          key = {key}
                          style = { [styles.label] }>
                          { item.label }
                          </Text>
                      ))
                  }
                  </View>
                  {/*Bottom container that holds the next button. (Also on the
                  last wrapper page)*/}
                  <View style={styles.bottomContainer}>
                  <Button style={styles.buttonDesign} onPress={()=>this.checkListingForm()}>
                  Create Listing
                  </Button>
                  <Button style={styles.buttonDesign} onPress={()=>this.changeFormFill()}>
                  Back
                  </Button>
                  </View>
              </View>
          </Swiper>
      );

    }


  }


    cancelPressed(){
      Alert.alert(
        'Cancel',
        'Cancel Listing?',
        [
          {text:'OK',onPress:()=>Actions.EmployerHomepage({uid: this.props.uid})},
          {text:'Cancel',onPress:()=>console.log('cancel pressed')}
        ]
      )
    }

    checkListingForm(){

       let skillsArray = [];
      // this.userSkills.map(( item, key ) =>
      // (
      //   key = {key};
      //   skillsArray.push(item.label);
      // ))
      //
      //
      // console.log(skillsArray);

      Object.keys(this.state.userSkills).forEach(key=>{

        skillsArray.push(this.state.userSkills[key].label);

      })
//      console.log(skillsArray);


      if (this.state.jobTitle != "" && this.state.jobLocation != "" && this.state.jobDetails != "" && this.state.JobAddtionalDetails != "" && skillsArray.length > 2) {

        Geocode.setApiKey('******************');
        var lat;
        var lng;
        Geocode.fromAddress(this.state.jobLocation).then(
          response => {
            const { lat, lng } = response.results[0].geometry.location;
            console.log(lat, lng);
            let rootRef = firebase.database().ref()

            let employerRef = rootRef.child('EMPLOYERS').child(this.props.uid).child('JOBS').push().set({
              'JobTitle' : this.state.jobTitle,
              'JobLocation' : this.state.jobLocation,
              'JobDetails' : this.state.jobDetails,
              'JobAddtionalDetails' : this.state.additionalDetails,
              'Coordinate_LAT' : lat,
              'Coordinate_LNG' : lng,
              'Skills': skillsArray,
            })
          },
          error => {
            console.error(error);
          }
        );

		Actions.EmployerHomepage({uid: this.props.uid});
	}

       else{
        Alert.alert(
          'Please fill all forms.'
        )
        console.log("error");
      }
    }

    createPressed(){
      Alert.alert(
			'Confirm Information',
			'Create Listing?',
			[
				{text:'OK',onPress:()=>this.checkListingForm()},
				{text:'Cancel',onPress:()=>console.log('cancel pressed')}
			]
		)
    }

    labelSelected(type, i){
        switch(type){
            case 0:
                //Modify the state of the selected item based on if it is selected or not...
                if (!this.skills[i].isSelected){
                    this.skills[i].opacity = 0.4;
                    this.skills[i].isSelected = true;
                    this.userSkills.push(this.skills[i]);
                }
                else{
                    this.skills[i].opacity = 1;
                    this.skills[i].isSelected = false;
                    this.removeUserLabel(this.skills[i].label);
                }
                break;
            case 1:
                //Modify the state of the selected item based on if it is selected or not...
                if (!this.certs[i].isSelected){
                    this.certs[i].opacity = 0.4;
                    this.certs[i].isSelected = true;
                    this.userSkills.push(this.certs[i]);
                }
                else{
                    this.certs[i].opacity = 1;
                    this.certs[i].isSelected = false;
                    this.removeUserLabel(this.certs[i].label);
                }
                break;
        }

        this.updateState();
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
    updateState(){
        this.setState({
            skills: this.skills,
            certs: this.certs,
            userSkills: this.userSkills,
        })
    }

    /**
     * Search for the label to remove if unselected.
     * @param  {String} l Label name to remove.
     */
    removeUserLabel(l){
        for (var i = 0; i < this.userSkills.length; i++){
            if (this.userSkills[i].label.localeCompare(l) == 0){
                this.userSkills.splice(i, 1);
                break;
            }
        }
        this.updateState();
    }


    //Update the userInfo object with the skills/certs that the user selected.
    setInfoObj(){
        for (var i = 0; i < this.userSkills.length; i++){
            this.props.userInfo.skills.push(this.userSkills[i].label);
        }
    }

}

const styles = StyleSheet.create({
    mainContainer: {
        paddingTop: Platform.OS === 'android' ? 25 : 0,
        flex: 1,
        backgroundColor: '#1E2027',

        // justifyContent: 'center'
    },
    textContainer:{
        top: Dimensions.get('window').height * 0.005,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonContainer:{
        alignItems: 'center',
        top: Dimensions.get('window').height * 0.005
    },
    fillContainer:{
        top: Dimensions.get('window').height * 0.05,
        justifyContent: 'center',
        alignItems: 'center',
    },
    largeText:{
        fontSize: 65,
        textAlign: 'center',
        top: 20,
        color: '#d6d6d6',
        fontFamily: 'Roboto-Thin'
    },
    mainText:{
        fontSize: 25,
        textAlign: 'center',
        top: 20,
        color: '#d6d6d6',
        fontFamily: 'Roboto-Thin'
    },
    buttonDesign:{
        fontSize: 20,
        fontWeight: 'normal',
        fontFamily: 'Roboto-Thin',
        padding: 10,
        margin: 10,
        width: 200,
        color: '#fff',
        borderRadius: 30,
        borderColor: '#a9fcd4',
        borderWidth: 1,
    },
    inputText:{
        borderColor: '#fff',
        color: '#fff',
        fontSize: 25,
        textAlign: 'center',
        color:'white',
        fontFamily: 'Roboto-Thin',
        padding: 13,
        margin: 5,
        borderWidth: 1,
        borderRadius: 30,
        width: Dimensions.get('window').width * 0.8
    },
    inputText2:{
        borderColor: '#fff',
        color: '#fff',
        fontSize: 25,
        textAlignVertical: 'top',
        textAlign: 'center',
        color:'white',
        fontFamily: 'Roboto-Thin',
        padding: 65,
        margin: 5,
        borderWidth: 1,
        borderRadius: 30,
        width: Dimensions.get('window').width * 0.8,
        height: Dimensions.get('window').height * 0.18
    },
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
        padding: 10
    },
    slide2: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#1E2027',
        padding: 10

    },
    slide3: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#1E2027',
        padding: 10

    },
    slide4: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#1E2027',
        padding: 10
    },
    label:{
        fontSize: 22,
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
    bottomContainer:{
        flex: 1,
        justifyContent: 'flex-end',
        marginBottom: 10
    },
});

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
