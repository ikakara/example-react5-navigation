//
// Need a function that can process the following:
//
const sample = JSON.stringify({
  type: "stack",
  index: 0,
  routes: [
    {
      name: "Dashboard",
      state: {
        type: "tab",
        index: 0,
        routes: [
          {
            name: "Feed",
            state: {
              type: "stack",
              index: 1,
              routes: [
                {
                  name: "Feed",
                },
                {
                  name: "Detail",
                },
              ],
            },
          },
          {
            name: "Profile",
          },
          {
            name: "Settings",
          },
        ],
      },
    },
  ],
});

// Depth first search
function makeStackDFS(state, stack) {
  if (state == undefined || state.routes == undefined) {
    return { state, stack };
  }

  let type = state.type;
  if (type == "stack") {
    // add the stack to the index
    for (var i = 0; i <= state.index; i++) {
      let name = state.routes[i]?.name;
      stack.push({ type, name });
    }
  } else {
    // drawer, tab
    let name = state.routes[state.index]?.name;
    stack.push({ type, name });
  }

  return makeStackDFS(state.routes[state.index]?.state, stack);
}

function getStack({ navigation }) {
  const s = navigation.dangerouslyGetState();
  const a = new Array();
  const { state, stack } = makeStackDFS(s, a);

  return stack;
}

export { makeStackDFS, getStack };
