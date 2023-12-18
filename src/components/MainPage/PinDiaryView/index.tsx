import { useRecoilValue, useSetRecoilState } from 'recoil';
import { pinList } from '../../../core/atom';
import { S } from './style';
import PinDiaryItemIcon from '../../../assests/PinDiaryItemIcon';
import { useState } from 'react';
import axios from 'axios';
import { pinResponseType } from '../../../types/pin';

export default function PinDiaryView() {
  const oneDayPinList = useRecoilValue(pinList);
  const oneDayPinListReverse = [...oneDayPinList].reverse();
  let count: number = oneDayPinList.length;
  const [modify, setModify] = useState<boolean>(false);
  const setPinList = useSetRecoilState(pinList);

  const handleUpdateButton = () => {
    setModify(true);
  };

  const clickCancelButton = () => {
    setModify(false);
  };

  const clickPinDeleteButton = (pinId: number) => {
    const token = localStorage.getItem('token');
    axios
      .delete(
        `${import.meta.env.VITE_APP_BASE_URL}/apis/pin/${pinId}
      `,
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then(res => {
        const config = {
          headers: { Authorization: token },
          params: { sortBy: 'LATEST' },
        };
        axios
          .get<pinResponseType>(
            'https://api.walkary.fun/apis/main/maps-pin',
            config
          )
          .then(res => {
            setPinList(res.data.pins);
          });
      })
      .catch(res => {});
  };
  return (
    <>
      <S.PinRecordArea>
        <S.UpdateArea>
          {modify ? (
            <>
              <S.UpdateButton onClick={clickCancelButton}>취소</S.UpdateButton>
              <S.UpdateButton>완료</S.UpdateButton>
            </>
          ) : (
            <S.UpdateButton onClick={handleUpdateButton}>수정</S.UpdateButton>
          )}
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
                {modify && (
                  <S.PinDelete>
                    <S.PinDeleteButton
                      onClick={() => clickPinDeleteButton(pin.id)}
                    >
                      삭제
                    </S.PinDeleteButton>
                  </S.PinDelete>
                )}
              </S.Pin>
            ))}
          </S.PinListWrapper>
        </S.PinListArea>
      </S.PinRecordArea>
    </>
  );
}
