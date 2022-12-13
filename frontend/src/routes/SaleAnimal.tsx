import React, {FC, useEffect, useState} from "react";
import { Grid } from "@chakra-ui/react";
import { IMyAnimalCard } from './../components/MyAnimalCard';
import { mintAnimalTokenContract, saleAnimalTokenContract } from '../web3Config'
import SaleAnimalCard from "../components/SaleAnimalCard";

interface SaleAnimalProps {
    account: string;
}

const SaleAnimal: FC<SaleAnimalProps> = ({account}) => {
    const [saleAnimalCardArray, setSaleAnimalCardArray] = useState<IMyAnimalCard[]>();

    const getOnSaleAnimalTokens = async () => {
        try {
            const OnSaleAnimalTokenLength = await saleAnimalTokenContract.methods
                .getOnSaleAnimalTokenLength()
                .call();

            const tempOnSaleArray: IMyAnimalCard[] = [];

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
            setSaleAnimalCardArray(tempOnSaleArray);

            console.log(saleAnimalCardArray);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getOnSaleAnimalTokens();
    }, [account]);

    return(
        <Grid mt={4} templateColumns='repeat(4, 1fr)' gap={8}>
            {saleAnimalCardArray &&
                saleAnimalCardArray.map((v, i) => {
                    return (
                        <SaleAnimalCard key={i} animalToeknId={v.animalTokenId} animalType={v.animalType} animalPrice={v.animalPrice}/>
                    )
                })
            }
        </Grid>
    )
}

export default SaleAnimal;