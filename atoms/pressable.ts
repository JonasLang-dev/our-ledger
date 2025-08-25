import { Theme } from "@/themes";
import { createBox } from "@shopify/restyle";
import {
	Pressable as NaitvePressable,
	PressableProps as NativePressProps,
} from "react-native";

const Pressable = createBox<Theme, NativePressProps>(NaitvePressable);
export type PressableProps = React.ComponentProps<typeof Pressable>;

export default Pressable;
