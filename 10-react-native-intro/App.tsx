import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import CatCafe from './CatCafe';
import CommonComponents from './ComonComponents';
import HelloWorldClass from './HelloWorldClass';
import TouchableOpacityDemo from './TochableOpacityDemo';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Hello from React Native!</Text>
      <HelloWorldClass />
      <CommonComponents />
      <CatCafe />
      <TouchableOpacityDemo />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '48px',
  },
});
