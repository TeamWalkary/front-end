import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import axios from "axios";

interface MainViewDairyProps {
  handleChangePin: (v: boolean) => void;
}

export default function MainViewDairy(props: MainViewDairyProps) {
  const { handleChangePin } = props;
  const navigate = useNavigate();
  const [diaryData, setDiaryData] = useState(null);
  const token = localStorage.getItem("token");
  //console.log(todayDiary);

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

  const handleEdit = () => {};

  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_APP_BASE_URL}/apis/main/diary/${diaryData.id}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      console.log(response);
      console.log("삭제되었습니다!");
      handleChangePin(true);
      navigate("/main", { state: { todayDiary: true } });
    } catch (error) {
      console.error(error);
    }
  };

  if (!diaryData)
    return (
      <EmptyWrapper>
        <EmptyText>아직 오늘의 일기가 없네요!</EmptyText>
        <DiaryBtn onClick={() => navigate("/diary")}>일기쓰기</DiaryBtn>
      </EmptyWrapper>
    );

  return (
    <>
      {diaryData && (
        <Container>
          <HeaderWrapper>
            <Title>{diaryData.title}</Title>
            <BtnWrapper>
          <EditButton onClick={handleEdit}>수정</EditButton>
              <DeleteButton onClick={handleDelete}>삭제</DeleteButton>
              </BtnWrapper>
            </HeaderWrapper>
          <image src=`${diaryData.image}` alt="이미지" />
          <p>{diaryData.content}</p>
        </Container>
      )}
    </>
  );
}

const Container = styled.section``;

const HeaderWrapper = styled.div`
  display: flex;
`;

const Title = styled.strong`
  color: #333;

  font-family: Pretendard;
  font-size: 1.4rem;
  font-style: normal;
  font-weight: 700;
  line-height: 2.4rem;
  letter-spacing: -0.021rem;
`;

const BtnWrapper = styled.div`
  display: flex;
`;

const EditButton = styled.button`
  background: #333;
  color: white;
  padding: 0.5rem;
`;

const DeleteButton = styled.button`
  background: red;
  color: white;
  padding: 0.5rem;
`;

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
