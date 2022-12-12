/// <reference types="react-scripts" />

// 윈도우라는 객체에서 이더리움이라는 타입을 인식하게 지정해줌
interface Window {
  ethereum: any;
}
