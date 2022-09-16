/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { FontAwesome } from '@expo/vector-icons';
import { NavigationContainer, DefaultTheme, DarkTheme, NavigatorScreenParams, useNavigationContainerRef } from '@react-navigation/native';
import * as React from 'react';
import { Button, ColorSchemeName, Linking, Pressable, StyleSheet } from 'react-native';

import ModalScreen from '../screens/ModalScreen';
import NotFoundScreen from '../screens/NotFoundScreen';
import LinkingConfiguration from './LinkingConfiguration';
import { createDrawerNavigator, DrawerContentComponentProps, DrawerContentScrollView, DrawerItem, DrawerItemList, DrawerScreenProps } from '@react-navigation/drawer';
import AboutScreen from '../screens/AboutScreen';
import { LoggedUserData } from '../model/sign-in';
import { Credentials } from '../components/LoginForm';
import { StackNavigator } from './StackNavigator';
import * as SecureStore from 'expo-secure-store';
import { User } from '../model/user';
import { AuthAPI } from '../service/rest-api-auth-client';
import { DrawerParamList } from '../model/drawer-types';
import { AuthAction, AuthContext, INITIAL_AUTH_STORE_STATE, ReduxStoreState, StoreStateContext } from '../model/contexts';
import { Text } from '../components/Themed';
import { useReduxDevToolsExtension } from '@react-navigation/devtools';


/* DrawerNavigator types */
declare global {
  namespace ReactNavigation {
    interface RootParamList extends DrawerParamList { }
  }
}

interface MainProps {
  colorScheme: ColorSchemeName;
}

interface MainState {
  loggedUser: LoggedUserData | undefined;
}


const Drawer = createDrawerNavigator<DrawerParamList>();

/* Main app component */
export default function Main({ colorScheme }: MainProps) {
  // Redux-Devtools integration
  const navigationRef = useNavigationContainerRef();
  useReduxDevToolsExtension(navigationRef);

  // Auth reducers
  const [state, dispatch] = React.useReducer(
    (prevState: ReduxStoreState, action: AuthAction) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            loggedUser: action.loggedUser,
            isLoading: false,
          };
        case 'SIGN_IN_START':
          return {
            ...prevState,
            isSignout: false,
            isSignUp: false,
            loggedUser: null,
          };
        case 'SIGN_IN_SUCCESS':
          return {
            ...prevState,
            isSignout: false,
            isSignUp: false,
            loggedUser: action.loggedUser,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            loggedUser: null,
          };
        case 'SIGN_UP':
          return {
            ...prevState,
            isSignUp: true,
          };

      }
    },
    INITIAL_AUTH_STORE_STATE
  );

  // load state from SecureStore
  React.useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let loggedUser: LoggedUserData | null = null;

      try {
        const loggedUserString = await SecureStore.getItemAsync('loggedUser');
        if (loggedUserString) {
          loggedUser = JSON.parse(loggedUserString);
        }
      } catch (e) {
        // Restoring token failed
      }
      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      dispatch({ type: 'SIGN_IN_SUCCESS', loggedUser });
    };

    bootstrapAsync();
  }, []);

  const authContext = React.useMemo(
    () => ({
      signInStart: () => {
        dispatch({ type: 'SIGN_IN_START', loggedUser: null })
      },
      signInComplete: async (credentials: Credentials) => {
        const loggedUser = await AuthAPI.signIn(credentials);
        await SecureStore.isAvailableAsync() && SecureStore.setItemAsync('loggedUser', JSON.stringify(loggedUser))
        console.log(loggedUser);
        dispatch({ type: 'SIGN_IN_SUCCESS', loggedUser });
      },
      signUpStart: () => {
        dispatch({ type: 'SIGN_UP', loggedUser: null })
      },
      signUpComplete: async (user: User) => {
        await AuthAPI.signUp(user);
        dispatch({ type: 'SIGN_IN_START', loggedUser: null })
      },
      signOut: async () => {
        await SecureStore.isAvailableAsync() && SecureStore.deleteItemAsync('loggedUser');
        dispatch({ type: 'SIGN_OUT', loggedUser: null });
      },
    }),
    []
  );

  // const dimensions = useWindowDimensions();
  // const isLargeScreen = dimensions.width >= 768;
  return (
    <AuthContext.Provider value={authContext}>
      <StoreStateContext.Provider value={state}>
        <NavigationContainer
          ref={navigationRef}
          linking={LinkingConfiguration}
          theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          <Drawer.Navigator
            drawerContent={(props) => <CustomDrawerContent {...props} />}
            screenOptions={{
              drawerType: 'front',
              drawerStyle: {
                // backgroundColor: '#c6cbef',
                width: 240,
              },
              headerRight: () => (state.loggedUser && (
                <Pressable style={styles.signoutButton} onPress={authContext.signOut}>
                  <Text style={styles.signoutButtonText}>Sign Out</Text>
                </Pressable>
              )),
            }}
          // screenOptions={{
          //   drawerType: isLargeScreen ? 'permanent' : 'back',
          //   drawerStyle: isLargeScreen ? null : { width: '100%' },
          //   overlayColor: 'transparent',
          // }}
          >
            <Drawer.Screen name="Stack" component={StackNavigator} options={{
              title: `My Blogs ${state?.loggedUser?.auth ? ': Welcome ' + state?.loggedUser?.user.firstName + '!' : ''}`
            }} />
            <Drawer.Screen name="About" component={AboutScreen} options={{ title: 'About' }} />
            <Drawer.Group>
              <Drawer.Screen name="Modal" component={ModalScreen} />
            </Drawer.Group>
            <Drawer.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
          </Drawer.Navigator>
          {/* <RootNavigator /> */}
        </NavigationContainer>
      </StoreStateContext.Provider>
    </AuthContext.Provider>
  );
}

function CustomDrawerContent(props: DrawerContentComponentProps) {
  const { navigation } = props;

  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem
        icon={({ focused, color, size }) =>
          <FontAwesome color={color} size={size} name={(focused ? 'heart' : 'heart-o') as any} />
        }
        label="Drawer Help ..."
        onPress={() => Linking.openURL('https://reactnavigation.org/docs/drawer-navigator')}
      />
      <Button
        title="Close Drawer"
        onPress={() => {
          // Navigate using the `navigation` prop that you received
          navigation.closeDrawer();
        }}
      />
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  signoutButton: {
    backgroundColor: "#B2C8DF",
    borderRadius: 10,
    padding: 10,
    marginRight: 10,
  },
  signoutButtonText: {
    fontSize: 20,
  },
});
