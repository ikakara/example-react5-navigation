import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { Profile } from "../../screens/dashboard";

const Stack = createStackNavigator();

function ProfileStack(props) {
  const { navigation, route } = props;

  return (
    <Stack.Navigator
      {...props} // allow parent properties to be overridden
      mode="modal"
      //  initialRouteName="Profile"
      //  screenOptions={{ gestureEnabled: false }}
    >
      <Stack.Screen name="Profile" component={Profile} {...props} />
    </Stack.Navigator>
  );
}

export default ProfileStack;
