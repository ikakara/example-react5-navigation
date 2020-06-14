import React from "react";
import { View, Button, Text } from "react-native";

import { Routes } from "../constants";
import styles from "./styles";

function NotFound(props) {
  const { navigation, route } = props;

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Page Not Found</Text>
      <Button
        title="Take me to where I belong"
        onPress={() => {
          navigation.navigate(Routes.DRAWERWELCOME);
        }}
      />
    </View>
  );
}

export default NotFound;
