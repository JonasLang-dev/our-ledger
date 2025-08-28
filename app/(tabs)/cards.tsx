import { Text } from "@/atoms";
import Activity from "@/components/Activity";
import Card from "@/components/Card";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import Animated, {
  Extrapolation,
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { data } from "./data";

const Cards = () => {
  const [newData, setNewData] = useState([...data, ...data]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activityIndex, setActivityIndex] = useState(0);
  const animatedValue = useSharedValue(0);
  const MAX = 3;

  const animatedStyle = useAnimatedStyle(() => {
    if (animatedValue.value > currentIndex + 0.5) {
      runOnJS(setActivityIndex)(currentIndex + 1);
    } else {
      runOnJS(setActivityIndex)(currentIndex);
    }
    const opacity = interpolate(
      animatedValue.value,
      [currentIndex, currentIndex + 0.3, currentIndex + 0.8, currentIndex + 1],
      [1, 0, 0, 1],
      Extrapolation.CLAMP
    );

    return {
      opacity: opacity,
    };
  });
  return (
    <View style={styles.container}>
      <View style={styles.cardContainer}>
        {newData?.map((item, index) => {
          if (index > currentIndex + MAX || index < currentIndex) {
            return null;
          }
          return (
            <Card
              item={item}
              index={index}
              key={index}
              dataLength={newData.length}
              maxVisibleItems={MAX}
              currentIndex={currentIndex}
              animatedValue={animatedValue}
              setCurrentIndex={setCurrentIndex}
              setNewData={setNewData}
              newData={newData}
            />
          );
        })}
      </View>
      <Text
        variant={"default"}
        fontSize={32}
        paddingHorizontal={"md"}
        fontWeight={"bold"}>
        Recent Activity
      </Text>
      <View style={styles.activityContainer}>
        <Animated.ScrollView
          contentInsetAdjustmentBehavior={"automatic"}
          showsVerticalScrollIndicator={false}
          style={[{ width: "100%" }, animatedStyle]}>
          {newData[activityIndex].activity.map((item, index) => {
            return <Activity item={item} key={index} />;
          })}
        </Animated.ScrollView>
      </View>
    </View>
  );
};

export default Cards;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111111'
  },
  cardContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  activityContainer: {
    flex: 3 / 2,
    padding: 0,
    margin: 0,
  },
});
