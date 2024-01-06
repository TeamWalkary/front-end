import styled from "styled-components";

export const S = {
  DiaryList: styled.div`
    display: flex;
    flex-direction: column;
    padding: 1.2rem;
    gap: 0.8rem;
    border-radius: 9px;
    border: 0.5px solid #dcdcdc;
    background: #fffefc;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.04);
    margin: 0 2rem 2rem 2rem;

    div {
      display: flex;
      justify-content: space-between;
      header {
        font-size: 1.4rem;
        color: #333333;
        font-family: Pretendard;
        font-style: normal;
        font-weight: 700;
        line-height: 24px; /* 171.429% */
        letter-spacing: -0.21px;
      }
      p {
        color: #a1a1a1;
        font-family: Pretendard;
        font-size: 1.2rem;
        font-style: normal;
        font-weight: 700;
        line-height: 20px;
      }
    }
    main {
      font-size: 1.2rem;
      color: #333;
      font-family: Pretendard;
      font-style: normal;
      font-weight: 400;
      line-height: 18px;
    }
  `,
};
