import { DrawerScreenProps } from '@react-navigation/drawer';
import { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import React, { useContext } from 'react';
import { Platform, StyleSheet } from 'react-native';

import LoginForm from '../components/LoginForm';
import { Text, View } from '../components/Themed';
import { AuthContext } from '../model/contexts';
import { DrawerParamList } from '../model/drawer-types';
import { StackParamList } from '../navigation/StackNavigator';

export type SignInScreenProps = CompositeScreenProps<
  NativeStackScreenProps<StackParamList, 'SignIn'>,
  DrawerScreenProps<DrawerParamList>
>;

export default function SignInScreen({navigation, route}: SignInScreenProps ) {
  const {signInComplete, signUpStart} = useContext(AuthContext);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign In</Text>
      <LoginForm onSignIn={signInComplete} onSignUp={signUpStart} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 50,
    marginBottom: 50,
  },
});
