import React from 'react';
<<<<<<< HEAD
import { StyleSheet, Text, View } from 'react-native';

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
=======
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import Button from 'react-native-button'
import {Router, Scene} from 'react-native-router-flux';
import { TabNavigator } from "react-navigation";
import AccountSetup from './AccountSetup';
import StartPage from './StartPage';
import Employers from './Employers';
import EmployerHomepage from './EmployerHomepage';



const App = () => {
    return (
        <Router>
            <Scene key = "root">
                <Scene
                    key = "StartPage"
                    component = {StartPage}
                    hideNavBar={true}
                />
                <Scene
                    key = "Employers"
                    component = {Employers}
                    hideNavBar={true}
                />
                <Scene
                    key = "AccountSetup"
                    component = {AccountSetup}
                    title="Account"
                    hideNavBar={true}
                />
                <Scene
                    key = "EmployerHomepage"
                    component = {EmployerHomepage}
                    title="Account"
                    hideNavBar={true}
                />
            </Scene>
        </Router>
    )
}

// const App = createAppNavigator(MainNavigator);

export default App;
>>>>>>> 3c50dbfca8b7bdd7ad52a93d3ad260f45c140aa2
