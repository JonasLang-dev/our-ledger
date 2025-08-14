import { ThemeContext } from "@/app/_layout";
import React, { useCallback, useContext, useEffect } from "react";
import { Pressable, StyleSheet, useWindowDimensions } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

/**
 * 选项类型定义
 * @interface Option
 * @property {number} key - 选项的唯一标识符
 * @property {string} label - 选项显示的文本
 * @property {string} value - 选项的值
 */
type Option = {
  key: number;
  label: string;
  value: string;
};

/**
 * 滑动开关组件属性
 * @interface Props
 * @property {Option[]} options - 选项数组
 * @property {number} currentValue - 当前选中的选项key
 * @property {(key: number, value: string) => void} onChange - 选项改变时的回调函数
 * @property {number} [containerWidthRatio=0.8] - 容器宽度占屏幕宽度的比例
 * @property {number} [buttonWidthRatio=0.7] - 按钮宽度占容器宽度的比例
 * @property {object} [containerStyle={}] - 容器自定义样式
 * @property {object} [buttonStyle={}] - 按钮自定义样式
 * @property {object} [textStyle={}] - 文本自定义样式
 * @property {object} [slideStyle={}] - 滑块自定义样式
 * @property {string} [lightTextColor="black"] - 浅色模式下的文本颜色
 * @property {string} [darkTextColor="white"] - 深色模式下的文本颜色
 * @property {string} [lightSelectedTextColor="white"] - 浅色模式下选中项的文本颜色
 * @property {string} [darkSelectedTextColor="black"] - 深色模式下选中项的文本颜色
 * @property {string} [lightSlideBackgroundColor="#f0f0f0"] - 浅色模式下滑块背景颜色
 * @property {string} [darkSlideBackgroundColor="#22273B"] - 深色模式下滑块背景颜色
 */
type Props = {
  options: Option[];
  currentValue: number;
  onChange: (key: number,value:string) => void;
  containerWidthRatio?: number;
  buttonWidthRatio?: number;
  containerStyle?: object;
  buttonStyle?: object;
  textStyle?: object;
  slideStyle?: object;
  lightTextColor?: string;
  darkTextColor?: string;
  lightSelectedTextColor?: string;
  darkSelectedTextColor?: string;
  lightSlideBackgroundColor?: string;
  darkSlideBackgroundColor?: string;
};

const OlSlideSwitch = ({
  options,
  currentValue,
  onChange,
  containerWidthRatio = 0.8,
  buttonWidthRatio = 0.7,
  containerStyle = {},
  buttonStyle = {},
  textStyle = {},
  slideStyle = {},
  lightTextColor = "black",
  darkTextColor = "white",
  lightSelectedTextColor = "white",
  darkSelectedTextColor = "black",
  lightSlideBackgroundColor = "#f0f0f0",
  darkSlideBackgroundColor = "#22273B",
}: Props) => {
  const { theme } = useContext(ThemeContext);
  const { width } = useWindowDimensions();
  // 计算容器宽度和每个选项的宽度
  const SWITCH_CONTAINER_WIDTH = width * containerWidthRatio;
  const SWITCH_WIDTH = SWITCH_CONTAINER_WIDTH / options.length;
  // x轴偏移量
  const translateX = useSharedValue(0);

  const translateAnimation = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
    };
  });

  // 切换选项
  const switchChange = useCallback(() => {
    const index = options.findIndex(option => option.key === currentValue);
    if (index !== -1) {
      translateX.value = withSpring(SWITCH_WIDTH * index);
    }
  }, [SWITCH_WIDTH, currentValue, options, translateX]);

  useEffect(() => {
    switchChange();
  }, [SWITCH_WIDTH, switchChange, currentValue]);

  // 切换组件背景颜色
  const backgroundColor = useAnimatedStyle(() => {
    return {
      backgroundColor:
        theme === "dark" ? withSpring("black") : withSpring("white"),
    };
  });

  // 当前选中的索引
  const selectedIndex = useSharedValue(0);

  // 更新选中索引
  useEffect(() => {
    const index = options.findIndex(option => option.key === currentValue);
    if (index !== -1) {
      selectedIndex.value = index;
    }
  }, [currentValue, options]);

  // 改变文字颜色
  const getTextColorAnimation = (index: number) => {
    return useAnimatedStyle(() => {
      const isSelected = selectedIndex.value === index;
      const textColor = isSelected
        ? (theme === "dark" ? darkSelectedTextColor : lightSelectedTextColor)
        : (theme === "dark" ? darkTextColor : lightTextColor);
      return {
        color: withSpring(textColor),
      };
    });
  };

  // 滑块颜色
  const slideBackgroundAnimation = useAnimatedStyle(() => {
    return {
      backgroundColor:
        theme === "dark" ? withSpring(darkSlideBackgroundColor) : withSpring(lightSlideBackgroundColor),
    };
  });

  return (
    <Animated.View
      style={[
        styles.container,
        { width: SWITCH_CONTAINER_WIDTH },
        backgroundColor,
        containerStyle,
      ]}>
      <Animated.View
        style={[
          styles.slideContainer,
          { width: SWITCH_WIDTH },
          translateAnimation,
        ]}>
        <Animated.View
          style={[
            { width: (width * buttonWidthRatio) / options.length },
            slideBackgroundAnimation,
            styles.slide,
            slideStyle,
          ]}
        />
      </Animated.View>
      {options.map((option, index) => (
        <Pressable
          key={option.key}
          style={[styles.button, buttonStyle]}
          onPress={() => {
            onChange(option.key,option.value);
          }}>
          <Animated.Text style={[getTextColorAnimation(index), textStyle, { textAlign: 'center' }]}>
            {option.label}
          </Animated.Text>
        </Pressable>
      ))}
    </Animated.View>
  );
};

export default OlSlideSwitch;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    overflow: "hidden",
  },
  button: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  slideContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
  },
  slide: {
    justifyContent: "center",
    alignItems: "center"
  },
});