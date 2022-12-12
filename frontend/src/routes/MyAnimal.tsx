import React, { FC, useState } from "react";
import { mintAnimalTokenContract } from "../web3Config";

interface MyAnimalProps {
    account: string;
}

const MyAnimal: FC<MyAnimalProps> = ({account}) => {
    const [animalCardArray, setAnimalCardArray] = useState<string[]>();

    const getAnimalTokens = async () => {
        try {
            const balanceLength = await mintAnimalTokenContract.methods
                .balanceOf(account)
                .call();
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div>
            My Animal
        </div>
    )
}

export default MyAnimal;