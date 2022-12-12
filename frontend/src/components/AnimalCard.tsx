import React, {FC} from "react";
import {Image, AspectRatio} from '@chakra-ui/react'

interface AnimalCardProps {
    animalType: string;
}

const AnimalCard : FC<AnimalCardProps> = ({animalType}) => {
    return (
        <Image src={`images/${animalType}.png`} width={150} height={150} />
    )
}

export default AnimalCard;