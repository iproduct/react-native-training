/**
 * Learn more about deep linking with React Navigation
 * https://reactnavigation.org/docs/deep-linking
 * https://reactnavigation.org/docs/configuring-links
 */

import { LinkingOptions } from '@react-navigation/native';
import * as Linking from 'expo-linking';
import { DrawerParamList } from '../Main';

const linking: LinkingOptions<DrawerParamList> = {
  prefixes: [Linking.createURL('/')],
  config: {
    screens: {
      Stack: {
        screens: {
          SignIn: 'signin',
          SignUp: 'signup',
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
