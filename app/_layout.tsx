import { Stack } from "expo-router";
import "react-native-reanimated";

import { PreferencesContext } from "@/constants/PreferencesContext";
import { CombinedDarkTheme, CombinedDefaultTheme } from "@/constants/theme";
import { createContext, useCallback, useMemo, useState } from "react";
import { StatusBar, useColorScheme } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { PaperProvider } from "react-native-paper";

export const ThemeContext = createContext<{
  theme: "light" | "dark" | "system" | null;
  setTheme: React.Dispatch<
    React.SetStateAction<"light" | "dark" | "system" | null>
  >;
}>({ theme: null, setTheme: () => {} });

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [isThemeDark, setIsThemeDark] = useState(false);

  let theme = isThemeDark ? CombinedDarkTheme : CombinedDefaultTheme;

  const toggleTheme = useCallback(() => {
    return setIsThemeDark(!isThemeDark);
  }, [isThemeDark]);

  const preferences = useMemo(
    () => ({
      toggleTheme,
      isThemeDark,
    }),
    [toggleTheme, isThemeDark]
  );
  return (
    <PreferencesContext.Provider value={preferences}>
      <PaperProvider theme={theme}>
        <GestureHandlerRootView>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="+not-found" />
          </Stack>
          <StatusBar
            barStyle={colorScheme === "dark" ? "light-content" : "dark-content"}
          />
        </GestureHandlerRootView>
      </PaperProvider>
    </PreferencesContext.Provider>
  );
}
