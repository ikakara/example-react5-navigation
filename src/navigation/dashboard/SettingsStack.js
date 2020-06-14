import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { Routes } from "../../constants";
import { Settings } from "../../screens/dashboard";

const Stack = createStackNavigator();

function SettingsStack(props) {
  const { navigation, route } = props;

  return (
    <Stack.Navigator
      {...props} // allow parent properties to be overridden
      mode="modal"
      //  initialRouteName="Settings"
      //  screenOptions={{ gestureEnabled: false }}
    >
      <Stack.Screen name={Routes.SETTINGS} component={Settings} {...props} />
    </Stack.Navigator>
  );
}

export default SettingsStack;
