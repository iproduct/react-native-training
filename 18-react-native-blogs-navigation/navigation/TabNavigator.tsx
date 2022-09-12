/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { FontAwesome } from '@expo/vector-icons';
import { createMaterialTopTabNavigator, MaterialTopTabScreenProps } from '@react-navigation/material-top-tabs';
import { NavigationContainer, DefaultTheme, DarkTheme, CompositeScreenProps, RouteProp, NavigatorScreenParams } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack';
import * as React from 'react';
import { Button, ColorSchemeName, Linking, Pressable, useWindowDimensions } from 'react-native';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import ModalScreen from '../screens/ModalScreen';
import NotFoundScreen from '../screens/NotFoundScreen';
import TabOneScreen from '../screens/TabOneScreen';
import TabTwoScreen from '../screens/TabTwoScreen';
import LinkingConfiguration from './LinkingConfiguration';
import { createDrawerNavigator, DrawerContentComponentProps, DrawerContentScrollView, DrawerItem, DrawerItemList, DrawerScreenProps, useDrawerProgress } from '@react-navigation/drawer';
import AboutScreen from '../screens/AboutScreen';
import Animated, { Adaptable } from 'react-native-reanimated';
import { Post } from '../model/posts.model';
import { FilterType, PostListener } from '../model/shared-types';
import PostList from '../components/PostList';
import { RootDrawerParamList } from './DrawerNavigator';

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

 export interface TabNavigatorProps {
  posts: Post[];
  page: number;
  filter: FilterType;
  editedPost: Post;
  scrollIndex: number;
  onDelete: PostListener;
  onEdit: PostListener;
  onLoadMorePosts: () => void;
}


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

export type TabNavigatorScreenProps = DrawerScreenProps<RootDrawerParamList, 'Posts'>
  & TabNavigatorProps;

const BottomTab = createMaterialTopTabNavigator<RootTabParamList>();

export function TabNavigator({ navigation, route, ...rest }: TabNavigatorScreenProps) {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="TabOne"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
      }}>
      <BottomTab.Screen
        name="TabOne"
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
      >
        {(props) => (<PostList {...rest} />)}
      </BottomTab.Screen>
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
