import React, { Component } from 'react'
import { Animated, ScrollView, StyleSheet, Text } from 'react-native';

const ITEM_WIDTH = 300;

const arrValues: number[] = [];
for (let i = 1; i < 500; i++) {
    arrValues.push(i);
}

export default class Stagger extends Component {

    animatedValue = arrValues.map(val => new Animated.Value(0))

    componentDidMount(): void {
        this.animate();
    }

    animate() {
        const animations = arrValues.map((val, index) => Animated.timing(this.animatedValue[index], {
            toValue: 1,
            duration: 3000,
            useNativeDriver: true,
        }));
        Animated.stagger(20, animations).start();
    }

    render() {
        const animItems = arrValues.map((val, index) => (
            <Animated.View key={index} style={[styles.item, {opacity: this.animatedValue[index]}]}>
                <Text style={styles.text}>Item {val}</Text>
            </Animated.View>
        ));
        return (
            <ScrollView contentContainerStyle={styles.container}>
                {animItems}
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    item: {
      backgroundColor: '#ccc',
      padding: 10,
      borderWidth: 1,
      borderColor: '#aaa',
      borderRadius: 5,
      width: ITEM_WIDTH,
      textAlign: 'center',
      marginLeft: 0,
      marginTop: 3,
    },
    text: {
        fontSize: 20,
    },
    container: {
    }
});