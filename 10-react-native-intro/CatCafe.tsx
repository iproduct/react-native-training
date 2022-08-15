import React, { Component } from "react";
import { Button, FlatList, ListRenderItem, ListRenderItemInfo, ScrollView, Text, View } from "react-native";
import CatComponent from "./CatComponent";
import CatishTranslator from "./CatishTranslator";


export class Cat {
  constructor(public name: string) { }
}

class CatCafe extends Component {
  render() {
    return (
      <>
        <FlatList<Cat>
          data={[
            new Cat("Lunichka"),
            new Cat("Spot"),
            new Cat("Topka"),
            new Cat("Speedy"),
            new Cat("Love"),
            new Cat("Macho"),
            new Cat("Svetkavicha"),
            new Cat("Puh"),
          ]}
          renderItem={({ item }) => <CatComponent name={item.name} />}
        />
        <CatishTranslator />
      </>
    );
  }
}

export default CatCafe;