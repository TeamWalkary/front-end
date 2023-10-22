import { styled } from "styled-components";
import { ReactComponent as MenuBtn } from "../../assests/menuBtn.svg";
import { ReactComponent as Calendar } from "../../assests/Calendar.svg";
import { ReactComponent as Pin } from "../../assests/pin.svg";
import SideNav from "./SideNav";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Today from "../Common/Today";
import MapView from "./MapView";

const MainView = () => {
  const [sideNavOpen, setSideNavOpen] = useState(false);
  const [isPin, setIsPin] = useState(true);
  const navigate = useNavigate();

  return (
    <MainArea>
      {sideNavOpen && <SideNav setSideNavOpen={setSideNavOpen} />}
      <MainHeader>
        <MenuBtn onClick={() => setSideNavOpen(true)} />
        <Today />
        <Calendar />
      </MainHeader>
      <div>
        <section>
          <MapArea>
            <MapView />
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
          <EmptyView>
            {isPin ? (
              <>
                <Pin style={{ opacity: "0.2" }} />
                지도에 있는 버튼을 눌러
                <br />
                핀을 생성해보세요!
              </>
            ) : (
              <>
                아직 오늘의 일기가 없네요!
                <br />
                <DiaryBtn onClick={() => navigate("/diary")}>일기쓰기</DiaryBtn>
              </>
            )}
          </EmptyView>
        </section>
      </div>
    </MainArea>
  );
};

export default MainView;

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
  &.active {
    opacity: 1;
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

const DiaryBtn = styled.button`
  display: inline-flex;
  padding: 0.8rem 5.2rem;
  justify-content: center;
  align-items: center;
  gap: 0.4rem;
  border-radius: 99px;
  background: #333;
  color: white;
`;
