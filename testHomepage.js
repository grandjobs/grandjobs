import React from 'react';
import { StyleSheet, Text, View, ScrollView, Dimensions, TextInput } from 'react-native';
import Button from 'react-native-button';
import { Actions } from 'react-native-router-flux';
import { DrawerNavigator } from 'react-navigation';
import { Card, CardTitle, CardContent, CardAction, CardButton, CardImage } from 'react-native-cards';
import Drawer from 'react-native-drawer';
import SideMenu from 'react-native-side-menu';


export default class testHomepage extends React.Component {

    constructor(props){
        super(props);
    }

    render() {
        return (
            <SideMenu>
                <View style={styles.mainContainer}>
                    <View style={styles.textContainer}>
                        <Text style={styles.largeText}>*Company Name*</Text>
                        <Text style={styles.mainText}>Homepage</Text>
                    </View>

                    <ScrollView style={{width: Dimensions.get('window').width * 0.90}}>

                        <Card isDark = {true} style={styles.cardStyle}>
                            <CardTitle
                            title= "Basic Info"
                            />
                            <CardContent text={"test"}/>
                            <CardAction
                            separator={true}
                            inColumn={false}>
                            <CardButton
                            onPress={() => {}}
                            title="Edit "
                            color="#a9fcd4"
                            />
                            </CardAction>
                        </Card>

                        <Card isDark = {true} style={styles.cardStyle}>
                            <CardTitle
                            title= "Bus Routes"
                            />
                            <CardContent text={"test"}/>
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

                        <Card isDark = {true} style={styles.cardStyle}>
                            <CardTitle
                            title= "Your Skills"
                            />
                            <CardContent text={"test"}/>
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

                        <Card isDark = {true} style={styles.cardStyle}>
                            <CardTitle
                            title= "Your Skills"
                            />
                            <CardContent text={"test"}/>
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

                        <Card isDark = {true} style={styles.cardStyle}>
                            <CardTitle
                            title= "Your Skills"
                            />
                            <CardContent text={"test"}/>
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
