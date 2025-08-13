import BottomSheet, { BottomSheetMethods } from "@/components/BottomSheet";
import Button from "@/components/Button";
import React, { useContext, useRef } from "react";
import { StyleSheet } from "react-native";
import Animated, {
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ThemeContext } from "../_layout";

const Settings = () => {
  const insets = useSafeAreaInsets();
  const { theme } = useContext(ThemeContext);
  // const colorScheme = Appearance.getColorScheme();
  const bottomSheetRef = useRef<BottomSheetMethods>(null);
  // const [themeSwitch, setThemeSwitch] = useState<string>("system");
  // const [theme, setTheme] = useState<string | null | undefined>(colorScheme);

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
      <Button bottomSheetRef={bottomSheetRef} />
      <BottomSheet ref={bottomSheetRef} />
    </Animated.View>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
