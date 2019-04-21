import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, ScrollView, Dimensions } from 'react-native';
import MapView, { Marker, CallOut } from 'react-native-maps';
import Button from 'react-native-button';
import { Actions } from 'react-native-router-flux';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';



export default class TempSkillsPage extends Component {

    constructor(props){
        super(props);
        this.GooglePlacesRef = null;
        this.mapRef = null;
        this.markerRef = null;
        //State that holds the lat and long info of the location that the user
        //pressed.
        this.state = {
            markerLat: 0,
            markerLong: 0,
            viewLat: 42.9634,
            viewLong: -85.6681,
            disable: true,
            opac: 0,
        }
    }

   //  componentDidMount() {
   //   this.mapRef.fitToSuppliedMarkers(["123"],true);
   // }

    //Handle a press on the map and update the state with the proper coordinates.
    handlePress(e){
        this.setState({
            markerLat: e.nativeEvent.coordinate.latitude,
            markerLong: e.nativeEvent.coordinate.longitude,
            disable: false,
            opac: 1,
        });
        const region = {
          latitude: e.nativeEvent.coordinate.latitude,
          longitude: e.nativeEvent.coordinate.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }

        this.mapRef.animateToRegion(region, 1000);
    }

    //Handle the press of the next button.
    nextPressed(){
        //Update the user info object with the information on the lat and longs
        this.props.userInfo.homeLat = this.state.markerLat;
        this.props.userInfo.homeLong = this.state.markerLong;
        //Move on to the transport type page (passing the userinfo object)
        Actions.TransportType({userInfo: this.props.userInfo});
    }

    render(){
        return (
            <View style={styles.mainContainer}>
                <Text style={styles.largeText}>Location</Text>

                <Text style={styles.mainText}>
                Next, we will need a home address so we know how close you are to
                available jobs. If you don't want to share your home address,
                you can also drop a pin in the map below to an area near your house.
                </Text>

                <ScrollView style={styles.scrollContainer}>

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
                            fontSize: 25,
                            textAlign: 'center',
                            color:'white',
                            fontFamily: 'Roboto-Thin',
                            padding: 10,
                            margin: 20,
                            borderWidth: 1,
                            borderRadius: 30,
                            backgroundColor: 'transparent',
                            height: 60,
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
                    // predefinedPlaces={[homePlace, workPlace]}

                    debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
                />

                    {/*Display the map on the page for the user to select a location*/}
                    <MapView
                        ref={ref => { this.mapRef = ref; }}
                        style={styles.mapStyle}
                        initialRegion={{
                            latitude: this.state.viewLat,
                            longitude: this.state.viewLong,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421
                        }}
                        onPress={e => this.handlePress(e)}
                        >
                        <Marker
                            coordinate={{latitude: this.state.markerLat, longitude: this.state.markerLong}}
                        />
                    </MapView>

                    <View style={styles.mainContainer}>
                        {/*
                            A button that will not show until the user has a location
                            selected on the map.
                        */}
                        <Button style={[styles.buttonDesign, {opacity: this.state.opac}]}
                        disabled={this.state.disable}
                        onPress={()=>this.nextPressed()}>
                        Next
                        </Button>
                    </View>
                </ScrollView>
            </View>
        );
    }

    setLatLong(d){
        console.log(this.state.viewLat);
        tempLat = d["geometry"]["location"]["lat"];
        tempLong = d["geometry"]["location"]["lng"];
        this.setState({
            markerLat: tempLat,
            markerLong:  tempLong,
            disable: false,
            opac: 1,
        });
        this.GooglePlacesRef.setAddressText("");
        const region = {
          latitude: tempLat,
          longitude: tempLong,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }

        this.mapRef.animateToRegion(region, 1000);
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#1E2027',
        padding: 10,
        justifyContent: 'center',
        overflow: 'hidden',
        alignItems: 'center'
    },
    scrollContainer:{
        backgroundColor: '#1E2027',
        padding: 10,

    },
    mapStyle:{
        height: Dimensions.get('window').height * 0.50,
        width: Dimensions.get('window').width * 0.90,
        marginTop: 50
    },
    largeText:{
        fontSize: 65,
        textAlign: 'center',
        paddingTop: 20,
        color: '#d6d6d6',
        fontFamily: 'Roboto-Thin'
    },
    mainText:{
        fontSize: 18,
        textAlign: 'center',
        paddingBottom: 20,
        color: '#d6d6d6',
        fontFamily: 'Roboto-Thin',
    },
    bottomContainer:{
        flex: 1,
        justifyContent: 'flex-end',
        marginBottom: Dimensions.get('window').width * 0.05,
        alignItems: 'center',
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
        alignItems: 'center',

    },
});
