import React from "react";
import { View, Text } from "react-native";

import styles from "../styles";

function Profile(props) {
  const { navigation, route } = props;

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Profile</Text>
    </View>
  );
}

export default Profile;
