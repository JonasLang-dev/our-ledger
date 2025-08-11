import React from "react";
import { StyleSheet, TouchableWithoutFeedback } from "react-native";
import Animated, {
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { BottomSheetMethods } from "./BottomSheet";

type Props = {
  bottomSheetRef: React.RefObject<BottomSheetMethods | null>;
  theme: string | null | undefined;
};

const Button = ({ bottomSheetRef, theme }: Props) => {
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
    <TouchableWithoutFeedback
      onPress={() => {
        bottomSheetRef.current?.open();
      }}>
      <Animated.View style={[styles.container, backgroundColorAnimation]}>
        <Animated.Text style={[styles.text, textColorAnimation]}>Change Theme</Animated.Text>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

export default Button;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginTop: 10,
    marginHorizontal: 30,
    borderRadius: 20,
  },
  text: {
    fontSize: 16,
    fontWeight: 500,
  },
});
