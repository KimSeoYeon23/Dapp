import React, {FC, useEffect, useState} from "react";
import { Grid } from "@chakra-ui/react";
import { IMyAnimalCard } from './../components/MyAnimalCard';
import { mintAnimalTokenContract, saleAnimalTokenContract } from '../web3Config'

interface SaleAnimalProps {
    account: string;
}

const SaleAnimal: FC<SaleAnimalProps> = ({account}) => {
    const [saleAnimalCard, setSaleAnimalCard] = useState<IMyAnimalCard[]>();

    const getOnSaleAnimalTokens = async () => {
        try {
            const OnSaleAnimalTokenLength = await saleAnimalTokenContract.methods
                .getOnSaleAnimalTokenLength()
                .call();

            const tempOnSaleArray = [];

            for(let i = 0; i < parseInt(OnSaleAnimalTokenLength, 10); i++) {
                const animalTokenId = await saleAnimalTokenContract.methods
                    .onSaleAnimalTokenArray(i)
                    .call();

                const animalType = await mintAnimalTokenContract.methods
                    .animalTypes(animalTokenId)
                    .call();
                
                const animalPrice = await saleAnimalTokenContract.methods
                    .getAnimalTokenPrice(animalTokenId)
                    .call();

                tempOnSaleArray.push({animalTokenId, animalType, animalPrice});
            }
            setSaleAnimalCard(tempOnSaleArray);

            console.log(saleAnimalCard);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getOnSaleAnimalTokens();
    }, [account]);

    useEffect(() => {
        console.log(saleAnimalCard)
    }, [saleAnimalCard]);

    return(
        <Grid mt={4} templateColumns='repeat(4, 1fr)' gap={8}>
            
        </Grid>
    )
}

export default SaleAnimal;