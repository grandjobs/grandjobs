import React from 'react';
import { StyleSheet, Text, View, ScrollView, Dimensions, TextInput } from 'react-native';
import Button from 'react-native-button';
import { Actions } from 'react-native-router-flux';
import { Card, CardTitle, CardContent, CardAction, CardButton, CardImage } from 'react-native-cards';
import SideMenu from 'react-native-side-menu';
import JobInfo from './JobInfo.js';
import UserMenu from "./UserMenu";
import Swiper from 'react-native-swiper';
import { firebase } from './db';


export default class UserHomePage extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            allJobs: []
        }

    }

    async componentWillMount(){
        this.fbPull();
    }

    render() {
        const menu = <UserMenu/>;
        return (
            <SideMenu menu={menu} bounceBackOnOverdraw={false} edgeHitWidth={Dimensions.get('window').width}>

                {/*Main container for this page*/}
                <View style={styles.mainContainer}>
                    <View style={styles.textContainer}>
                        <Text style={styles.largeText}>Explore</Text>
                    </View>

                    {/*Make the cards view scrollable so we can reach the cards that will be rendered
                    off screen. Also map the cards to entries that we pull from
                    the database.*/}
                    <ScrollView style={{width: Dimensions.get('window').width * 0.90}}>
                    {
                        this.state.allJobs.map(( item, key ) =>
                        (
                            <Card isDark = {true} style={styles.cardStyle} key = {key}>
                                <CardTitle
                                style={{fontSize:50}}
                                title={item.company}
                                subtitle={item.jobTitle}
                                />
                                <CardContent style={{fontSize:50}} text={"Location: " + item.distance}/>
                                <CardAction
                                separator={true}
                                inColumn={false}>
                                <CardButton
                                onPress={() => this.cardPressed(item)}
                                title="View "
                                color="#a9fcd4"
                                />
                                </CardAction>
                            </Card>
                        ))
                    }
                    </ScrollView>
                </View>
            </SideMenu>
        );
    }

    //Handle the press of the card and send to the job info page.
    cardPressed(jobInfo){
        Actions.JobInfoPage({jobInfo: jobInfo});
    }

    fbPull(){
        let rootRef = firebase.database().ref();
        //TODO: Get UID from props.
        let employerRef = rootRef.child('EMPLOYERS');
        let userRef = rootRef.child('USERS').child(global.GloablUID).child('Contacted');
        try {
            contactedJobs = [];
            userRef.once('value')
            .then(snapshot => {
                snap = snapshot.val();
                contactedJobs = snap;
            });

            employerRef.once('value')
            .then(snapshot => {
                snap = snapshot.val();
                //Array to hold all of the jobs pulled from FB.
                loadedJobs = [];
                //Loop through all of the employers that we get from FB.
                for (var employerKey in snap) {
                    //Make sure that the employer actually has at least one job posted.
                    if (typeof snap[employerKey]["JOBS"] !== 'undefined'){
                        //Store this employer for convenience
                        employer = snap[employerKey];
                        //Loop through all of the jobs that this employer has posted.
                        for (var jobKey in snap[employerKey]["JOBS"]) {
                            // console.log(snap[employerKey]["JOBS"]);
                            contacted = false;

                            for (var i in contactedJobs){
                                contactJob = contactedJobs[i];
                                if (contactJob === jobKey){
                                    contacted = true;
                                }
                            }
                            if (!contacted){
                                //Store this job for convenience
                                job = snap[employerKey]["JOBS"][jobKey];

                                //Create a job info object.
                                curJob = new JobInfo();

                                //Set attributes from loaded job.
                                curJob.company = employer["Company Name"];
                                curJob.jobTitle = job["JobTitle"];
                                curJob.distance = job["JobLocation"];
                                curJob.skills = ["Skill 1", "Skill 2", "Skill 3", "Skill 4", "Skill 5", "Skill 6"];
                                curJob.jobKey = jobKey;
                                loadedJobs.push(curJob);
                            }
                        }
                    }
                }

                this.setState({
                    allJobs: loadedJobs,
                })
            });
        } catch (e) {
            console.warn(e);
        }
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#1E2027',
        // padding: 10,
        alignItems: 'center'
    },
    drawerContainer:{
        flex: 1,
        backgroundColor: '#dcdfe5',
        // padding: 10,
        alignItems: 'center'
    },
    largeText:{
        fontSize: 65,
        textAlign: 'center',
        marginTop: 20,
        color: '#d6d6d6',
        fontFamily: 'Roboto-Thin'
    },
    mainText:{
        fontSize: 25,
        textAlign: 'center',
        color: '#d6d6d6',
        fontFamily: 'Roboto-Thin',
        marginBottom: 20,
    },
    cardStyle:{
        backgroundColor: '#34363c',
        borderRadius: 10,
    },
});
