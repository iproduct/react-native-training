import React, { Component } from "react";
import { Button, Text, View } from "react-native";
import Cat from "./Cat";
import CatishTranslator from "./CatishTranslator";


class CatCafe extends Component {
  render() {
    return (
      <>
        <Cat name="Lunichka" />
        <Cat name="Spot" />
        <CatishTranslator />
      </>
    );
  }
}

export default CatCafe;