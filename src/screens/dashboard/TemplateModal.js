import React from "react";
import { View, Text, Button } from "react-native";

import styles from "../styles";

function TemplateModal({ navigation }) {
  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Modal Template!</Text>
      <Button onPress={() => navigation.goBack()} title="Dismiss" />
    </View>
  );
}

export default TemplateModal;
