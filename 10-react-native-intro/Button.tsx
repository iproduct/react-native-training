import React from 'react';
import { Text, View, StyleSheet, Pressable, GestureResponderEvent } from 'react-native';

interface ButtonProps {
    onPress: (event: GestureResponderEvent) => void;
    title: string;
    style: any;
}

export default function Button(props: ButtonProps) {
  const { onPress, title = 'Save', style = {}} = props;
  return (
    <Pressable style={{...styles.button, ...style}} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'black',
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
});