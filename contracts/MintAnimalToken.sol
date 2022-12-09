// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";

contract MintAnimalToken is ERC721Enumerable {
    constructor() ERC721("h662Animals", "HAS") {}

    // 앞의 uint256은 animalTokenId
    // 뒤의 uint256은 animalTypes
    mapping(uint256 => uint256) public animalTypes;
    
    function mintAnimalToken() public {
        // totalSupply()는 ERC721Enuerable에서 제공 지금까지 발행(민팅)된 NFT 갯수를 나타냄
        uint256 animalTokenId = totalSupply() + 1;

        // block.timestamp = 함수 실행한 시간
        // msg.sender = 함수를 실행한 사람
        // animalTokenId = NFT id
        // 1번부터 5번까지 랜덤 생성
        uint256 animalType = uint256(keccak256(abi.encodePacked(block.timestamp, msg.sender, animalTokenId))) % 5 + 1;

        animalTypes[animalTokenId] = animalType;

        // minting 함수
        // msg.sender = 민팅을 누른 사람
        _mint(msg.sender, animalTokenId);
    }
}