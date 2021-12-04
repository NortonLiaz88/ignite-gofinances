import React from "react";
import { View, Text, StyleSheet } from "react-native";
import {
  Container,
  Header,
  Title,
  UserWrapper,
  UserInfo,
  Photo,
  User,
  UserGreeting,
  UserName,
  Icon,
  HighlightCards,
} from "./styles";

import { RFValue } from "react-native-responsive-fontsize";
import { Feather } from "@expo/vector-icons";
import { HighLightCard } from "../components/HighlightCard";

export function Dashboard() {
  return (
    
    <Container>
      <Header>
        <UserWrapper>
          <UserInfo>
            <Photo
              source={{
                uri: "https://avatars.githubusercontent.com/u/62452151?v=4",
              }}
            ></Photo>
            <User>
              <UserGreeting>Olá,</UserGreeting>
              <UserName>Norton</UserName>
            </User>
          </UserInfo>
          <Icon name="power" />
        </UserWrapper>
      </Header>
      <HighlightCards
      >
        <HighLightCard></HighLightCard>
        <HighLightCard></HighLightCard>
        <HighLightCard></HighLightCard>
      </HighlightCards>
    </Container>
  );
}
