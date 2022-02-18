import React from "react";
import Swiper from "react-native-web-swiper";
import styled from "styled-components/native";
import Slide from "./Slide";
import { Dimensions } from "react-native";

const { height: WINDOW_HEIGHT } = Dimensions.get("window");

const Container = styled.View`
  height: ${WINDOW_HEIGHT / 3}px;
  margin-bottom: 25px;
`;

const Slider = ({ data }) => {
  return (
    <Container>
      <Swiper loop timeout={5} controlsEnabled={false}>
        {data.map((item) => (
          <Slide key={item.id} {...item} />
        ))}
      </Swiper>
    </Container>
  );
};

export default Slider;
