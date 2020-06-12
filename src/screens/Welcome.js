import React from "react";
import { View, Button, Text } from "react-native";

import { Feed, styles } from "../screens";

function Welcome(props) {
  const { navigation, route } = props;

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Welcome!!!</Text>
      <Button
        title="Login"
        onPress={() => navigation.navigate("Drawer", { screen: { Feed } })}
      />
      <Button title="Sign Up" onPress={() => alert("button pressed")} />
    </View>
  );
}

export default Welcome;
