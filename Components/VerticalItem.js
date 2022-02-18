import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Dimensions } from "react-native";
import styled from "styled-components/native";
import { getImageUri } from "../utils";

const { height, width } = Dimensions.get("window");

const Container = styled.TouchableOpacity`
  height: ${height / 5}px;
  width: 100%;
  flex-direction: row;
  align-items: center;
  padding: 0 20px;
`;

const Poster = styled.Image`
  height: 100%;
  width: ${width / 4}px;
  border-radius: 4px;
  margin-right: 15px;
`;

const TextBox = styled.View`
  width: 65%;
  height: 80%;
  overflow: hidden;
`;

const Title = styled.Text`
  color: ${(props) => props.theme.style.textColor};
  font-weight: 700;
  font-size: 15px;
  margin-bottom: 3px;
`;

const Overview = styled.Text`
  color: ${(props) => props.theme.style.subTextColor};
`;

const VerticalItem = (data) => {
  const { title, name, poster_path, overview } = data;
  const { navigate } = useNavigation();
  return (
    <Container onPress={() => navigate("detail", { ...data })}>
      <Poster source={{ uri: getImageUri(poster_path) }} />
      <TextBox>
        <Title>{title || name}</Title>
        <Overview>{overview}</Overview>
      </TextBox>
    </Container>
  );
};

export default VerticalItem;
