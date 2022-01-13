import React, { useContext } from "react";
import { ThemeProvider } from "styled-components/native";
import { NavigationContainer } from "@react-navigation/native";
import "intl";
import "intl/locale-data/jsonp/pt-BR";
import AppLoading from "expo-app-loading";

import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";

import theme from "./src/global/styles/theme";
import { Dashboard } from "./src/screens/Dashboard";
import { Register } from "./src/screens/Register";
import { CategorySelect } from "./src/screens/CategorySelect";
import { AppRoutes } from "./src/routes/app.routes";
import { StatusBar } from "react-native";
import { SignIn } from "./src/screens/SignIn";
import { AuthContext, AuthProvider } from "./src/hooks/auth";

export default function App() {
  const data = useContext(AuthContext);

  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <ThemeProvider theme={theme}>
      <NavigationContainer>
        <StatusBar barStyle="light-content" />
        {/* <AppRoutes></AppRoutes> */}
        <AuthProvider>
          <SignIn></SignIn>
        </AuthProvider>
      </NavigationContainer>
    </ThemeProvider>
  );
}
