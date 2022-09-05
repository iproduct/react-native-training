import React, { Component } from 'react';
import { View, StyleSheet, Button, Text } from 'react-native';
// import Button from './Button';
import * as Linking from 'expo-linking';
import * as WebBrowser from 'expo-web-browser';
import Constants from 'expo-constants';

export default class App extends Component {
  state = { url: '' }
  async componentDidMount() {
    const initialUrl = await Linking.getInitialURL();
    this.setState({ url: initialUrl });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>
          {`The deep link is: ${this.state.url || "None"}`}
      </Text>
        <Button
          title="Open URL with ReactNative.Linking"
          onPress={this._handleOpenWithLinking}
          // style={styles.button}
        />
        <Button
          title="Open URL with Expo.WebBrowser"
          onPress={this._handleOpenWithWebBrowser}
          // style={styles.button}
        />
      </View>
    );
  }

  _handleOpenWithLinking = () => {
    Linking.addEventListener('url', (event: any) =>{
      console.log(event);
    })
    Linking.openURL('https://expo.dev');
  };

  _handleOpenWithWebBrowser = () => {
    Linking.addEventListener('url', (event: any) =>{
      console.log(event);
    })
    WebBrowser.openBrowserAsync('https://expo.dev');
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
  },
  button: {
    marginVertical: 10,
  },
});