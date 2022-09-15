/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { FontAwesome } from '@expo/vector-icons';
import { NavigationContainer, DefaultTheme, DarkTheme, NavigatorScreenParams } from '@react-navigation/native';
import * as React from 'react';
import { Button, ColorSchemeName, Linking } from 'react-native';

import ModalScreen from './screens/ModalScreen';
import NotFoundScreen from './screens/NotFoundScreen';
import LinkingConfiguration from './navigation/LinkingConfiguration';
import { createDrawerNavigator, DrawerContentComponentProps, DrawerContentScrollView, DrawerItem, DrawerItemList, DrawerScreenProps } from '@react-navigation/drawer';
import AboutScreen from './screens/AboutScreen';
import { Component } from 'react';
import { LoggedUserData } from './model/sign-in';
import { Credentials } from './components/LoginForm';
import { StackNavigator, StackParamList } from './navigation/StackNavigator';
import * as SecureStore from 'expo-secure-store';
import { User } from './model/user';
import { AuthAPI, SignInAPI } from './service/rest-api-auth-client';
import { UsersAPI } from './service/rest-api-client';


/* Redux types */
interface ReduxStoreState {
  isLoading: boolean;
  isSignout: boolean;
  isSignUp: boolean;
  loggedUser: LoggedUserData | null,
}

export type AuthActionType = 'RESTORE_TOKEN' | 'SIGN_IN_START' | 'SIGN_IN_SUCCESS' | 'SIGN_OUT' | 'SIGN_UP';

interface AuthAction {
  type: AuthActionType;
  loggedUser: LoggedUserData | null;
}
interface AuthAction {
  type: AuthActionType;
  loggedUser: LoggedUserData | null;
}

/* LoginService interface */
export interface LoginService {
  signInStart: () => void;
  signInComplete: (credentials: Credentials) => void;
  signUpStart: () => void;
  signUpComplete: (user: User) => void;
  signOut: () => void;
}


/* DrawerNavigator types */
declare global {
  namespace ReactNavigation {
    interface RootParamList extends DrawerParamList { }
  }
}

export type DrawerParamList = {
  About: undefined;
  Stack: NavigatorScreenParams<StackParamList> | undefined;
  Modal: undefined;
  NotFound: undefined;
}

export type MyDrawerScreenProps<Screen extends keyof DrawerParamList> = DrawerScreenProps<
  DrawerParamList,
  Screen
>;

interface MainProps {
  colorScheme: ColorSchemeName;
}

interface MainState {
  loggedUser: LoggedUserData | undefined;
}

/* Create gobal contexts */
export const AuthContext = React.createContext<LoginService>({
  signInStart() { },
  signInComplete(credentials: Credentials) { },
  signUpStart() { },
  signUpComplete(user: User) { },
  signOut() { },
});
export const StoreStateContext = React.createContext<ReduxStoreState | null>(null);

const Drawer = createDrawerNavigator<DrawerParamList>();

/* Main app component */
export default function Main({ colorScheme }: MainProps) {
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
    {
      isLoading: true,
      isSignout: false,
      isSignUp: false,
      loggedUser: null,
    }
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
      dispatch({ type: 'RESTORE_TOKEN', loggedUser });
    };

    bootstrapAsync();
  }, []);

  const authContext = React.useMemo(
    () => ({
      signInStart: () => {
        dispatch({ type: 'SIGN_IN_START', loggedUser: null })
      },
      signInComplete: async (credentials: Credentials) => {
        const loggedUser = await SignInAPI.signIn(credentials);
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
      signOut: () => dispatch({ type: 'SIGN_OUT', loggedUser: null }),
    }),
    []
  );

  // const dimensions = useWindowDimensions();
  // const isLargeScreen = dimensions.width >= 768;
  return (
    <AuthContext.Provider value={authContext}>
      <StoreStateContext.Provider value={state}>
        <NavigationContainer
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
            }}
          // screenOptions={{
          //   drawerType: isLargeScreen ? 'permanent' : 'back',
          //   drawerStyle: isLargeScreen ? null : { width: '100%' },
          //   overlayColor: 'transparent',
          // }}
          >
            <Drawer.Screen name="Stack" component={StackNavigator} />
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
