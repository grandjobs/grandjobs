import React from 'react';
import { StyleSheet,ScrollView, Text, View, Dimensions, TextInput, Alert, TouchableOpacity, SafeAreaView, Platform } from 'react-native';
import Button from 'react-native-button';
import { Actions } from 'react-native-router-flux'
import { firebase } from './db'
import Geocode from "react-geocode";
import Swiper from 'react-native-swiper';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import MapView, { Marker, CallOut } from 'react-native-maps';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

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
    let jobDetailsArray = [];
    let lat = "";
    let lng = "";

    this.state = {
      jobTitle: '',
      jobLocation: '',
      jobDetails: '',
      skills: this.skills,
      certs: this.certs,
      userSkills: this.userSkills,


      jobDetails_1: '',
      jobDetails_2: '',
      jobDetails_3: '',
      jobDetails_4: '',
      jobDetails_5: '',
      jobDetails_6: '',
      jobDetails_7: '',
      jobDetails_8: '',
    };

  }


    render() {
      lat = "";
      lng = "";

        return (
            //Wrap the entire page in "Wrapper". This allows for the sliding
            //mechanism throughout the page.
            <Swiper style={styles.wrapper} loop={false}>

                {/*first slide of the wrapper*/}
                <View style={styles.slide1_formFill}>
                    <Text style={styles.largeText}>Basic Information</Text>
                    <Text style={styles.mainText}>Let's start by giving basic information about your company.</Text>
                    <View style={styles.fillContainer}>

                    <TextInput style={styles.inputText}
                    onChangeText={(jobTitle) => this.setState({jobTitle})}
                    selectTextOnFocus={true}
                    placeholderTextColor="#fff"
                    placeholder='Job Title'
                    />
                    <GooglePlacesAutocomplete
                    ref={(instance) => { this.GooglePlacesRef = instance }}
                    placeholder='Address'
                    minLength={2} // minimum length of text to search
                    autoFocus={false}
                    returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
                    keyboardAppearance={'light'} // Can be left out for default keyboardAppearance https://facebook.github.io/react-native/docs/textinput.html#keyboardappearance
                    listViewDisplayed='auto'    // true/false/undefined
                    fetchDetails={true}
                    renderDescription={row => row.description} // custom description render
                    onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
                    this.setLatLong(details);}}

                    query={{
                      // available options: https://developers.google.com/places/web-service/autocomplete
                      key: 'AIzaSyARMQhGlo4u3NMTNXhcY_Q6FGzAJf01q6Y',
                      language: 'en', // language of the results
                      types: 'geocode' // default: 'geocode'
                    }}
                    styles={{
                      textInputContainer: {
                        backgroundColor: 'transparent',
                        borderWidth: 0,
                        width: '100%',
                        height: 60,
                        borderTopWidth: 0,
                        borderBottomWidth:0,
                      },
                      textInput:{
                        textAlign: 'center',
                        borderColor: '#fff',
                        color: '#fff',
                        fontSize: 23,
                        textAlign: 'center',
                        color:'white',
                        fontFamily: 'Roboto-Thin',
                        padding: 10,
                        margin: 20,
                        borderWidth: 1,
                        borderRadius: 30,
                        backgroundColor: 'transparent',
                        height: 60,
                        width: Dimensions.get('window').width * .9,
                      },
                      description: {
                        fontSize: 16,
                        textAlign: 'center',
                        color: '#fff',
                        fontFamily: 'Roboto-Thin',
                        alignItems: 'center',
                        width: '100%',
                      },
                      poweredContainer:{
                        backgroundColor: 'transparent',
                      }
                    }}
                    nearbyPlacesAPI='GooglePlacesSearch' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
                    GooglePlacesSearchQuery={{
                      // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
                      rankby: 'distance',
                      type: 'cafe'
                    }}
                    GooglePlacesDetailsQuery={{
                      // available options for GooglePlacesDetails API : https://developers.google.com/places/web-service/details
                      fields: 'formatted_address',
                    }}
                    filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities

                    debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
                    />

                    </View>

                    </View>
                {/*second slide of the wrapper*/}


                <View style={styles.slide2_formFill}>
                <ScrollView>
                    <Text style={styles.largeText}>Job Details</Text>
                    <Text style={styles.mainText}>Bulleted list of details. Please fill out at least three fields.</Text>

                    <View style={styles.fillContainer}>
                    <KeyboardAwareScrollView>

                    <TextInput style={styles.inputText}
                    onChangeText={(jobDetails_1) => this.setState({jobDetails_1})}
                    selectTextOnFocus={true}
                    placeholderTextColor="#fff"
                    placeholder='Job Detail (1)'
                    multiline = {true}
                    />
                    <TextInput style={styles.inputText}
                    onChangeText={(jobDetails_2) => this.setState({jobDetails_2})}
                    selectTextOnFocus={true}
                    placeholderTextColor="#fff"
                    placeholder='Job Details (2)'
                    multiline = {true}
                    />
                    <TextInput style={styles.inputText}
                    onChangeText={(jobDetails_3) => this.setState({jobDetails_3})}
                    selectTextOnFocus={true}
                    placeholderTextColor="#fff"
                    placeholder='Job Details (3)'
                    multiline = {true}
                    />
                    <TextInput style={styles.inputText}
                    onChangeText={(jobDetails_4) => this.setState({jobDetails_4})}
                    selectTextOnFocus={true}
                    placeholderTextColor="#fff"
                    placeholder='Job Details (4)'
                    multiline = {true}
                    />
                    <TextInput style={styles.inputText}
                    onChangeText={(jobDetails_5) => this.setState({jobDetails_5})}
                    selectTextOnFocus={true}
                    placeholderTextColor="#fff"
                    placeholder='Job Details (5)'
                    multiline = {true}
                    />
                    <TextInput style={styles.inputText}
                    onChangeText={(jobDetails_6) => this.setState({jobDetails_6})}
                    selectTextOnFocus={true}
                    placeholderTextColor="#fff"
                    placeholder='Job Details (6)'
                    multiline = {true}
                    />
                    <TextInput style={styles.inputText}
                    onChangeText={(jobDetails_7) => this.setState({jobDetails_7})}
                    selectTextOnFocus={true}
                    placeholderTextColor="#fff"
                    placeholder='Job Details (7)'
                    multiline = {true}
                    />
                    <TextInput style={styles.inputText}
                    onChangeText={(jobDetails_8) => this.setState({jobDetails_8})}
                    selectTextOnFocus={true}
                    placeholderTextColor="#fff"
                    placeholder='Job Details (8)'
                    multiline = {true}
                    />
                    </KeyboardAwareScrollView>
                    </View>

                </ScrollView>
                </View>



                <View style={styles.slide1_Skills}>
                {this.makeDetailArray()}
                    <Text style={styles.largeText}>Skills</Text>
                    <Text style={styles.mainText}>Must choose 3 or more skills.</Text>
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

                    <View style={styles.bottomContainer}>
                    <Button style={styles.buttonDesign} onPress={()=>this.cancelPressed()}>
                    Cancel
                    </Button>
                    </View>

                </View>
                {/*second slide of the wrapper*/}
                <View style={styles.slide2_Skills}>
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

                    <View style={styles.bottomContainer}>
                    <Button style={styles.buttonDesign} onPress={()=>this.cancelPressed()}>
                    Cancel
                    </Button>
                    </View>

                </View>

                <View style={styles.slide4_Skills}>
                <View style={listing_style.mainContainer}>
                    <Text style={listing_style.largeText}>{global.companyTitle}</Text>
                    <Text style={listing_style.mainText}>{this.state.JobTitle}</Text>
                    {/*Main ScrollView for the jobs*/}
                    <ScrollView style={listing_style.infoContainer}>
                        {/*Map the description of the jobs to the text.*/}
                        <Text style={listing_style.sectionText}>Job Description</Text>
                        {


                            jobDetailsArray.map(( item, key ) =>
                            (
                                <Text
                                key = {key}
                                style = {listing_style.descripText}>
                                {" - " + item}
                                </Text>
                            ))
                        }
                        <Text style={[listing_style.sectionText, {paddingBottom: 0, paddingTop: 10 }]}>Wanted Skills</Text>
                        {/*Map the skills of the job to the screen*/}
                        <View style={listing_style.skillsContainer}>
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
                        {console.log(lat)}
                        {console.log(lng)}

                        <Text style={listing_style.sectionText}>Location</Text>

                        {/*Display all other information to the screen.*/}
                        <Text style={listing_style.distanceText}>
                            Distance from home:
                            <Text style={[listing_style.distanceText, {color: "#a9fcd4"}]}>
                            {" " + "0" + " "}
                            </Text>
                            miles
                        </Text>

                        {
                            /*Display the map on the page for the user view the jobs
                            location*/
                        }
                        <MapView
                            style={listing_style.mapStyle}
                            region={{
                                latitude: 42.9634,
                                longitude: -85.6681,
                                latitudeDelta: 0.0922,
                                longitudeDelta: 0.0421
                            }}
                            onPress={e => this.handlePress(e)}
                            >
                            <Marker coordinate={{latitude: 42.9634, longitude: -85.6681}}/>
                        </MapView>

                        {/*Container to anchor the buttons to the bottom of the screen.*/}
                        <View style={listing_style.bottomContainer}>
                            <Button style={listing_style.buttonDesign} onPress={console.log("hello")}>
                            Contact
                            </Button>
                            <Button style={listing_style.buttonDesign} onPress={console.log("hello")}>
                            Back
                            </Button>
                        </View>

                    </ScrollView>
                </View>

                </View>

                <View style={styles.slide3_Skills}>
                    <Text style={[styles.largeText, {marginBottom: 20}]}>Confirm</Text>
                    <Text
                        style={styles.mainText}>
                        Press create listing below to confirm your new job listing.
                    </Text>

                    {/*Bottom container that holds the next button. (Also on the
                    last wrapper page)*/}
                    <View style={styles.bottomContainer}>
                    <Button style={styles.buttonDesign} onPress={()=>this.checkListingForm()}>
                    Create Listing
                    </Button>
                    <Button style={styles.buttonDesign} onPress={()=>this.cancelPressed()}>
                    Cancel
                    </Button>
                    </View>
                </View>

            </Swiper>
        );

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

    makeDetailArray(){
      jobDetailsArray = [];
      if(this.state.jobDetails_1 != ""){
        jobDetailsArray.push(this.state.jobDetails_1);
      }
      if(this.state.jobDetails_2 != ""){
        jobDetailsArray.push(this.state.jobDetails_2);
      }
      if(this.state.jobDetails_3 != ""){
        jobDetailsArray.push(this.state.jobDetails_3);
      }
      if(this.state.jobDetails_4 != ""){
        jobDetailsArray.push(this.state.jobDetails_4);
      }
      if(this.state.jobDetails_5 != ""){
        jobDetailsArray.push(this.state.jobDetails_5);
      }
      if(this.state.jobDetails_6 != ""){
        jobDetailsArray.push(this.state.jobDetails_6);
      }
      if(this.state.jobDetails_7 != ""){
        jobDetailsArray.push(this.state.jobDetails_7);
      }
      if(this.state.jobDetails_8 != ""){
        jobDetailsArray.push(this.state.jobDetails_8);
      }


    }

    setLatLong(details){
      lat = details["geometry"]["location"]["lat"];
      lng = details["geometry"]["location"]["lng"];
      this.state.jobLocation = details['formatted_address'];

      console.log(lat);
      console.log(lng);
      console.log(this.state.jobLocation);
    }

    checkListingForm(){

        jobDetailsArray = [];
       let skillsArray = [];

       this.makeDetailArray();


      Object.keys(this.state.userSkills).forEach(key=>{

        skillsArray.push(this.state.userSkills[key].label);

      })
//      console.log(skillsArray);


      if (this.state.jobTitle != "" && this.state.jobLocation != "" && this.state.jobDetails_1 != ""
      && this.state.jobDetails_2 != "" && this.state.jobDetails_3 != ""  && skillsArray.length > 2) {
      console.log(jobDetailsArray);

            let rootRef = firebase.database().ref()

            let employerRef = rootRef.child('EMPLOYERS').child(this.props.uid).child('JOBS').push().set({
              'JobTitle' : this.state.jobTitle,
              'JobLocation' : this.state.jobLocation,
              'JobDetails' : jobDetailsArray,
              'Coordinate_LAT' : lat,
              'Coordinate_LNG' : lng,
              'Skills': skillsArray,
            })


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
        fontSize: 23,
        textAlign: 'center',
        color:'white',
        fontFamily: 'Roboto-Thin',
        padding: 20,
        margin: 5,
        borderWidth: 1,
        borderRadius: 30,
        width: Dimensions.get('window').width * .9,
        height: 58,
    },
    labelContainer:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
    },
    wrapper: {
    },
    slide1_Skills: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#1E2027',
        padding: 10

    },
    slide2_Skills: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#1E2027',
        padding: 10

    },
    slide3_Skills: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#1E2027',
        padding: 10
    },
    slide4_Skills:{
      flex: 1,
      alignItems: 'center',
      backgroundColor: '#1E2027',
      padding: 10,
    },
    slide1_formFill: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#1E2027',
        padding: 10

    },
    slide2_formFill: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#1E2027',
        padding: 10

    },
    slide3_formFill: {
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

const listing_style = StyleSheet.create({
  mainContainer: {
      flex: 1,
      backgroundColor: '#1E2027',
      // padding: 10,
      alignItems: 'center'
  },
  infoContainer:{
      flex: 1,
      paddingHorizontal: 20,
  },
  skillsContainer:{
      flexDirection: 'row',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      alignItems: 'flex-start',
      paddingVertical: 20,
  },
  largeText:{
      paddingTop: Dimensions.get('window').height * 0.02,
      fontSize: 65,
      textAlign: 'center',
      color: '#d6d6d6',
      fontFamily: 'Roboto-Thin'
  },
  mainText:{
      fontSize: 40,
      textAlign: 'center',
      paddingBottom: 10,
      color: '#a9fcd4',
      fontFamily: 'Roboto-Thin'
  },
  descripText:{
      fontSize: 18,
      color: '#d6d6d6',
      fontFamily: 'Roboto-Thin',
      paddingBottom: 10
  },
  distanceText:{
      fontSize: 25,
      color: '#d6d6d6',
      fontFamily: 'Roboto-Thin',
      paddingBottom: 10
  },
  sectionText:{
      fontSize: 25,
      color: '#d6d6d6',
      fontFamily: 'Roboto-Thin',
      textDecorationLine: 'underline',
      padding: 20,
      textAlign: 'center',
  },
  skillLabel:{
      fontSize: 22,
      textAlign: 'center',
      color: '#d6d6d6',
      fontFamily: 'Roboto-Thin',
      borderWidth: 1,
      borderColor: '#a9fcd4',
      borderRadius: 30,
      paddingHorizontal: 20,
      marginTop: 25,
      marginHorizontal: 5,
  },
  bottomContainer:{
      flex: 1,
      justifyContent: 'flex-end',
      marginBottom: 10,
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
  },
  buttonDesign:{
      fontSize: 20,
      fontWeight: 'normal',
      fontFamily: 'Roboto-Thin',
      padding: 10,
      marginVertical: 30,
      width: 150,
      color: '#fff',
      borderRadius: 30,
      borderColor: '#a9fcd4',
      borderWidth: 1,
  },
  mapStyle:{
      height: Dimensions.get('window').height * 0.50,
      width: Dimensions.get('window').width * 0.85,
      margin: 10
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
