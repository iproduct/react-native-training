import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useAsyncStorage } from '@react-native-async-storage/async-storage';

export default function AsyncStorageDemo() {
  const [value, setValue] = useState<string>('value');
  const { getItem, setItem } = useAsyncStorage('@storage_key');

  const readItemFromStorage = async () => {
    const item = await getItem() as string;
    setValue(item);
  };

  const writeItemToStorage = async (newValue: string) => {
    await setItem(newValue);
    setValue(newValue);
  };

  useEffect(() => {
    readItemFromStorage();
  }, []);

  return (
    <View style={{ margin: 40 }}>
      <Text>Current value: {value}</Text>
      <TouchableOpacity
        onPress={() =>
          writeItemToStorage(
            Math.random()
              .toString(36)
              .substring(2, 5)
          )
        }
      >
        <Text>Update value</Text>
      </TouchableOpacity>
    </View>
  );
}