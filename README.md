# Example of (Expo) React5 (Native) Navigation (Drawer, Stack, Tab)

Try code on Snack: <https://snack.expo.io/@ikakara/github.com-ikakara-example-react5-navigation>

I'm ~1 month new into react-native development w/ Expo (and Amplify). This example will be limited to react5-navigation (minor Expo use of vector-icons). I do want to rant on "documentation."

Learning a new **coding anything** (e.g. language, framework, etc) shouldn't take a month ... a weekend **MAX**! The naive examples that the "official documentation" provides needs to be linked to a graph of (non-trivial, more advanced, NAIVE++) CURRENT EXAMPLES. All one should need (to be productive) is an overiew, ONE NAIVE++ APPLICABLE (AND CURRENT) EXAMPLE, and some notes on "further learning".

Amplify is the worst (documented) by far - their "official documentation" is out of date. The main issue for learning React5 is wading through the endless examples meant for older versions of React ... I realize I just contributed to the endless... so if you're not using React5, then your search continues :(

## ES6

Javascript is not my favorite language: types are a good thing ... enums are useful ... ...

ES6 (2015) makes javascript bearable. Here's an overview of the features: <http://es6-features.org/#Constants>

## Many thanks to all those that contribute to helping others

This example code is a direct result of <https://github.com/nathvarun/react-navigation-v3/tree/part2>

## Overview

React5-Navigation has 3 basic Navigators - you can build custom navigators if you desire. This example will build the following:

```
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
```

The way an application is structured, doesn't have to be the way an application presents it's navigation/screens to the user. For example, Welcome Screen (login, signup) -> DrawerNavigator makes logical sense. This would require another StackNavigator (React5 did away with SwitchNavigator) with conditionals.

```
- AnotherStackNavigator
{!isLoggedIn ? (

  - Welcome Stack
    - Welcome Screen
      - Login Button
    - Sign Up Screen
) : (
  - DrawerNavigator
    - Dashboard - StackNavigator (needed for header and to change the header based on the tab)
      - TabNavigator (Dashboard)
        - Tab 1 - Feed - StackNavigator
        - Tab 2 - Profile - StackNavigator
        - Tab 3 - Settings - StackNavigator
      - Modal Screen
)}
  - NotFound Screen
```

However, by not including the "drawer open" in the Welcome screen and making it an element of drawer, the UX/UI will appear logical, while reducing nested-navigation headhaches. FYI, the conditional (to show login/signup) will be done inside the Welcome screen.

A NotFound screen (for web), is also placed in the drawer (same reason as WelcomeStack). Obviouly, we don't want to display NotFound in the Drawer. so in [./DrawerNavigator.js](/src/navigation/DrawerNavigator.js), we hide the drawer screen with:

```javascript
<Drawer.Screen
  name={Routes.DRAWERNOTFOUND}
  component={NotFound}
  options={{
    // Hide the drawer
    drawerLabel: () => null,
  }}
/>
```

## NAIVE++

The code is organized as follows:

- /src
  - /components
    - [./ExampleHeader.js](/src/components/ExampleHeader.js)
    - ./index.js
    - [./LeftHeaderBack.js](/src/components/LeftHeaderBack.js)
    - [./TabBarIcon.js](/src/components/TabBarIcon.js)
  - /constants
    - [./Colors.js](/src/constants/Colors.js)
    - ./index.js
    - [./Layout.js](/src/constants/Layout.js)
    - [./Routes.js](/src/constants/Routes.js)
  - /helpers
    - ./index.js
    - [./NavigationUtils.js](/src/helpers/NavigationUtils.js)
  - /navigation
    - /dashboard **<-- dashboard drawer gets its own folder**
      - [./DashboardNavigator.js](/src/navigation/dashboard/DashboardNavigator.js) **<-- StackNavigator containing a TabNavigator**
      - [./FeedStack.js](/src/navigation/dashboard/FeedStack.js)
      - ./index.js
      - [./ProfileStack.js](/src/navigation/dashboard/ProfileStack.js)
      - [./SettingsStack.js](/src/navigation/dashboard/SettingsStack.js)
    - /welcome <-- welcome drawer gets its own folder
      - ./index.js
      - [./WelcomeNavigator.js](/src/navigation/welcome/WelcomeNavigator.js) **<-- StackNavigator**
    - [./DrawerNavigator.js](/src/navigation/DrawerNavigator.js) **<-- add more drawers here**
    - ./index.js
    - [./LinkingConfiguration.js](/src/navigation/LinkingConfiguration.js) **<-- nice to have for the web version**
    - [./RootNavigation.js](/src/navigation/RootNavigation.js) **<-- Navigation helper methods**
    - /screens
      - /dashboard
        - ./dashboard screen.js files
      - /welcome
        - ./welcome screen.js files
      - [./NotFound.js](/src/screens/NotFound.js)
