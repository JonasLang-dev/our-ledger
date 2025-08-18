import React, { useContext } from "react";
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
      ]}></Animated.View>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
