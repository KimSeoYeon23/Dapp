import React, { FC, useState, useEffect } from "react";
import { Button, Flex, Grid, Text } from '@chakra-ui/react';
import AnimalCard from "../components/AnimalCard";
import {mintAnimalTokenContract, saleAnimalAddress } from './../web3Config';

interface MyAnimalProps {
    account: string;
}

const MyAnimal: FC<MyAnimalProps> = ({account}) => {
    const [animalCardArray, setAnimalCardArray] = useState<string[]>();
    const [saleStatus, setSaleStatus] = useState<boolean>(false);

    const getAnimalTokens = async () => {
        try {
            const balanceLength = await mintAnimalTokenContract.methods
                .balanceOf(account)
                .call();

            const tempAnimalCardArray = [];

            for(let i = 0; i < parseInt(balanceLength, 10); i++) {
                const animalTokenId = await mintAnimalTokenContract.methods
                    .tokenOfOwnerByIndex(account, i)
                    .call();

                const animalType = await mintAnimalTokenContract.methods
                    .animalTypes(animalTokenId)
                    .call();
                
                tempAnimalCardArray.push(animalType);
            }

            setAnimalCardArray(tempAnimalCardArray);
        } catch (error) {
            console.error(error);
        }
    }

    const getIsApprovedForAll = async () => {
        try {
            const response = await mintAnimalTokenContract.methods
                .isApprovedForAll(account, saleAnimalAddress)
                .call();

                if(response) {
                    setSaleStatus(response);
                }
        } catch (error) {
            console.error(error);
        }
    }

    const onClickApproveToggle = async () => {
        
    }

    useEffect(() => {
        if(!account) return;
        getAnimalTokens();
        getIsApprovedForAll();
    }, [account]);

    return (
        <>
            <Flex alignItems='center' mb='3'>
                <Text display='inline-block'>
                Sale Status : {saleStatus ? 'True' : 'False'}
                </Text>
                <Button size='xs' ml='2' colorScheme={saleStatus ? "red" : "blue"} onClick={onClickApproveToggle}>
                    {saleStatus ? "Cancel" : "Approve"}
                </Button>
            </Flex>
            <Grid templateColumns='repeat(4, 1fr)' gap={8}> 
                {animalCardArray &&
                    animalCardArray.map((v, i) => {
                        return <AnimalCard key={i} animalType={v} />
                    })

                }
            </Grid>
        </>
    )
}

export default MyAnimal;