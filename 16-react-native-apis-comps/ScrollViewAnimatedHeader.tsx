import React, { useState, useEffect, useRef } from 'react';
import { ScrollView, View, StyleSheet, useWindowDimensions, Text, Dimensions, Platform, Animated } from 'react-native';
export default () => {
    const [headerShown, setHeaderShown] = useState(false);
    const [orientation, setOrientation] = useState('portrait');

    const { width, height } = useWindowDimensions();

    const isPortrait = () => {
        const dim = Dimensions.get('screen');
        return dim.height >= dim.width;
    };

    useEffect(() => {
        return () => {
            Dimensions.addEventListener('change', () => {
                setOrientation(isPortrait() ? 'portrait' : 'landscape');
            });
        };
    }, [])

    const scrolling = useRef(new Animated.Value(0)).current;
    // const headerPosition = useRef(new Animated.Value(-100)).current;

    // useEffect(() => {
    //     Animated.timing(headerPosition, {
    //         toValue: headerShown ? 0 : -100,
    //         duration: 250,
    //         useNativeDriver: true,
    //     }).start();
    // }, [headerShown]);

    return (
        <>
            <Animated.View style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: 100,
                backgroundColor: 'tomato',
                zIndex: 1,
                elevation: 1,
                transform: [
                    { translateY: scrolling.interpolate({
                        inputRange: [100, 130],
                        outputRange: [-100, 0],
                        extrapolate: 'clamp',
                      }) },
                ],
                opacity: 1,
            }}
            />

            <View style={{ height }}>
                <Animated.ScrollView
                    onScroll={Animated.event(
                        [{
                            nativeEvent: {
                                contentOffset: {
                                    y: scrolling,
                                },
                            },
                        }],
                        { 
                            useNativeDriver: true,
                            listener: (event) => console.log(event.nativeEvent)
                        },
                    )}
                    // onScroll={(event) => {
                    //     const scrolling = event.nativeEvent.contentOffset.y;

                    //     if (scrolling > 100) {
                    //         setHeaderShown(true);
                    //     } else {
                    //         setHeaderShown(false);
                    //     }
                    // }}
                    // onScroll will be fired every 16ms
                    scrollEventThrottle={16}
                    style={{ flex: 1 }}
                >
                    <View style={{ backgroundColor: '#ccc' }}>
                        <Text>{`
                        
                        
                        
                        `}
                            ORIENTATION: {orientation}
                            DIMENSIONS:
                            {width},
                            {height}
                            {`
                            React Native
                            From Wikipedia, the free encyclopedia
                            Jump to navigationJump to search
                            Text document with red question mark.svg
                            Some of this article's listed sources may not be reliable. Please help this article by looking for better, more reliable sources. Unreliable citations may be challenged or deleted. (February 2019) (Learn how and when to remove this template message)
                            React Native
                            React-icon.svg
                            Developer(s)	Meta and community
                            Initial release	March 26, 2015; 7 years ago[1]
                            Stable release
                            0.68 Edit this on Wikidata / 30 March 2022; 4 months ago
                            Repository	https://github.com/facebook/react-native
                            Written in	JavaScript, Java, C++, Objective-C, Python
                            Platform	Android, Android TV, iOS, macOS, tvOS, Web, Windows, UWP, and VR
                            Type	Application framework
                            License	MIT License
                            Website	reactnative.dev
                            React Native is an open-source UI software framework created by Meta Platforms, Inc.[2] It is used to develop applications for Android,[3][4] Android TV,[5] iOS,[4] macOS,[6] tvOS,[7] Web,[8] Windows[6] and UWP[9] by enabling developers to use the React framework along with native platform capabilities.[10] It is also being used to develop virtual reality applications at Oculus.[11]


                            Contents
                            1	History
                            2	Implementation
                            3	Hello World example
                            4	See also
                            5	References
                            History
                            In 2012 Mark Zuckerberg commented, "The biggest mistake we made as a company was betting too much on HTML as opposed to native".[12][13] Using HTML5 for Facebook's mobile version resulted in an unstable application that retrieved data slowly.[14] He promised Facebook would soon deliver a better mobile experience.

                            Inside Facebook, Jordan Walke found a way to generate UI elements for iOS from a background JavaScript thread, which became the basis for the React web framework. They decided to organize an internal Hackathon to perfect this prototype in order to be able to build native apps with this technology.[15]

                            In 2015, after months of development, Facebook released the first version for the React JavaScript Configuration. During a technical talk,[16] Christopher Chedeau explained that Facebook was already using React Native in production for their Group App and their Ads Manager App.[17]

                            Implementation
                            The working principles of React Native are virtually identical to React except that React Native does not manipulate the DOM via the Virtual DOM. It runs in a background process (which interprets the JavaScript written by the developers) directly on the end-device and communicates with the native platform via serialized data over an asynchronous and batched bridge.[18][19]

                            React components wrap existing native code and interact with native APIs via React's declarative UI paradigm and JavaScript.

                            While React Native styling has a similar syntax to CSS, it does not use HTML or CSS.[20] Instead, messages from the JavaScript thread are used to manipulate native views. With React Native developers have to write native code in the languages of the aimed platform such as Java or Kotlin for Android, Objective-C or Swift for iOS, and C++/WinRT or C# for Windows 10.[clarification needed]

                            Microsoft builds and maintains React Native for Windows and React Native for macOS.`}
                        </Text>
                    </View>
                </Animated.ScrollView>
            </View>
        </>
    );
}

