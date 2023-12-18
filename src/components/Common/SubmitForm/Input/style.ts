import styled from "styled-components";

export const S = {
  LoginWrapper: styled.div`
    & + & {
      margin-top: 1.2rem;
    }
    width: 29.5rem;
    input:focus + p {
      opacity: 1;
    }
  `,
  IdInputValid: styled.p<{ $isValid: boolean }>`
    opacity: 0;
    color: #ff0000;
    font-size: 1.2rem;
    visibility: ${(props) => (props.$isValid ? "hidden" : "visible")};
    &:focus {
      opacity: 1;
      color: #ff0000;
    }
  `,

  LoginLabel: styled.p`
    font-size: 1.2rem;
    font-style: normal;
    font-weight: 700;
    line-height: 1.6rem;
    letter-spacing: -0.025rem;
  `,

  LoginInput: styled.input`
    border: none;
    width: 100%;
    height: 2.8rem;
    gap: 0.4rem;
    border-bottom: 1px solid #dcdcdc;
    &:focus {
      outline: none;
      border-bottom: 2px solid #333;
    }
  `,
};
