import React from "react";

import Tabs from "@/components/BottomTabNavigator";
import { Theme } from "@/constants/theme";
import { useTheme } from "@shopify/restyle";

export default function TabLayout() {
  const { colors } = useTheme<Theme>();

  const { primary } = colors;

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: primary,
        lazy: true,
      }}>
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
