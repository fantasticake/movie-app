import { useContext } from "react";
import { ThemeContext } from "styled-components/native";

const themes = {
  light: {
    backgroundColor: "#FAFDFB",
    textColor: "black",
    subTextColor: "gray",
    tabBarBackgroundColor: "white",
    tabBarInactiveTintColor: "#D8F3DC",
    tabBarActiveTintColor: "#52B788",
  },
  dark: {
    backgroundColor: "#040D0A",
    textColor: "white",
    subTextColor: "lightgray",
    tabBarBackgroundColor: "black",
    tabBarInactiveTintColor: "#193A2C",
    tabBarActiveTintColor: "#95d5b2",
  },
};

export const useThemeContext = () => useContext(ThemeContext);

export default themes;
