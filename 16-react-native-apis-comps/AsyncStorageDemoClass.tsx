import React, { useState, useEffect, Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AsyncStorageClassSate {
  value: string;
}

export default class AsyncStorageDemoClass extends Component<{}, AsyncStorageClassSate> {
  state: Readonly<AsyncStorageClassSate> = {
    value: 'value',
  }

  readItemFromStorage = async () => {
    try {
      const item = await AsyncStorage.getItem('@storage_Key') ?? 'value';
      this.setState({ value: item });
    } catch (err) {
      console.log(err);
    }
  }

  writeItemToStorage = async (newValue: string) => {
    await AsyncStorage.setItem('@storage_Key', newValue);
    this.setState({ value: newValue });
  }

  componentDidMount(): void {
    this.readItemFromStorage();
  } 

  render() {
    return (
      <View style={{ margin: 40 }}>
        <Text>Current value: {this.state.value}</Text>
        <TouchableOpacity
          onPress={() =>
            this.writeItemToStorage(
              Math.random()
                .toString(36)
                .substring(2, 5)
            )
          }
        >
          <Text>Update value</Text>
        </TouchableOpacity>
      </View >
    );
  }
}