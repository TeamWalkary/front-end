import styled from "styled-components";

export const S = {
  Title: styled.h1`
    font-size: 2rem;
    margin-bottom: 2rem;
    color: #333333;
    font-family: Pretendard;
    font-style: normal;
    font-weight: 700;
    line-height: 30px;
    padding: 2rem 2rem 0 2rem;
  `,

  Container: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    gap: 23.6rem;
    div {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 23.6rem;
      header {
        color: #a1a1a1;
        text-align: center;
        font-family: Pretendard;
        font-size: 16px;
        font-style: normal;
        font-weight: 400;
        line-height: 24px;
      }
    }
  `,
};
