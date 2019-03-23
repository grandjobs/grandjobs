import React from 'react';
import { StyleSheet, Text, View, ScrollView, Dimensions, TextInput } from 'react-native';
import Button from 'react-native-button';
import { Actions } from 'react-native-router-flux';
import { Card, CardTitle, CardContent, CardAction, CardButton, CardImage } from 'react-native-cards';
import SideMenu from 'react-native-side-menu';
import JobInfo from './JobInfo.js';
import UserMenu from "./UserMenu";



export default class UserHomePage extends React.Component {

    constructor(props){
        super(props);
        //Eventually we will be loading firebase info here....
        tempJob = new JobInfo();
        tempJob.company = "Company Co";
        tempJob.jobTitle = "Manager";
        tempJob.distance = 5.6;
        tempJob.skills = ["Skill 1", "Skill 2", "Skill 3", "Skill 4", "Skill 5", "Skill 6"];
        tempJob.description.push("Maintains admission guidelines by writing, updating, and recommending changes to admission criteria, policies and procedures.");
        tempJob.description.push("Markets programs and facilities by preparing and providing informational brochures; writing and placing advertisements; answering questions; conducting tours.");
        tempJob.description.push("Obtains applicant information by requesting completed applications and medical information; verifying and clarifying information ; interviewing patients and family members; explaining admission criteria.");
        tempJob.description.push("Screens patients by comparing patient's condition to admission criteria; evaluating and accepting or rejecting patients; referring patients and family to other programs and institutions.");


        this.allJobs = [];
        this.allJobs.push(tempJob);
        this.allJobs.push(tempJob);
        this.allJobs.push(tempJob);
        this.allJobs.push(tempJob);
        this.allJobs.push(tempJob);
        this.allJobs.push(tempJob);
        this.allJobs.push(tempJob);
    }

    render() {
        const menu = <UserMenu/>;
        return (
            <SideMenu menu={menu} bounceBackOnOverdraw={false}>

                {/*Main container for this page*/}
                <View style={styles.mainContainer}>
                    <View style={styles.textContainer}>
                        <Text style={styles.largeText}>Explore</Text>
                    </View>

                    {/*Make the cards view scrollable so we can reach the cards that will be rendered
                    off screen*/}
                    <ScrollView style={{width: Dimensions.get('window').width * 0.90}}>
                    {
                        this.allJobs.map(( item, key ) =>
                        (
                            <Card isDark = {true} style={styles.cardStyle} key = {key}>
                                <CardTitle
                                style={{fontSize:50}}
                                title={item.company}
                                subtitle={item.jobTitle}
                                />
                                <CardContent style={{fontSize:50}} text={"Distance: " + item.distance}/>
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

    cardPressed(jobInfo){
        console.log("Pressed");
        Actions.JobInfoPage({jobInfo: jobInfo});
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
