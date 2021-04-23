import React from "react";
import {
  createBottomTabNavigator,
  BottomTabBarProps,
} from "@react-navigation/bottom-tabs";
import { TabBar } from "./TabBar";
import { AppsScreen } from "../../screens/AppsScreen";
import SingleProduct from '../../screens/singleproduct';
import { DashboardScreen } from "../../screens/DashboardScreen";
import { GroupScreen } from "../../screens/GroupScreen";
import { WishlistScreen } from "../../screens/WishlistScreen";
import { ProfileScreen } from "../../screens/ProfileScreen";
import { useSafeArea } from "react-native-safe-area-context";
import { View } from "react-native";
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

function Home(){
  return(
    <Stack.Navigator headerMode='none'>
      <Stack.Screen name="AppsScreen" component={AppsScreen} />
      <Stack.Screen name="SingleProduct" component={SingleProduct} />
    </Stack.Navigator>
  )
}
export const BottomMenu = () => {
  const Tab = createBottomTabNavigator();
  return (
    <View style={{ flex: 1, position: "relative"}}>
      <Tab.Navigator
        tabBar={(props: BottomTabBarProps) => <TabBar {...props} />}
      >
        <Tab.Screen name="find" component={Home} />
        <Tab.Screen name="profile" component={DashboardScreen} />
        <Tab.Screen name="hearto" component={GroupScreen} />
        <Tab.Screen name="shoppingcart" component={WishlistScreen} />
        <Tab.Screen name="user" component={ProfileScreen} />
      </Tab.Navigator>
      {useSafeArea().bottom > 0 && (
        <View
          style={{
            height: useSafeArea().bottom - 5,
            backgroundColor: "white",
          }}
        />
      )}
    </View>
  );
};
