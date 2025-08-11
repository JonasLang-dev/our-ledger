import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

import { themes } from "@/constants/theme";
import { ThemeProvider } from "@shopify/restyle";
import { useColorScheme } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });
  const colorScheme = useColorScheme();

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <GestureHandlerRootView>
      <ThemeProvider
        theme={colorScheme === "dark" ? themes.dark : themes.light}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>
        <StatusBar style="auto" />
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
