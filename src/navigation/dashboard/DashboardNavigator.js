import React from "react";
import { View, Button } from "react-native";
import { Ionicons } from "@expo/vector-icons";

/**
- DrawerNavigator
  - Welcome RootStack
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

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";

import { RootNavigation } from "../../navigation";

import { FeedStack, ProfileStack, SettingsStack } from "../dashboard";
import { TemplateModal } from "../../screens/dashboard";

import { TabBarIcon } from "../../components";

const Tab = createBottomTabNavigator();

function DashboardTabNavigator(props) {
  const { navigation, route } = props;

  // used to get the name of the tab
  const tabName = route.state?.routes[route.state.index]?.name ?? "Feed"; // requires an initial name

  // used to get the current screen (of the stack) for each tab
  const routeName = RootNavigation.getCurrentRoute()?.name ?? tabName;

  // Set the header title on the parent stack navigator depending on the
  // currently active tab. Learn more in the documentation:
  // https://reactnavigation.org/docs/en/screen-options-resolution.html
  navigation.setOptions({
    headerTitle: routeName,
    /* headerRight can be customized here for each child page */
    headerRight: () => (
      <View style={{ flexDirection: "row" }}>
        <Button
          onPress={() => navigation.navigate("ModalTemplate")}
          title="Do ModalTemplate"
          color="#00cc00"
        />
      </View>
    ),
    headerRightContainerStyle: {
      paddingRight: 16,
    },
  });
  //https://stackoverflow.com/questions/60267273/react-navigation-v5-hide-bottom-tabs
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Feed"
        component={FeedStack}
        options={{
          title: "Feed",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name="md-filing" />
          ),
        }}
        {...props}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileStack}
        options={{
          title: "Profile",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name="md-contact" />
          ),
        }}
        {...props}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsStack}
        options={{
          title: "Settings",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name="md-settings" />
          ),
        }}
        {...props}
      />
    </Tab.Navigator>
  );
}

const RootStack = createStackNavigator();

function DashboardNavigator(props) {
  const { navigation, route } = props;

  return (
    <RootStack.Navigator
      mode="modal"
      //      initialRouteName="Dashboard"
      //      screenOptions={{ gestureEnabled: false }}
    >
      <RootStack.Screen
        name="Dashboard"
        component={DashboardTabNavigator}
        options={({ navigation, route }) => ({
          headerLeft: (props) => (
            <Ionicons
              style={{ paddingLeft: 10 }}
              onPress={() => navigation.openDrawer()}
              name="md-menu"
              size={30}
            />
          ),
        })}
      />
      {/* Put all the modal screens here */}
      <RootStack.Screen
        name="ModalTemplate"
        component={TemplateModal}
        options={{ headerShown: false }}
      />
    </RootStack.Navigator>
  );
}

export default DashboardNavigator;
