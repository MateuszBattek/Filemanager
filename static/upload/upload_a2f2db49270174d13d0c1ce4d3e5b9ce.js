import React, { Component } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import ListItem from "./ListItem";
import MyButton from "./MyButton";
import * as Device from "expo-device";

export default class DeviceScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {
          name: "brand",
          value: Device.brand,
        },
        {
          name: "deviceName",
          value: Device.deviceName,
        },
        {
          name: "manufacturer",
          value: Device.manufacturer,
        },
        {
          name: "modelName",
          value: Device.modelName,
        },
        {
          name: "type",
          value: this.props.type,
        },
        {
          name: "maxMemory",
          value: (this.props.maxMemory / (1024 * 1024)).toFixed(0) + "MB",
        },
        {
          name: "osName",
          value: Device.osName,
        },
        {
          name: "osVersion",
          value: Device.osVersion,
        },
        {
          name: "platformApiLevel",
          value: Device.platformApiLevel,
        },
        {
          name: "totalMemory",
          value: (Device.totalMemory / (1024 * 1024 * 1024)).toFixed(2) + "GB",
        },
      ],
    };
    this.changeData = this.changeData.bind(this);
  }
  changeData(data) {
    this.setState({ data: data });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.refreshBox}>
          <MyButton
            funcName="REFRESH INFO"
            type={this.props.type}
            maxMemory={this.props.maxMemory}
            changeData={this.changeData}
          ></MyButton>
        </View>
        <ListItem
          type={this.props.type}
          maxMemory={this.props.maxMemory}
          data={this.state.data}
        ></ListItem>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  refreshBox: {
    height: 0.1 * Dimensions.get("window").height,
    padding: 10,
  },
  container: {
    flexDirection: "column",
  },
});
