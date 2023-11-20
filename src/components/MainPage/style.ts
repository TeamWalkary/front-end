import styled from 'styled-components';

export const S = {
  MainArea: styled.div`
    height: 90vh;
  `,

  MapArea: styled.div`
    width: 100%;
    height: 23.2rem;
    background-color: skyblue;
  `,

  SectionWrapper: styled.div`
    height: 100%;
  `,

  SectionArea: styled.section`
    height: 100%;
  `,
  RecordTitleArea: styled.div`
    display: flex;
  `,

  RecordTitle: styled.div`
    flex-grow: 1;
    text-align: center;
    font-size: 1.4rem;
    padding: 1.2rem 0;
    border-bottom: 1px solid #333;
    opacity: 0.2;
    cursor: pointer;
    pointer-events: auto;

    &.active {
      opacity: 1;
      font-weight: 700;
      color: #333333;
    }
  `,

  EmptyView: styled.div`
    margin-top: 11.5rem;
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: center;
    color: #a1a1a1;
    text-align: center;
    font-size: 1.6rem;
    line-height: 2.4rem;
    flex-direction: column;
  `,
};
