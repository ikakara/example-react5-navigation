//
// https://stackoverflow.com/questions/60087807/how-to-use-usenavigation-within-react-navigation-drawer
// https://reactnavigation.org/docs/navigating-without-navigation-prop/
//
import { createRef } from "react";

const navigationRef = createRef();

function addListener(type, callback) {
  navigationRef.current?.addListener(type, callback);
}

function canGoBack() {
  return navigationRef.current?.canGoBack();
}

function dangerouslyGetParent() {
  return navigationRef.current?.dangerouslyGetParent();
}

function dangerouslyGetState() {
  return navigationRef.current?.dangerouslyGetState();
}

function dispatch(action) {
  navigationRef.current?.dispatch(action);
}

function getCurrentOptions() {
  return navigationRef.current?.getCurrentOptions();
}

function getCurrentRoute() {
  return navigationRef.current?.getCurrentRoute();
}

function getRootState() {
  return navigationRef.current?.getRootState();
}

function navigate(name, params) {
  navigationRef.current?.navigate(name, params);
}

function goBack() {
  navigationRef.current?.goBack();
}

function removeListener(name, params) {
  navigationRef.current?.removeListener(name, params);
}

function reset() {
  navigationRef.current?.reset();
}

function resetRoot(state) {
  navigationRef.current?.resetRoot(state);
}

function setParams() {
  navigationRef.current?.setParams();
}

export {
  navigationRef,
  addListener,
  canGoBack,
  dangerouslyGetParent,
  dangerouslyGetState,
  dispatch,
  getCurrentOptions,
  getCurrentRoute,
  getRootState,
  navigate,
  goBack,
  removeListener,
  reset,
  resetRoot,
  setParams,
};
