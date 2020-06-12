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

import { createDrawerNavigator } from "@react-navigation/drawer";

import { DashboardNavigator } from "./dashboard";
import { WelcomeNavigator } from "./welcome";

import { Layout } from "../constants";

const Drawer = createDrawerNavigator();

//https://stackoverflow.com/questions/49469834/recommended-way-to-have-drawer-resizable
function DrawerNavigator(props) {
  const { navigation, route } = props;

  return (
    <Drawer.Navigator
      //drawerType={Layout.isSmallDevice ? "front" : "permanent"}
      drawerPosition="left"
      initialRouteName="Welcome"
    >
      <Drawer.Screen name="Drawer" component={DashboardNavigator} {...props} />
      <Drawer.Screen name="Welcome" component={WelcomeNavigator} {...props} />
    </Drawer.Navigator>
  );
}

export default DrawerNavigator;
