import React from "react";
import { View, Text, Button } from "react-native";

import styles from "../styles";

function Detail(props) {
  const { navigation, route } = props;

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Detail</Text>
      <Button onPress={() => navigation.goBack()} title="Back" />
    </View>
  );
}

export default Detail;
