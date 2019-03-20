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

                {/*Main container for this page*/}
                <View style={styles.mainContainer}>
                    <View style={styles.textContainer}>
                        <Text style={styles.largeText}>Explore</Text>
                    </View>

                    {/*Make the cards view scrollable so we can reach the cards that will be rendered
                    off screen*/}
                    <ScrollView style={{width: Dimensions.get('window').width * 0.90}}>

                        {/*Card for the Phone number (Should not be able to edit)*/}
                        <Card isDark = {true} style={styles.cardStyle}>
                            <CardTitle
                            style={{fontSize:50}}
                            title="Company"
                            subtitle="Position"
                            />
                            <CardContent style={{fontSize:50}} text="This is a "/>
                            <CardAction
                            separator={true}
                            inColumn={false}>
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
