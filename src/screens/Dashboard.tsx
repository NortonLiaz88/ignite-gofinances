import React from "react";
import { View, Text, StyleSheet } from "react-native";
import {
  Container,
  Header,
  UserWrapper,
  UserInfo,
  Photo,
  User,
  UserGreeting,
  UserName,
  Icon,
  HighlightCards,
  Transactions,
  Title
} from "./styles";

import { RFValue } from "react-native-responsive-fontsize";
import { Feather } from "@expo/vector-icons";
import { HighLightCard } from "../components/HighlightCard";
import { TransactionCard } from "../components/TransactionCard";

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
      <HighlightCards>
        <HighLightCard
          type="up"
          title="Entradas"
          amount="R$ 17.400,00"
          lastTransaction="Última entrada dia 13 de abril"
        ></HighLightCard>
        <HighLightCard
          type="down"
          title="Saídas"
          amount="R$ R$ 1.259,00"
          lastTransaction="Última saída dia 03 de abril"
        ></HighLightCard>
        <HighLightCard
          type="total"
          title="Total"
          amount="R$ 16.141,00"
          lastTransaction="01 à 16 de abril"
        ></HighLightCard>
      </HighlightCards>
      <Transactions>
        <Title>Listagem</Title>
        <TransactionCard />
      </Transactions>
    </Container>
  );
}
