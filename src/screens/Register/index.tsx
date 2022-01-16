import React, { useEffect, useState } from "react";
import { Modal, TouchableWithoutFeedback, Keyboard, Alert } from "react-native";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import uuid from 'react-native-uuid';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useForm } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";

import { CategorySelectButton } from "../../components/Form/CategorySelectButton";
import { Button } from "../../components/Form/Button";
import { Input } from "../../components/Form/Input";
import { TransactionTypeButtton } from "../../components/Form/TransactionTypeButton";
import {
  Container,
  Header,
  Title,
  Form,
  Fields,
  TransactionsTypes,
} from "./styles";
import { CategorySelect } from "../CategorySelect";
import { InputForm } from "../../components/InputForm";
import { useAuth } from "../../hooks/auth";

const schema = Yup.object().shape({
  name: Yup.string().required("Nome é obrigatório"),
  amount: Yup.number()
    .required("Valor é obrigatório")
    .typeError("Informe um valor numérico")
    .positive("O valor não pode ser negativo"),
});

export function Register() {
  
  
  const [category, setCategory] = useState({
    key: "category",
    name: "Category",
    icon: "any",
  });
  const [categoryOpenModal, setCategoryOpenModal] = useState(false);
  const [transactionType, setTransactionType] = useState("");
  const {user} = useAuth();

  const dataKey = `@gofinances:transactions_user:${user.id}`;
  const navigation = useNavigation();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  function handleTransactionTypeSelect(type: "positive" | "negative"): void {
    setTransactionType(type);
  }

  function handleCloseSelectCategoryModal() {
    setCategoryOpenModal(false);
  }

  function handleOpenSelectCategoryModal() {
    setCategoryOpenModal(true);
  }

  async function handleRegister(form) {
    if (!transactionType) return Alert.alert("Selecione o tipo de transação");
    if (category.key === "category")
      return Alert.alert("Selecione o tipo de categoria");
    const newTransaction = {
      id: String(uuid.v4()),
      title: form.name,
      amount: form.amount,
      type: transactionType,
      category: category.key,
      date: new Date(),
    };

    try{
      const data = await AsyncStorage.getItem(dataKey);
      const currentData = data ? JSON.parse(data) : [];
      const dataFormatted = [
        ...currentData,
        newTransaction
      ]
      await AsyncStorage.setItem(dataKey, JSON.stringify(dataFormatted));
      reset();
      setTransactionType('');
      setCategory({ key: "category",
      name: "Category",
      icon: "any",});
      navigation.navigate('Listagem' as never);
    }
    catch(error) {
      Alert.alert('Não foi possível salvar.');
    }
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>
        <Header>
          <Title>Cadastro</Title>
        </Header>

        <Form>
          <Fields>
            <InputForm
              control={control}
              name="name"
              placeholder="Nome"
              autoCapitalize="sentences"
              autoCorrect={false}
              error={errors.name && errors.name.message}
            ></InputForm>
            <InputForm
              control={control}
              name="amount"
              placeholder="Preço"
              keyboardType="number-pad"
              error={errors.amount && errors.amount.message}
            ></InputForm>
            <TransactionsTypes>
              <TransactionTypeButtton
                title="income"
                type="up"
                onPress={() => handleTransactionTypeSelect("positive")}
                isActive={transactionType === "positive"}
              ></TransactionTypeButtton>
              <TransactionTypeButtton
                title="outcome"
                type="down"
                onPress={() => handleTransactionTypeSelect("negative")}
                isActive={transactionType === "negative"}
              ></TransactionTypeButtton>
            </TransactionsTypes>

            <CategorySelectButton
              title={category.name}
              onPress={handleOpenSelectCategoryModal}
            ></CategorySelectButton>
          </Fields>

          <Button
            title="Enviar"
            onPress={handleSubmit(handleRegister)}
          ></Button>
        </Form>

        <Modal visible={categoryOpenModal}>
          <CategorySelect
            category={category}
            setCategory={setCategory}
            closeSelectCategory={handleCloseSelectCategoryModal}
          />
        </Modal>
      </Container>
    </TouchableWithoutFeedback>
  );
}
