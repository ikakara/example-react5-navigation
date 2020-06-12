import React from "react";
import { View } from "react-native";

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

import { NavigationContainer } from "@react-navigation/native";

import {
  DrawerNavigator,
  RootNavigation,
  LinkingConfiguration,
} from "./src/navigation";

import { styles } from "./src/screens";

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
