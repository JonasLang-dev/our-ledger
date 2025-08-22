import Switch from "@/components/Switvh";
import { useState } from "react";
import { StyleSheet } from "react-native";
import { Appbar, FAB, Portal, useTheme } from "react-native-paper";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

export default function HomeScreen() {
  const theme = useTheme();
  const [state, setState] = useState({ open: false });

  const onStateChange = ({ open }) => setState({ open });

  const { open } = state;

  const insets = useSafeAreaInsets();
  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Appbar.Header>
        <Appbar.Action icon="menu" onPress={() => {}} />
        <Appbar.Content title="默认账本" />
      </Appbar.Header>

      <Switch />

      <Portal>
        <FAB.Group
          variant="primary"
          open={open}
        
          style={{
            paddingBottom: 90
          }}
          visible
          icon={open ? "calendar-today" : "plus"}
          actions={[
            { icon: "plus", onPress: () => console.log("Pressed add") },
            {
              icon: "star",
              label: "Star",
              onPress: () => console.log("Pressed star"),
            },
            {
              icon: "email",
              label: "Email",
              onPress: () => console.log("Pressed email"),
            },
            {
              icon: "bell",
              label: "Remind",
              onPress: () => console.log("Pressed notifications"),
            },
          ]}
          onStateChange={onStateChange}
          onPress={() => {
            if (open) {
              // do something if the speed dial is open
            }
          }}
        />
      </Portal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
