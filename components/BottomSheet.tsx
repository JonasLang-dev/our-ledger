import { ThemeContext } from "@/app/_layout";
import React, {
  forwardRef,
  useCallback,
  useContext,
  useImperativeHandle,
  useState,
} from "react";
import { StyleSheet, useWindowDimensions, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import BackDrop from "./BackDrop";
import Icon from "./Icon";
import Switch from "./Switch";

type Props = {};

export interface BottomSheetMethods {
  open: () => void;
  close: () => void;
}

const BottomSheet = forwardRef<BottomSheetMethods, Props>(({}, ref) => {
  const { theme } = useContext(ThemeContext);
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const [bottomSheetHeight, setBottomSheetHeight] = useState(1000);
  const OPEN = 0;
  const CLOSE = bottomSheetHeight + insets.bottom;

  const translateY = useSharedValue(OPEN);
  const animationStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
    };
  });

  const open = useCallback(() => {
    translateY.value = withTiming(OPEN);
  }, [translateY]);

  const close = useCallback(() => {
    translateY.value = withTiming(CLOSE);
  }, [CLOSE, translateY]);

  useImperativeHandle(
    ref,
    () => ({
      open,
      close,
    }),
    [open, close]
  );

  const pan = Gesture.Pan()
    .onUpdate((event) => {
      if (event.translationY < 0) {
        translateY.value = withSpring(OPEN, {
          damping: 100,
          stiffness: 400,
        });
      } else {
        translateY.value = withSpring(event.translationY, {
          damping: 100,
          stiffness: 400,
        });
      }
    })
    .onEnd(() => {
      if (translateY.value > 50) {
        translateY.value = withSpring(CLOSE, {
          damping: 100,
          stiffness: 400,
        });
      } else {
        translateY.value = withSpring(OPEN, {
          damping: 100,
          stiffness: 400,
        });
      }
    });

  const backgroundColorAnimation = useAnimatedStyle(() => {
    return {
      backgroundColor:
        theme === "dark" ? withTiming("#22273B") : withTiming("#F0F0F0"),
    };
  });

  const textColorAnimation = useAnimatedStyle(() => {
    return {
      color: theme === "dark" ? withTiming("white") : withTiming("black"),
    };
  });

  return (
    <>
      <BackDrop
        translateY={translateY}
        openHeight={OPEN}
        closeHeight={CLOSE}
        close={close}
      />
      <GestureDetector gesture={pan}>
        <Animated.View
          onLayout={({ nativeEvent }) => {
            const { height } = nativeEvent.layout;
            if (height) {
              setBottomSheetHeight(height);
              translateY.value = withTiming(height + insets.bottom);
            }
          }}
          style={[
            styles.container,
            { width: width * 0.92, bottom: insets.bottom },
            animationStyle,
            backgroundColorAnimation,
          ]}>
          <View style={styles.line} />
          <Icon />
          <Animated.Text style={[styles.textTitle, textColorAnimation]}>
            Choose a style
          </Animated.Text>
          <Animated.Text style={[styles.text, textColorAnimation]}>
            Pop or subtle. Day or night
          </Animated.Text>
          <Animated.Text style={[styles.text, textColorAnimation]}>
            Customize your interface
          </Animated.Text>
          <Switch />
        </Animated.View>
      </GestureDetector>
    </>
  );
});

BottomSheet.displayName = "BottomSheet";

export default BottomSheet;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    paddingVertical: 40,
    paddingHorizontal: 20,
    borderRadius: 30,
  },
  line: {
    backgroundColor: "black",
    position: "absolute",
    top: 8,
    width: 40,
    height: 4,
    borderRadius: 8,
  },
  textTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 40,
    marginBottom: 14,
  },
  text: {
    fontSize: 16,
    fontWeight: 500,
  },
});
