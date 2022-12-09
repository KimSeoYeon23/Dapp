// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "./MintAnimalToken.sol";

contract SaleAnimalToken {
    MintAnimalToken public mintAnimalTokenAddress;

    constructor (address _mintAnimalTokenAddress) {
        mintAnimalTokenAddress = MintAnimalToken(_mintAnimalTokenAddress);
    }

    // tokenid를 입력하면 출력은 가격이 나오게 될 것
    mapping(uint256 => uint256) public animalTokenPrices;

    // 판매중인 토큰 체크
    uint256[] public onSaleAnimalTokenArray;

    function setForSaleAnimalToken(uint256 _animalTokenId, uint256 _price) public {
        // 토큰 주인이 누구인지 입력해주는 함수
        address animalTokenOwner = mintAnimalTokenAddress.ownerOf(_animalTokenId);

        // 토큰 주인이 맞는지 체크, 주인이 아닐경우 두의 text 출력
        require(animalTokenOwner == msg.sender, "Caller is not animal token owner.");
        require(_price > 0, "Price is zero or lower.");
        require(animalTokenPrices[_animalTokenId] == 0, "This animal token is already on sale.");
        // isApprovedForAll 주인이 계약서에 판매 권한을 넘겼는지 체크하는 함수
        require(mintAnimalTokenAddress.isApprovedForAll(animalTokenOwner, address(this)), "Animal token owner did not approve token.");

        animalTokenPrices[_animalTokenId] = _price;

        // 판매중인 토큰 아이디 추가
        onSaleAnimalTokenArray.push(_animalTokenId);
    }
}