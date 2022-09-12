/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { FontAwesome } from '@expo/vector-icons';
import { createMaterialTopTabNavigator, MaterialTopTabScreenProps } from '@react-navigation/material-top-tabs';
import { NavigationContainer, DefaultTheme, DarkTheme, CompositeScreenProps, RouteProp } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { Button, ColorSchemeName, Linking, Pressable, useWindowDimensions } from 'react-native';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import ModalScreen from '../screens/ModalScreen';
import NotFoundScreen from '../screens/NotFoundScreen';
import TabOneScreen from '../screens/TabOneScreen';
import TabTwoScreen from '../screens/TabTwoScreen';
import { RootDrawerParamList, RootStackParamList} from '../types';
import LinkingConfiguration from './LinkingConfiguration';
import { createDrawerNavigator, DrawerContentComponentProps, DrawerContentScrollView, DrawerItem, DrawerItemList, DrawerScreenProps, useDrawerProgress } from '@react-navigation/drawer';
import AboutScreen from '../screens/AboutScreen';
import Animated, { Adaptable } from 'react-native-reanimated';
import { Post } from '../model/posts.model';
import { FilterType } from '../model/shared-types';

const Drawer = createDrawerNavigator<RootDrawerParamList>();

interface TabNavigatorProps {
  posts: Post[];
  page: number;
  filter: FilterType;
  editedPost: Post;
  scrollIndex: number;
}

interface NavigationProps extends TabNavigatorProps {
  colorScheme: ColorSchemeName;
}

export default function Navigation({ colorScheme, ...rest }: NavigationProps) {
  // const dimensions = useWindowDimensions();
  // const isLargeScreen = dimensions.width >= 768;
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Drawer.Navigator
        drawerContent={(props) => <CustomDrawerContent {...props} />}
        screenOptions={{
          drawerType: 'front',
          drawerStyle: {
            backgroundColor: '#c6cbef',
            width: 240,
          },
        }}
      // screenOptions={{
      //   drawerType: isLargeScreen ? 'permanent' : 'back',
      //   drawerStyle: isLargeScreen ? null : { width: '100%' },
      //   overlayColor: 'transparent',
      // }}
      >
        <Drawer.Screen name="Root">
          {(props) => <TabNavigator {...props} {...rest}/>}
        </Drawer.Screen>
        <Drawer.Screen name="About" component={AboutScreen} options={{ title: 'About' }} />
        {/* <Drawer.Screen name="Stack" component={RootNavigator} /> */}
        <Drawer.Group>
          <Drawer.Screen name="Modal" component={ModalScreen} />
        </Drawer.Group>
      </Drawer.Navigator>
      {/* <RootNavigator /> */}
    </NavigationContainer>
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

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
// const Stack = createNativeStackNavigator<RootStackParamList>();

// function RootNavigator() {
//   return (
//     <Stack.Navigator>
//       <Stack.Screen name="Root" component={TabNavigator} options={{ headerShown: false }} />
//       <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
//       <Stack.Group screenOptions={{ presentation: 'modal' }}>
//         <Stack.Screen name="Modal" component={ModalScreen} />
//       </Stack.Group>
//     </Stack.Navigator>
//   );
// }

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */

export type RootTabScreenProps<Screen extends keyof RootTabParamList> = CompositeScreenProps<
  MaterialTopTabScreenProps<RootTabParamList, Screen>,
  DrawerScreenProps<RootDrawerParamList>
>

// export type TabNavigatorScreenProps = DrawerScreenProps<RootDrawerParamList> & TabNavigatorProps;


export type RootTabParamList = {
  TabOne: undefined;
  TabTwo: undefined;
};

// export type TabNavigatorScreenProps<Screen extends keyof RootTabParamList> = CompositeScreenProps<
//   MaterialTopTabScreenProps<RootTabParamList, Screen>,
//   DrawerScreenProps<RootDrawerParamList>
// > & TabNavigatorProps;

export type TabNavigatorScreenProps = DrawerScreenProps<RootDrawerParamList, 'Root'>
 & TabNavigatorProps;

const BottomTab = createMaterialTopTabNavigator<RootTabParamList>();

function TabNavigator(props: TabNavigatorScreenProps) {
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
