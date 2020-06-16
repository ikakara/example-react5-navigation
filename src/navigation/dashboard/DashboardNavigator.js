import React from "react";
import { View, Button, Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";

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

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";

import { Routes } from "../../constants";
import { RootNavigation } from "../../navigation";
import { NavigationUtils } from "../../helpers";
import { TabBarIcon, ExampleHeader, LeftHeaderBack } from "../../components";

import { FeedStack, ProfileStack, SettingsStack } from "../dashboard";
import { TemplateModal } from "../../screens/dashboard";
import { styles } from "../../screens";

// We could use a giant switch, but I guess I wanted to show off ES6
function getTitle({ routeName }) {
  if (
    routeName == undefined ||
    [Routes.DRAWERDASHBOARD, Routes.DASHBOARD, Routes.TABFEED].includes(
      routeName
    )
  ) {
    return Routes.FEED;
  }

  if (routeName == Routes.TABPROFILE) {
    return Routes.PROFILE;
  }
  if (routeName == Routes.TABSETTINGS) {
    return Routes.SETTINGS;
  }

  return routeName;
}

function getRightHeader({ navigation, routeName }) {
  switch (routeName) {
    case undefined: // can get this from the Router
    case Routes.DRAWERDASHBOARD:
    case Routes.DASHBOARD:
    case Routes.TABFEED:
    case Routes.FEED:
      return (
        <View style={styles.ioniconsContainer}>
          <Ionicons
            size={18}
            name={Platform.OS === "ios" ? "ios-search" : "md-search"}
          />
          <Ionicons
            size={18}
            name={Platform.OS === "ios" ? "ios-heart" : "md-heart"}
          />
          <Ionicons
            size={18}
            name={Platform.OS === "ios" ? "ios-more" : "md-more"}
          />
        </View>
      );
    case Routes.DETAIL:
    case Routes.TABPROFILE:
    case Routes.PROFILE:
      return (
        <View style={{ flexDirection: "row" }}>
          <Button
            onPress={() => navigation.navigate(Routes.MODALTEMPLATE)}
            title="Do Modal"
            color="#00cc00"
          />
        </View>
      );
    case Routes.TABSETTINGS:
    case Routes.SETTINGS:
      return (
        <ExampleHeader
          focused={false}
          title="Customize Me!"
          name="md-thumbs-up"
          alert="pressed me"
        />
      );
    default:
      // case misdefined (e.g. spelling issue)
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

//
// For nested-navigation simplicity, configure the header for every child
// screen in the TabNavigator
//
// The default header is configured in DashboardNavigator
//
//         |---------------------------------------------------------------|
//         |                                                               |
// Header: |  headerLeft headerTitle                          headerRight  |
//         |                                                               |
//         |---------------------------------------------------------------|
//
//  iOS centers the headerTitle, while Adnroid and Web displays as seen above
//
function DashboardTabNavigator(props) {
  const { navigation, route } = props;

  //////////////////////////////////////////////////////////////////////////////////
  // Configure headerLeft
  //////////////////////////////////////////////////////////////////////////////////

  // One way to understand the navigation state, is to get the navigation stack
  // we want to determine whether we need to put a back arrow - when the current
  // previous items on the navigation stack are type=="stack"
  const stack = NavigationUtils.getStack({ navigation });
  console.info(JSON.stringify(stack));

  const current = stack?.pop();
  const previous = stack?.pop();

  if (current?.type == "stack" && previous?.type == "stack") {
    // we need to reconfigure the headerLeft w/ a back arrow
    navigation.setOptions({
      headerLeft: (props) => (
        <LeftHeaderBack title={previous?.name} {...navigation} />
      ),
    });
  } else {
    navigation.setOptions({
      headerLeft: (props) => (
        <Ionicons
          style={{ paddingLeft: 10 }}
          onPress={() => navigation.openDrawer()}
          name={Platform.OS === "ios" ? "ios-menu" : "md-menu"}
          size={30}
        />
      ),
    });
  }

  //////////////////////////////////////////////////////////////////////////////////
  // Configure headerTile and headerRight
  //////////////////////////////////////////////////////////////////////////////////

  // Set the header title on the parent stack navigator depending on the
  // currently active tab. Learn more in the documentation:
  // https://reactnavigation.org/docs/en/screen-options-resolution.html
  //const tabName = route.state?.routes[route.state.index]?.name ?? "Feed"; // requires an initial name
  //const routeName = RootNavigation.getCurrentRoute()?.name; // a short cut to the above
  const routeName = current?.name;
  navigation.setOptions({
    headerTitle: getTitle({ routeName }),
    headerRight: () => getRightHeader({ navigation, routeName }),
    headerRightContainerStyle: {
      paddingRight: 16,
    },
  });

  //https://stackoverflow.com/questions/60267273/react-navigation-v5-hide-bottom-tabs
  return (
    <Tab.Navigator {...props}>
      <Tab.Screen
        name={Routes.TABFEED}
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
        name={Routes.TABPROFILE}
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
        name={Routes.TABSETTINGS}
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
        name={Routes.DASHBOARD}
        component={DashboardTabNavigator}
        {...props} // allow parent properties to be overridden
        options={({ navigation, route }) => ({
          // Default headerLeft
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
        name={Routes.MODALTEMPLATE}
        component={TemplateModal}
        {...props} // allow parent properties to be overridden
        options={{ headerShown: false }}
      />
    </RootStack.Navigator>
  );
}

export default DashboardNavigator;
