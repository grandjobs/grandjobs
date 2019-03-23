import React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import Button from 'react-native-button'
import {Router, Scene,Actions, DefaultRenderer} from 'react-native-router-flux';
import { TabNavigator } from "react-navigation";
import AccountSetup from './AccountSetup';
import StartPage from './StartPage';
import Employers from './Employers';
import EmployerHomepage from './EmployerHomepage';
import SkillsPage from './SkillsPage';
import EmployerCreateListing from './EmployerCreateListing';
import Drawer from 'react-native-drawer';
import MapsPage from './MapsPage';
import TransportType from './TransportType';
import RangePage from './Range';
import BusPage from './BusOptions';
import authSol from './authSol';
import UserInfoPage from './UserInfoPage';
import UserHomePage from './UserHomePage';

const App = () => {
    return (
        <Router>
        <Scene key="root">
                <Scene
                    key = "StartPage"
                    component = {StartPage}
                    hideNavBar={true}
                    panHandlers = {null}
                />

                <Scene
                    key = "Employers"
                    component = {Employers}
                    hideNavBar={true}
                    panHandlers = {null}
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
                    panHandlers = {null}
                />
                <Scene
                    key = "EmployerCreateListing"
                    component = {EmployerCreateListing}
                    title="Create Listing"
                    hideNavBar={true}
                    panHandlers = {null}
                />
                <Scene
                    key = "EmployerHomepage"
                    component = {EmployerHomepage}
                    title="Account"
                    hideNavBar={true}
                    panHandlers = {null}
                />
                <Scene
                    key = "SkillPage"
                    component = {SkillsPage}
                    title="Skills"
                    hideNavBar={true}
                    panHandlers = {null}
                />
                <Scene
                    key = "MapsPage"
                    component = {MapsPage}
                    title="Maps"
                    hideNavBar={true}
                    panHandlers = {null}
                />
                <Scene
                    key = "TransportType"
                    component = {TransportType}
                    title="Transport"
                    hideNavBar={true}
                    panHandlers = {null}
                />
                <Scene
                    key = "RangePage"
                    component = {RangePage}
                    title="Range"
                    hideNavBar={true}
                    panHandlers = {null}
                />
                <Scene
                    key = "BusPage"
                    component = {BusPage}
                    title="Bus"
                    hideNavBar={true}
                    panHandlers = {null}
                />
                <Scene
                    key = "UserInfoPage"
                    component = {UserInfoPage}
                    title="UserInfo"
                    hideNavBar={true}
                />
                <Scene
                    key = "UserHomePage"
                    component = {UserHomePage}
                    title="UserHim"
                    hideNavBar={true}
                />
            </Scene>

        </Router>

    )
}

// const App = createAppNavigator(MainNavigator);

export default App;
