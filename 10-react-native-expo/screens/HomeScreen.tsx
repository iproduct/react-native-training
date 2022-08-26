import { Text, View, Pressable} from "react-native";
import { RootStackScreenProps } from "../types";

export default function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      <Pressable
        onPress={() => navigation.openDrawer()}
        style={{ padding: 10, marginBottom: 10, marginTop: 10 }}
      >
      <Text>Open Drawer</Text>
      </Pressable>
    </View>
  );
}
