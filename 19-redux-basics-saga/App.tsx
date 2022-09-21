import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux';
import Currencies from './containers/Currencies';
import Enthusiasm from './containers/Enthusiasm';
import Suggestions from './containers/Suggestions';
import { store } from './redux/store';

export default function App() {
  return (
    <Provider store={store}>
      <View style={styles.container}>
        <Currencies />
        <View style={{height: 50}} />
        <Suggestions />
        <View style={{height: 50}} />
        <Enthusiasm />
        <StatusBar style="auto" />
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
