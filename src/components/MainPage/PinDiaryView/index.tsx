import { useRecoilValue } from 'recoil';
import { pinList } from '../../../core/atom';
import { S } from './style';
import PinDiaryItemIcon from '../../../assests/PinDiaryItemIcon';

const PinDiaryView = () => {
  const oneDayPinList = useRecoilValue(pinList);
  const oneDayPinListReverse = [...oneDayPinList].reverse();
  let count: number = oneDayPinList.length;
  return (
    <>
      <S.PinRecordArea>
        <S.UpdateArea>
          <S.UpdateButton>수정</S.UpdateButton>
        </S.UpdateArea>
        <S.PinListArea>
          <S.PinListWrapper>
            {oneDayPinListReverse.map(pin => (
              <S.Pin key={pin.id}>
                <S.NumberPinWrapper key={pin.id}>
                  <PinDiaryItemIcon />
                  <S.NumberText>{count--}</S.NumberText>
                </S.NumberPinWrapper>
                <S.PinContentsWrapper>
                  <S.PinContents>{pin.contents}</S.PinContents>
                  <S.PinTime>{pin.stampTime}</S.PinTime>
                </S.PinContentsWrapper>
              </S.Pin>
            ))}
          </S.PinListWrapper>
        </S.PinListArea>
      </S.PinRecordArea>
    </>
  );
};

export default PinDiaryView;
