import styled from "styled-components";

export const S = {
  Landing: styled.main`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 90vh;
    flex-direction: column;
  `,

  LandingMsg: styled.div`
    margin: 1.6rem 0 4.8rem 0;
    text-align: center;
    font-size: 16px;
  `,

  LandingBtn: styled.button`
    padding: 0.8rem 5.2rem;
    justify-content: center;
    align-items: center;
    gap: 0.4rem;
    border-radius: 99px;
    background: #333;
    color: white;
  `,
};
