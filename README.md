# Example of (Expo) React5 (Native) Navigation (Drawer, Stack, Tab)

I'm ~1 month new into react-native development w/ Expo (and Amplify).  This example will be limited to react5-navigation (minor Expo use of vector-icons). I do want to rant on "documentation."

Learning a new **coding anything** (e.g. language, framework, etc) shouldn't take a month ... a weekend **MAX**! The naive examples that the "official documentation" provides needs to be linked to a graph of (non-trivial, more advanced, NAIVE++) CURRENT EXAMPLES.  All one should need is an overiew, ONE NAIVE++ APPLICABLE (AND CURRENT) EXAMPLE, and some notes on "further learning" to be productive.

Amplify is the worst (documented) by far - their "official documentation" is out of date.  The main issue for learning React5 is wading through the endless examples meant for older versions of React ... I realize I just contributed to the endless... so if you're using React6 or more recent, then your search contininues :(

## ES6

Javascript is not my favorite language: types are a good thing ... enums are useful ... ...

ES6 (2015) makes javascript bearable.  Here's an overview of the features: <http://es6-features.org/#Constants>

## Many thanks to all those that contribute to helping others

This example code is a direct result of <https://github.com/nathvarun/react-navigation-v3/tree/part2>

## Overview

React5-Navigation has 3 basic Navigators - you can build custom navigators if you desire.  This example will build the following:

```
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


```

The way an application is structured, doesn't have to be the way an application presents it's navigation/screens to the user.  For example, Welcome Screen (login, signup) -> DrawerNavigator makes logical sense.  This would require another StackNavigator (React5 did away with SwitchNavigator) with conditionals.

```
- AnotherStackNavigator
{!isLoggedIn ? (

  - Welcome Screen
    - Login Button
    - Sign Up Button
) : (
  - DrawerNavigator
    - Dashboard - StackNavigator (needed for header and to change the header based on the tab)
      - TabNavigator (Dashboard)
        - Tab 1 - Feed - StackNavigator
        - Tab 2 - Profile - StackNavigator
        - Tab 3 - Settings - StackNavigator
      - Modal Screen
)}
```

However, by not including the "drawer open" in the Welcome screen and making it an element of drawer, the UX/UI will appear logical, while reducing nested-navigation headhaches.  FYI, the conditional (to show login/signup) will be done inside the Welcome screen.

## NAIVE++

The code is organized as follows:

```
/src
   /navigation
     ./index.js
     ./LinkConfiguration.js
     ./RootNavigation.js
   /screens
     ./the screen.js files are here
App.js - code to review is here

```

App.js looks rather trivial...

The header customization (title), for the tabs wasn't trivial.  The header is from the DashboardStack (Tab Navigators don't have headers).

```
  // used to get the name of the tab
  const tabName = route.state?.routes[route.state.index]?.name ?? "Feed"; // requires an initial name

  // used to get the current screen (of the stack) for each tab
  const routeName = RootNavigation.getCurrentRoute()?.name ?? tabName;

```

All children below the Tab Navigator will need to use RootNavigation.navigate() or RootNavigation.dispatch(actions) (e.g. close drawers).

Not sure what else I had so much trouble with.  Modal screens need to be in the RootStack, so they cover the entire screen when used.  I've tried to comment in the code -- but if you have any questions, feel free to ask.

## TBDs

* Header customization from a child screen
* LinkingConfiguration (expo-links) - nice to have for the web version

## Further Learning

* Other nesting examples:
  * <https://itnext.io/the-intricacies-of-nesting-navigators-in-react-native-using-react-navigation-fef52ca72964>
* <https://reactnavigation.org/docs/upgrading-from-4.x/>
* Application State Management (Redux vs Mobx) - learn Redux (boiler plate is a good thing; lots of copy/paste examples out there)
* React5 cross platform development (iOS, Android, Web) - Expo
* Middleware and backend for Mobile - Amplify, the documentation sucks, but everything else is good
