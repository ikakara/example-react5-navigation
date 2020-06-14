import React from "react";
import { View, Button, Text } from "react-native";

import { Feed } from "../dashboard";
import { Routes } from "../../constants";
import styles from "../styles";

function Welcome(props) {
  const { navigation, route } = props;

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Welcome!!!</Text>
      <Button
        title="Login"
        onPress={() =>
          navigation.navigate(Routes.DASHBOARD, { screen: { Feed } })
        }
      />
      <Button
        title="Sign Up"
        onPress={() => navigation.navigate(Routes.SIGNUP)}
      />
    </View>
  );
}

export default Welcome;
