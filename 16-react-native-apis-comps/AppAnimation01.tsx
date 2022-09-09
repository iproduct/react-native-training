import React, { useState, useEffect, useRef } from 'react';
import { View, Animated, Easing, Pressable, Text, StyleSheet } from 'react-native';
const { add, multiply, divide, subtract, spring } = Animated;

const INITIAL_POS = 50;

export default () => {
  // const [translation, setTranslation] = useState(100); // do not use state for animations!
  const translation = useRef(new Animated.ValueXY({ x: INITIAL_POS, y: INITIAL_POS })).current;
  const scale = divide(add(translation.x, translation.y), 200);
  // useEffect(() => {
  //   Animated.timing(translation, {
  //     toValue: 200,
  //     duration: 5000,
  //     easing: Easing.elastic(10),
  //     useNativeDriver: true,
  //   }).start();
  // }, []);

  const showAnimation = () => {
    Animated.sequence([
      spring(translation.x, {
        toValue: 300,
        restSpeedThreshold: 10,
        speed: 3,
        bounciness: 30,
        useNativeDriver: true,
      }),
      Animated.parallel(
        [
          spring(translation.x, {
            toValue: INITIAL_POS,
            restSpeedThreshold: 10,
            speed: 3,
            bounciness: 30,
            useNativeDriver: true,
          }),
          spring(translation.y, {
            toValue: 200,
            restSpeedThreshold: 10,
            speed: 3,
            bounciness: 30,
            useNativeDriver: true,
          }),
        ])
    ]).start(({ finished: boolean }) => {
      translation.setValue({ x: INITIAL_POS, y: INITIAL_POS });
    });
  }

  return (
    <>
      <Animated.View style={{
        width: 100,
        height: 100,
        backgroundColor: 'orange',
        transform: [{ translateX: translation.x }, { translateY: translation.y }, { scale: scale }, { rotate: '45deg' }]
      }} />
      <Pressable style={styles.button}
        onPress={showAnimation}>
        <Text>Show Animation</Text>
      </Pressable>
    </>
  );
};

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    zIndex: 1,
    top: 0,
    marginLeft: 200,
  },
});