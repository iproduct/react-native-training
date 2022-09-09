import React from 'react';
import {
  NativeModules,
  LayoutAnimation,
  Text,
  TouchableOpacity,
  StyleSheet,
  View,
} from 'react-native';

const { UIManager } = NativeModules;

UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);

export default class App extends React.Component {
  state = {
    w: 100,
    h: 100,
    opacity: 1,
  };

  _onPress = () => {
    // Animate the update
    // LayoutAnimation.spring();
    LayoutAnimation.configureNext(
      // { duration: 3000, 
      //   create: { type: 'linear', property: 'opacity' }, 
      //   update: { type: 'spring', springDamping: 0.1 }, 
      //   delete: { type: 'linear', property: 'opacity' } 
      // }
      LayoutAnimation.create(2000, 'easeInEaseOut', 'opacity'),
      () => {
        this.setState({ opacity: 1 })
      }
    );
    this.setState({ w: this.state.w + 30, h: this.state.h + 30, opacity: 0.2 })
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={[styles.box, { width: this.state.w, height: this.state.h }]} />
        <TouchableOpacity onPress={this._onPress}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>Press me!</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 200,
    height: 200,
    backgroundColor: 'red',
  },
  button: {
    backgroundColor: 'black',
    paddingHorizontal: 20,
    paddingVertical: 15,
    marginTop: 15,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});