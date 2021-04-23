import React from "react";
import {
  createBottomTabNavigator
} from "@react-navigation/bottom-tabs";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import {BottomMenu} from "./src/components/BottomMenu/BottomMenu";
import {Provider} from 'react-redux';
// import {GoogleSignin} from '@react-native-community/google-signin';
import store, {persistor} from './Store/index';
import {PersistGate} from 'redux-persist/integration/react';

export default function App() {
  return (
    <Provider store={store}>
    <PersistGate persistor={persistor}>
    <NavigationContainer>
      <SafeAreaProvider>
          <BottomMenu/>
      </SafeAreaProvider>
    </NavigationContainer>
    </PersistGate>
  </Provider>
  );
}
