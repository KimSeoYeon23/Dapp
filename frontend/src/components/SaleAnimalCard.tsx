import React, {FC} from "react";
import { Box, Button, Text } from "@chakra-ui/react";
import AnimalCard from "./AnimalCard";
import { web3 } from "../web3Config";

export interface IMyAnimalCard {
    animalTokenId: string;
    animalType: string;
    animalPrice: string;
}

interface SaleAnimalCardProps extends IMyAnimalCard {
    saleStatus: boolean;
    account: string;
}


const SaleAnimalCard : FC<SaleAnimalCardProps> = ({ animalTokenId, animalType, animalPrice }) => {
    return (
        <Box textAlign='center' w={150}>
            <AnimalCard animalType={animalType} />
            <Box>
                <Text display='inline-block'>
                    {web3.utils.fromWei(animalPrice)} Matic
                </Text>
                <Button size='sm' colorScheme='green' m={2}>
                    Buy
                </Button>
            </Box>
        </Box>
    )
}

export default SaleAnimalCard;