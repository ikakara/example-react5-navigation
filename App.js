import React from "react";
import { View, Text, StyleSheet, Button, Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";

/**
- DrawerNavigator
  - Welcome Screen
    - Login Button
    - Sign Up Button
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
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

import { RootNavigation, LinkingConfiguration } from "./src/navigation";

import {
  Detail,
  Feed,
  Profile,
  Settings,
  TemplateModal,
  Welcome,
  styles,
} from "./src/screens";

const FeedNavigator = createStackNavigator();

function FeedStack(props) {
  const { navigation, route } = props;

  return (
    <FeedNavigator.Navigator
      mode="modal"
      // initialRouteName="Feed"
      // screenOptions={{ gestureEnabled: false }}
    >
      <FeedNavigator.Screen name="Feed" component={Feed} {...props} />
      <FeedNavigator.Screen name="Detail" component={Detail} {...props} />
    </FeedNavigator.Navigator>
  );
}

const ProfileNavigator = createStackNavigator();

function ProfileStack(props) {
  const { navigation, route } = props;

  return (
    <ProfileNavigator.Navigator
      mode="modal"
      //  initialRouteName="Profile"
      //  screenOptions={{ gestureEnabled: false }}
    >
      <ProfileNavigator.Screen name="Profile" component={Profile} {...props} />
    </ProfileNavigator.Navigator>
  );
}

const SettingsNavigator = createStackNavigator();

function SettingsStack(props) {
  const { navigation, route } = props;

  return (
    <SettingsNavigator.Navigator
      mode="modal"
      //  initialRouteName="Settings"
      //  screenOptions={{ gestureEnabled: false }}
    >
      <SettingsNavigator.Screen
        name="Settings"
        component={Settings}
        {...props}
      />
    </SettingsNavigator.Navigator>
  );
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
      <Tab.Screen name="Feed" component={FeedStack} {...props} />
      <Tab.Screen name="Profile" component={ProfileStack} {...props} />
      <Tab.Screen name="Settings" component={SettingsStack} {...props} />
    </Tab.Navigator>
  );
}

const RootStack = createStackNavigator();

function DashboardStackNavigator(props) {
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

const Drawer = createDrawerNavigator();

//https://stackoverflow.com/questions/49469834/recommended-way-to-have-drawer-resizable
function DrawerNavigator(props) {
  const { navigation, route } = props;
  const { width, height } = Dimensions.get("window");

  return (
    <Drawer.Navigator
      //drawerType={width >= 768 ? "permanent" : "front"}
      drawerPosition="left"
      initialRouteName="Welcome"
    >
      <Drawer.Screen
        name="Drawer"
        component={DashboardStackNavigator}
        {...props}
      />
      <Drawer.Screen name="Welcome" component={Welcome} {...props} />
    </Drawer.Navigator>
  );
}

export default function App(props) {
  const { navigation, route } = props;

  return (
    <View style={styles.container}>
      <NavigationContainer
        ref={RootNavigation.navigationRef}
        // TBD linking={LinkingConfiguration}
      >
        <DrawerNavigator {...props} />
      </NavigationContainer>
    </View>
  );
}
