import { styled } from "styled-components";
import { ReactComponent as MenuBtn } from "../../assests/menuBtn.svg";
import { ReactComponent as Calendar } from "../../assests/Calendar.svg";
import { ReactComponent as Pin } from "../../assests/pin.svg";
import { Link, useNavigate, useLocation } from "react-router-dom";
import SideNav from "../Common/Nav/SideNav";
import { useState } from "react";
import CreatePinModal from "./CreatePinModal";
import MapView from "./MapView";
import Today from "../Common/Today";
import { useRecoilValue } from "recoil";
import { position, pinList } from "../../core/atom";
import PinDiaryView from "./PinDiaryView";
import MainViewDairy from "./MainViewDairy";

const MainPage = () => {
  const Position = useRecoilValue(position);
  const oneDayPinList = useRecoilValue(pinList);
  const { currentLatitude, currentLongitude } = Position;
  const [modalShow, setModalShow] = useState<Boolean>(false);

  const location = useLocation();
  const todayDiary = location.state?.todayDiary;

  const [sideNavOpen, setSideNavOpen] = useState(false);
  const [isPin, setIsPin] = useState(true);

  // if (todayDiary) {
  //   setIsPin(false);
  // }

  const handleChangePin = (v: boolean) => {
    setIsPin(v);
  };

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
          <MainArea>
            {sideNavOpen && <SideNav setSideNavOpen={setSideNavOpen} />}
            <MainHeader>
              <MenuBtn
                onClick={() => setSideNavOpen(true)}
                style={{ cursor: "pointer" }}
              />
              <Today />
              <Calendar />
            </MainHeader>
            <SectionWrapper>
              <SectionArea>
                <MapArea>
                  <MapView setModalShow={setModalShow} />
                </MapArea>
                <RecordTitleArea>
                  <RecordTitle
                    className={isPin ? "active" : ""}
                    onClick={() => setIsPin(true)}
                  >
                    핀 기록
                  </RecordTitle>
                  <RecordTitle
                    className={isPin ? "" : "active"}
                    onClick={() => setIsPin(false)}
                  >
                    일기
                  </RecordTitle>
                </RecordTitleArea>
                {isPin && oneDayPinList.length > 0 ? (
                  <>
                    <PinDiaryView />
                  </>
                ) : (
                  <>
                    {isPin ? (
                      <EmptyView>
                        <Pin style={{ opacity: "0.2" }} />
                        지도에 있는 버튼을 눌러
                        <br />
                        핀을 생성해보세요!
                      </EmptyView>
                    ) : (
                      <MainViewDairy handleChangePin={handleChangePin} />
                    )}
                  </>
                )}
              </SectionArea>
            </SectionWrapper>
          </MainArea>
        </>
      )}
    </>
  );
};

export default MainPage;

const MainArea = styled.div`
  height: 90vh;
`;

const MainHeader = styled.header`
  padding: 0.5rem 1.6rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 700;
  line-height: 2.4rem;
  font-size: 1.4rem;
  letter-spacing: -0.021rem;
  height: 4rem;
  box-shadow: 0px 4px 4px 0px rgba(51, 51, 51, 0.08);
`;

const MapArea = styled.div`
  width: 100%;
  height: 23.2rem;
  background-color: skyblue;
`;

const SectionWrapper = styled.div`
  height: 100%;
`;

const SectionArea = styled.section`
  height: 100%;
`;
const RecordTitleArea = styled.div`
  display: flex;
`;

const RecordTitle = styled.div`
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
`;

const EmptyView = styled.div`
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
`;
