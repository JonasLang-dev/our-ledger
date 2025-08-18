import { useState } from "react";
import { StyleSheet, View } from "react-native";
import {
  Card,
  SegmentedButtons,
  Text,
  useTheme
} from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const theme = useTheme();
  const [value, setValue] = useState("toDay");

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.content}>
        <Text variant="titleLarge">默认账本</Text>
      </View>

      <SegmentedButtons
        value={value}
        style={{
          alignSelf: 'center'
        }}
        onValueChange={setValue}
        buttons={[
          {
            value: "toDay",
            label: "今日",
          },
          {
            value: "toMonth",
            label: "本月",
          },
          { value: "toYear", label: "本年" },
          { value: "all", label: "全部" },
          { value: "customer", label: "自定义" },
        ]}
      />
      <Card>
        <Card.Title title="14日" left={() => <></>} />
        <Card.Content>
          <Text variant="titleLarge">支出</Text>
          <Text variant="bodyMedium">22233</Text>
        </Card.Content>
      </Card>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 20,
    gap: 20,
  },

  content: {
    paddingLeft: 20,
  },
});
