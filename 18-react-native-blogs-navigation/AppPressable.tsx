import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

const App = () => {
    const [timesPressed, setTimesPressed] = useState(0);

    let textLog = '';
    if (timesPressed > 1) {
        textLog = timesPressed + 'x onPress';
    } else if (timesPressed > 0) {
        textLog = 'onPress';
    }

    return (
        <View style={styles.container}>
            <Pressable
                onPress={() => {
                    setTimesPressed((current) => current + 1);
                }}
                hitSlop={100}
                android_ripple={{
                    color: '#aaaaff88',
                    foreground: true,
                }}
                style={({ pressed }) => [
                    {
                        backgroundColor: pressed
                            ? 'rgb(255, 230, 210)'
                            : 'white'
                    },
                    styles.wrapperCustom
                ]}>

                {({ pressed }) => (
                    <>
                        <Text style={styles.text}>
                            {pressed ? 'Pressed!' : 'Press Me'}
                        </Text>
                        <View style={styles.logBox}>
                            <Text style={styles.logBoxText} testID="pressable_press_console">{textLog}</Text>
                        </View>
                    </>
                )}
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
    },
    text: {
        fontSize: 24
    },
    wrapperCustom: {
        borderRadius: 8,
        padding: 6
    },
    logBox: {
        padding: 20,
        margin: 10,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: '#f0f0f0',
        backgroundColor: '#f9f9f9'
    },
    logBoxText : {
        fontSize: 24,
    }
});

export default App;