import React, { Component } from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import Img from "../components/icon200.png";

export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}> Device App </Text>
        <Image source={Img} style={styles.image} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center", //Centered horizontally
    alignItems: "center", //Centered vertically
    flex: 1,
  },
  image: {
    //justifyContent: "center",
  },
  text: {
    fontSize: 40,
    color: "gray",
  },
});
