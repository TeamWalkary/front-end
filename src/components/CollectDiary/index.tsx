import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";
import Nothing from "./Nothing";

type Diarys = {
  id: string;
  title: string;
  date: number;
  iamge: string;
  content: string;
};

const CollectDiaryView = () => {
  const [allDiaryData, setAllDiaryData] = useState<Diarys[]>([]);
  const [limitNum, setLimitNum] = useState(0);

  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_APP_BASE_URL}/apis/collect/diary`, {
        headers: {
          Authorization: token,
        },
        params: {
          limit: 5,
          offset: 0,
          sortBy: "LATEST",
        },
      })
      .then((res) => {
        console.log(res);

        // if (data.status === 200) {
        //  setAllDiaryData(res.diary);
        // } else if (data.status === 400) {
        //  이걸 어떻게 처리하징...
        // }
      })
      .catch((res) => {
        console.log(res);
      });
  }, []);

  return (
    <Container>
      {allDiaryData.length > 0 ? (
        <>
          <Title>일기 모아보기</Title>
          {allDiaryData?.map((diary) => {
            return (
              <DiaryList key={diary.id}>
                <div>
                  <header>{diary.title}</header>
                  <p>{diary.date}</p>
                </div>
                <img alt="일기 이미지" src={diary.iamge}></img>
                <main>{diary.content}</main>
              </DiaryList>
            );
          })}

          {/* <DiaryList>
            <div>
              <header>제목입니다</header>
              <p>2023.10.20</p>
            </div>
            <img alt="일기 이미지" src="../../assests/예시이미지.jpg"></img>
            <main>
              오늘은 오랜만에 친구들이랑 논 날!! 어디 보자.. 올해 3월 이후로는
              친구 만나는 게 처음이었넹 ㅎㅎ 오늘 피자도 먹고 만두도 먹고 치킨도
              먹고 곱창이랑 순두부랑 또 뭐더라 또 쌀국수도 먹고 떡볶이에 튀김도
              먹고.. 보자보자.. 아무튼 ㅎㅎ이것 저것 많이 먹었따! 부대찌개 못
              먹은 게 좀 아쉽네 ㅠㅠ 내년에 친구들 만나면 또 이것저것 맛있는 거
              먹어야징!!
            </main>
          </DiaryList> */}
        </>
      ) : (
        <Nothing />
      )}
    </Container>
  );
};

export default CollectDiaryView;

const Container = styled.div`
  height: 90vh;
  display: flex;
  flex-direction: column;
  padding: 2rem;
`;

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 2rem;
  color: #333333;
  font-family: Pretendard;
  font-style: normal;
  font-weight: 700;
  line-height: 30px;
`;

const DiaryList = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1.2rem;
  gap: 0.8rem;
  border-radius: 9px;
  border: 0.5px solid #dcdcdc;
  background: #fffefc;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.04);
  margin-bottom: 2rem;

  div {
    display: flex;
    justify-content: space-between;
    header {
      font-size: 1.4rem;
      color: #333333;
      font-family: Pretendard;
      font-style: normal;
      font-weight: 700;
      line-height: 24px; /* 171.429% */
      letter-spacing: -0.21px;
    }
    p {
      color: #a1a1a1;
      font-family: Pretendard;
      font-size: 1.2rem;
      font-style: normal;
      font-weight: 700;
      line-height: 20px;
    }
  }
  main {
    font-size: 1.2rem;
    color: #333;
    font-family: Pretendard;
    font-style: normal;
    font-weight: 400;
    line-height: 18px;
  }
`;
