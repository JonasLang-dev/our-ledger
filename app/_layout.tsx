import { Stack } from "expo-router";
import "react-native-reanimated";

import { themes } from "@/constants/theme";
import { ThemeProvider } from "@shopify/restyle";
import { createContext, useState } from "react";
import { useColorScheme } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export const ThemeContext = createContext<{
  theme: "light" | "dark" | "system" | null;
  setTheme: React.Dispatch<
    React.SetStateAction<"light" | "dark" | "system" | null>
  >;
}>({ theme: null, setTheme: () => {} });

export default function RootLayout() {
  const colorScheme = useColorScheme();

  const [theme, setTheme] = useState<"light" | "dark" | "system" | null>(
    colorScheme ?? "light"
  );

  if (theme === null) {
    return;
  }
  console.log("Current color scheme:", theme);
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <GestureHandlerRootView>
        <ThemeProvider
          theme={
            theme === "system"
              ? themes[colorScheme!]
              : theme === "dark"
              ? themes.dark
              : themes.light
          }>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="+not-found" />
          </Stack>
          {/* <StatusBar style="auto" /> */}
        </ThemeProvider>
      </GestureHandlerRootView>
    </ThemeContext.Provider>
  );
}
