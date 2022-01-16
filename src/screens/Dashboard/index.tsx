import React, { useCallback, useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";
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
  Title,
  TransactionsList,
  LogoutButton,
  LoadContainer,
} from "./styles";

import { useTheme } from "styled-components";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { RFValue } from "react-native-responsive-fontsize";
import { Feather } from "@expo/vector-icons";
import { HighLightCard } from "../../components/HighlightCard";
import {
  TransactionCard,
  TransactionCardProps,
} from "../../components/TransactionCard";
import { getBottomSpace } from "react-native-iphone-x-helper";
import { useFocusEffect } from "@react-navigation/native";
import { useAuth } from "../../hooks/auth";

export interface DataListProps extends TransactionCardProps {
  id: string;
}

export interface HighlightProps {
  amount: string;
  lastTransaction: string;
}

export interface HighlightData {
  entries: HighlightProps;
  expensives: HighlightProps;
  total: HighlightProps;
}

export function Dashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<DataListProps[]>([]);
  const [highligthtData, setHighligthtData] = useState<HighlightData>(
    {} as HighlightData
  );

  const theme = useTheme();
  const { user, signOut } = useAuth();

  function getLastTransactionDate(
    collection: DataListProps[],
    type: "positive" | "negative"
  ) {
    const collectionFilttered = collection.filter(
      (transaction) => transaction.type === type
    );
    if (collectionFilttered.length === 0) {
      return 0;
    }

    const lastTransaction = new Date(
      Math.max.apply(
        Math,
        collection
          .filter((transaction) => transaction.type === type)
          .map((transaction) => new Date(transaction.date).getTime())
      )
    );

    return `${lastTransaction.getDate()} de ${lastTransaction.toLocaleString(
      "pt-BR",
      { month: "long" }
    )}`;
  }

  async function loadTransactions() {
    const dataKey = `@gofinances:transactions_user:${user.id}`;
    const response = await AsyncStorage.getItem(dataKey);
    const transactions = response ? JSON.parse(response) : [];

    let entriesTotal = 0;
    let expensiveTotal = 0;

    const transactionsFormatted: DataListProps[] = transactions.map(
      (item: DataListProps) => {
        if (item.type === "positive") {
          entriesTotal += Number(item.amount);
        } else {
          expensiveTotal += Number(item.amount);
        }
        const amount = Number(item.amount).toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        });

        const date = Intl.DateTimeFormat("pt-BR", {
          day: "2-digit",
          month: "2-digit",
          year: "2-digit",
        }).format(new Date(item.date));

        return {
          id: item.id,
          title: item.title,
          amount,
          type: item.type,
          category: item.category,
          date,
        };
      }
    );
    console.log(transactionsFormatted);
    setData(transactionsFormatted);
    const lastTransactionEntrie = getLastTransactionDate(
      transactions,
      "positive"
    );
    const lastTransactionExpensive = getLastTransactionDate(
      transactions,
      "positive"
    );

    const totalInterval =
      lastTransactionExpensive === 0
        ? "Não há transações"
        : `01 a ${lastTransactionExpensive}`;

    const total = entriesTotal - expensiveTotal;
    setHighligthtData({
      entries: {
        amount: entriesTotal.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        }),
        lastTransaction:
          lastTransactionEntrie === 0
            ? "Não há transações"
            : `Última entrada dia ${lastTransactionEntrie}`,
      },
      expensives: {
        amount: expensiveTotal.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        }),
        lastTransaction:
          lastTransactionExpensive === 0
            ? "Não há transações"
            : `Última entrada dia ${lastTransactionExpensive}`,
      },
      total: {
        amount: total.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        }),
        lastTransaction: totalInterval,
      },
    });
    setIsLoading(false);
  }

  useEffect(() => {
    loadTransactions();
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadTransactions();
    }, [])
  );
  return (
    <Container>
      {isLoading ? (
        <LoadContainer>
          <ActivityIndicator color={theme.colors.primary} size="large" />
        </LoadContainer>
      ) : (
        <>
          <Header>
            <UserWrapper>
              <UserInfo>
                <Photo
                  source={{
                    uri: user.photo,
                  }}
                ></Photo>
                <User>
                  <UserGreeting>Olá,</UserGreeting>
                  <UserName>{user.name}</UserName>
                </User>
              </UserInfo>
              <LogoutButton onPress={signOut}>
                <Icon name="power" />
              </LogoutButton>
            </UserWrapper>
          </Header>
          <HighlightCards>
            <HighLightCard
              type="up"
              title="Entradas"
              amount={highligthtData.entries.amount}
              lastTransaction={highligthtData.entries.lastTransaction}
            ></HighLightCard>
            <HighLightCard
              type="down"
              title="Saídas"
              amount={highligthtData.expensives.amount}
              lastTransaction={highligthtData.expensives.lastTransaction}
            ></HighLightCard>
            <HighLightCard
              type="total"
              title="Total"
              amount={highligthtData.total.amount}
              lastTransaction={highligthtData.total.lastTransaction}
            ></HighLightCard>
          </HighlightCards>
          <Transactions>
            <Title>Listagem</Title>
            <TransactionsList
              data={data}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => <TransactionCard data={item} />}
            />
          </Transactions>
        </>
      )}
    </Container>
  );
}
