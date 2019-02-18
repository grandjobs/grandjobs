import * as React from 'react'
import {Text, View, ScrollView, TextInput, Button} from 'react-native'
import {Linking, WebBrowser} from 'expo'
import { firebase } from './db'

const captchaUrl = `https://job-push-fbb6a.firebaseapp.com/captcha.html?appurl=${Linking.makeUrl('')}`

export default class authSol extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            user: undefined,
            phone: '',
            confirmationResult: undefined,
            code: ''
        }
        firebase.auth().onAuthStateChanged(user => {
            this.setState({user})
        })
    }

    onPhoneChange = (phone) => {
        this.setState({phone})
    }
    onPhoneComplete = async () => {
        let token = null
        const listener = ({url}) => {
            WebBrowser.dismissBrowser()
            const tokenEncoded = Linking.parse(url).queryParams['token']
            if (tokenEncoded)
                token = decodeURIComponent(tokenEncoded)
        }
        Linking.addEventListener('url', listener)
        await WebBrowser.openBrowserAsync(captchaUrl)
        Linking.removeEventListener('url', listener)
        if (token) {
            const {phone} = this.state
            //fake firebase.auth.ApplicationVerifier
            const captchaVerifier = {
                type: 'recaptcha',
                verify: () => Promise.resolve(token)
            }
            try {
                const confirmationResult = await firebase.auth().signInWithPhoneNumber(phone, captchaVerifier)
                this.setState({confirmationResult})
            } catch (e) {
                console.warn(e)
            }

        }
    }
    onCodeChange = (code) => {
        this.setState({code})
    }
    onSignIn = async () => {
        const {confirmationResult, code} = this.state
        try {
            await confirmationResult.confirm(code)
        } catch (e) {
            console.warn(e)
        }
        this.reset()
    }
    onSignOut = async () => {
        try {
            await firebase.auth().signOut()
        } catch (e) {
            console.warn(e)
        }
    }
    reset = () => {
        this.setState({
            phone: '',
            phoneCompleted: false,
            confirmationResult: undefined,
            code: ''
        })
    }

    render() {
        if (this.state.user)
            return (
                <ScrollView style={{padding: 20, marginTop: 20}}>
                    <Text>You signed in</Text>
                    <Button
                        onPress={this.onSignOut}
                        title="Sign out"
                    />
                </ScrollView>
            )

        if (!this.state.confirmationResult)
            return (
                <ScrollView style={{padding: 20, marginTop: 20}}>
                    <TextInput
                        value={this.state.phone}
                        onChangeText={this.onPhoneChange}
                        keyboardType="phone-pad"
                        placeholder="Your phone"
                    />
                    <Button
                        onPress={this.onPhoneComplete}
                        title="Next"
                    />
                </ScrollView>
            )
        else
            return (
                <ScrollView style={{padding: 20, marginTop: 20}}>
                    <TextInput
                        value={this.state.code}
                        onChangeText={this.onCodeChange}
                        keyboardType="numeric"
                        placeholder="Code from SMS"
                    />
                    <Button
                        onPress={this.onSignIn}
                        title="Sign in"
                    />
                </ScrollView>
            )
    }
}