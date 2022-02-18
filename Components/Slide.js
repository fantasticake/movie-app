import React from "react";
import styled from "styled-components/native";
import { getImageUri } from "../utils";
import { StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

const Touchable = styled.TouchableWithoutFeedback``;

const Container = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
  padding: 30px 20px 10px 20px;
`;

const BgImg = styled.Image``;

const Poster = styled.Image`
  height: 80%;
  width: 30%;
  border-radius: 5px;
  margin-right: 20px;
`;

const TextBox = styled.View`
  height: 70%;
  width: 60%;
  overflow: hidden;
`;

const Title = styled.Text`
  color: white;
  font-size: 18px;
  margin-bottom: 5px;
`;

const Overview = styled.Text`
  color: lightgray;
`;

const Slide = (data) => {
  const { navigate } = useNavigation();
  const { title, name, backdrop_path, poster_path, overview } = data;
  return (
    <Touchable
      onPress={() =>
        navigate("detail", {
          ...data,
        })
      }
    >
      <Container>
        <BgImg
          style={StyleSheet.absoluteFill}
          blurRadius={8}
          source={{ uri: getImageUri(backdrop_path) }}
        />
        <Poster source={{ uri: getImageUri(poster_path) }} />
        <TextBox>
          <Title>{title || name}</Title>
          <Overview>{overview}</Overview>
        </TextBox>
      </Container>
    </Touchable>
  );
};

export default Slide;
