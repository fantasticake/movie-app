import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import Movies from "../screens/Movies";
import Tvs from "../screens/Tvs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Search from "../screens/Search";
import { useThemeContext } from "../themes";
import Hearts from "../screens/Hearts";

const Tab = createBottomTabNavigator();

const InNav = () => {
  const theme = useThemeContext();
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: { backgroundColor: theme.style.tabBarBackgroundColor },
        tabBarActiveTintColor: theme.style.tabBarActiveTintColor,
        tabBarInactiveTintColor: theme.style.tabBarInactiveTintColor,
      }}
    >
      <Tab.Screen
        options={{
          tabBarIcon: ({ focused, size, color }) => (
            <MaterialCommunityIcons
              name={focused ? "movie-open-outline" : "movie-outline"}
              size={size}
              color={color}
            />
          ),
        }}
        name="movies"
        component={Movies}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({ focused, size, color }) => (
            <MaterialCommunityIcons
              name={focused ? "television-play" : "television"}
              size={size}
              color={color}
            />
          ),
        }}
        name="tvs"
        component={Tvs}
      />
      <Tab.Screen
        name="hearts"
        component={Hearts}
        options={{
          tabBarIcon: ({ focused, size, color }) => (
            <MaterialCommunityIcons
              name={focused ? "heart-multiple-outline" : "heart-outline"}
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        options={{
          unmountOnBlur: true,
          tabBarIcon: ({ focused, size, color }) => (
            <MaterialCommunityIcons
              name={focused ? "magnify-plus-outline" : "magnify"}
              size={size}
              color={color}
            />
          ),
        }}
        name="search"
        component={Search}
      />
    </Tab.Navigator>
  );
};

export default InNav;
