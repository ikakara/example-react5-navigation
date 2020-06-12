import React from "react";
import { View, Text } from "react-native";

import styles from "./styles";

function Settings(props) {
  const { navigation, route } = props;

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Settings</Text>
    </View>
  );
}

export default Settings;
