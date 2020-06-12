import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { Detail, Feed } from "../../screens/dashboard";

const Stack = createStackNavigator();

function FeedStack(props) {
  const { navigation, route } = props;

  return (
    <Stack.Navigator
      {...props} // allow parent properties to be overridden
      mode="modal"
      // initialRouteName="Feed"
      // screenOptions={{ gestureEnabled: false }}
    >
      <Stack.Screen name="Feed" component={Feed} {...props} />
      <Stack.Screen name="Detail" component={Detail} {...props} />
    </Stack.Navigator>
  );
}

export default FeedStack;
