import React from 'react';
import { StyleSheet, Text, View, ScrollView, Dimensions, TextInput } from 'react-native';
import Button from 'react-native-button';
import { Actions } from 'react-native-router-flux';
import { DrawerNavigator } from 'react-navigation';
import { Card, CardTitle, CardContent, CardAction, CardButton, CardImage } from 'react-native-cards';
import SideMenu from 'react-native-side-menu';
import Dialog from "react-native-dialog";
import UserMenu from "./UserMenu";
import { firebase } from './db';
import UserInfo from './UserInfo';

export default class UserInfoPage extends React.Component {

    constructor(props){
        super(props);

        this.emailEdit = "";
        this.firstNameEdit = "";
        this.lastNameEdit = "";
        this.firebaseUser = null;

        //State to show the editing dialog.
        this.state = {
            showFirstDialog: false,
            showLastDialog: false,
            showEmailDialog: false,
            firstName: "Loading...",
            lastName: "",
            phoneNum: "Loading...",
            email: "Loading...",
            busRoutes: "Loading...",
            skills: "Loading...",
        }
    }

    async componentWillMount(){
        this.fbPull();
    }

    /**
    * Pull user information from firebase
    */
    fbPull(){
        let rootRef = firebase.database().ref();
        //TODO: Get UID from props.
        let userRef = rootRef.child('USERS').child("XskmWu729ZTdSGqzqWcoGohmSuu1");

        try {
            userRef.once('value')
            .then(snapshot => {
                this.firebaseUser = snapshot.val();

                //Tabs arent working for the card view???
                spacing = "      ";
                skillInfoText = "";
                for (var i = 0; i < this.firebaseUser['Skills'].length; i++){
                    if ((i+1) % 3 == 0){
                        skillInfoText += "- " + this.firebaseUser['Skills'][i] + "\n";
                    }
                    else{
                        skillInfoText += "- " + this.firebaseUser['Skills'][i] + spacing;
                    }
                }

                busInfoText = "";
                for (var i = 0; i < this.firebaseUser['Bus Access'].length; i++){
                    if (i < this.firebaseUser['Bus Access'].length - 1){
                        busInfoText += this.firebaseUser['Bus Access'][i] + ", ";
                    }
                    else{
                        busInfoText += this.firebaseUser['Bus Access'][i];
                    }
                }

                this.setState({
                    firstName : this.firebaseUser['First Name'],
                    lastName : this.firebaseUser['Last Name'],
                    email : this.firebaseUser['Email'],
                    skills: skillInfoText,
                    busRoutes: busInfoText,
                });
            });
        } catch (e) {
            console.warn(e);
        }
    }

    fbPush(){
        let rootRef = firebase.database().ref();
		let userRef = rootRef.child('USERS');
        //TODO: Get UID from props?
		newAccountRef = userRef.child("XskmWu729ZTdSGqzqWcoGohmSuu1");
		newAccountRef.update({
			'Email' : this.state.email,
			'First Name' : this.state.firstName,
			'Last Name' : this.state.lastName,
		});
    }

