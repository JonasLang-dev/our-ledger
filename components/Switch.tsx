import { ThemeContext } from "@/app/_layout";
import React, { useCallback, useContext, useEffect } from "react";
import { Pressable, StyleSheet, useWindowDimensions } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

type Props = {};

const Switch = ({}: Props) => {
  const { theme, setTheme } = useContext(ThemeContext);
  const { width } = useWindowDimensions();
  const SWITCH_CONTAINER_WIDTH = width * 0.8;
  const SWITCH_WIDTH = (width * 0.8) / 3;
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

  const backgroundColor = useAnimatedStyle(() => {
    return {
      backgroundColor:
        theme === "dark" ? withSpring("black") : withSpring("white"),
    };
  });
  const textColorAnimation = useAnimatedStyle(() => {
    return {
      color: theme === "dark" ? withSpring("white") : withSpring("black"),
    };
  });
  const SlideBackgroundAnimation = useAnimatedStyle(() => {
    return {
      backgroundColor:
        theme === "dark" ? withSpring("#22273B") : withSpring("#f0f0f0"),
    };
  });

  return (
    <Animated.View
      style={[
        styles.container,
        { width: SWITCH_CONTAINER_WIDTH },
        backgroundColor,
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
            { width: (width * 0.7) / 3 },
            SlideBackgroundAnimation,
          ]}
        />
      </Animated.View>
      <Pressable
        style={styles.button}
        onPress={(e) => {
          setTheme("system");
        }}>
        <Animated.Text style={[styles.textButton, textColorAnimation]}>
          System
        </Animated.Text>
      </Pressable>
      <Pressable
        style={styles.button}
        onPress={() => {
          setTheme("light");
        }}>
        <Animated.Text style={[styles.textButton, textColorAnimation]}>
          Light
        </Animated.Text>
      </Pressable>
      <Pressable
        style={styles.button}
        onPress={() => {
          setTheme("dark");
        }}>
        <Animated.Text style={[styles.textButton, textColorAnimation]}>
          Dark
        </Animated.Text>
      </Pressable>
    </Animated.View>
  );
};

export default Switch;

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
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
    fontWeight: "500",
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
