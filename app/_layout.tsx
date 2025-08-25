import { activeThemeAtom } from "@/states/theme";
import { ThemeProvider } from "@shopify/restyle";
import { Stack } from "expo-router";
import { useAtom } from "jotai";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "react-native-reanimated";

export default function RootLayout() {
  const [activeTheme] = useAtom(activeThemeAtom);

  return (
    <ThemeProvider theme={activeTheme}>
      <GestureHandlerRootView>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>
      </GestureHandlerRootView>
    </ThemeProvider>
  );
}
