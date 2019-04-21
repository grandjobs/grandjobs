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
                                title={item.company  + " (" + item.matchPercent * 100 + "%)"}
                                subtitle={item.jobTitle}
                                />
                                <CardContent style={{fontSize:50}} text={"Location: " + item.address + "\n\nDistance from home: " + item.distance + " Miles" + item.longBusDescrip}/>
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
        Actions.JobInfoPage({jobInfo: jobInfo, contacted:false});
    }

    /**
     * Distance between two lat long points...
     *
     * https://www.geodatasource.com/developers/javascript
     */
    distance(lat1, lon1, lat2, lon2) {
        if ((lat1 == lat2) && (lon1 == lon2)) {
            return 0;
        }
        else {
            var radlat1 = Math.PI * lat1/180;
            var radlat2 = Math.PI * lat2/180;
            var theta = lon1-lon2;
            var radtheta = Math.PI * theta/180;
            var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
            if (dist > 1) {
                dist = 1;
            }
            dist = Math.acos(dist);
            dist = dist * 180/Math.PI;
            dist = dist * 60 * 1.1515;
            return dist;
        }
    }



    fbPull(){
        let rootRef = firebase.database().ref();
        let employerRef = rootRef.child('EMPLOYERS');
        let userRefContact = rootRef.child('USERS').child(global.GloablUID).child('Contacted');
        let userRefBase = rootRef.child('USERS').child(global.GloablUID);
        let busRef = rootRef.child('BUSES');

        try {
            contactedJobs = [];
            userBusRoutes = [];
            userSkills = [];
            userHomeLat = 0;
            userHomeLong = 0;
            userRange = 0;
            allBusRoutes = [];
            //Grab the users contacted jobs
            userRefContact.once('value')
            .then(snapshot => {
                snap = snapshot.val();
                contactedJobs = snap;
            });

            //Grab user info (location and bus routes)
            userRefBase.once('value')
            .then(snapshot => {
                snap = snapshot.val();
                userHomeLat = snap['Home Location']['Latitude'];
                userHomeLong = snap['Home Location']['Longitude'];
                userRange = parseInt(snap['Travel']['Range']);
                userSkills = snap['Skills'];

                if (typeof snap['Travel']['Bus Routes'] !== 'undefined'){
                    userBusRoutes = snap['Travel']['Bus Routes'];
                }
            });

            //Get bus route information
            busRef.once('value')
            .then(snapshot => {
                allBusRoutes = snapshot.val();
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
                                curJob.company = employer["Company Name"];
                                curJob.jobTitle = job["JobTitle"];
                                curJob.address = job["JobLocation"];
                                curJob.skills = job["Skills"];
                                curJob.description = job["JobDetails"];
                                curJob.lat = job["Coordinate_LAT"];
                                curJob.long = job["Coordinate_LNG"];
                                curJob.distance = this.distance(curJob.lat, curJob.long, userHomeLat, userHomeLong).toFixed(2);
                                curJob.jobKey = jobKey;
                                curJob.matchPercent = this.getSkillMatchPercent(userSkills, curJob.skills);

                                if (curJob.distance <= userRange && curJob.matchPercent > 0.0){
                                    if (userBusRoutes.length > 0){
                                        results = this.getClosestStop(allBusRoutes, userBusRoutes, curJob.lat, curJob.long);
                                        curJob.busLat = results[0];
                                        curJob.busLong = results[1];
                                        curJob.busLine = results[2];
                                        curJob.busDescrip = results[3];
                                        curJob.busDistance = results[4];
                                        tab = "        - ";
                                        curJob.longBusDescrip = "\n\nClosest Bus Line: " + curJob.busLine;
                                        curJob.longBusDescrip += "\n" + tab + "Closest Bus Stop: " + curJob.busDescrip;
                                        curJob.longBusDescrip += "\n" + tab + "Distance: " + curJob.busDistance + " Miles";
                                    }
                                    loadedJobs.push(curJob);
                                }
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

    getClosestStop(allRoutes, userRoutes, jobLat, jobLong){
        closeLat = 0;
        closeLong = 0;
        descrip = "";
        minDist = 999999;
        line = "";

        for (var i in userRoutes){
            route = allRoutes[userRoutes[i]]['Stops']
            for (stop in route){
                curStop = route[stop];
                curLat = curStop['Latitude'];
                curLong = curStop['Longitude'];
                tempDist = this.distance(jobLat, jobLong, curLat, curLong);
                if (tempDist < minDist){
                    minDist = tempDist;
                    closeLat = curLat;
                    closeLong = curLong;
                    descrip = curStop['Description'];
                    line = userRoutes[i];
                }
            }
        }
        minDist = minDist.toFixed(2);
        return [closeLat, closeLong, line, descrip, minDist];
    }

    getSkillMatchPercent(userSkills, jobSkills){
        numMatches = 0;
        for (var i in jobSkills){
            jSkill = jobSkills[i];
            for (var j in userSkills){
                uSkill = userSkills[j];
                if (jSkill === uSkill){
                    numMatches += 1;
                }
            }
        }
        percent = numMatches / (jobSkills.length * 1.0);
        percent = percent.toFixed(2);
        console.log(percent);
        return percent;
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
