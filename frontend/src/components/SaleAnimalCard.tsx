import React, {FC, useEffect, useState} from "react";
import { Box, Button, Text } from "@chakra-ui/react";
import AnimalCard from "./AnimalCard";
import { mintAnimalTokenContract, web3 } from "../web3Config";

interface SaleAnimalCardProps  {
    account: string;
    animalTokenId: string;
    animalType: string;
    animalPrice: string;
}


const SaleAnimalCard : FC<SaleAnimalCardProps> = ({ account, animalTokenId, animalType, animalPrice }) => {
    const [isBuyAble, setIsBuyAble] = useState<boolean>(false);

    const getAnimalTokenOwner = async () => {
        try {
            const response = await mintAnimalTokenContract.methods.ownerOf(animalTokenId).call();

            setIsBuyAble(account == response.toLowerCase());
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getAnimalTokenOwner();
    }, []);

    return (
        <Box textAlign='center' w={150}>
            <AnimalCard animalType={animalType} />
            <Box>
                <Text display='inline-block'>
                    {web3.utils.fromWei(animalPrice)} Matic
                </Text>
                <Button size='sm' colorScheme='green' m={2} disabled={isBuyAble}>
                    Buy
                </Button>
            </Box>
        </Box>
    )
}

export default SaleAnimalCard;