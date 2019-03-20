import React from 'react';
import { StyleSheet, Text, View, ScrollView, Dimensions, TextInput } from 'react-native';
import Button from 'react-native-button';
import { Actions } from 'react-native-router-flux';
import { DrawerNavigator } from 'react-navigation';
import { Card, CardTitle, CardContent, CardAction, CardButton, CardImage } from 'react-native-cards';
import SideMenu from 'react-native-side-menu';
import Dialog from "react-native-dialog";
import UserMenu from "./UserMenu";



export default class UserInfoPage extends React.Component {

    constructor(props){
        super(props);
        console.log(props.userInfo);
        phoneText = "Phone: " + props.userInfo.phoneNum + "\n";
        firstText = "First: " + props.userInfo.firstName + "\n";
        lastText = "Last: " + props.userInfo.lastName + "\n";
        emailText = "Email: " + props.userInfo.email;

        this.basicInfoText = phoneText + firstText + lastText + emailText;

        this.busInfoText = "";
        for (var i = 0; i < props.userInfo.busAccess.length; i++){
            if (i < props.userInfo.busAccess.length - 1){
                this.busInfoText += props.userInfo.busAccess[i] + ", ";
            }
            else{
                this.busInfoText += props.userInfo.busAccess[i];
            }
        }

        this.skillInfoText = "";
        for (var i = 0; i < props.userInfo.skills.length; i++){
            if (i < props.userInfo.skills.length - 1){
                this.skillInfoText += props.userInfo.skills[i] + ", ";
            }
            else{
                this.skillInfoText += props.userInfo.skills[i];
            }
        }

        this.state = {
            showFirstDialog: false,
            showLastDialog: false,
            showEmailDialog: false,
        }
    }

    render() {
        const menu = <UserMenu/>;
        return (
            <SideMenu menu={menu} bounceBackOnOverdraw={false}>
                {/*Dialog box for the user editing the first name*/}
                <Dialog.Container visible={this.state.showFirstDialog}>
                    <Dialog.Title>First Name</Dialog.Title>
                    <Dialog.Description>
                    Please enter your FIRST name.
                    </Dialog.Description>
                    <Dialog.Input placeholder='First Name' wrapperStyle={{borderColor: '#000000', borderBottomWidth: 2}}/>
                    {/*OnPress will auto enable the last name edit*/}
                    <Dialog.Button label="Confirm " onPress={() => this.editLastName()}/>
                    <Dialog.Button label="Cancel " onPress={() => this.closeLastName()}/>
                </Dialog.Container>

                {/*Dialog box for the user editing the last name*/}
                <Dialog.Container visible={this.state.showLastDialog}>
                    <Dialog.Title>First Name</Dialog.Title>
                    <Dialog.Description>
                    Please enter your LAST name.
                    </Dialog.Description>
                    <Dialog.Input placeholder='Last Name' wrapperStyle={{borderColor: '#000000', borderBottomWidth: 2}}/>
                    <Dialog.Button label="Confirm " onPress={() => this.closeLastName()}/>
                    <Dialog.Button label="Cancel " onPress={() => this.closeLastName()}/>
                </Dialog.Container>

                {/*Dialog box for the user editing their email*/}
                <Dialog.Container visible={this.state.showEmailDialog}>
                    <Dialog.Title>Email</Dialog.Title>
                    <Dialog.Description>
                    Please enter your email.
                    </Dialog.Description>
                    <Dialog.Input placeholder='example@mail.com' wrapperStyle={{borderColor: '#000000', borderBottomWidth: 2}}/>
                    <Dialog.Button label="Confirm " onPress={() => this.closeEmail()}/>
                    <Dialog.Button label="Cancel " onPress={() => this.closeEmail()}/>
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
                            <CardContent style={{fontSize:50}} text={this.props.userInfo.phoneNum}/>
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
                            <CardContent text={this.props.userInfo.firstName + " " + this.props.userInfo.lastName}/>
                            <CardAction
                            separator={false}
                            inColumn={false}>
                            <CardButton
                            onPress={() => this.editFirstName()}
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
                            <CardContent text={this.props.userInfo.email}/>
                            <CardAction
                            separator={false}
                            inColumn={false}>
                            <CardButton
                            onPress={() => this.editEmail()}
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
                            <CardContent text={this.busInfoText}/>
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
                            <CardContent text={this.skillInfoText}/>
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

    editFirstName(){
        this.setState({
            showFirstDialog: true,
            showLastDialog: false,
        })
    }

    editEmail(){
        this.setState({
            showEmailDialog: true,
        })
    }

    closeEmail(){
        this.setState({
            showEmailDialog: false,
        })
    }

    editLastName(){
        this.setState({
            showFirstDialog: false,
            showLastDialog: true,
        })
    }

    closeLastName(){
        this.setState({
            showFirstDialog: false,
            showLastDialog: false,
        })
    }

    editBusRoutes(){
        Actions.BusPage({userInfo: this.props.userInfo, editing: true});
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
