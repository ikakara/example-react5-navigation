import React from "react";
import { View, Button } from "react-native";

import styles from "../styles";

function Feed(props) {
  const { navigation, route } = props;

  return (
    <View style={styles.screen}>
      <Button
        title="Go To Detail Screen"
        onPress={() => navigation.navigate("Detail")}
      />
    </View>
  );
}

export default Feed;
