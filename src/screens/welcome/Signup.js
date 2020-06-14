import React from "react";
import { View, Button, Text } from "react-native";

import { Routes } from "../../constants";
import styles from "../styles";

function Signup(props) {
  const { navigation, route } = props;

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Signup</Text>
      <Button
        title="Signup"
        onPress={() =>
          navigation.reset({
            index: 0,
            routes: [{ name: Routes.DRAWERDASHBOARD }],
          })
        }
      />
    </View>
  );
}

export default Signup;
