import React from "react";

/**
- DrawerNavigator
  - Welcome Stack
    - Welcome Screen
      - Login Button
    - Sign Up Screen
  - Dashboard - StackNavigator (needed for header and to change the header based on the tab)
    - TabNavigator (Dashboard)
      - Tab 1 - Feed - StackNavigator
        - Feed Screen
        - Details Screen
      - Tab 2 - Profile - StackNavigator
        - Profile Screen
      - Tab 3 - Settings - StackNavigator
        - Settings Screen
    - Modal Screen
 */

import { createStackNavigator } from "@react-navigation/stack";

import { Signup, Welcome } from "../../screens/welcome";

const WelcomeStack = createStackNavigator();

function WelcomeNavigator(props) {
  const { navigation, route } = props;

  return (
    <WelcomeStack.Navigator
      mode="modal"
      initialRouteName="Welcome"
      // screenOptions={{ gestureEnabled: false }}
    >
      <WelcomeStack.Screen name="Welcome" component={Welcome} {...props} />
      <WelcomeStack.Screen name="Signup" component={Signup} {...props} />
    </WelcomeStack.Navigator>
  );
}

export default WelcomeNavigator;
