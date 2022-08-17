import React, { Component } from "react";
import { FlatList, Image, Text, TextInput, View, StyleSheet, SectionList } from "react-native";
import { Cat } from "./cat-model";
import CatComponent, { CatComponentProps } from "./CatComponent";
import { FEMALE_CATS, MALE_CATS } from "./sample-cats";

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
                <Text style={styles.header}>Do you like cats?</Text>
                {/* <Image source={{
                    uri: 'https://reactnative.dev/docs/assets/p_cat2.png'
                }}
                    style={{ width: 400, height: 400 }}
                /> */}
                {/* <Text style={{ fontSize: 24 }}>How many cats?</Text>
                <TextInput style={{
                    fontSize: 24,
                    padding: 5,
                    borderColor: 'gray',
                    borderWidth: 1,
                }} value={this.state.catsNumber}
                    onChangeText={this.handleCatsNumberChange}
                /> */}

                {/* <FlatList<Cat> data={CATS.filter((cat, index) => index < (this.state.catsNumber ? parseInt(this.state.catsNumber) : 0))}
                    renderItem={({ item: cat }) => <CatComponent key={cat.id} cat={cat} />}
                /> */}

                <SectionList sections={[
                    { title: 'FEMALE CATS', data: FEMALE_CATS },
                    { title: 'MALE CATS', data: MALE_CATS },
                ]}
                    renderItem={({ item: cat }) => <CatComponent key={cat.id} cat={cat} />}
                    renderSectionHeader={({ section }) => <Text style={styles.sectionHeader}>{section.title}</Text>}
                    keyExtractor={(item, index) => `basicListEntry-${item.id}`}
                />
            </View>
        );
    }
}

export default App;

const styles = StyleSheet.create({
    header : {
        fontSize: 36,
        padding: 20,
        alignSelf: 'center',
    },
    sectionHeader: {
        paddingTop: 2,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 2,
        fontSize: 28,
        fontWeight: 'bold',
        backgroundColor: 'rgba(247,247,247,1.0)',
    }
});