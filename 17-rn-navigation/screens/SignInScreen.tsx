import { DrawerScreenProps } from '@react-navigation/drawer';
import { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Platform, StyleSheet } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import LoginForm, { Credentials } from '../components/LoginForm';
import { Text, View } from '../components/Themed';
import { SignInCustomProps } from '../navigation';
import { SignInService } from '../service/signin-service';
import { DrawerParamList, StackParamList } from '../types';

export type SignInScreenProps = CompositeScreenProps<
  NativeStackScreenProps<StackParamList, 'SignIn'>,
  DrawerScreenProps<DrawerParamList>
>;

export default function SignInScreen({navigation, route, onSignIn}: SignInScreenProps & SignInCustomProps ) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign In</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <LoginForm onSignIn={onSignIn} onSignUp={() => { }} />

      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
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
