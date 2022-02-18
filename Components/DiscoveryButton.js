import { useNavigation } from "@react-navigation/native";
import React from "react";
import styled from "styled-components/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useThemeContext } from "../themes";

const Container = styled.TouchableHighlight`
  position: absolute;
  bottom: 90px;
  right: 20px;
  width: 60px;
  height: 60px;
  border-radius: 30px;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.style.tabBarActiveTintColor};
  z-index: 1;
  opacity: 0.8;
`;

const DiscoveryButton = ({ isMovie }) => {
  const {
    style: { backgroundColor },
  } = useThemeContext();
  const { navigate } = useNavigation();
  return (
    <Container onPress={() => navigate("discovery", { isMovie })}>
      <MaterialCommunityIcons
        name="cards-outline"
        size={24}
        color={backgroundColor}
      />
    </Container>
  );
};

export default DiscoveryButton;
