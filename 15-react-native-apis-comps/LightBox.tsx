import React, { Component, createRef } from 'react';
import { Animated, Dimensions, ImageBackground, ImageStore, Pressable, ScaledSize, ScrollView, StyleSheet, Text, View } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Hoverable from './hover-web/Hoverable';

const DEFAULT_HEIGHT = 300;
const window = Dimensions.get("window");

interface LightBoxProps {
    images: string[] | undefined;
    height?: number;
    width?: number;
}

interface LightBoxState {
    window: ScaledSize;
    isImageHovered: boolean;
}

const createLogger = (...msg: string[]) => () => {
    console.log(...msg);
};

export default class LightBox extends Component<LightBoxProps, LightBoxState> {
    scrollX = new Animated.Value(0);
    scrollViewRef = createRef<ScrollView>();

    state: Readonly<LightBoxState> = {
        window,
        isImageHovered: false,
    }

    onDimensionsChange = ({ window }: { window: ScaledSize; }) => this.setState({ window })

    async componentDidMount() {
        Dimensions.addEventListener("change", this.onDimensionsChange);
        
    }

    get width() {
        return this.props.width ? Math.min(this.props.width, this.state.window.width) : this.state.window.width;
    }

    get textBackgroundColor() {
        return `rgba(0, 0, 0, ${this.state.isImageHovered ? 0.7 : 0.3})`
    }

    get textColor() {
        return `rgba(255, 255, 255, ${this.state.isImageHovered ? 0.9 : 0.3})`
    }

    scrollToIndex = (index: number) => {
        const width = this.width;
        const offset = width * index;
        this.scrollViewRef.current?.scrollTo({ x: offset, y: 0, animated: true });
    }

    render() {
        const height = this.props.height || DEFAULT_HEIGHT;
        const width = this.width;
        const imageHeight = Math.floor(0.9 * height);
        return (
            <View style={{ ...styles.scrollContainer, ...{ height: height } }}>
                <ScrollView ref={this.scrollViewRef}
                    style={{ width }}
                    horizontal={true}
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    onScroll={
                        Animated.event([{
                            nativeEvent: {
                                contentOffset: {
                                    x: this.scrollX
                                }
                            }
                        }], { useNativeDriver: false })
                    }
                    scrollEventThrottle={1}
                >
                    {
                        this.props.images?.map((image, index) => (
                            <View style={{
                                width,
                                height: imageHeight,
                            }} key={index}>
                                <Pressable style={{ flex: 1 }}
                                    onPressIn={() => this.setState({ isImageHovered: true })}
                                    onPressOut={() => this.setState({ isImageHovered: false })}>
                                    <Hoverable
                                        onHoverIn={() => this.setState({ isImageHovered: true })}
                                        onHoverOut={() => this.setState({ isImageHovered: false })}
                                    >
                                        <ImageBackground source={{ uri: image }} style={styles.card}>
                                            <Hoverable
                                                onHoverIn={() => this.setState({ isImageHovered: true })}
                                                onHoverOut={() => this.setState({ isImageHovered: false })}
                                            >
                                                <View style={styles.textContainer}>
                                                    <FontAwesome.Button style={styles.chevron}
                                                        backgroundColor={this.textBackgroundColor}
                                                        name="chevron-left" size={32} color={this.textColor}
                                                        onPress={() => this.scrollToIndex(index - 1)} />
                                                    <Text style={[styles.imageText,
                                                    {
                                                        backgroundColor: this.textBackgroundColor,
                                                        color: this.textColor,
                                                    }]}>Image - {index + 1} </Text>
                                                    <FontAwesome.Button style={styles.chevron} backgroundColor={this.textBackgroundColor}
                                                        name="chevron-right" size={32} color={this.textColor}
                                                        onPress={() => this.scrollToIndex(index + 1)} />
                                                </View>
                                            </Hoverable>
                                        </ImageBackground>
                                    </Hoverable>
                                </Pressable>
                            </View>
                        ))
                    }
                </ScrollView>
                <View style={styles.indicatorContainer}>
                    {this.props.images?.map((image, index) => {
                        const animatedWidth = this.scrollX.interpolate({
                            inputRange: [
                                width * (index - 1),
                                width * index,
                                width * (index + 1)
                            ],
                            outputRange: [20, 40, 20],
                            extrapolate: 'clamp',

                        })
                        return (
                            <Pressable key={index} onPress={() => this.scrollToIndex(index)}>
                                <Animated.View style={[styles.dot, { width: animatedWidth }]}>
                                </Animated.View>
                            </Pressable>
                        );
                    })}
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    scrollContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    card: {
        flex: 1,
        marginVertical: 4,
        marginHorizontal: 16,
        borderRadius: 5,
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center',
    },
    textContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    imageText: {
        paddingHorizontal: 24,
        paddingVertical: 8,
        borderRadius: 5,
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    indicatorContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    dot: {
        height: 20,
        width: 20,
        borderRadius: 10,
        backgroundColor: 'silver',
        marginHorizontal: 10,
    },
    chevron: {
        paddingRight: 0,
        backgroundColor: 'transparent',
    }
})
