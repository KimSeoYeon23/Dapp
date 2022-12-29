import React, { FC, useState, useEffect } from "react";
import { Button, Flex, Grid, Text } from '@chakra-ui/react';
import { mintAnimalTokenContract, saleAnimalAddress, saleAnimalTokenContract } from './../web3Config';
import MyAnimalCard, { IMyAnimalCard } from "../components/MyAnimalCard";

interface MyAnimalProps {
    account: string;
}

const MyAnimal: FC<MyAnimalProps> = ({account}) => {
    const [animalCardArray, setAnimalCardArray] = useState<IMyAnimalCard[]>();
    const [saleStatus, setSaleStatus] = useState<boolean>(false);

    const getAnimalTokens = async () => {
        try {
            const tempAnimalCardArray: IMyAnimalCard[] = [];

            const balanceLength = await mintAnimalTokenContract.methods
                .balanceOf(account)
                .call();

            if (balanceLength === '0') return;

            const response = await mintAnimalTokenContract.methods
                .getAnimalTokens(account)
                .call();

            response.map((v: IMyAnimalCard) => {
                tempAnimalCardArray.push({animalTokenId: v.animalTokenId, animalType: v.animalType, animalPrice: v.animalPrice});
            })

            
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
        try {
            if(!account) return;

            const response = await mintAnimalTokenContract.methods
                .setApprovalForAll(saleAnimalAddress, !saleStatus)
                .send({from : account});

            if(response.status) {
                setSaleStatus(!saleStatus);
            }
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        if(!account) return;
        getAnimalTokens();
        getIsApprovedForAll();
    }, [account]);

    return (
        <>
            <Flex alignItems='center'>
                <Text display='inline-block'>
                Sale Status : {saleStatus ? 'True' : 'False'}
                </Text>
                <Button size='xs' ml='2' colorScheme={saleStatus ? "red" : "blue"} onClick={onClickApproveToggle}>
                    {saleStatus ? "Cancel" : "Approve"}
                </Button>
            </Flex>
            <Grid templateColumns='repeat(4, 1fr)' gap={8} mt={4}> 
                {animalCardArray &&
                    animalCardArray.map((v, i) => {
                        return <MyAnimalCard key={i} animalTokenId={v.animalTokenId} animalType={v.animalType} animalPrice={v.animalPrice} account={account} saleStatus={saleStatus} />
                    })

                }
            </Grid>
        </>
    )
}

export default MyAnimal;