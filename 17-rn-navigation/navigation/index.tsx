/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { FontAwesome } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { Button, ColorSchemeName, Linking, Pressable } from 'react-native';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import ModalScreen from '../screens/ModalScreen';
import NotFoundScreen from '../screens/NotFoundScreen';
import TabOneScreen from '../screens/TabOneScreen';
import TabTwoScreen from '../screens/TabTwoScreen';
import { DrawerParamList, StackParamList, RootTabParamList, RootTabScreenProps, MyDrawerScreenProps } from '../types';
import LinkingConfiguration from './LinkingConfiguration';
import { createDrawerNavigator, DrawerContentComponentProps, DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer';
import AboutScreen from '../screens/AboutScreen';
import { HomeScreen } from '../screens/HomeScreen';
import { DetailsScreen } from '../screens/DetailsScreen';
import { Component, useContext } from 'react';
import { LoggedUserData } from '../model/sign-in';
import { Credentials } from '../components/LoginForm';
import { SignInService } from '../service/signin-service';
import SignInScreen from '../screens/SignInScreen';

const Drawer = createDrawerNavigator<DrawerParamList>();

interface MainNavigationProps {
  colorScheme: ColorSchemeName;
}

interface MainNavigationState {
  loggedUser: LoggedUserData | undefined;
}

export const LoggedUserContext = React.createContext<LoggedUserData | undefined>(undefined)

export default class MainNavigation extends Component<MainNavigationProps, MainNavigationState>{
  state: Readonly<MainNavigationState> = {
    loggedUser: undefined,
  }
  handleSignIn = async (credentials: Credentials) => {
    const loggedUser = await SignInService.signIn(credentials);
    this.setState({ loggedUser });
  }
  // const dimensions = useWindowDimensions();
  // const isLargeScreen = dimensions.width >= 768;
  render() {
    return (
      <LoggedUserContext.Provider value={this.state.loggedUser}>
        <NavigationContainer
          linking={LinkingConfiguration}
          theme={this.props.colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
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
              {(props) => (<StackNavigator {...props} onSignIn={this.handleSignIn} />)}
            </Drawer.Screen>
            <Drawer.Screen name="About" component={AboutScreen} options={{ title: 'About' }} />
            <Drawer.Group>
              <Stack.Screen name="Modal" component={ModalScreen} />
            </Drawer.Group>
            <Drawer.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
          </Drawer.Navigator>
          {/* <RootNavigator /> */}
        </NavigationContainer>
      </LoggedUserContext.Provider>
    );
  }
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

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<StackParamList>();

export interface SignInCustomProps {
  onSignIn: (credentials: Credentials) => void
}

function StackNavigator({ navigation, route, onSignIn }: MyDrawerScreenProps<'Stack'> & SignInCustomProps) {
  const loggedUser = useContext(LoggedUserContext);
  return (
    <Stack.Navigator>
      {!loggedUser ? (
        <>
          <Stack.Screen
            name="SignIn"
            options={{
              title: 'Sign in',
              // When logging out, a pop animation feels intuitive
              // You can remove this if you want the default 'push' animation
              animationTypeForReplace: loggedUser ? 'push' : 'pop',
            }}
          >
            {(props) => (<SignInScreen {...props} onSignIn={onSignIn} />)}
          </Stack.Screen>
        </>
      ) : (
        <>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Details" component={DetailsScreen} />
          <Stack.Screen name="TabNavigator" component={BottomTabNavigator} options={{ headerShown: false }} />
          <Stack.Group screenOptions={{ presentation: 'modal' }}>
            <Stack.Screen name="Modal" component={ModalScreen} />
          </Stack.Group>
        </>)
      }

    </Stack.Navigator>
  );
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="TabOne"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
      }}>
      <BottomTab.Screen
        name="TabOne"
        component={TabOneScreen}
        options={({ navigation }: RootTabScreenProps<'TabOne'>) => ({
          title: 'Users',
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
          headerRight: () => (
            <Pressable
              onPress={() => navigation.navigate('Modal')}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
              })}>
              <FontAwesome
                name="info-circle"
                size={25}
                color={Colors[colorScheme].text}
                style={{ marginRight: 15 }}
              />
            </Pressable>
          ),
        })}
      />
      <BottomTab.Screen
        name="TabTwo"
        component={TabTwoScreen}
        options={{
          title: 'Blogs',
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
        }}
      />
    </BottomTab.Navigator>
  );
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}
