import { Theme } from "@/themes";
import { createBox } from "@shopify/restyle";
import { ViewProps } from "react-native";
import { SafeAreaView as NativeSafeAreaView } from "react-native-safe-area-context";

const SafeAreaView = createBox<Theme, ViewProps>(NativeSafeAreaView);
export type SafeAreaViewProps = React.ComponentProps<typeof SafeAreaView>;

export default SafeAreaView;
