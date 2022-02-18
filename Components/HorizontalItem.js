import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Dimensions } from "react-native";
import styled from "styled-components/native";
import { getImageUri } from "../utils";

const { width: WINDOW_WIDTH, height: WINDOW_HEIGHT } = Dimensions.get("window");

const Container = styled.TouchableOpacity`
  width: ${WINDOW_WIDTH / 3.5}px;
  height: ${WINDOW_HEIGHT / 3.5}px;
`;

const BgImg = styled.Image`
  height: 80%;
  border-radius: 5px;
`;

const Title = styled.Text`
  margin-top: 3px;
  font-weight: 700;
  color: ${(props) => props.theme.style.textColor};
  text-align: center;
`;

const HorizontalItem = (data) => {
  const { poster_path, title, name } = data;
  const { navigate } = useNavigation();
  return (
    <Container onPress={() => navigate("detail", { ...data })}>
      <BgImg source={{ uri: getImageUri(poster_path) }} />
      {title ? (
        <Title>{title.length > 13 ? title.slice(0, 13) + "..." : title}</Title>
      ) : (
        <Title>{name.length > 13 ? name.slice(0, 13) + "..." : name}</Title>
      )}
    </Container>
  );
};

export default HorizontalItem;
