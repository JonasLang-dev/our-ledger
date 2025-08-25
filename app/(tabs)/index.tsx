import { SafeAreaView } from "@/atoms";
import Switch from "@/components/Switvh";
import { ColorValue, StyleSheet } from "react-native";

type TestColor = ColorValue;

export default function HomeScreen() {
  return (
    <SafeAreaView bg={"$background"} flex={1}>
      <Switch />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
