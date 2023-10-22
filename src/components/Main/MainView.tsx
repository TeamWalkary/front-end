import { styled } from "styled-components";
import { ReactComponent as MenuBtn } from "../../assests/menuBtn.svg";
import { ReactComponent as Calendar } from "../../assests/Calendar.svg";
import { ReactComponent as Pin } from "../../assests/pin.svg";

const MainView = () => {
  const today = new Date();

  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const day = today.getDay();
  const date = today.getDate();

  const getKorDay = (day: number) => {
    switch (day) {
      case 0:
        return "일";
        break;
      case 1:
        return "월";
        break;
      case 2:
        return "화";
        break;
      case 3:
        return "수";
        break;
      case 4:
        return "목";
        break;
      case 5:
        return "금";
        break;
      case 6:
        return "토";
        break;

      default:
        break;
    }
  };

  return (
    <MainArea>
      <MainHeader>
        <MenuBtn />
        <span>
          {year}. {month}. {date}. ({getKorDay(day)})
        </span>
        <Calendar />
      </MainHeader>
      <MapArea></MapArea>
      <RecordArea>
        <RecordDetail>
          <RecordTitleArea>
            <RecordTitle className="active">핀 기록</RecordTitle>
            <RecordTitle>일기</RecordTitle>
          </RecordTitleArea>
          <EmptyView>
            <Pin style={{ opacity: "0.2" }} />
            지도에 있는 버튼을 눌러
            <br />
            핀을 생성해보세요!
          </EmptyView>
        </RecordDetail>
      </RecordArea>
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
  font-weight: 700;
  line-height: 2.4rem;
  font-size: 1.4rem;
  letter-spacing: -0.021rem;
`;

const MapArea = styled.div`
  width: 100%;
  height: 23.2rem;
  background-color: skyblue;
`;

const RecordArea = styled.div`
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
  &.active {
    opacity: 1;
  }
`;

const RecordDetail = styled.section``;

const EmptyView = styled.div`
  margin-top: 11.5rem;
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  color: #a1a1a1;
  text-align: center;
  font-size: 1.6rem;
  line-height: 2.4rem;
  flex-direction: column;
`;
