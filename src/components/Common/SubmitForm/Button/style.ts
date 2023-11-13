import styled from "styled-components";

export const S = {
  Btn: styled.button<{
    $isValid: boolean;
    $width?: number;
  }>`
    cursor: pointer;
    margin-top: 3.2rem;
    border-radius: 99px;
    background-color: ${(props) => (props.$isValid ? "#333333" : "#DCDCDC")};
    display: flex;
    width: ${(props) => (props.$width ? "16rem" : "29.6rem")};
    padding: 1.2rem 5.2rem;
    justify-content: center;
    align-items: center;
    border: none;
    color: white;
    font-size: 1.6rem;
  `,
};
