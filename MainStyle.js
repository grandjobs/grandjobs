'use strict';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    mainContainer: {
        flex: 1,
        // backgroundColor: '#1E2027',
        // justifyContent: 'center'
    },
    textContainer:{
        top: Dimensions.get('window').height * 0.05
    },
    buttonContainer:{
        alignItems: 'center',
        top: (Dimensions.get('window').height * 0.45)
    },
    mainText:{
        fontSize: 50,
        textAlign: 'center',
        top: 20,
        color: '#fff',
        fontFamily: 'Roboto-Thin'
    },
    buttonDesign:{
        fontSize: 25,
        fontWeight: 'normal',
        padding: 10,
        margin: 30,
        width: 300,
        color: '#fff',
        borderRadius: 30,
        borderColor: '#fff',
        borderWidth: 1,
        fontFamily: 'Roboto-Thin'
        // opacity: 10,
        // backgroundColor: 'rgba(18, 18, 18, 0.5)',
    },
});
