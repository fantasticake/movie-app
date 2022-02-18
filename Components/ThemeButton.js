import React from "react";
import styled from "styled-components/native";
import { useThemeContext } from "../themes";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const Container = styled.TouchableHighlight`
  opacity: 0.8;
  position: absolute;
  bottom: 20px;
  right: 20px;
  width: 60px;
  height: 60px;
  border-radius: 30px;
  background-color: ${(props) => props.theme.style.textColor};
  justify-content: center;
  align-items: center;
  z-index: 1;
`;

const ThemeButton = () => {
  const {
    style: { backgroundColor },
  } = useThemeContext();
  const {
    state: { theme, setTheme },
  } = useThemeContext();
  return (
    <Container onPress={() => setTheme(theme === "light" ? "dark" : "light")}>
      {theme === "light" ? (
        <MaterialCommunityIcons
          name="weather-night"
          size={24}
          color={backgroundColor}
        />
      ) : (
        <MaterialCommunityIcons
          name="weather-sunny"
          size={28}
          color={backgroundColor}
        />
      )}
    </Container>
  );
};

export default ThemeButton;
