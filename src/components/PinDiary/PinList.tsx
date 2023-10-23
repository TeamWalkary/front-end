import { useRecoilValue } from 'recoil';
import { pinList } from '../../store/atom';
import { styled } from 'styled-components';
import { ReactComponent as NumberPin } from '../../assests/numberPin.svg';

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
  height: 55%;
  padding: 2rem;
  margin-bottom: 2rem;
`;

const UpdateArea = styled.div`
  display: flex;
  justify-content: right;
  width: 100%;
  margin-bottom: 0.8rem;
`;

const UpdateButton = styled.button`
  height: 2rem;
  font-family: Pretendard-Regular;
  font-weight: 400;
  font-size: 1.2rem;
  color: #a1a1a1;
  border: none;
  background-color: inherit;
`;

const PinListArea = styled.div`
  height: 100%;
  overflow: scroll;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const PinListWrapper = styled.ul`
  height: 100%;
  list-style: none;
  margin: 0;
  padding: 0;
`;

const Pin = styled.li`
  list-style: none;
  margin: 0 0 1.2rem 0;
  padding: 0;
  height: 3.8rem;
  border: none;
  display: flex;
  align-items: center;
`;

const NumberPinWrapper = styled.span`
  width: 2.4rem;
  height: 3.8rem;
  vertical-align: middle;
  margin-right: 2rem;
  justify-content: center;
  align-items: center;
  display: flex;
  position: relative;
`;

const NumberText = styled.span`
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
`;

const PinContentsWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const PinContents = styled.div`
  font-family: Pretendard-Regular;
  font-weight: 400;
  font-size: 1.4rem;
  color: #333333;
  margin-bottom: 0.4rem;
`;

const PinTime = styled.div`
  font-weight: 700;
  font-size: 0.8rem;
  color: #a1a1a1;
`;

export default PinList;
