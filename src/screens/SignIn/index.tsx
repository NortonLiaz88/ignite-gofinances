import React from "react";
import { RFValue } from "react-native-responsive-fontsize";
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
  const data = useAuth();
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
          ></SignInSocialButton>
          <SignInSocialButton
            title="Entrar com o Apple"
            svg={AppleSvg}
          ></SignInSocialButton>
        </FooterWrapper>
      </Footer>
    </Container>
  );
}
