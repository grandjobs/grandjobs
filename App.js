import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { db } from './src/services/db';

export default class App extends React.Component {
  render() {
	var testData = db.ref();
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
