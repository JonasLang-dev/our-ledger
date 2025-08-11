import { Tabs } from "expo-router";
import React from "react";

import { Theme } from "@/constants/theme";
import { AntDesign, Entypo, Ionicons } from "@expo/vector-icons";
import { useTheme } from "@shopify/restyle";

export default function TabLayout() {
  const { colors } = useTheme<Theme>();

  const { primary } = colors;

  return (
    <Tabs
      screenOptions={{
        animation: "shift",
        headerShown: false,
        tabBarActiveTintColor: primary,
        lazy: true,
        tabBarStyle: {
          backgroundColor: colors.background,
          borderTopWidth: 0,
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <AntDesign name="home" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="cards"
        options={{
          title: "Cards",
          tabBarIcon: ({ color }) => (
            <Entypo name="credit-card" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="analysis"
        options={{
          title: "Analysis",
          tabBarIcon: ({ color }) => (
            <Ionicons name="analytics-outline" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ color }) => (
            <AntDesign name="setting" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
