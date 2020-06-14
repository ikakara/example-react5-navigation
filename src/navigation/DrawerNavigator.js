import React from "react";
import { Platform } from "react-native";

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
  - NotFound Screen (hidden)
 */

import { createDrawerNavigator } from "@react-navigation/drawer";

import { DashboardNavigator } from "./dashboard";
import { WelcomeNavigator } from "./welcome";
import { NotFound } from "../screens";

import { Layout, Routes } from "../constants";

const Drawer = createDrawerNavigator();

//https://stackoverflow.com/questions/49469834/recommended-way-to-have-drawer-resizable
function DrawerNavigator(props) {
  const { navigation, route } = props;
  try {
    return (
      <Drawer.Navigator
        {...props} // allow parent properties to be overridden
        //drawerType={Layout.isSmallDevice ? "front" : "permanent"}
        drawerPosition="left"
        initialRouteName={Routes.WELCOME}
      >
        <Drawer.Screen
          name={Routes.DRAWERDASHBOARD}
          component={DashboardNavigator}
          {...props}
          options={{
            title: "Dashboard",
          }}
        />
        <Drawer.Screen
          name={Routes.DRAWERWELCOME}
          component={WelcomeNavigator}
          {...props}
          options={{
            title: "Welcome",
          }}
        />
        {Platform.OS === "web" && (
          <Drawer.Screen
            name={Routes.DRAWERNOTFOUND}
            component={NotFound}
            options={{
              // Hide the drawer
              drawerLabel: () => null,
            }}
          />
        )}
      </Drawer.Navigator>
    );
  } catch (err) {
    console.error("err:", err);
  }
}

export default DrawerNavigator;
