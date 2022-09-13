/**
 * Learn more about deep linking with React Navigation
 * https://reactnavigation.org/docs/deep-linking
 * https://reactnavigation.org/docs/configuring-links
 */

import { LinkingOptions } from '@react-navigation/native';
import * as Linking from 'expo-linking';

import { RootDrawerParamList, StackParamList } from '../types';

const linking: LinkingOptions<RootDrawerParamList> = {
  prefixes: [Linking.createURL('/')],
  config: {
    screens: {
      Stack: {
        screens: {
          Home: 'home',
          Details: 'details/:itemId/otherParam?',
          TabNavigator: {
            screens: {
              TabOne: {
                screens: {
                  TabOneScreen: 'one',
                },
              },
              TabTwo: {
                screens: {
                  TabTwoScreen: 'two',
                },
              },
            },
          },
          Modal: 'modal',
        }
      },
      Modal: 'top-modal',
      NotFound: '*',
    },
  },
};

export default linking;
