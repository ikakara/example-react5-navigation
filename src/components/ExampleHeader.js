import { Ionicons } from "@expo/vector-icons";
import * as React from "react";
import { View, Text } from "react-native";

import Colors from "../constants/Colors";

function ExampleHeader(props) {
  return (
    <View
      style={{
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text style={{ marginRight: 16, fontSize: 18 }}>{props.title}</Text>
      <Ionicons
        name={props.name}
        size={30}
        style={{ marginBottom: -3 }}
        color={props.focused ? Colors.tabIconSelected : Colors.tabIconDefault}
        onPress={() => alert(props.alert ?? "props.alert undefined")}
      />
    </View>
  );
}

export default ExampleHeader;
