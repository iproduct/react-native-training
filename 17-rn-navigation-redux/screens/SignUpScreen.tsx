import { DrawerScreenProps } from '@react-navigation/drawer';
import { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import React, { useContext } from 'react';
import { Platform, StyleSheet } from 'react-native';

import LoginForm from '../components/LoginForm';
import RegistrationForm from '../components/RegistrationForm';
import { Text, View } from '../components/Themed';
import { AuthContext } from '../model/contexts';
import { DrawerParamList } from '../model/drawer-types';
import { StackParamList } from '../navigation/StackNavigator';

export type SignUpScreenProps = CompositeScreenProps<
  NativeStackScreenProps<StackParamList, 'SignUp'>,
  DrawerScreenProps<DrawerParamList>
>;

export default function SignInScreen({navigation, route}: SignUpScreenProps ) {
  const {signUpComplete, signInStart} = useContext(AuthContext);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <RegistrationForm onSignUpComplete={signUpComplete} onSignUpCancel={signInStart}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
