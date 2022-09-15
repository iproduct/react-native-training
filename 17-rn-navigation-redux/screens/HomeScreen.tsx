import { DrawerScreenProps } from "@react-navigation/drawer";
import { CompositeScreenProps } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Button, Text, View } from "react-native";
import { DrawerParamList } from "../Main";
import { StackParamList } from "../navigation/StackNavigator";

type DetailsScreenProps = CompositeScreenProps<
  NativeStackScreenProps<StackParamList, 'Home'>,
  DrawerScreenProps<DrawerParamList>
>

export function HomeScreen({ navigation }: DetailsScreenProps) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      <Button
        title="Go to Details"
        onPress={() => {
          /* 1. Navigate to the Details route with params */
          navigation.push('Details', {
            itemId: 86,
            otherParam: 'anything you want here',
          });
        }}
      />
    </View>
  );
}