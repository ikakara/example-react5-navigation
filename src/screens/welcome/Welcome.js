import React from "react";
import { View, Button, Text } from "react-native";

import { Feed } from "../dashboard";
import styles from "../styles";

function Welcome(props) {
  const { navigation, route } = props;

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Welcome!!!</Text>
      <Button
        title="Login"
        onPress={() => navigation.navigate("Drawer", { screen: { Feed } })}
      />
      <Button title="Sign Up" onPress={() => navigation.navigate("Signup")} />
    </View>
  );
}

export default Welcome;
