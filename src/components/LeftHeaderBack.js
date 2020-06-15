import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import * as React from "react";
import { View, Text, Platform } from "react-native";

import Colors from "../constants/Colors";

function LeftHeaderBack(props) {
  const navigation = useNavigation();

  if (Platform.OS === "ios") {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Ionicons
          style={{ marginLeft: 10 }}
          onPress={() => navigation.pop()}
          name="ios-arrow-back"
          size={30}
          color={Colors.tabIconSelected}
        />
        <Text
          style={{
            marginLeft: 10,
            fontSize: 18,
            color: Colors.tabIconSelected,
          }}
          onPress={() => navigation.pop()}
        >
          {props.title}
        </Text>
      </View>
    );
  } else {
    return (
      <View style={{ flexDirection: "row" }}>
        <Ionicons
          style={{ marginLeft: 16 }}
          onPress={() => navigation.pop()}
          name="md-arrow-back"
          size={24}
        />
      </View>
    );
  }
}

export default LeftHeaderBack;
