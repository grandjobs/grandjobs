import React from 'react';
import { StyleSheet, Text, View, Dimensions, TextInput } from 'react-native';
import Button from 'react-native-button';
import { Actions } from 'react-native-router-flux';
import UserInfo from './UserInfo.js';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';



export default class AddressTest extends React.Component {

    constructor(props) {
        super(props);
        this.lat = 0;
        this.long = 0;
    }
    render() {
        return (
                <GooglePlacesAutocomplete
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
        );
    }

    setLatLong(d){
        this.lat = d["geometry"]["location"]["lat"];
        this.long = d["geometry"]["location"]["lng"];
    }
}
