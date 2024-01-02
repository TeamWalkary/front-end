import styled from "styled-components";

export const S = {
  Btn: styled.button<{
    $isValid: boolean;
    $width?: boolean;
  }>`
    cursor: pointer;
    margin-top: 3.2rem;
    border-radius: 99px;
    background-color: ${(props) => (props.$isValid ? "#333333" : "#DCDCDC")};
    width: ${(props) => (props.$width ? "29.6rem" : null)};
    display: flex;
    padding: 1.2rem 5.2rem;
    justify-content: center;
    align-items: center;
    border: none;
    color: white;
    font-size: 1.6rem;
  `,
};
//    width: ${(props) => (props.$width ? "16rem" : "29.6rem")};
