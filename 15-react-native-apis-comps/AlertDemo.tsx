import React, { Component } from "react";
import { View, StyleSheet, Button, Alert, Platform } from "react-native";

class AlertDemo extends Component {
    createTwoButtonAlert = () => {
        if (Platform.OS === 'web') {
            console.log(confirm("My Alert Msg"));
        } else {
            Alert.alert(
                "Alert Title",
                "My Alert Msg",
                [
                    {
                        text: "Cancel",
                        onPress: () => console.log("Cancel Pressed"),
                        style: "cancel"
                    },
                    { text: "OK", onPress: () => console.log("OK Pressed") }
                ]
            );
        }
    }

    createThreeButtonAlert = () => {
        if (Platform.OS === 'web') {
            console.log(prompt("Your Answer?"));
        } else {
            Alert.alert(
                "Alert Title",
                "My Alert Msg",
                [
                    {
                        text: "Ask me later",
                        onPress: () => console.log("Ask me later pressed")
                    },
                    {
                        text: "Cancel",
                        onPress: () => console.log("Cancel Pressed"),
                        style: "cancel"
                    },
                    { text: "OK", onPress: () => console.log("OK Pressed") }
                ]
            );
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Button title={"2-Button Alert"} onPress={this.createTwoButtonAlert} />

                <Button
                    title={"3-Button Alert"}
                    onPress={this.createThreeButtonAlert}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "space-around",
        alignItems: "center"
    }
});

export default AlertDemo;