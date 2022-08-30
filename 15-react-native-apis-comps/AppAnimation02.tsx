import React, { useState, useEffect, useRef } from 'react';
import { View, Animated, Easing, Pressable, Text, StyleSheet } from 'react-native';
const { add, multiply, divide, subtract, spring } = Animated;

export default () => {
  const firstOpacity = useRef(
    new Animated.Value(0)
  ).current;

  const secondOpacity = useRef(
    new Animated.Value(0)
  ).current;

  const thirdOpacity = useRef(
    new Animated.Value(0)
  ).current;

  useEffect(() => {
    Animated.stagger(500, [
      Animated.timing(firstOpacity, {
        toValue: 1,
        useNativeDriver: true,
      }),
      Animated.timing(secondOpacity, {
        toValue: 1,
        useNativeDriver: true,
      }),
      Animated.timing(thirdOpacity, {
        toValue: 1,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <>
      <Animated.View
        style={{
          width: 100,
          height: 100,
          backgroundColor: 'orange',
          marginBottom: 10,
          opacity: firstOpacity,
        }}
      />

      <Animated.View
        style={{
          width: 100,
          height: 100,
          backgroundColor: 'orange',
          marginBottom: 10,
          opacity: secondOpacity,
        }}
      />

      <Animated.View
        style={{
          width: 100,
          height: 100,
          backgroundColor: 'orange',
          opacity: thirdOpacity,
        }}
      />
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