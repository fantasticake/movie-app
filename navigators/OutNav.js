import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import Detail from "../screens/Detail";
import Discovery from "../screens/Discovery";
import InNav from "./InNav";

const Stack = createNativeStackNavigator();

const OutNav = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="inNav" component={InNav} />
      <Stack.Screen name="detail" component={Detail} />
      <Stack.Screen name="discovery" component={Discovery} />
    </Stack.Navigator>
  );
};

export default OutNav;
