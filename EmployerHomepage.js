import React from 'react';
import { StyleSheet, Text, View, Dimensions,TouchableHighlight, TextInput, ScrollView } from 'react-native';
import Button from 'react-native-button';
// import { TextInput } from 'react-native-paper';
import PhoneInput from 'react-native-phone-input';
import { Actions } from 'react-native-router-flux'
import Drawer from 'react-native-drawer'

export default class EmployerHomepage extends React.Component {

  closeMenu = () => {
  this._drawer.close()
  };
openMenu = () => {
  this._drawer.open()
  };

  showDrawer  = () => {
    Actions.drawerMenu({key: 'drawerMenu', open: true });
          };

    render() {
      let screenwidth = Dimensions.get('window').width;
      let screenHeight = Dimensions.get('window').height;
        return (


                    <ScrollView
                      ref={(scrollView) => { this.scrollView = scrollView; }}
                      style={styles.container}
                      //pagingEnabled={true}
                      horizontal= {true}
                      decelerationRate={0}
                      snapToInterval={screenwidth}
                      snapToAlignment={"center"}>
                      <View style={styles.mainContainer}>
                          <View style={styles.textContainer}>
                              <Text style={styles.largeText}>Welcome!</Text>
                              <Text style={styles.mainText}>here are your updates</Text>
                          </View>
                          <View style={styles.buttonContainer2}>
                              <Button style={styles.buttonDesign} onPress={()=>this.showDrawerMenu()}>
                              Home
                              </Button>
                          </View>
                      </View>

                      <View style={styles.mainContainer}>
                          <View style={styles.textContainer}>
                              <Text style={styles.largeText}>Welcome!</Text>
                              <Text style={styles.mainText}>here are your listings</Text>
                          </View>
                          <View style={styles.buttonContainer2}>

                              <Button style={styles.buttonDesign} onPress={()=>this.newListingPressed()}>
                              New Listing
                              </Button>
                          </View>
                      </View>

                      </ScrollView>


        );
    }

    showDrawerMenu(){
      Actions.drawerMenu({key: 'drawerMenu', open: true });
    }


    homePressed(){

      Actions.StartPage();
    }

    newListingPressed(){
      Actions.EmployerCreateListing();
    }


}


const drawerStyles = {
  drawer: {shadowColor: '#000000', shadowOpacity: 0.8, shadowRadius: 3},
  main: {paddingLeft: 3},
}



const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#1E2027',
        padding: 10,
        width: Dimensions.get('window').width
        // justifyContent: 'center'
    },
    textContainer:{
        top: Dimensions.get('window').height * 0.05
    },
    buttonContainer:{
        alignItems: 'center',
        top: (Dimensions.get('window').height * 0.5)
    },
    buttonContainer2:{
        alignItems: 'center',
        top: (Dimensions.get('window').height * 0.65)
    },
    fillContainer:{
        top: Dimensions.get('window').height * 0.20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    largeText:{
        fontSize: 65,
        textAlign: 'center',
        top: 20,
        color: '#d6d6d6',
        fontFamily: 'Arial'
    },
    mainText:{
        fontSize: 25,
        textAlign: 'center',
        top: 20,
        color: '#d6d6d6',
        fontFamily: 'Arial'
    },
    buttonDesign:{
        fontSize: 25,
        fontFamily: 'Arial',
        padding: 10,
        margin: 30,
        width: 300,
        color: '#d6d6d6',
        borderRadius: 30,
        backgroundColor: '#121212',
    },
    inputText:{
        borderColor: '#fff',
        color: '#fff',
        fontSize: 25,
        textAlign: 'center',
        color:'white',
        fontFamily: 'Arial',
        padding: 13,
        margin: 5,
        borderWidth: 1,
        borderRadius: 30,
        width: Dimensions.get('window').width * 0.8
    },
});
