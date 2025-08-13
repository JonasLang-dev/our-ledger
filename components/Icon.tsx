import { ThemeContext } from "@/app/_layout";
import {
  Canvas,
  Circle,
  Group,
  LinearGradient,
  Mask,
} from "@shopify/react-native-skia";
import React, { useContext, useEffect } from "react";
import { StyleSheet } from "react-native";

import {
  useDerivedValue,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";

type Props = {};

const RADIUS = 70;

const Icon = ({}: Props) => {
  const { theme } = useContext(ThemeContext);
  const gradientColor1 = useSharedValue("#ff4467");
  const gradientColor2 = useSharedValue("#ff8e0b");
  const cy = useSharedValue(0);
  const mask = useSharedValue(0);

  const colors = useDerivedValue(() => {
    return [gradientColor1.value, gradientColor2.value];
  });

  useEffect(() => {
    if (theme === "light") {
      cy.value = withTiming(0);
      mask.value = withTiming(0);
      gradientColor1.value = "#ff4467";
      gradientColor2.value = "#ff8e0b";
    } else {
      cy.value = withSpring(RADIUS / 2, { duration: 2000 });
      mask.value = withSpring(RADIUS, { duration: 2000 });
      gradientColor1.value = "#00c6ff";
      gradientColor2.value = "#0072ff";
    }
  });
  return (
    <Canvas style={styles.container}>
      <Mask
        mode="luminance"
        mask={
          <Group>
            <Circle cx={RADIUS} cy={RADIUS} r={RADIUS} color={"white"} />
            <Circle cx={RADIUS} cy={cy} r={mask} color={"black"} />
          </Group>
        }>
        <Circle cx={RADIUS} cy={RADIUS} r={RADIUS}>
          <LinearGradient
            colors={colors}
            transform={[{ rotate: -90 }]}
            origin={{ x: RADIUS, y: RADIUS }}
            start={{ x: 0, y: 0 }}
            end={{ x: RADIUS * 2, y: RADIUS * 2 }}
          />
        </Circle>
      </Mask>
    </Canvas>
  );
};

export default Icon;

const styles = StyleSheet.create({
  container: {
    width: RADIUS * 2,
    height: RADIUS * 2,
    transform: [{ rotate: "45deg" }],
  },
});
