import React, { useCallback, useEffect, useState } from "react";
import { Pressable, StyleSheet, useWindowDimensions } from "react-native";
import { useTheme } from "react-native-paper";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

type Props = {};

const Switch = ({}: Props) => {
  const [theme, setTheme] = useState("system");

  const { colors } = useTheme();

  const { width } = useWindowDimensions();
  const SWITCH_CONTAINER_WIDTH = width * 0.92;
  const SWITCH_WIDTH = (width * 0.92) / 4;
  const translateX = useSharedValue(0);

  const translateAnimation = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
    };
  });

  const switchChange = useCallback(() => {
    if (theme === "system") {
      translateX.value = withSpring(SWITCH_WIDTH * 0);
    } else if (theme === "light") {
      translateX.value = withSpring(SWITCH_WIDTH * 1);
    } else if (theme === "dark") {
      translateX.value = withSpring(SWITCH_WIDTH * 2);
    }
  }, [SWITCH_WIDTH, theme, translateX]);

  useEffect(() => {
    switchChange();
  }, [SWITCH_WIDTH, switchChange, theme, translateX]);

  const SlideBackgroundAnimation = useAnimatedStyle(() => {
    return {
      backgroundColor: withSpring("#f0f0f0"),
    };
  });

  return (
    <Animated.View
      style={[
        styles.container,
        {
          width: SWITCH_CONTAINER_WIDTH,
          backgroundColor: colors.surfaceVariant,
        },
      ]}>
      <Animated.View
        style={[
          styles.slideContainer,
          { width: SWITCH_WIDTH },
          translateAnimation,
        ]}>
        <Animated.View
          style={[
            styles.slide,
            { width: (width * 0.7) / 4 },
            SlideBackgroundAnimation,
          ]}
        />
      </Animated.View>
      <Pressable
        style={styles.button}
        onPress={(e) => {
          setTheme("system");
        }}>
        <Animated.Text style={[styles.textButton]}>今日</Animated.Text>
      </Pressable>
      <Pressable
        style={styles.button}
        onPress={() => {
          setTheme("light");
        }}>
        <Animated.Text style={[styles.textButton]}>本月</Animated.Text>
      </Pressable>

      <Pressable
        style={styles.button}
        onPress={() => {
          setTheme("dark");
        }}>
        <Animated.Text style={[styles.textButton]}>本年</Animated.Text>
      </Pressable>
      <Pressable
        style={styles.button}
        onPress={() => {
          setTheme("dark");
        }}>
        <Animated.Text style={[styles.textButton]}>自定义</Animated.Text>
      </Pressable>
    </Animated.View>
  );
};

export default Switch;

const styles = StyleSheet.create({
  container: {
    alignSelf: "center",
    borderRadius: 40,
    flexDirection: "row",
    justifyContent: "space-evenly",
    overflow: "hidden",
  },
  button: {
    flex: 1,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  textButton: {
    color: "black",
    fontWeight: "800",
		lineHeight: 23
  },
  slideContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
  },
  slide: {
    padding: 23,
    borderRadius: 100,
  },
});
