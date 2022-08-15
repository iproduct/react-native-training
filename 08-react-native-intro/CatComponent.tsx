import React, { Component } from "react";
import { Button, Image, Text, View } from "react-native";

interface CatProps {
  name: string;
}

interface CatState {
  isHungry: boolean;
}

class CatComponent extends Component<CatProps, CatState> {
  state: Readonly<CatState> = { isHungry: true };

  render() {
    return (
      <View style={{padding: 10}}>
         <Image
          source={{
            uri: 'https://reactnative.dev/docs/assets/p_cat2.png',
          }}
          style={{ width: 300, height: 300 }}
        />
        <Text>
          I am {this.props.name}, and I am
          {this.state.isHungry ? " hungry" : " full"}!
        </Text>
        <Button
          onPress={() => {
            this.setState({ isHungry: false });
          }}
          disabled={!this.state.isHungry}
          title={
            this.state.isHungry ? "Pour me some milk, please!" : "Thank you!"
          }
        />
      </View>
    );
  }
}

export default CatComponent;