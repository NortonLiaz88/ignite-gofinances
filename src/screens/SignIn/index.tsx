import React, { useState } from "react";
import { ActivityIndicator, Alert, Platform } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { useTheme } from "styled-components";
import AppleSvg from "../../assets/apple.svg";
import GoogleSvg from "../../assets/google.svg";
import LogoSvg from "../../assets/logo.svg";
import { SignInSocialButton } from "../../components/SignInSocialButton";
import { useAuth } from "../../hooks/auth";
import {
  Container,
  Header,
  TitleWrapper,
  Title,
  SigInTitle,
  Footer,
  FooterWrapper,
} from "./styles";

export function SignIn() {
  const [isLoading, setIsLoading] = useState(false);
  const { signInWithGoogle } = useAuth();
  const theme = useTheme();

  const data = useAuth();

  async function handleSignInWithGoogle() {
    try {
      setIsLoading(true);
      return await signInWithGoogle();
    } catch {
      Alert.alert("Não foi possível conectar a conta Google");
      setIsLoading(false);
    }
  }
  return (
    <Container>
      <Header>
        <TitleWrapper>
          <LogoSvg width={RFValue(120)} height={RFValue(68)} />
          <Title>
            Controle suas{`\n`} finanças de forma{`\n`} muito simples
          </Title>
        </TitleWrapper>
        <SigInTitle>
          Faça seu login{`\n`} com uma das{`\n`} contas abaixo
        </SigInTitle>
      </Header>
      <Footer>
        <FooterWrapper>
          <SignInSocialButton
            title="Entrar com o Google"
            svg={GoogleSvg}
            onPress={handleSignInWithGoogle}
          ></SignInSocialButton>
          {Platform.OS === "ios" && (
            <SignInSocialButton
              title="Entrar com o Apple"
              svg={AppleSvg}
            ></SignInSocialButton>
          )}
        </FooterWrapper>

        {isLoading && (
          <ActivityIndicator
            color={theme.colors.shape}
            style={{ marginTop: 18 }}
          />
        )}
      </Footer>
    </Container>
  );
}
