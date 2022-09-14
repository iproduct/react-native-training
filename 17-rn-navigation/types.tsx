/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { DrawerScreenProps } from '@react-navigation/drawer/lib/typescript/src/types';
import { CompositeScreenProps, NavigatorScreenParams } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends StackParamList { }
  }
}

export type RootDrawerParamList = {
  About: undefined;
  Stack: NavigatorScreenParams<StackParamList> | undefined;
  Modal: undefined;
  NotFound: undefined;
}

export type StackParamList = {
  SignIn: undefined,
  SignUp: undefined,
  Home: undefined;
  Details: { itemId: number, otherParam?: string };
  TabNavigator: NavigatorScreenParams<RootTabParamList> | undefined;
  Modal: undefined;
};

export type StackScreenProps<Screen extends keyof StackParamList> = NativeStackScreenProps<
  StackParamList,
  Screen
>;

export type RootTabParamList = {
  TabOne: undefined;
  TabTwo: undefined;
  About: undefined;
};

export type RootTabScreenProps<Screen extends keyof RootTabParamList> = CompositeScreenProps<
  BottomTabScreenProps<RootTabParamList, Screen>,
  DrawerScreenProps<RootDrawerParamList>
>;


