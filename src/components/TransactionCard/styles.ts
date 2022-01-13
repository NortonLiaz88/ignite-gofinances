import { Feather } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";
import theme from "../../global/styles/theme";


interface TransactionProps {
  type: 'positive' | 'negative';
}

export const Container = styled.View`
  background: ${({ theme }) => theme.colors.shape};
  border-radius: 5px;

  margin-bottom: 16px;
  padding: 17px 24px;
`;
export const Title = styled.Text`
  font-size: ${RFValue(14)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
`;
export const Amount = styled.Text<TransactionProps>`
  font-size: ${RFValue(20)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ theme, type }) => type === 'positive' ? theme.colors.success : theme.colors.attention};
  margin-top: 2px;
`;
export const Footer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
export const Category = styled.Text`
  flex-direction: row;
  flex: 1;
  align-items: center;
  color: ${({ theme }) => theme.colors.text};
`;
export const Icon = styled(Feather)`
  font-size: ${RFValue(14)}px;
  margin-right: 17px;
`;
export const CategoryName = styled.Text`
  margin-left: 17px;
  font-size: ${RFValue(14)}px;
  color: ${({ theme }) => theme.colors.text};
`;
export const Date = styled.Text`
  font-size: ${RFValue(14)}px;
  color: ${({ theme }) => theme.colors.text};
`;
