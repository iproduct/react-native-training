import React, { useState } from 'react';
import { Text, TextInput, View, StyleSheet  } from 'react-native';

const CatishTranslator = () => {
  const [text, setText] = useState('');
  return (
    <View>
      <TextInput
        style={styles.input}
        placeholder="Type here to translate!"
        onChangeText={newText => setText(newText)}
        defaultValue={text}
      />
      <Text style={{padding: 10, fontSize: 42}}>
        {text.split(' ').map((word) => word && 'Myao ').join(' ')}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    fontSize: 42,
    height: 50,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

export default CatishTranslator;