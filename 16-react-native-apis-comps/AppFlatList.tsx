import React, { useState, useRef, useEffect } from 'react';
import {
  ColorValue,
  FlatList,
  GestureResponderEvent,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
} from 'react-native';


export const ITEM_HEIGHT = 200;

interface ItemData {
  id: string;
  title: string;
}

interface Props {
  item: ItemData;
  onPress: (event: GestureResponderEvent) => void;
  backgroundColor: TextStyle;
  textColor: TextStyle;
}



const DATA: ItemData[] = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
  },
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'Item 4',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f69',
    title: 'Item 5',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d79',
    title: 'Item 6',
  },
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28b9',
    title: 'Item 7',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f68',
    title: 'Item 8',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d78',
    title: 'Item 9',
  },
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28b8',
    title: 'Item 10',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f67',
    title: 'Item 11',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d77',
    title: 'Item 12',
  },
];

const Item = ({ item, onPress, backgroundColor, textColor }: Props) => (
  <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
    <Text style={[styles.title, textColor]}>{item.title}</Text>
  </TouchableOpacity>
);

const App = () => {
  const [selectedId, setSelectedId] = useState<string | undefined>(undefined);
  const flatListRef = useRef<FlatList<ItemData>| null>(null)
  useEffect(() => {
    flatListRef.current?.scrollToIndex({index: 3});
  })

  const renderItem = ({ item }: { item: ItemData }) => {
    const backgroundColor = item.id === selectedId ? '#6e3b6e' : '#f9c2ff';
    const color = item.id === selectedId ? 'white' : 'black';

    return (
      <Item
        item={item}
        onPress={() => setSelectedId(item.id)}
        backgroundColor={{ backgroundColor }}
        textColor={{ color }}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList ref={flatListRef}
        data={DATA}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        extraData={selectedId}
        getItemLayout={(data: ItemData[] | null | undefined, index: number) => (
          { length: ITEM_HEIGHT, offset: ITEM_HEIGHT * index, index }
        )}
        // initialScrollIndex={11}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    height: ITEM_HEIGHT,
  },
  title: {
    fontSize: 32,
  },
});

export default App;