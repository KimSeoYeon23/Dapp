import React, { FC, useState } from "react";

interface MyAnimalProps {
    account: string;
}

const MyAnimal: FC<MyAnimalProps> = ({account}) => {
    const [animalCardArray, setAnimalCardArray] = useState<string[]>();

    const getAnimalTokens = async () => {
        try {
                
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