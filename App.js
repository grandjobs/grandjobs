import React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import Button from 'react-native-button'
import {Router, Scene} from 'react-native-router-flux';
import { TabNavigator } from "react-navigation";
import AccountSetup from './AccountSetup';
import StartPage from './StartPage';
import Employers from './Employers';
import EmployerHomepage from './EmployerHomepage';
import SkillsPage from './SkillsPage';
import authTesting from './authTesting';
import authSol from './authSol';


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
					key = "authTesting"
					component = {authSol}
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
                 <Scene
                    key = "SkillPage"
                    component = {SkillsPage}
                    title="Skills"
                    hideNavBar={true}
                />
            </Scene>
        </Router>
    )
}

// const App = createAppNavigator(MainNavigator);

export default App;