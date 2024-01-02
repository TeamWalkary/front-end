import { S } from "./style";
import EmptyViewInfoPin from "../../assests/EmptyViewInfoPin";
import { useState } from "react";
import CreatePinModal from "./CreatePinModal";
import MapView from "./MapView";
import { useRecoilValue } from "recoil";
import { position, pinList, tokenState } from "../../core/atom";
import PinDiaryView from "./PinDiaryView";
import MainViewDairy from "./MainViewDairy";

const MainPage = () => {
  const Position = useRecoilValue(position);
  const oneDayPinList = useRecoilValue(pinList);
  const { currentLatitude, currentLongitude } = Position;
  const [modalShow, setModalShow] = useState<boolean>(false);
  const [isPin, setIsPin] = useState(true);

  const handleChangePin = (v: boolean) => {
    setIsPin(v);
  };
  const token = useRecoilValue(tokenState);
  console.log(">>", token);

  return (
    <>
      {modalShow ? (
        <>
          <CreatePinModal
            setModalShow={setModalShow}
            latitude={currentLatitude}
            longitude={currentLongitude}
          ></CreatePinModal>
        </>
      ) : (
        <>
          <S.MainArea>
            <S.SectionWrapper>
              <S.SectionArea>
                <S.MapArea>
                  <MapView setModalShow={setModalShow} />
                </S.MapArea>
                <S.RecordTitleArea>
                  <S.RecordTitle
                    className={isPin ? "active" : ""}
                    onClick={() => setIsPin(true)}
                  >
                    핀 기록
                  </S.RecordTitle>
                  <S.RecordTitle
                    className={isPin ? "" : "active"}
                    onClick={() => setIsPin(false)}
                  >
                    일기
                  </S.RecordTitle>
                </S.RecordTitleArea>
                {isPin && oneDayPinList.length > 0 ? (
                  <>
                    <PinDiaryView />
                  </>
                ) : (
                  <>
                    {isPin ? (
                      <S.EmptyView>
                        <EmptyViewInfoPin />
                        지도에 있는 버튼을 눌러
                        <br />
                        핀을 생성해보세요!
                      </S.EmptyView>
                    ) : (
                      <MainViewDairy handleChangePin={handleChangePin} />
                    )}
                  </>
                )}
              </S.SectionArea>
            </S.SectionWrapper>
          </S.MainArea>
        </>
      )}
    </>
  );
};

export default MainPage;
