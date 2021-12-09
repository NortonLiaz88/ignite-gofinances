import React from "react";
import { FlatList } from "react-native-gesture-handler";
import { categories } from "../../utils/categories";
import {
  Container,
  Header,
  Title,
  CategoryList,
  Category,
  Icon,
  Name,
  Separator,
  Footer,
} from "./styles";

import { Button } from "../../components/Form/Button";

export interface CategoryProps {
  key: string;
  name: string;
  icon: string;
}

interface Props {
  category: CategoryProps;
  setCategory: (category: CategoryProps) => void;
  closeSelectCategory: () => void;
}

export function CategorySelect({
  category,
  setCategory,
  closeSelectCategory,
}: Props) {
  function handleCategorySelect(category: CategoryProps) {
    setCategory(category);
  }
  return (
    <Container>
      <Header>
        <Title>Categoria</Title>
      </Header>
      <CategoryList
        data={categories as CategoryProps[]}
        keyExtractor={(item) => item.key}
        renderItem={({ item }) => (
          <Category
            onPress={() => handleCategorySelect(item)}
            isActive={category.key === item.key}
          >
            <Icon name={item.icon}></Icon>
            <Name>{item.name}</Name>
          </Category>
        )}
        ItemSeparatorComponent={() => <Separator />}
      ></CategoryList>

      <Footer>
        <Button title="Selecionar" onPress={closeSelectCategory}></Button>
      </Footer>
    </Container>
  );
}
