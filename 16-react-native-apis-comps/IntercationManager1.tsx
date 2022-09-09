import React, { useState, useEffect } from "react";
import {
  Alert,
  Animated,
  InteractionManager,
  Platform,
  PromiseTask,
  StyleSheet,
  Text,
  View,
} from "react-native";

const instructions = Platform.select({
  ios: "Press Cmd+R to reload,\n" + "Cmd+D or shake for dev menu",
  android:
    "Double tap R on your keyboard to reload,\n" +
    "Shake or press menu button for dev menu",
});

const useMount: (f: Function) => void = func => useEffect(() => func(), []);

const useFadeIn = (duration = 5000) => {
  const [opacity] = useState(new Animated.Value(0));

  // Running the animation when the component is mounted
  useMount(() => {
    // Animated.timing() create a interaction handle by default, if you want to disabled that
    // behaviour you can set isInteraction to false to disabled that.
    Animated.timing(opacity, {
      toValue: 1,
      duration,
      useNativeDriver: false,
    }).start();
  });

  return opacity;
};

interface BallProps {
  onShown: () => void;
}

const Ball = ({ onShown }: BallProps) => {
  const opacity = useFadeIn();
  let task: PromiseTask;

  // Running a method after the animation
  useMount(() => {
    const interactionPromise = InteractionManager.runAfterInteractions(() => onShown());
    return () => interactionPromise.cancel();
  });

  return <Animated.View style={[styles.ball, { opacity }]} />;
};

const InteractionManager1 = () => {
  return (
    <View style={styles.container}>
      <Text>{instructions}</Text>
      <Ball onShown={() => {
        // if (Platform.OS === 'web') {
          // console.log(alert("Animation is done"));
        // } else {
          Alert.alert("Animation is done")
        // };
      }} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  ball: {
    width: 100,
    height: 100,
    backgroundColor: "salmon",
    borderRadius: 100,
  },
});

export default InteractionManager1;