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
import { SignInAPI } from './service/rest-api-client-signin';


/* Redux types */
interface ReduxStoreState {
  isLoading: boolean;
  isSignout: boolean;
  loggedUser: LoggedUserData | null,
}

export type AuthActionType = 'RESTORE_TOKEN' | 'SIGN_IN' | 'SIGN_OUT';

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
  signIn: (credentials: Credentials) => void;
  signOut: () => void;
  signUp: (user: User) => void;
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

const Drawer = createDrawerNavigator<DrawerParamList>();
const AuthContext = React.createContext<LoginService | null>(null);

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
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            loggedUser: action.loggedUser,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            loggedUser: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
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
      signIn: async (credentials: Credentials) => {
        const loggedUser = await SignInAPI.signIn(credentials);
        //         console.log(this.loggedUser);
        dispatch({ type: 'SIGN_IN', loggedUser });
      },
      signOut: () => dispatch({ type: 'SIGN_OUT', loggedUser: null }),
      signUp: async (user: User) => {
        // In a production app, we need to send user data to server and get a token
        // We will also need to handle errors if sign up failed
        // After getting token, we need to persist the token using `SecureStore`
        // In the example, we'll use a dummy token

        // dispatch({ type: 'SIGN_IN', loggedUser: 'dummy-auth-token' });
      },
    }),
    []
  );



  // state: Readonly<MainState> = {
  //   loggedUser: undefined,
  // }
  const handleSignIn = async (credentials: Credentials) => {
    authContext.signIn(credentials);
  }
  // const dimensions = useWindowDimensions();
  // const isLargeScreen = dimensions.width >= 768;
  return (
    <AuthContext.Provider value={authContext}>
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
          <Drawer.Screen name="Stack">
            {(props) => (<StackNavigator {...props} onSignIn={handleSignIn} />)}
          </Drawer.Screen>
          <Drawer.Screen name="About" component={AboutScreen} options={{ title: 'About' }} />
          <Drawer.Group>
            <Drawer.Screen name="Modal" component={ModalScreen} />
          </Drawer.Group>
          <Drawer.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
        </Drawer.Navigator>
        {/* <RootNavigator /> */}
      </NavigationContainer>
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
