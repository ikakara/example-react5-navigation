import React from "react";
import { View, Text } from "react-native";

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

import { ExampleHeader } from "../../components";

const WelcomeStack = createStackNavigator();

function WelcomeNavigator(props) {
  const { navigation, route } = props;

  return (
    <WelcomeStack.Navigator
      {...props} // allow parent properties to be overridden
      mode="modal"
      initialRouteName="Welcome"
      screenOptions={({ navigation, route }) => ({
        headerRight: (props) => (
          <ExampleHeader
            focused={false}
            title="Hello!"
            name="md-hand"
            alert="pressed me"
          />
        ),
        headerRightContainerStyle: {
          marginRight: 16,
        },
        gestureEnabled: false,
      })}
    >
      <WelcomeStack.Screen name="Welcome" component={Welcome} {...props} />
      <WelcomeStack.Screen
        name="Signup"
        component={Signup}
        {...props} // allow parent properties to be overridden
        options={({ navigation, route }) => ({
          headerRight: (props) => (
            <ExampleHeader
              focused={false}
              title="Thank You"
              name="md-happy"
              alert="pressed me"
            />
          ),
          headerRightContainerStyle: {
            paddingRight: 16,
          },
        })}
      />
    </WelcomeStack.Navigator>
  );
}

export default WelcomeNavigator;
