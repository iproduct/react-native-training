import React, { Component } from 'react'
import { Animated, FlatList, SafeAreaView, StyleSheet, Text, View, Dimensions } from 'react-native';

const ITEM_WIDTH = 300;
const PAGE_SIZE = 20;

type Item = string;

interface StaggerState {
    items: Item[];
    page: number;
}

export default class Stagger extends Component<{}, StaggerState> {
    state: Readonly<StaggerState> = {
        items: [],
        page: 0,
    };

    animatedValues: Animated.Value[] = [];

    componentDidMount(): void {
        this.loadMoreItems();
    }

    addAnimatedValues(newItems: Item[]) {
        newItems.forEach(item => this.animatedValues.push(new Animated.Value(0)));
        const newAnimations = newItems.map((val, index) =>
            Animated.timing(this.animatedValues[index + this.state.page * PAGE_SIZE], {
                toValue: 1,
                duration: 500,
                useNativeDriver: true,
            }));
        Animated.stagger(100, newAnimations).start();
    }

    addItems(newItems: Item[]) {
        this.addAnimatedValues(newItems);
        this.setState(({ items, page }) => ({ items: items.concat(newItems), page: page + 1 }));

    }

    loadMoreItems = () => {
        const newItems: Item[] = [];
        for (let i = this.state.page * PAGE_SIZE; i < (this.state.page + 1) * PAGE_SIZE; i++) {
            newItems.push(`Item ${i}`);
        }
        this.addItems(newItems);
    }

    render() {
        const animItems = this.state.items.map((val, index) => (
            <Animated.View key={index} style={[styles.item, {
                opacity: this.animatedValues[index],
                marginLeft: this.animatedValues[index].interpolate({
                    inputRange: [0, 1],
                    outputRange: [-ITEM_WIDTH, 0],
                    extrapolate: 'clamp',
                })
            }]}>
                <Text style={styles.text}>{val}</Text>
            </Animated.View>
        ));
        return (
            <SafeAreaView style={styles.container}>
                <FlatList
                    data={animItems}
                    renderItem={({ item }) => item}
                    onEndReachedThreshold={0.1}
                    onEndReached={this.loadMoreItems}
                >
                </FlatList>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        height: Dimensions.get('window').height,
    },
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
});