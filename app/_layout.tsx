import activeThemeId, { activeThemeAtom } from "@/states/theme";
import { themes } from "@/themes";
import { ThemeProvider } from "@shopify/restyle";
import { Stack } from "expo-router";
import { useAtom } from "jotai";
import { useColorScheme } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "react-native-reanimated";

export default function RootLayout() {
  const [activeTheme] = useAtom(activeThemeAtom);
  const colorScheme = useColorScheme();
  const [themeId] = useAtom(activeThemeId);

  return (
    <ThemeProvider
      theme={
        themeId === "system"
          ? colorScheme === "dark"
            ? themes[1].theme
            : themes[0].theme
          : activeTheme
      }>
      <GestureHandlerRootView>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>
      </GestureHandlerRootView>
    </ThemeProvider>
  );
}
