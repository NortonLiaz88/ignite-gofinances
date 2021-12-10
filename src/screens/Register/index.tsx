import React, { useState } from "react";
import { Modal } from "react-native";
import { useForm, Controller } from "react-hook-form";

import { Button } from "../../components/Form/Button";
import { CategorySelectButton } from "../../components/Form/CategorySelectButton";
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

export function Register() {
  const [category, setCategory] = useState({
    key: 'category',
    name: 'Category',
    icon: 'any'
  });
  const [categoryOpenModal, setCategoryOpenModal] = useState(false);
  const [transactionType, setTransactionType] = useState("");

  function handleTransactionTypeSelect(type: "up" | "down"): void {
    setTransactionType(type);
  }

  function handleCloseSelectCategoryModal() {
    setCategoryOpenModal(false);
  }

  function handleOpenSelectCategoryModal() {
    setCategoryOpenModal(true);
  }


  return (
    <Container>
      <Header>
        <Title>Cadastro</Title>
      </Header>

      <Form>
        <Fields>
          <Input placeholder="Nome"></Input>
          <Input placeholder="Preço"></Input>
          <TransactionsTypes>
            <TransactionTypeButtton
              title="income"
              type="up"
              onPress={() => handleTransactionTypeSelect("up")}
              isActive={transactionType === "up"}
            ></TransactionTypeButtton>
            <TransactionTypeButtton
              title="outcome"
              type="down"
              onPress={() => handleTransactionTypeSelect("down")}
              isActive={transactionType === "down"}
            ></TransactionTypeButtton>
          </TransactionsTypes>

          <CategorySelectButton title={category.name} onPress={handleOpenSelectCategoryModal}></CategorySelectButton>
        </Fields>

        <Button title="Enviar" onPress={()=> {}}></Button>
      </Form>

      <Modal visible={categoryOpenModal}>
        <CategorySelect 
          category = {category}
          setCategory={setCategory}
          closeSelectCategory={handleCloseSelectCategoryModal}
        />
      </Modal>
    </Container>
  );
}