    render() {
        //Load in the menu.
        const menu = <UserMenu/>;
        return (
            <SideMenu menu={menu} bounceBackOnOverdraw={false}>
                {/*Dialog box for the user editing the first name*/}
                <Dialog.Container visible={this.state.showFirstDialog}>
                    <Dialog.Title>First Name</Dialog.Title>
                    <Dialog.Description>
                    Please enter your FIRST name.
                    </Dialog.Description>
                    <Dialog.Input placeholder='First Name' wrapperStyle={{borderColor: '#000000', borderBottomWidth: 2}}  onChangeText={(first) => this.changeFirst(first)}/>
                    {/*OnPress will auto enable the last name edit*/}
                    <Dialog.Button label="Confirm " onPress={() => this.confirmFirstEdit()}/>
                    <Dialog.Button label="Cancel " onPress={() => this.closeAll()}/>
                </Dialog.Container>

                {/*Dialog box for the user editing the last name*/}
                <Dialog.Container visible={this.state.showLastDialog}>
                    <Dialog.Title>First Name</Dialog.Title>
                    <Dialog.Description>
                    Please enter your LAST name.
                    </Dialog.Description>
                    <Dialog.Input placeholder='Last Name' wrapperStyle={{borderColor: '#000000', borderBottomWidth: 2}}  onChangeText={(last) => this.changeLast(last)}/>
                    <Dialog.Button label="Confirm " onPress={() => this.confirmLastEdit()}/>
                    <Dialog.Button label="Cancel " onPress={() => this.closeAll()}/>
                </Dialog.Container>

                {/*Dialog box for the user editing their email*/}
                <Dialog.Container visible={this.state.showEmailDialog}>
                    <Dialog.Title>Email</Dialog.Title>
                    <Dialog.Description>
                    Please enter your email.
                    </Dialog.Description>
                    <Dialog.Input placeholder='example@mail.com' wrapperStyle={{borderColor: '#000000', borderBottomWidth: 2}} onChangeText={(email) => this.changeEmail(email)}/>
                    <Dialog.Button label="Confirm " onPress={(Email) => this.confirmEmailEdit()}/>
                    <Dialog.Button label="Cancel " onPress={() => this.closeAll()}/>
                </Dialog.Container>

                {/*Main container for this page*/}
                <View style={styles.mainContainer}>
                    <View style={styles.textContainer}>
                        <Text style={styles.largeText}>You</Text>
                        <Text style={styles.mainText}>This is your account information</Text>
                    </View>

                    {/*Make the cards view scrollable so we can reach the cards that will be rendered
                    off screen*/}
                    <ScrollView style={{width: Dimensions.get('window').width * 0.90}}>

                        {/*Card for the Phone number (Should not be able to edit)*/}
                        <Card isDark = {true} style={styles.cardStyle}>
                            <CardTitle
                            style={{fontSize:50}}
                            title= "Phone Number"
                            />
                            <CardContent style={{fontSize:50}} text={"NEEDS TO BE ADDED TO FB"}/>
                            <CardAction
                            separator={true}
                            inColumn={false}>
                            </CardAction>
                        </Card>

                        {/*Card for the First and Last name of the user*/}
                        <Card isDark = {true} style={styles.cardStyle}>
                            <CardTitle
                            title= "Name"
                            />
                            <CardContent text={this.state.firstName + " " + this.state.lastName}/>
                            <CardAction
                            separator={false}
                            inColumn={false}>
                            <CardButton
                            onPress={() => this.openFirstName()}
                            title="Edit "
                            color="#a9fcd4"
                            />
                            </CardAction>
                        </Card>

                        {/*Card for the user's email*/}
                        <Card isDark = {true} style={styles.cardStyle}>
                            <CardTitle
                            title= "Email"
                            />
                            <CardContent text={this.state.email}/>
                            <CardAction
                            separator={false}
                            inColumn={false}>
                            <CardButton
                            onPress={() => this.openEmail()}
                            title="Edit "
                            color="#a9fcd4"
                            />
                            </CardAction>
                        </Card>

                        {/*Card for the bus routes for this user*/}
                        <Card isDark = {true} style={styles.cardStyle}>
                            <CardTitle
                            title= "Bus Routes"
                            />
                            <CardContent text={this.state.busRoutes}/>
                            <CardAction
                            separator={false}
                            inColumn={false}>
                            <CardButton
                            onPress={() => this.editBusRoutes()}
                            title="Edit "
                            color="#a9fcd4"
                            />
                            </CardAction>
                        </Card>

                        {/*Card for the skills of this user*/}
                        <Card isDark = {true} style={styles.cardStyle}>
                            <CardTitle
                            title= "Skills"
                            />
                            <CardContent text={this.state.skills}/>
                            <CardAction
                            separator={false}
                            inColumn={false}>
                            <CardButton
                            onPress={() => {}}
                            title="Edit "
                            color="#a9fcd4"
                            />
                            </CardAction>
                        </Card>
                    </ScrollView>
                </View>
            </SideMenu>
        );
    }

    /**
     * Display the edit page for the first name.
     */
    openFirstName(){
        this.setState({
            showFirstDialog: true,
            showLastDialog: false,
        })
    }

    /**
     * Display the edit page for the last name.
     */
    openLastName(){
        this.setState({
            showFirstDialog: false,
            showLastDialog: true,
        })
    }

    /**
     * Display the edit page for the email.
     */
    openEmail(){
        this.setState({
            showEmailDialog: true,
        })
    }

    changeEmail(email){
        this.emailEdit = email;
    }

    changeFirst(first){
        this.firstNameEdit = first;
    }

    changeLast(last){
        this.lastNameEdit = last;
    }

    confirmFirstEdit(){
        this.setState({
            firstName: this.firstNameEdit,
        },
        () => {this.fbPush()}
        );
        this.closeAll();
        this.openLastName();
    }

    confirmLastEdit(){
        this.setState({
            lastName: this.lastNameEdit,
        },
        () => {this.fbPush()}
        );
        this.closeAll();
    }

    /**
     * Close the email dialog.
     */
    confirmEmailEdit(){
        this.setState({
            email: this.emailEdit,
        },
        () => {this.fbPush()}
        );
        this.closeAll();
    }

    closeAll(){
        this.setState({
            showFirstDialog: false,
            showLastDialog: false,
            showEmailDialog: false,
        })
    }

    /**
     * Send the user to the bus info page so they can edit the routes.
     */
    editBusRoutes(){
        tempObj = new UserInfo();
        tempObj.busAccess = this.firebaseUser['Bus Access'];
        console.log(tempObj.busAccess);
        Actions.BusPage({userInfo: tempObj, editing: true});
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
