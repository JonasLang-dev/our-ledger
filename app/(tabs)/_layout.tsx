import { Theme } from "@/themes";
import {
  createNativeBottomTabNavigator,
  NativeBottomTabNavigationEventMap,
  NativeBottomTabNavigationOptions,
} from "@bottom-tabs/react-navigation";
import { ParamListBase, TabNavigationState } from "@react-navigation/native";
import { useTheme } from "@shopify/restyle";
import { withLayoutContext } from "expo-router";
import React from "react";

const BottomTabNavigator = createNativeBottomTabNavigator().Navigator;

const Tabs = withLayoutContext<
  NativeBottomTabNavigationOptions,
  typeof BottomTabNavigator,
  TabNavigationState<ParamListBase>,
  NativeBottomTabNavigationEventMap
>(BottomTabNavigator);
export default function TabLayout() {
  const theme = useTheme<Theme>();

  return (
    <Tabs
      tabBarStyle={{
        backgroundColor: theme.colors.$windowBackground,
      }}
      tabBarActiveTintColor={theme.colors.$primary}
      activeIndicatorColor={theme.colors.$background}>
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: () => require("@/assets/icons/wallet-outline.svg"),
        }}
      />
      <Tabs.Screen
        name="cards"
        options={{
          title: "Cards",
          tabBarIcon: () => require("@/assets/icons/card-outline.svg"),
        }}
      />
      <Tabs.Screen
        name="analysis"
        options={{
          title: "Analysis",
          tabBarIcon: () => require("@/assets/icons/stats-chart-outline.svg"),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: () => require("@/assets/icons/settings-outline.svg"),
        }}
      />
    </Tabs>
  );
}
