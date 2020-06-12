import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { Settings } from "../../screens/dashboard";

const Stack = createStackNavigator();

function SettingsStack(props) {
  const { navigation, route } = props;

  return (
    <Stack.Navigator
      mode="modal"
      //  initialRouteName="Settings"
      //  screenOptions={{ gestureEnabled: false }}
    >
      <Stack.Screen name="Settings" component={Settings} {...props} />
    </Stack.Navigator>
  );
}

export default SettingsStack;
