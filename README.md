# NFT dApp
<br/>

## 📌 Skill
<img alt="Solidity" src="https://img.shields.io/badge/Solidity-363636.svg?style=for-the-badge&logo=Solidity&logoColor=white"/>
<img alt="OpenZeppelin" src="https://img.shields.io/badge/OpenZeppelin-4E5EE4.svg?style=for-the-badge&logo=OpenZeppelin&logoColor=white"/>
<img alt="React" src="https://img.shields.io/badge/React-61DAFB.svg?style=for-the-badge&logo=React&logoColor=white"/>
<img alt="Next.js" src="https://img.shields.io/badge/Next.js-000000.svg?style=for-the-badge&logo=Next.js&logoColor=white"/>
<br/>
<img alt="HTML" src="https://img.shields.io/badge/HTML-E34F26.svg?style=for-the-badge&logo=HTML5&logoColor=white"/>
<img alt="CSS3" src="https://img.shields.io/badge/CSS3-1572B6.svg?style=for-the-badge&logo=CSS3&logoColor=white"/>
<img alt="Javascript" src="https://img.shields.io/badge/JavaScript-F7DF1E.svg?style=for-the-badge&logo=JavaScript&logoColor=white"/>
<img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-3178C6.svg?style=for-the-badge&logo=TypeScript&logoColor=white"/>
<img alt="Chakra UI" src="https://img.shields.io/badge/Chakra UI-319795.svg?style=for-the-badge&logo=Chakra UI&logoColor=white"/>
<br/>

## 📕 Version
1. OpenZeppelin version
   ```json
    "@openzeppelin/contracts": "^4.8.0"
   ```
2. Solidity version
    ```cpp
    pragma solidity ^0.8.0;
    ```
3. ERC721
    ```cpp
    import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
    ```

<br/>
<br/>

## 기능
1. NFT 생성
    - Minting contract 배포
    - 판매기능 contract 배포
3. NFT 판매 및 구매
    - 판매 승인 상태 체크
    - 판매자 정보와 로그인한 유저 정보 체크
    - 판매자 정보와 로그인한 유저가 다를 시 Buy 버튼 활성화
    - NFT 구매 후 구매한 계정으로 로그인 시 재판매 가능