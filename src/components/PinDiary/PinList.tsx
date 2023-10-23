import { useRecoilValue } from 'recoil';
import { pinList } from '../../store/atom';
import { styled } from 'styled-components';
import { ReactComponent as NumberPin } from '../../assests/numberPin.svg';
import { useEffect } from 'react';

const PinList = () => {
  const oneDayPinList = useRecoilValue(pinList);
  const oneDayPinListReverse = [...oneDayPinList].reverse();
  let count: number = oneDayPinList.length;
  return (
    <>
      <PinRecordArea>
        <UpdateArea>
          <UpdateButton>수정</UpdateButton>
        </UpdateArea>
        <PinListArea>
          <PinListWrapper>
            {oneDayPinListReverse.map(pin => (
              <Pin key={pin.id}>
                <NumberPinWrapper key={pin.id}>
                  <NumberPin width='24' height='24'></NumberPin>
                  <NumberText>{count--}</NumberText>
                </NumberPinWrapper>
                <PinContentsWrapper>
                  <PinContents>{pin.contents}</PinContents>
                  <PinTime>{pin.stampTime}</PinTime>
                </PinContentsWrapper>
              </Pin>
            ))}
          </PinListWrapper>
        </PinListArea>
      </PinRecordArea>
    </>
  );
};

const PinRecordArea = styled.div`
  width: 100%;
  height: 400px;
  padding: 20px;
`;

const UpdateArea = styled.div`
  display: flex;
  justify-content: right;
  width: 100%;
`;

const UpdateButton = styled.button`
  height: 20px;
  font-family: Pretendard-Regular;
  font-weight: 400;
  font-size: 12px;
  color: #a1a1a1;
  border: none;
  background-color: inherit;
`;

const PinListArea = styled.div`
  height: 100%;
`;

const PinListWrapper = styled.ul`
  height: 100%;
  list-style: none;
  margin: 0;
  padding: 0;
  counter-reset: index;
`;

const Pin = styled.li`
  list-style: none;
  margin: 0 0 10px 0;
  padding: 0;
  height: 40px;
  border: none;
  counter-increment: index;
  display: flex;
  align-items: center;
`;

const NumberPinWrapper = styled.span`
  width: 24px;
  height: 40px;
  vertical-align: middle;
  margin-right: 20px;
  justify-content: center;
  align-items: center;
  display: flex;
  position: relative;
`;

const NumberText = styled.span`
  width: 8px;
  height: 18px;
  margin-top: 1px;
  font-size: 12px;
  font-weight: 700;
  line-height: initial;
  text-align: center;
  position: absolute;
  background-color: transparent;
  color: #fffefc;
  margin-bottom: 8px;
`;

const PinContentsWrapper = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`;

const PinContents = styled.div`
  font-family: Pretendard-Regular;
  font-weight: 400;
  font-size: 14px;
  color: #333333;
  margin-bottom: 4px;
`;

const PinTime = styled.div`
  font-family: Pretendard-Regular;
  font-weight: 700;
  font-size: 8px;
  color: #a1a1a1;
`;
export default PinList;