- [App.js](App.js)

Most of the app is trivial. The main complexity is configuring the header (headerLeft, headerTitle and headerRight) for the various screens. Only the StackNavigator has a header, per se. So to show "headers" in the TabNavigator and DrawerNavigator screens, you'll use a StackNavigator's header. Having multiple StackNavigators, makes state tricky. There are two useful modules:

[./RootNavigation.js](/src/navigation/RootNavigation.js) creates a ref at the NavigationContainer (beginning of the navigation tree), and allows you to navigate outside the scope of your current navigation.

[./NavigationUtils.js](/src/helpers/NavigationUtils.js).getStack() allows you to view the current navigation stack (drawer -> dashboard-stack -> etc). You can pop and push the correct elements on the stack to navigate to the desired screen. I don't do that - but very handy for debugging and understanding "navigation state."

The majority of the code is in [./DashboardNavigator.js](/src/navigation/dashboard/DashboardNavigator.js) (contains 2 functions): the dashboard's StackNavigator and TabNavigator. I kept them together, since one contains the StackNavigators/screens for each tab, and the other contains the modal screens. If you were to build a screen that required a modal screen, it made sense to keep the "wiring" in one file. Modal screens need to be in the RootStack (e.g. DashboardStack), so they cover the entire screen when used.

The headerLeft is configured as follows:

```javascript
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
```

Here's how the headerTitle and headerRight are configured:

```javascript
const routeName = current?.name;
navigation.setOptions({
  headerTitle: getTitle({ routeName }),
  headerRight: () => getRightHeader({ navigation, routeName }),
  headerRightContainerStyle: {
    paddingRight: 16,
  },
});
```

```javascript
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
```

```javascript
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
```

## NotFound NotWorking on snack.expo.io

NotFound page is a fundamental screen for web. For some reason, snack doesn't like it (as coded), so I've disabled it

It does work locally (for me) = so use at your descretion.

```javascript
{
  false && Platform.OS === "web" && (
    <Drawer.Screen
      name={Routes.DRAWERNOTFOUND}
      component={NotFound}
      options={{
        // Hide the drawer
        drawerLabel: () => null,
      }}
    />
  );
}
```

I found navigation to be mostly "trial and error." Try with the current navigation prop first, and if that doesn't work, use RootNavigation.navigate(), RootNavigation.dispatch(action) (e.g. close drawers), etc. If that doesn't work use [./NavigationUtils.js](/src/helpers/NavigationUtils.js).getStack() to view the "navigation state" and go from there.

The code mostly speaks for itself - it attempts to be NAIVE++, but if you have any questions, feel free to ask.

## TBDs

- I18N/L10N - If you can get iOS, Android and Web for free, why not translations?

## Known issues

- aws-amplify-react-native@4.2.1 (latest) depends on react-native-elements@0.19.1 which breaks using react-native-web @0.12.x or greater. [See workaround.](https://github.com/ikakara/expo-amplify-bug)

## Further Learning

- Other nesting examples:
  - <https://itnext.io/the-intricacies-of-nesting-navigators-in-react-native-using-react-navigation-fef52ca72964>
  - <https://www.reactnativeschool.com/complex-navigation-example-with-react-navigation>
- <https://reactnavigation.org/docs/upgrading-from-4.x/>
- Application State Management (Redux vs Mobx) - learn Redux (boiler plate is a good thing; lots of copy/paste examples out there)
- React5 cross platform development (iOS, Android, Web) - Expo
- Middleware and backend for Mobile - Amplify, the documentation sucks, but everything else is good
