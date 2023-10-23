import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import axios from "axios";

interface MainViewDairyProps {
  todayDiary: boolean;
}

export default function MainViewDairy(props: MainViewDairyProps) {
  const { todayDiary } = props;
  const navigate = useNavigate();
  const [diaryData, setDiaryData] = useState(null);
  const token = localStorage.getItem("token");
  console.log(todayDiary);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_APP_BASE_URL}/apis/main/diary`, {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => {
        setDiaryData(response.data);
      })
      .catch((error) => console.error(`Error: ${error}`));
  }, []);

  if (!diaryData)
    return (
      <EmptyWrapper>
        <EmptyText>아직 오늘의 일기가 없네요!</EmptyText>
        <DiaryBtn onClick={() => navigate("/diary")}>일기쓰기</DiaryBtn>
      </EmptyWrapper>
    );

  return <Container>{diaryData && JSON.stringify(diaryData)}</Container>;
}

const Container = styled.section``;

const EmptyWrapper = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;

  margin-top: 15rem;
`;

const EmptyText = styled.p`
  color: #a1a1a1;
  text-align: center;
  font-size: 1.6rem;
  line-height: 2.4rem;
  flex-direction: column;
`;

const DiaryBtn = styled.button`
  position: fixed;
  bottom: 1.6rem;

  padding: 0.8rem 5.2rem;
  border-radius: 10rem;

  background: #333;
  color: white;
`;
