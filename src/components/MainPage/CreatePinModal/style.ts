import styled from 'styled-components';

export const S = {
  Container: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100dvh;
    background-color: #00000080;
  `,

  ModalContainer: styled.div`
    width: 32.3rem;
    height: 20.6rem;
    background: #ffffff;
    border-radius: 2rem;
    display: flex;
    flex-direction: column;
  `,

  FirstSection: styled.div`
    padding: 2rem;
    justify-content: space-between;
    display: flex;
    flex-direction: column;
  `,

  FirstTextContainer: styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 0;
    width: 28.3rem;
    height: 2.4rem;
    margin-bottom: 0.8rem;
  `,
  FirstText: styled.p`
    font-size: 1.6rem;
    font-weight: 700;
    line-height: 2.4rem;
    letter-spacing: -0.023rem;
    text-align: center;
    color: #333333;
  `,

  CloseButtonContainer: styled.button`
    background: none;
    border: none;
  `,

  SecondSection: styled.div`
    width: 32.3rem;
    height: 4rem;
    padding: 0 2rem 0 2rem;
  `,

  SecondText: styled.p`
    font-weight: 400;
    font-size: 1.2rem;
    color: #a1a1a1;
  `,

  InputWrapper: styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 0.8rem 0 0.8rem 0;
    width: 28.3rem;
    height: 4rem;
    border-top: none;
    border-left: none;
    border-right: none;
    border-bottom: 0.05rem solid #dcdcdc;
  `,

  Input: styled.input`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    border: none;
    background-color: inherit;
    padding: 0;
    width: 28.3rem;
    height: 2rem;
    font-weight: 400;
    font-size: 1.6rem;
    line-height: 2.4rem;
    color: #333333;

    &::placeholder {
      color: dcdcdc;
    }

    &:focus {
      &::placeholder {
        color: transparent;
      }
    }
  `,

  ThirdSection: styled.div`
    width: 32.3rem;
    height: 8rem;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 2rem 0 2rem 0;
  `,

  SaveButton: styled.button`
    padding: 0.8rem, 5.2rem;
    width: 16rem;
    height: 4rem;
    background: #333333;
    border-radius: 9.9rem;
    font-weight: 400;
    font-size: 1.6rem;
    line-height: 2.4rem;
    color: #dcdcdc;
    border: none;

    &:disabled {
      cursor: not-allowed;
      background: #dcdcdc;
      color: #ffffff;
    }
  `,
};
