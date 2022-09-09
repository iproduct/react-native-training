import React, { useRef, useState } from 'react';
import {
    Animated,
    GestureResponderEvent,
    SafeAreaView,
    Text,
    useWindowDimensions,
    View,
} from 'react-native';
const CURSOR_SIDE_SIZE = 20;
const CURSOR_HALF_SIDE_SIZE = CURSOR_SIDE_SIZE / 2;
export default () => {
    const dimensions = useWindowDimensions();

    const touch = useRef(
        new Animated.ValueXY({
            x: dimensions.width / 2 -
                CURSOR_HALF_SIDE_SIZE,
            y: dimensions.height / 2 -
                CURSOR_HALF_SIDE_SIZE
        })
    ).current;

    const [locationX, setLocationX] = useState<number>();
    const [locationY, setLocationY] = useState<number>();
    const [pageX, setPageX] = useState<number>();
    const [pageY, setPageY] = useState<number>();
    const [target, setTarget] = useState<string>();

    return (
            <Animated.View style={{ flex: 1 }}
                onStartShouldSetResponder={() => true}
                onMoveShouldSetResponder={() => true}
                onResponderMove={(event) => {
                    const { pageX, pageY } = event.nativeEvent;
                    // if(locationX < 20 && locationY < 20) return;
                    touch.setValue({
                        x: pageX,
                        y: pageY,
                    });
                    setLocationX(event.nativeEvent.locationX);
                    setLocationY(event.nativeEvent.locationY);
                    setPageX(event.nativeEvent.pageX);
                    setPageY(event.nativeEvent.pageY);
                    setTarget(event.nativeEvent.target ?? 'no target');
                }}
                onResponderRelease={() => {
                    Animated.spring(touch, {
                        toValue: {
                            x:
                                dimensions.width / 2 -
                                CURSOR_HALF_SIDE_SIZE,
                            y:
                                dimensions.height / 2 -
                                CURSOR_HALF_SIDE_SIZE,
                        },
                        // left/top are not supported
                        useNativeDriver: false,
                    }).start();
                }}
            >
                <Text>
                    {`
                    
                    
`                   }
                    locationX: {locationX + ''}</Text>
                <Text>locationY: {locationY + ''}</Text>
                <Text>PageX: {pageX + ''}</Text>
                <Text>PageY: {pageY + ''}</Text>
                <Text>Target: {target + ''}</Text>
                <Animated.View
                    style={{
                        position: 'absolute',
                        left: Animated.subtract(touch.x, CURSOR_HALF_SIDE_SIZE),
                        top: Animated.subtract(touch.y, CURSOR_HALF_SIDE_SIZE),
                        height: CURSOR_SIDE_SIZE,
                        width: CURSOR_SIDE_SIZE,
                        borderRadius: CURSOR_HALF_SIDE_SIZE,
                        backgroundColor: 'orange',
                    }}
                />
            </Animated.View>
    );
};