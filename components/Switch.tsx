import React, { useEffect } from "react";
import {
  Appearance,
  Pressable,
  StyleSheet,
  useWindowDimensions,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

type Props = {
  themeSwitch: string;
  setThemeSwitch: React.Dispatch<React.SetStateAction<string>>;
  theme: string | null | undefined;
  setTheme: React.Dispatch<React.SetStateAction<string | null | undefined>>;  
};

const Switch = ({ setThemeSwitch, themeSwitch, theme, setTheme }: Props) => {
  const colorScheme = Appearance.getColorScheme();
  const { width } = useWindowDimensions();
  const SWITCH_CONTAINER_WIDTH = width * 0.8;
  const SWITCH_WIDTH = (width * 0.8) / 3;
  const translateX = useSharedValue(0);

  const translateAnimation = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
    };
  });

  useEffect(() => {
    if (themeSwitch === "system") {
      
      translateX.value = withSpring(SWITCH_WIDTH * 0);
    } else if (themeSwitch === "light") {
      translateX.value = withSpring(SWITCH_WIDTH * 1);
    } else if (themeSwitch === "dark") {
      translateX.value = withSpring(SWITCH_WIDTH * 2);
    }
  }, [SWITCH_WIDTH, themeSwitch, translateX]);

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
        onPress={() => {
          setThemeSwitch("system");
          if (colorScheme) {
            setTheme(colorScheme);
          }
        }}>
        <Animated.Text style={[styles.textButton, textColorAnimation]}>
          System
        </Animated.Text>
      </Pressable>
      <Pressable
        style={styles.button}
        onPress={() => {
          setThemeSwitch("light");
          setTheme("light");
        }}>
        <Animated.Text style={[styles.textButton, textColorAnimation]}>
          Light
        </Animated.Text>
      </Pressable>
      <Pressable
        style={styles.button}
        onPress={() => {
          setThemeSwitch("dark");
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
