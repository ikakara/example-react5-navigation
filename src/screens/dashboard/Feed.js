import React from "react";
import { View, Button } from "react-native";

import { Routes } from "../../constants";
import styles from "../styles";

function Feed(props) {
  const { navigation, route } = props;

  return (
    <View style={styles.screen}>
      <Button
        title="Go To Detail Screen"
        onPress={() => navigation.navigate(Routes.DETAIL)}
      />
    </View>
  );
}

export default Feed;
