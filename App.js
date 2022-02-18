import AppLoading from "expo-app-loading";
import React, { useState } from "react";
import { useAssets } from "expo-asset";
import * as Font from "expo-font";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import OutNav from "./navigators/OutNav";
import { QueryClient, QueryClientProvider } from "react-query";
import { StatusBar } from "expo-status-bar";
import { ThemeProvider } from "styled-components/native";
import themes from "./themes";
import Realm from "realm";
import { RealmContext } from "./context";
import { heartSchema } from "./schema";
import { setTestDeviceIDAsync } from "expo-ads-admob";

const queryClient = new QueryClient();

export default function App() {
  const [loading, setLoading] = useState(true);
  const [loaded, error] = Font.useFonts(MaterialCommunityIcons.font);
  const [theme, setTheme] = useState("dark");
  const [realm, setRealm] = useState(null);

  const startAsync = async () => {
    await setTestDeviceIDAsync("EMULATOR");
    const realmConnection = await Realm.open({
      path: "realm",
      schema: [heartSchema],
    });
    setRealm(realmConnection);
  };

  if (loading || !loaded)
    return (
      <AppLoading
        startAsync={startAsync}
        onFinish={() => setLoading(false)}
        onError={() => console.error}
      />
    );

  return (
    <ThemeProvider
      theme={{
        state: { theme, setTheme },
        style: theme === "light" ? themes.light : themes.dark,
      }}
    >
      <RealmContext.Provider value={realm}>
        <QueryClientProvider client={queryClient}>
          <NavigationContainer>
            <StatusBar style={theme === "light" ? "dark" : "light"} />
            <OutNav />
          </NavigationContainer>
        </QueryClientProvider>
      </RealmContext.Provider>
    </ThemeProvider>
  );
}
