import { useRecoilValue, useSetRecoilState } from "recoil";
import { pinList } from "../../../core/atom";
import { S } from "./style";
import PinDiaryItemIcon from "../../../assests/PinDiaryItemIcon";
import { useState } from "react";
import { pinListType, pinResponseType } from "../../../types/pin";
import { axiosInstance } from "../../../core/api/axios";

export default function PinDiaryView() {
  const oneDayPinList = useRecoilValue(pinList);
  const oneDayPinListReverse = [...oneDayPinList].reverse();
  let count: number = oneDayPinList.length;
  const [modify, setModify] = useState<boolean>(false);
  const [isEditable, setIsEditable] = useState<boolean>(true);
  const setPinList = useSetRecoilState(pinList);
  const [editAblePinList, setEditablePinList] = useState<pinListType[]>([
    ...oneDayPinListReverse,
  ]);

  const handleUpdateButton = () => {
    setModify(true);
    setIsEditable(false);
  };

  const clickCancelButton = () => {
    setModify(false);
    setIsEditable(true);
    setEditablePinList([...oneDayPinListReverse]);
  };

  const clickPinDeleteButton = (pinId: number) => {
    axiosInstance
      .delete(
        `${import.meta.env.VITE_APP_BASE_URL}/apis/pin/${pinId}
      `
      )
      .then(() => {
        const config = {
          params: { sortBy: "LATEST" },
        };
        axiosInstance
          .get<pinResponseType>(
            `${import.meta.env.VITE_APP_BASE_URL}/apis/main/maps-pin`,
            config
          )
          .then(res => {
            setPinList(res.data.pins);
          });
      })
      .catch(res => {
        console.log(res);
      });
  };

  const clickCompleteButton = () => {
    // 수정된 내용 있으면 요청 API 보내고 화면 변경 없으면 그냥 화면 변경
    if (
      JSON.stringify(oneDayPinListReverse) === JSON.stringify(editAblePinList)
    ) {
      setIsEditable(true);
      setModify(false);
    } else {
      axiosInstance
        .patch(
          `${import.meta.env.VITE_APP_BASE_URL}/apis/pin
      `,
          {
            editAblePinList,
          }
        )
        .then(() => {
          const config = {
            params: { sortBy: "LATEST" },
          };
          axiosInstance
            .get<pinResponseType>(
              `${import.meta.env.VITE_APP_BASE_URL}/apis/main/maps-pin`,
              config
            )
            .then(res => {
              setPinList(res.data.pins);
              setIsEditable(true);
              setModify(false);
            });
        })
        .catch(res => {
          console.log(res);
        });
    }
  };

  const changePinContentsInput = (
    event: React.ChangeEvent<HTMLInputElement>,
    pinId: number
  ) => {
    const newContents = event.currentTarget.value;
    setEditablePinList(prevItems =>
      prevItems.map(item =>
        item.id === pinId ? { ...item, contents: newContents } : item
      )
    );
  };

  return (
    <>
      <S.PinRecordArea>
        <S.UpdateArea>
          {modify ? (
            <>
              <S.UpdateButton onClick={clickCancelButton}>취소</S.UpdateButton>
              <S.UpdateButton onClick={clickCompleteButton}>
                완료
              </S.UpdateButton>
            </>
          ) : (
            <S.UpdateButton onClick={handleUpdateButton}>수정</S.UpdateButton>
          )}
        </S.UpdateArea>
        <S.PinListArea>
          <S.PinListWrapper>
            {editAblePinList.map(pin => (
              <S.Pin key={pin.id}>
                <S.NumberPinWrapper key={pin.id}>
                  <PinDiaryItemIcon />
                  <S.NumberText>{count--}</S.NumberText>
                </S.NumberPinWrapper>
                <S.PinContentsWrapper>
                  <S.PinContents
                    type='text'
                    value={pin.contents}
                    readOnly={isEditable}
                    onChange={event => changePinContentsInput(event, pin.id)}
                  />

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
