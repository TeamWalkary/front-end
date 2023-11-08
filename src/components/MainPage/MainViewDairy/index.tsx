import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import axios from 'axios';

interface MainViewDairyProps {
  handleChangePin: (v: boolean) => void;
}

interface DiaryData {
  id: number;
  title: string;
  content: string;
  image: string;
}

export default function MainViewDairy(props: MainViewDairyProps) {
  const { handleChangePin } = props;
  const navigate = useNavigate();
  const [diaryData, setDiaryData] = useState<DiaryData | null>();
  const token = localStorage.getItem('token');
  //console.log(todayDiary);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_APP_BASE_URL}/apis/main/diary`, {
        headers: {
          Authorization: token,
        },
      })
      .then(response => {
        setDiaryData(response.data);
      })
      .catch(error => console.error(`Error: ${error}`));
  }, []);

  const handleEdit = () => {
    alert('서비스 준비 중입니다.');
  };

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
      console.log('삭제되었습니다!');
      handleChangePin(true);
      navigate('/main', { state: { todayDiary: true } });
    } catch (error) {
      console.error(error);
    }
  };

  if (!diaryData)
    return (
      <EmptyWrapper>
        <EmptyText>아직 오늘의 일기가 없네요!</EmptyText>
        <DiaryBtn onClick={() => navigate('/diary')}>일기쓰기</DiaryBtn>
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
          {diaryData?.image && (
            <ImageWrapper>
              <Image src={diaryData.image} alt='이미지' />
            </ImageWrapper>
          )}
          <ContentWrapper>{diaryData.content}</ContentWrapper>
        </Container>
      )}
    </>
  );
}

const Container = styled.section`
  margin: 2rem;
`;

const HeaderWrapper = styled.div`
  display: flex;
  margin-bottom: 2rem;
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
  position: absolute;
  right: 2rem;
`;

const EditButton = styled.button`
  margin-right: 2rem;
  background: none;
  border: none;
  padding: 0;

  color: #a1a1a1;
  font-family: Pretendard;
  font-size: 1.2rem;
  font-style: normal;
  font-weight: 400;
  line-height: 2rem;
`;

const DeleteButton = styled.button`
  background: none;
  border: none;
  padding: 0;
  margin: 0;

  color: #a1a1a1;
  font-family: Pretendard;
  font-size: 1.2rem;
  font-style: normal;
  font-weight: 400;
  line-height: 2rem;
`;

const ImageWrapper = styled.div`
  width: 100%;
  text-align: center;
  margin-bottom: 2rem;
`;

const Image = styled.img`
  width: 33.5rem;
  height: 18.8rem;
`;

const ContentWrapper = styled.p`
  align-self: stretch;

  color: #333;

  font-family: Pretendard;
  font-size: 1.4rem;
  font-style: normal;
  font-weight: 400;
  line-height: 2rem;
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
