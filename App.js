import React from "react";
import { View, Button } from "react-native";
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
  Signup,
  TemplateModal,
  Welcome,
  styles,
} from "./src/screens";

import { Layout } from "./src/constants";
import { TabBarIcon } from "./src/components";

const WelcomeNavigator = createStackNavigator();

function WelcomeStack(props) {
  const { navigation, route } = props;

  return (
    <WelcomeNavigator.Navigator
      mode="modal"
      initialRouteName="Welcome"
      // screenOptions={{ gestureEnabled: false }}
    >
      <WelcomeNavigator.Screen name="Welcome" component={Welcome} {...props} />
      <WelcomeNavigator.Screen name="Signup" component={Signup} {...props} />
    </WelcomeNavigator.Navigator>
  );
}

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

  return (
    <Drawer.Navigator
      //drawerType={Layout.isSmallDevice ? "front" : "permanent"}
      drawerPosition="left"
      initialRouteName="Welcome"
    >
      <Drawer.Screen
        name="Drawer"
        component={DashboardStackNavigator}
        {...props}
      />
      <Drawer.Screen name="Welcome" component={WelcomeStack} {...props} />
    </Drawer.Navigator>
  );
}

function App(props) {
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

export default App;
