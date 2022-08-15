import React from 'react';
import { View, Text, Image, ScrollView, TextInput } from 'react-native';

const CommonComponents = () => {
  return (
    <ScrollView>
      <Text>Cats Demo</Text>
      <View>
        <Text>Do you like cats?</Text>
        <Image
          source={{
            uri: 'https://reactnative.dev/docs/assets/p_cat2.png',
          }}
          style={{ width: 400, height: 400 }}
        />
      </View>
      <TextInput
        style={{
          height: 40,
          borderColor: 'gray',
          borderWidth: 1
        }}
        defaultValue="You can type in me"
      />
    </ScrollView>
  );
}

export default CommonComponents;