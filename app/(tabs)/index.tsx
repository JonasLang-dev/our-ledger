import { SafeAreaView } from "@/atoms";
import Switch from "@/components/Switvh";

export default function HomeScreen() {
  return (
    <SafeAreaView bg={"$background"} flex={1}>
      <Switch />
    </SafeAreaView>
  );
}
