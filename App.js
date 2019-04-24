import React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import Button from 'react-native-button'
import {Router, Scene,Actions, DefaultRenderer} from 'react-native-router-flux';
import { TabNavigator } from "react-navigation";
import { ToastContainer, toast } from 'react-toastify';
import AccountSetup from './AccountSetup';
import StartPage from './StartPage';
import Employers from './Employers';
import EmployerHomepage from './EmployerHomepage';
import SkillsPage from './SkillsPage';
import EmployerCreateListing from './EmployerCreateListing';
import MapsPage from './MapsPage';
import TransportType from './TransportType';
import RangePage from './RangePage';
import BusPage from './BusOptions';
import UserInfoPage from './UserInfoPage';
import UserHomePage from './UserHomePage';
import JobInfoPage from './JobInfoPage';
import seekerAuthentication from './seekerAuthentication';
import employerAuthentication from './employerAuthentication';
import EmployerSideReplies from './EmployerSideReplies';
import ViewSeekerProfile from './ViewSeekerProfile';
import ContactedPage from './ContactedPage';
import Elimination from './EliminationQuestions'
import SkipPage from './SkipPage'
import AdditionalInfo from './AdditionalInfo';

const App = () => {
	console.disableYellowBox = true
    return (
        <Router>
        <Scene key="root">

                <Scene key="StartPage" component={StartPage} hideNavBar={true} panHandlers={null}/>
                <Scene key="Employers" component={Employers} hideNavBar={true} panHandlers={null}/>
				        <Scene key="seekerAuthentication" component={seekerAuthentication} hideNavBar={true} panHandlers={null}/>
				        <Scene key="employerAuthentication" component={employerAuthentication} hideNavBar={true} panHandlers={null}/>
                <Scene key="AdditionalInfo" component={AdditionalInfo} hideNavBar={true} panHandlers={null}/>
                <Scene key="Elimination" component = {Elimination} hideNavBar={true} panHandlers={null}/>
                <Scene key="SkipPage" component = {SkipPage} hideNavBar={true} panHandlers={null}/>
                <Scene key="EmployerCreateListing" component={EmployerCreateListing} hideNavBar={true} panHandlers={null}/>
                <Scene key="EmployerHomepage" component={EmployerHomepage} hideNavBar={true} panHandlers={null}/>
                <Scene key="EmployerSideReplies" component={EmployerSideReplies} hideNavBar={true} panHandlers={null}/>
                <Scene key="ViewSeekerProfile" component={ViewSeekerProfile} hideNavBar={true} panHandlers={null}/>
                <Scene key="SkillsPage" component={SkillsPage} hideNavBar={true} panHandlers={null}/>
                <Scene key="MapsPage" component={MapsPage} hideNavBar={true} panHandlers={null}/>
                <Scene key="TransportType" component={TransportType} hideNavBar={true} panHandlers={null}/>
                <Scene key="RangePage" component={RangePage} hideNavBar={true} panHandlers={null}/>
                <Scene key="BusPage" component={BusPage} hideNavBar={true} panHandlers={null}/>
                <Scene key="UserInfoPage" component={UserInfoPage} hideNavBar={true} panHandlers={null}/>
                <Scene key="UserHomePage" component={UserHomePage} hideNavBar={true} panHandlers={null}/>
                <Scene key="JobInfoPage" component={JobInfoPage} hideNavBar={true} panHandlers={null}/>
                <Scene key = "ContactedPage" component = {ContactedPage} hideNavBar={true}/>

            </Scene>
        </Router>
    )
}

export default App;
