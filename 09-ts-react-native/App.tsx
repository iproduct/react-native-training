import React, { Component } from "react";
import { Image, NativeSyntheticEvent, Text, TextInput, TextInputChangeEventData, View } from "react-native";
import CatComponent from "./CatComponent";
import CATS from "./sample-cats";

interface AppState {
    catsNumber: string;
}

class App extends Component<{}, AppState> {
    state = {
        catsNumber: ''
    }
    handleCatsNumberChange = (text: string) => {
        this.setState({ catsNumber: text })
    }
    render() {
        return (
            <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <Text style={{ fontSize: 24 }}>Do you like cats?</Text>
                <Image source={{
                    uri: 'https://reactnative.dev/docs/assets/p_cat2.png'
                }}
                    style={{ width: '400px', height: '400px' }}
                />
                <Text style={{ fontSize: 24 }}>How many cats?</Text>
                <TextInput style={{
                    fontSize: 24,
                    padding: 5,
                    borderColor: 'gray',
                    borderWidth: 1,
                }} value={this.state.catsNumber}
                    onChangeText={this.handleCatsNumberChange}
                />
                {
                    CATS.filter((cat, index) => index < (this.state.catsNumber ? parseInt(this.state.catsNumber) : 0))
                    .map(cat => (
                        <CatComponent cat={cat} />
                    ))
                }

            </View>
        );
    }
}

export default App;