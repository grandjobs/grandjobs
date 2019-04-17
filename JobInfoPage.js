import React from 'react';
import { StyleSheet, Text, View, ScrollView, Dimensions, TextInput } from 'react-native';
import Button from 'react-native-button';
import { Actions } from 'react-native-router-flux';
import MapView, { Marker, CallOut } from 'react-native-maps';
import { firebase } from './db';
import Dialog from "react-native-dialog";
import { ToastContainer, toast } from 'react-toastify';




export default class JobInfoPage extends React.Component {


    constructor(props) {
        super(props);
        this.jobInfo = this.props.jobInfo;
        this.contactedList = [];
        this.loadContacted();

        this.state = {
            showDialog: false
        }
    }

    dialogConfirm(){
        try{
            let rootRef = firebase.database().ref();
    		let userRef = rootRef.child('USERS').child(global.GloablUID);

            this.contactedList.push(this.jobInfo.jobKey);

            userRef.update({
                'Contacted' : this.contactedList
    		});
        }
        catch(e){
            console.warn(e);
        }

        this.setState({
            showDialog: false
        });
        this.backPressed();
    }


    dialogCancel(){
        this.setState({
            showDialog: false
        });
    }

    render() {
        return (
            <View style={styles.mainContainer}>
                <Dialog.Container visible={this.state.showDialog}>
                    <Dialog.Title>First Name</Dialog.Title>
                    <Dialog.Description>
                    Are you sure you want to contact this position?
                    </Dialog.Description>
                    {/*OnPress will auto enable the last name edit*/}
                    <Dialog.Button label="Confirm " onPress={() => this.dialogConfirm()}/>
                    <Dialog.Button label="Cancel " onPress={() => this.dialogCancel()}/>
                </Dialog.Container>


                <Text style={styles.largeText}>{this.jobInfo.company}</Text>
                <Text style={styles.mainText}>{this.jobInfo.jobTitle}</Text>
                {/*Main ScrollView for the jobs*/}
                <ScrollView style={styles.infoContainer}>
                    {/*Map the description of the jobs to the text.*/}
                    <Text style={styles.sectionText}>Job Description</Text>
                    {
                        this.jobInfo.description.map(( item, key ) =>
                        (
                            <Text
                            key = {key}
                            style = {styles.descripText}>
                            {" - " + item}
                            </Text>
                        ))
                    }
                    <Text style={[styles.sectionText, {paddingBottom: 0, paddingTop: 10 }]}>Wanted Skills</Text>
                    {/*Map the skills of the job to the screen*/}
                    <View style={styles.skillsContainer}>
                        {
                            this.jobInfo.skills.map(( item, key ) =>
                            (
                                <Text
                                key = {key}
                                style = {styles.skillLabel}>
                                {item}
                                </Text>
                            ))
                        }
                    </View>

                    <Text style={styles.sectionText}>Location</Text>

                    {/*Display all other information to the screen.*/}
                    <Text style={styles.distanceText}>
                        Distance from home:
                        <Text style={[styles.distanceText, {color: "#a9fcd4"}]}>
                        {" " + this.jobInfo.distance + " "}
                        </Text>
                        miles
                    </Text>

                    {
                        /*Display the map on the page for the user view the jobs
                        location*/
                    }
                    <MapView
                        style={styles.mapStyle}
                        region={{
                            latitude: 42.9634,
                            longitude: -85.6681,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421
                        }}>
                        <Marker coordinate={{latitude: 42.9634, longitude: -85.6681}}/>
                    </MapView>

                    {/*Container to anchor the buttons to the bottom of the screen.*/}
                    <View style={styles.bottomContainer}>
                        <Button style={styles.buttonDesign} onPress={()=>this.contactPressed()}>
                        Contact
                        </Button>
                        <Button style={styles.buttonDesign} onPress={()=>this.backPressed()}>
                        Back
                        </Button>
                    </View>

                </ScrollView>
            </View>
        );
    }

    /**
     * Handler for the user contacting this job.
     * @return {[type]} [description]
     */
    contactPressed(){
        this.setState({
            showDialog: true
        });
    }

    loadContacted(){
        try{
            let rootRef = firebase.database().ref();
    		let userRef = rootRef.child('USERS').child(global.GloablUID).child('Contacted');
            userRef.once('value')
            .then(snapshot => {
                contacted = snapshot.val();
                if (contacted !== null){
                    this.contactedList = contacted;
                }
            });
        }
        catch(e){
            console.warn(e);
        }
    }

    /**
     * Handler for the user exiting this job.
     * @return {[type]} [description]
     */
    backPressed(){
        Actions.UserHomePage();
    }
}

const styles = StyleSheet.create({
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
