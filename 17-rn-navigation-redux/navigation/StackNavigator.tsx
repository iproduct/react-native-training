/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { NavigatorScreenParams } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';

import ModalScreen from '../screens/ModalScreen';
import { HomeScreen } from '../screens/HomeScreen';
import { DetailsScreen } from '../screens/DetailsScreen';
import { useContext } from 'react';
import { Credentials } from '../components/LoginForm';
import SignInScreen from '../screens/SignInScreen';
import { MyDrawerScreenProps, StoreStateContext } from '../Main';
import { RootTabParamList, TabNavigator } from './TabNavigator';

export type StackParamList = {
  SignIn: undefined,
  SignUp: undefined,
  Home: undefined;
  Details: { itemId: number, otherParam?: string };
  TabNavigator: NavigatorScreenParams<RootTabParamList> | undefined;
  Modal: undefined;
};

const Stack = createNativeStackNavigator<StackParamList>();

export function StackNavigator({ navigation, route }: MyDrawerScreenProps<'Stack'>) {
  const loggedUser = useContext(StoreStateContext)?.loggedUser;
  return (
    <Stack.Navigator>
      {!loggedUser ? (
        <>
          <Stack.Screen
            name="SignIn"
            component={SignInScreen}
            options={{
              title: 'Sign in',
              // When logging out, a pop animation feels intuitive
              // You can remove this if you want the default 'push' animation
              animationTypeForReplace: loggedUser ? 'push' : 'pop',
            }}
          />
        </>
      ) : (
        <>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Details" component={DetailsScreen} />
          <Stack.Screen name="TabNavigator" component={TabNavigator} options={{ headerShown: false }} />
          <Stack.Group screenOptions={{ presentation: 'modal' }}>
            <Stack.Screen name="Modal" component={ModalScreen} />
          </Stack.Group>
        </>)
      }

    </Stack.Navigator>
  );
}

