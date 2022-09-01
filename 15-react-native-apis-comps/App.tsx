import { Dimensions, SafeAreaView, StyleSheet } from "react-native";
import AppAnimation01 from "./AppAnimation01";
import AppAnimation02 from "./AppAnimation02";
import AppEasing from "./AppEasing";
import GestureResponder from "./GestureResponder";
import LightBox, { SAMPLE_IMAGES } from "./LightBox";
import ScrollViewAnimatedHeader from "./ScrollViewAnimatedHeader";
import Stagger from "./Stagger";

export default () =>
(
    <SafeAreaView style={styles.container}>
        <LightBox images={SAMPLE_IMAGES} height={400} />
    </SafeAreaView>
)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})