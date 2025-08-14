import OlSlideSwitch from '@/components/ol/OlSlideSwitch';
import React, { useState } from 'react';
import { StyleSheet } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';

const Analysis = () => {
	// 数据分析时间切换Switch选项
	const analysisTimeSwitchOptions = [
		{
			key: 0,
			label: "本日",
			value: "today",
		},
		{
			key: 1,
			label: "本周",
			value: "week",
		},
		{
			key: 2,
			label: "本月",
			value: "month",
		},
		{
			key: 3,
			label: "本季度",
			value: "quarter",
		},
		{
			key: 4,
			label: "本年",
			value: "year",
		},
		{
			key: 5,
			label: "自定义",
			value: "custom",
		},
	]

	const [analysisTimeSwitch, setAnalysisTimeSwitch] = useState<number>(0);

	// 数据分析时间切换Switch选项回调
	const analysisTimeSwitchHandleChange = (key: number, value: string) => {
		setAnalysisTimeSwitch(key)

	};

	return (
		<SafeAreaView edges={['top']} style={styles.container}>

			<OlSlideSwitch
				options={analysisTimeSwitchOptions}
				currentValue={analysisTimeSwitch}
				onChange={analysisTimeSwitchHandleChange}
				containerWidthRatio={0.95}
				buttonWidthRatio={0.8}
				lightSlideBackgroundColor="#3378FF"
				lightTextColor="#3378FF"
				containerStyle={{
					marginTop: 20,
					borderRadius: 32,
				}}
				buttonStyle={{
					padding: 10,
				}}
				textStyle={{
					fontSize: 12,
					fontWeight: "700",
				}}
				slideStyle={{
					padding: 14,
					borderRadius: 16,
				}}
			>
			</OlSlideSwitch>
		</SafeAreaView>
	)
}

export default Analysis

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
});