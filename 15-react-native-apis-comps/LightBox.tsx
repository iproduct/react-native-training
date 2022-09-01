import React, { Component } from 'react';
import { Animated, Dimensions, ImageBackground, ImageStore, ScaledSize, ScrollView, StyleSheet, Text, View } from 'react-native';

const BASE_URL = 'localhost:19000';
export const SAMPLE_IMAGES = [
    `http://${BASE_URL}/assets/image/kunstliche-intelligenz-1603866343eG3.jpg`,
    `http://${BASE_URL}/assets/image/jeune-femme-poste-de-travail.jpg`,
    `http://${BASE_URL}/assets/image/ordinateur-apple-ipad.jpg`,
    `http://${BASE_URL}/assets/image/poste-de-travail-pc-portable-cafe.jpg`,
    `http://${BASE_URL}/assets/image/computer-memory-chips.jpg`,
    `http://${BASE_URL}/assets/image/dog-using-laptop-computer.jpg`,
];

const window = Dimensions.get("window");

interface LightBoxProps {
    images: string[];
    height: number;
}

interface LightBoxState {
    window: ScaledSize;
}

export default class LightBox extends Component<LightBoxProps, LightBoxState> {
    scrollX = new Animated.Value(0);

    state: Readonly<LightBoxState> = {
        window
    }

    onDimensionsChange = ({ window }: { window: ScaledSize; }) => this.setState({ window })

    componentDidMount(): void {
        Dimensions.addEventListener("change", this.onDimensionsChange);
    }

    render() {
        const windowWidth = this.state.window.width;
        const imageHeight = Math.floor(0.8 * this.props.height);
        return (
            <View style={{ ...styles.scrollContainer, ...{ height: this.props.height, width: windowWidth } }}>
                <ScrollView
                    style={{ width: windowWidth }}
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
                        }])
                    }
                    scrollEventThrottle={1}
                >
                    {
                        this.props.images.map((image, index) => (
                            <View style={{
                                width: windowWidth,
                                height: imageHeight,
                            }} key={index}>
                                <ImageBackground source={{ uri: image }} style={styles.card}>
                                    <View style={styles.textContainer}>
                                        <Text style={styles.imageText}>Image - {index + 1} </Text>
                                    </View>
                                </ImageBackground>
                            </View>
                        ))
                    }
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    scrollContainer: {
        alignItems: 'center',
        justifyContent: 'center'
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
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        paddingHorizontal: 24,
        paddingVertical: 8,
        borderRadius: 5,
    },
    imageText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
})
