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

import { TabBarIcon, ExampleHeader } from "../../components";

function getRightHeader({ navigation, routeName }) {
  switch (routeName) {
    case "Drawer": // default routeName when called from the WelcomeStack
    case "Feed":
    case "Detail":
    case "Profile":
      return (
        <View style={{ flexDirection: "row" }}>
          <Button
            onPress={() => navigation.navigate("ModalTemplate")}
            title="Do ModalTemplate"
            color="#00cc00"
          />
        </View>
      );
    case "Settings":
      return (
        <ExampleHeader
          focused={false}
          title="I'm doing my own thing!"
          name="md-thumbs-up"
          alert="pressed me"
        />
      );
    default:
      return (
        <ExampleHeader
          focused={false}
          title={`Missing "case ${routeName}:"`}
          name="md-thumbs-down"
          alert={routeName}
        />
      );
  }
}

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
    headerRight: () => getRightHeader({ navigation, routeName }),
    headerRightContainerStyle: {
      paddingRight: 16,
    },
  });
  //https://stackoverflow.com/questions/60267273/react-navigation-v5-hide-bottom-tabs
  return (
    <Tab.Navigator {...props}>
      <Tab.Screen
        name="Feed"
        component={FeedStack}
        {...props} // allow parent properties to be overridden
        options={{
          title: "Feed",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name="md-filing" />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileStack}
        {...props} // allow parent properties to be overridden
        options={{
          title: "Profile",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name="md-contact" />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsStack}
        {...props} // allow parent properties to be overridden
        options={{
          title: "Settings",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name="md-settings" />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const RootStack = createStackNavigator();

function DashboardNavigator(props) {
  const { navigation, route } = props;

  return (
    <RootStack.Navigator
      {...props} // allow parent properties to be overridden
      mode="modal"
      //      initialRouteName="Dashboard"
      //      screenOptions={{ gestureEnabled: false }}
    >
      <RootStack.Screen
        name="Dashboard"
        component={DashboardTabNavigator}
        {...props} // allow parent properties to be overridden
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
        {...props} // allow parent properties to be overridden
        options={{ headerShown: false }}
      />
    </RootStack.Navigator>
  );
}

export default DashboardNavigator;
