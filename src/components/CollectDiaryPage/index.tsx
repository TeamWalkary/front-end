import { S } from "./style";
//
import axios from "axios";
import { useEffect, useState } from "react";
import NothingPage from "./NothingPage";

type Diarys = {
  id: string;
  title: string;
  date: number;
  iamge: string;
  content: string;
};

export default function CollectDiaryPage() {
  const [allDiaryData, setAllDiaryData] = useState<Diarys[]>([]);
  // const [limitNum, setLimitNum] = useState(0);

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
        if (res.status === 200) {
          setAllDiaryData(res.data);
        } else if (res.status === 400) {
          null;
        }
      })
      .catch((res) => {
        console.log(res);
      });
  }, []);

  return (
    <S.Container>
      {allDiaryData.length > 0 ? (
        <>
          <S.Title>일기 모아보기</S.Title>
          {allDiaryData?.map((diary) => {
            return (
              <S.DiaryList key={diary.id}>
                <div>
                  <header>{diary.title}</header>
                  <p>{diary.date}</p>
                </div>
                <img alt="일기 이미지" src={diary.iamge}></img>
                <main>{diary.content}</main>
              </S.DiaryList>
            );
          })}
        </>
      ) : (
        <NothingPage />
      )}
    </S.Container>
  );
}
