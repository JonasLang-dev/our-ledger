import BottomSheet, { BottomSheetMethods } from "@/components/BottomSheet";
import Button from "@/components/Button";
import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, useColorScheme } from "react-native";
import Animated, {
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const Settings = () => {
  const colorScheme = useColorScheme();
  const insets = useSafeAreaInsets();
  const bottomSheetRef = useRef<BottomSheetMethods>(null);
  const [themeSwitch, setThemeSwitch] = useState<string>("system");
  const [theme, setTheme] = useState<string | null | undefined>(colorScheme);

  useEffect(() => {
    if (themeSwitch === "system") {
      setTheme(colorScheme);
      
    }
  }, [colorScheme, themeSwitch]);

  const backgroundColorAnimation = useAnimatedStyle(() => {
    return {
      backgroundColor:
        theme === "dark" ? withTiming("black") : withTiming("white"),
    };
  });
  return (
    <Animated.View
      style={[
        backgroundColorAnimation,
        styles.container,
        { paddingTop: insets.top },
      ]}>
      <Button bottomSheetRef={bottomSheetRef} theme={theme} />
      <BottomSheet
        ref={bottomSheetRef}
        setThemeSwitch={setThemeSwitch}
        themeSwitch={themeSwitch}
        setTheme={setTheme}
        theme={theme}
      />
    </Animated.View>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
