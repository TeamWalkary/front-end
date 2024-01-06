import styled from "styled-components";

export const S = {
  PinRecordArea: styled.div`
    width: 100%;
    height: 55%;
    padding: 2rem;
    margin-bottom: 2rem;
  `,

  UpdateArea: styled.div`
    display: flex;
    justify-content: right;
    width: 100%;
    margin-bottom: 0.8rem;
  `,

  UpdateButton: styled.button`
    height: 2rem;
    font-family: Pretendard-Regular;
    font-weight: 400;
    font-size: 1.2rem;
    color: #a1a1a1;
    border: none;
    background-color: inherit;
  `,

  PinListArea: styled.div`
    height: 100%;
    overflow: scroll;

    &::-webkit-scrollbar {
      display: none;
    }
  `,

  PinListWrapper: styled.ul`
    height: 100%;
    list-style: none;
    margin: 0;
    padding: 0;
  `,

  Pin: styled.li`
    list-style: none;
    margin: 0 0 1.2rem 0;
    padding: 0;
    height: 3.8rem;
    border: none;
    display: flex;
    align-items: center;
  `,

  NumberPinWrapper: styled.span`
    width: 2.4rem;
    height: 3.8rem;
    vertical-align: middle;
    margin-right: 2rem;
    justify-content: center;
    align-items: center;
    display: flex;
    position: relative;
  `,

  NumberText: styled.span`
    height: 1.8rem;
    margin-top: 0.1rem;
    font-size: 1.2rem;
    font-weight: 700;
    line-height: initial;
    text-align: center;
    position: absolute;
    background-color: transparent;
    color: #fffefc;
    margin-bottom: 0.4rem;
  `,

  PinContentsWrapper: styled.div`
    display: flex;
    flex-direction: column;
  `,

  PinContents: styled.input`
    border: none;
    font-family: Pretendard-Regular;
    font-weight: 400;
    font-size: 1.4rem;
    color: #333333;
    margin-bottom: 0.4rem;
  `,

  PinTime: styled.div`
    font-weight: 700;
    font-size: 0.8rem;
    color: #a1a1a1;
  `,

  PinDelete: styled.div`
    display: flex;
    margin-left: auto;
  `,

  PinDeleteButton: styled.button`
    height: 2rem;
    font-family: Pretendard-Regular;
    font-weight: 400;
    font-size: 1.2rem;
    color: #a1a1a1;
    border: none;
    background-color: inherit;
  `,
};
