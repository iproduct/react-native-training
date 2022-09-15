import { DrawerScreenProps } from "@react-navigation/drawer";
import { NavigatorScreenParams } from "@react-navigation/native";
import { StackParamList } from "../navigation/StackNavigator";

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
