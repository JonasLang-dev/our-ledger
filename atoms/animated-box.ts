import { Theme } from "@/themes";
import { createBox } from "@shopify/restyle";
import { ViewProps } from "react-native";
import Animated, { AnimatedProps } from "react-native-reanimated";

const AnimatedBox = createBox<Theme, AnimatedProps<ViewProps>>(Animated.View);

export type AnimatedBoxProps = React.ComponentProps<typeof AnimatedBox>;

export default AnimatedBox;
