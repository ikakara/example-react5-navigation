import * as Linking from "expo-linking";

export default {
  prefixes: [Linking.makeUrl("/")],
  config: {
    // Routes.DRAWERDASHBOARD
    DrawerDashboard: {
      // pruning length of path
      path: "/",
      screens: {
        Dashboard: {
          path: "/dashboard",
          screens: {
            TabFeed: {
              // pruning length of path
              path: "/",
              screens: {
                Feed: "feed",
                Detail: "detail",
              },
            },
            TabProfile: {
              // pruning length of path
              path: "/",
              screens: {
                Profile: "profile",
              },
            },
            TabSettings: {
              // pruning length of path
              path: "/",
              screens: {
                Settings: "settings",
              },
            },
          },
        },
      },
    },
    // Routes.DRAWERWELCOME
    DrawerWelcome: {
      // pruning length of path
      path: "/",
      screens: {
        Welcome: "welcome",
        Signup: "signup",
      },
    },
    ModalTemplate: "modal-template",
    // Routes.DRAWERNOTFOUND
    NotFound: "*",
  },
};
