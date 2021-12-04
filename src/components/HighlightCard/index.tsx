import React from "react";
import { 
    Container,
    Heaeder,
    Title,
    Icon,
    Footer,
    Amount,
    LastTransaction
} from "./styles";


export function HighLightCard() {
    return (
        <Container>
            <Heaeder>
                <Title>Entrada</Title>
                <Icon name="arrow-up-circle"></Icon>
            </Heaeder>

            <Footer>
                <Amount>R$ 17.400,00</Amount>
                <LastTransaction>Última entrada dia 13 de abril</LastTransaction>
            </Footer>
        </Container>
    )
}