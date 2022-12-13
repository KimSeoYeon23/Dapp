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

    /** token 판매 함수 */
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

    // public 뒤에 payalbe을 붙여야 ETH, MATIC등 코인이 거래되는 함수를 만들 수 있다.
    /** token 구매 함수 */
    function puerchaseAnimalToken(uint256 _animalTokenId) public payable {
        uint256 price = animalTokenPrices[_animalTokenId];
        address animalTokenOwner = mintAnimalTokenAddress.ownerOf(_animalTokenId);

        require(price > 0, "Animal token not sale.");
        // msg.value 는 보내는 코인의 양
        require(price <= msg.value, "Caller sent lower than price.");
        require(animalTokenOwner != msg.sender, "Caller is animal token owner.");

        // msg.value 만큼의 토큰 가격이 animalTokenOwner한테 전송됨
        payable(animalTokenOwner).transfer(msg.value);
        // transferFromm(from, to, tokenId) -> owner가 바뀌는것(from -> to)
        mintAnimalTokenAddress.safeTransferFrom(animalTokenOwner, msg.sender, _animalTokenId);

        // 가격을 0원으로 초기화
        animalTokenPrices[_animalTokenId] = 0;

        for (uint256 i = 0; i < onSaleAnimalTokenArray.length; i++) {
            // 판매중인 토큰 중 가격이 0원일 경우 
            if(animalTokenPrices[onSaleAnimalTokenArray[i]] == 0) {
                // 토큰 가격이 0원인 토큰을 기존 배열의 맨 뒤에 있는 토큰과 교체 후 삭제
                onSaleAnimalTokenArray[i] = onSaleAnimalTokenArray[onSaleAnimalTokenArray.length - 1];
                onSaleAnimalTokenArray.pop();
            }
        }
    }

    /** 판매 중인 토큰의 배열의 길이 출력하는 함수 */
    // 읽기 전용 함수는 view 추가
    // returns (uint256) 반환 인자값 지정
    function getOnSaleAnimalTokenLength() public view returns (uint256) {
        return onSaleAnimalTokenArray.length;
    }

    function getAniamlTokenPrice(uint256 _animalTokenId) public view returns(uint256) {
        return animalTokenPrices[_animalTokenId];
    }

}