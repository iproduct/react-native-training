import { Asset } from "expo-asset/build/Asset";
import { useEffect, useState } from "react";
import Constants from 'expo-constants';
import { Dimensions, LayoutAnimation, RefreshControl, SafeAreaView, StyleSheet, Text } from "react-native";
import AlertDemo from "./AlertDemo";
import AppAnimation01 from "./AppAnimation01";
import AppAnimation02 from "./AppAnimation02";
import AppEasing from "./AppEasing";
import AsyncStorageDemo from "./AsyncStorageDemo";
import AsyncStorageDemoClass from "./AsyncStorageDemoClass";
import CheckBoxDemo from "./CheckBoxDemo";
import Draggable from "./Draggable";
import GestureResponder from "./GestureResponder";
import InteractionManager1 from "./IntercationManager1";
import LayoutAnimationDemo2 from "./LayoutAnimationDemo2";
import LightBox from "./LightBox";
import RefreshControlDemo from "./RefreshControl";
import ScrollViewAnimatedHeader from "./ScrollViewAnimatedHeader";
import Stagger from "./Stagger";
const BASE_URL = 'http://localhost:19000';

export const SAMPLE_IMAGES = [
    require(`./assets/image/kunstliche-intelligenz-1603866343eG3.jpg`),
    require(`./assets/image/jeune-femme-poste-de-travail.jpg`),
    require(`./assets/image/ordinateur-apple-ipad.jpg`),
    require(`./assets/image/poste-de-travail-pc-portable-cafe.jpg`),
    require(`./assets/image/computer-memory-chips.jpg`),
    require(`./assets/image/dog-using-laptop-computer.jpg`),
];

const DATA = {
    'positions': [
        { key: 'first', value: true },
        { key: 'second', value: true },
        { key: 'third', value: true },
        { key: 'fourth', value: true },
        { key: 'fifth', value: true },
    ],

    'colors': [
        { key: 'red', value: true },
        { key: 'green', value: true },
        { key: 'blue', value: true },
        { key: 'white', value: true },
        { key: 'black', value: true },
    ],

    'days': [
        { key: 'Monday', value: true },
        { key: 'Tuesday', value: true },
        { key: 'Wednesday', value: true },
        { key: 'Thursday', value: true },
        { key: 'Friday', value: true },
    ],


};

export default () => {
    const [localUris, setLocalUris] = useState<(string)[]>();
    useEffect(() => {
        Asset.loadAsync(SAMPLE_IMAGES)
            .then(localUris => setLocalUris(localUris.map(asset => asset.localUri ?? '')));
    }, SAMPLE_IMAGES)
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.header}>{Constants.manifest?.extra?.fact}</Text>
            <LightBox images={localUris} height={400} width={800} />
        </SafeAreaView>
        // <Draggable />
        // <LayoutAnimationDemo2 sections={DATA} title='LayoutAnimation Demo 2' />
        // <RefreshControlDemo />
        // <SwitchDemo />
        // <CheckBoxDemo />
        // <AlertDemo />
        // <InteractionManager1 />
        // <AsyncStorageDemoClass />
    )
}

const styles = StyleSheet.create({
    header: {
        fontSize: 28    
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})