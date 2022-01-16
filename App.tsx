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
import { AuthContext, AuthProvider, useAuth } from "./src/hooks/auth";
import { Routes } from "./src/routes";

export default function App() {
  const data = useContext(AuthContext);

  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold,
  });

  const {userStorageLoading} = useAuth();

  if (!fontsLoaded || userStorageLoading) {
    return <AppLoading />;
  }

  return (
    <ThemeProvider theme={theme}>
      <StatusBar barStyle="light-content" />

      <AuthProvider>
        <Routes />
      </AuthProvider>
    </ThemeProvider>
  );
}
