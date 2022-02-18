import React, { useEffect, useRef, useState } from "react";
import { Animated, PanResponder } from "react-native";
import { useInfiniteQuery } from "react-query";
import styled from "styled-components/native";
import api, { contents } from "../api";
import {
  getImageUri,
  getInfinityQueryData,
  getNextPageParam,
  sliceText,
} from "../utils";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useThemeContext } from "../themes";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.style.backgroundColor};
`;

const ArrowBox = styled.View`
  flex: 1;
  justify-content: space-between;
  padding: 70px;
`;

const Arrow = styled.View`
  align-items: center;
`;

const ArrowTxt = styled.Text`
  color: ${(props) => props.theme.style.textColor};
  margin-bottom: 5px;
  margin-top: 3px;
`;

const Card = styled.View`
  position: absolute;
  border-width: 1px;
  border-color: ${(props) => props.theme.style.textColor};
  background-color: ${(props) => props.theme.style.tabBarBackgroundColor};
  border-radius: 10px;
  height: 330px;
  width: 210px;
  overflow: hidden;
`;
const AnimatedCard = Animated.createAnimatedComponent(Card);

const BgImg = styled.Image`
  height: 100%;
  width: 100%;
`;

const Discovery = ({
  navigation: { navigate },
  route: {
    params: { isMovie },
  },
}) => {
  const { style } = useThemeContext();
  const translateY = useRef(new Animated.Value(0)).current;
  const scale = translateY.interpolate({
    inputRange: [-250, 0, 250],
    outputRange: [1, 0.7, 1],
    extrapolate: "clamp",
  });
  const opacity = translateY.interpolate({
    inputRange: [-250, -100, 100, 250],
    outputRange: [1, 0.5, 0.5, 1],
    extrapolate: "clamp",
  });

  const media = isMovie ? "movies" : "tvs";
  const contentList = contents[media];
  const randomContent =
    contentList[Math.floor(Math.random() * contentList.length)];
  const { data, isLoading, hasNextPage, fetchNextPage } = useInfiniteQuery(
    [media, "discovery"],
    api[media][randomContent],
    { getNextPageParam }
  );

  const [index, setIndex] = useState(0);
  const [isScrolledDown, setIsScrolledDwon] = useState(false);

  const onCardUp = () =>
    Animated.spring(translateY, {
      toValue: -500,
      useNativeDriver: true,
      restDisplacementThreshold: 350,
      restSpeedThreshold: 350,
    }).start(() => {
      setIndex((prev) => ++prev);
      translateY.setValue(0);
    });

  const onCardDown = () => {
    setIsScrolledDwon(true);
    Animated.spring(translateY, {
      toValue: 0,
      useNativeDriver: true,
    }).start();
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gestureState) => {
        translateY.setValue(gestureState.dy);
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dy < -100) onCardUp();
        else if (gestureState.dy > 100) onCardDown();
        else {
          Animated.spring(translateY, {
            toValue: 0,
            useNativeDriver: true,
          }).start();
        }
      },
    })
  ).current;

  useEffect(() => {
    if (data) {
      if (index + 5 > getInfinityQueryData(data).length && hasNextPage)
        fetchNextPage();
    }
  }, [index]);

  useEffect(() => {
    if (isScrolledDown) {
      const currentItem = getInfinityQueryData(data)[index];
      navigate("detail", { ...currentItem });
      setIsScrolledDwon(false);
    }
  }, [isScrolledDown]);

  if (isLoading) return null;
  const dataList = getInfinityQueryData(data);
  const currentItem = dataList[index];
  const nextItem = dataList[index + 1];
  return (
    <Container>
      <ArrowBox>
        <Arrow>
          <MaterialCommunityIcons
            name="arrow-up-bold-outline"
            size={24}
            color={style.textColor}
          />
          <ArrowTxt>패스</ArrowTxt>
        </Arrow>
        <Arrow>
          <ArrowTxt>자세히</ArrowTxt>
          <MaterialCommunityIcons
            name="arrow-down-bold-outline"
            size={24}
            color={style.textColor}
          />
        </Arrow>
      </ArrowBox>
      {nextItem ? (
        <AnimatedCard style={{ opacity, transform: [{ scale }] }}>
          <BgImg source={{ uri: getImageUri(nextItem.poster_path) }} />
        </AnimatedCard>
      ) : null}
      {currentItem ? (
        <AnimatedCard
          style={{ transform: [{ translateY }] }}
          {...panResponder.panHandlers}
        >
          <BgImg source={{ uri: getImageUri(currentItem.poster_path) }} />
        </AnimatedCard>
      ) : null}
    </Container>
  );
};

export default Discovery;
