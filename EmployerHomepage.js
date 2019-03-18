import React from 'react';
import { StyleSheet, Text, View, ScrollView, Dimensions, TextInput, TouchableOpacity, FlatList, SafeAreaView } from 'react-native';
import Button from 'react-native-button';
import { Actions } from 'react-native-router-flux';
import { DrawerNavigator } from 'react-navigation';
import { Card, CardTitle, CardContent, CardAction, CardButton, CardImage } from 'react-native-cards';
import Drawer from 'react-native-drawer';
import SideMenu from 'react-native-side-menu';

const menu = [
    { 'title': 'Home',
    id: 'one'},
    { 'title': 'Replies',
    id: 'two'},
    { 'title': 'Create',
    id: 'three'},
    { 'title': 'Log Out',
    id: 'four'}
]





export default class EmployerHomepage extends React.Component {

    constructor(props){
        super(props);
    }

    render() {
      const myMenu = <UserMenu/>;
              return (
            <SideMenu menu = {myMenu}>
                <View style={styles.mainContainer}>
                    <View style={styles.textContainer}>
                        <Text style={styles.largeText}>Grand Jobs</Text>
                        <Text style={styles.mainText}>Homepage</Text>
                    </View>

                    <ScrollView style={{width: Dimensions.get('window').width * 0.90}}>

                        <Card isDark = {true} style={styles.cardStyle}>
                            <CardTitle
                            title= "Company Name Here"
                            />
                            <CardContent text={"Company Location:"}/>
                            <CardContent text={"Email:"}/>
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
                            title= "Welcome!"
                            />
                            <CardContent text={"All notifications will show up here. Swipe right for more options."}/>
                            <CardAction
                            separator={false}
                            inColumn={false}>
                            <CardButton
                            onPress={() => {}}
                            title="Dismiss "
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

// class Application extends React.Component{
//   render(){
//     const menu = <Menu navigator = {navigator}/>;
//
//     return(
//       <SideMenu menu = {menu}>
//       <testHomepage/>
//       </SideMenu>
//
//     );
//   }
// }

class UserMenu extends React.Component{

  constructor(props){
      super(props);
  }

  render(){
    return(
      <SafeAreaView style = {sideStyles.menuContainer}>

      <View style={sideStyles.menuContainer}>
          <FlatList
              style={{ flex: 1.0 }}
              data={menu}
              extraData={this.state}
              renderItem={({ item, index }) => {
                  return (
                      <TouchableOpacity style={sideStyles.menuTitleContainer}
                      onPress={()=>this.onPress(item, index)}>
                          <Text style={sideStyles.menuTitle}
                              key={index}>
                              {item.title}
                          </Text>
                      </TouchableOpacity>


                  )
              }}
              keyExtractor={item => item.id}
               />
      </View>
      </SafeAreaView>
    );
  }
  onPress(item, index){
    if(index == 0){
      //home pressed
      Actions.EmployerHomepage();
    }
    if(index == 1){
      //replies pressed
      Actions.EmployerHomepage();
    }
    if(index == 2){
      //create pressed
      Actions.EmployerCreateListing();
    }
    if(index == 3){
      //logout pressed
      Actions.EmployerHomepage();
    }
  }
}

const sideStyles = StyleSheet.create({

  menuContainer: {
      flex: 1.0,
      backgroundColor: '#34363c',
  },
  menuTitleContainer: {
      alignItems: 'center',
      height: 60,
      width:'100%',
      flexDirection:'row',

  },
  menuTitle: {
      width:'100%',
      textAlign: 'center',
      color: 'white',
      fontSize: 17,
      fontFamily: 'Roboto-Thin',
      alignSelf: 'center'
  },

});

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
