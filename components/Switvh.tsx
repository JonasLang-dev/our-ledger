import { Text } from "@/atoms";
import activeThemeId from "@/states/theme";
import { Theme } from "@/themes";
import { useTheme } from "@shopify/restyle";
import { useAtom } from "jotai";
import React, { useCallback, useEffect } from "react";
import { Pressable, StyleSheet, useWindowDimensions } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

type Props = {};

const Switch = ({}: Props) => {
  const theme = useTheme<Theme>();
  const [activeTheme, setTheme] = useAtom(activeThemeId);

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
    if (activeTheme === "system") {
      translateX.value = withSpring(SWITCH_WIDTH * 0);
    } else if (activeTheme === "light") {
      translateX.value = withSpring(SWITCH_WIDTH * 1);
    } else if (activeTheme === "dark") {
      translateX.value = withSpring(SWITCH_WIDTH * 2);
    }
  }, [SWITCH_WIDTH, activeTheme, translateX]);

  useEffect(() => {
    switchChange();
  }, [SWITCH_WIDTH, switchChange, theme, translateX]);

  const SlideBackgroundAnimation = useAnimatedStyle(() => {
    return {
      backgroundColor: withSpring(theme.colors.$primary),
    };
  });

  return (
    <Animated.View
      style={[
        styles.container,
        {
          width: SWITCH_CONTAINER_WIDTH,
          backgroundColor: theme.colors.$windowBackground,
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
        <Text variant="default">今日</Text>
      </Pressable>
      <Pressable
        style={styles.button}
        onPress={() => {
          setTheme("light");
        }}>
        <Text variant="default">本月</Text>
      </Pressable>

      <Pressable
        style={styles.button}
        onPress={() => {
          setTheme("dark");
        }}>
        <Text variant="default">本年</Text>
      </Pressable>
      <Pressable
        style={styles.button}
        onPress={() => {
          // setTheme("dark");
        }}>
        <Text variant="default">自定义</Text>
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
