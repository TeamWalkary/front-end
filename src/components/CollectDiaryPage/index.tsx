import { S } from "./style";
//
import axios from "axios";
import { useEffect, useState } from "react";
import NothingPage from "./NothingPage";
import Filter from "../Common/Filter";
import Diary from "./Diary";
// import { diaryApi } from "../../core/api/collectDiary";

type Diary = {
  id: string;
  title: string;
  date: number;
  image: string;
  content: string;
};
type selectedDateData = {
  startDate: string;
  lastDate: string;
};

const initDate = {
  startDate: "",
  lastDate: "",
};

export default function CollectDiaryPage() {
  const [allDiaryData, setAllDiaryData] = useState<Diary[]>([]);
  const [currentSort, setCurrentSort] = useState("");
  const [selectedDate, setSelectedDate] = useState<selectedDateData>(initDate);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);

  const changeSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value === "earliest") {
      setCurrentSort("");
    } else if (e.target.value === "latest") {
      setCurrentSort("latest");
    }
  };

  const selectDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const newValue = value.replace(/-/g, "");
    setSelectedDate({
      ...selectedDate,
      [name]: newValue,
    });
  };

  const token = localStorage.getItem("token");
  const chosenAllDate = selectedDate.startDate && selectedDate.lastDate;
  const isLastItem = allDiaryData.length === 100;

  const getData = () => {
    const apiUrl = `${
      import.meta.env.VITE_APP_BASE_URL
    }/apis/collect/diary?limit=10`;
    setLoading(true);

    axios
      .get(
        `${apiUrl}&offset=${page}${currentSort && `&sortBy=${currentSort}`}${
          chosenAllDate &&
          `&search=${`${selectedDate.startDate}-${selectedDate.lastDate}`}`
        }
      `,
        {
          headers: {
            Authorization: token,
          },
          withCredentials: true,
        }
      )
      .then((res) => {
        if (res.status === 200) {
          setAllDiaryData((prevData) => [...prevData, ...res.data]);
          setLoading(false);
        } else if (res.status === 400) {
          null;
        }
      })
      .catch((res) => {
        console.log(res);
      });
  };

  useEffect(() => {
    !isLastItem && getData();
  }, [page, currentSort, chosenAllDate]);

  // useEffect(() => {
  //   fetchDiaryData();
  // }, []);

  // const fetchDiaryData = async () => {
  //   try {
  //     const response = await diaryApi.fetchDiary();
  //     response ? setAllDiaryData(response) : null;
  //   } catch {
  //     console.error;
  //   }
  // };

  return (
    <S.Container>
      <>
        <div>
          <S.Title>일기 모아보기</S.Title>
          <Filter
            changeSort={changeSort}
            selectDate={selectDate}
            selectedDate={selectedDate}
          />
        </div>
        {allDiaryData.length === 0 ? (
          <NothingPage />
        ) : (
          <>
            {allDiaryData?.map((diary, idx) => {
              return (
                <Diary
                  {...diary}
                  onFetchMore={() => setPage((prev) => prev + 1)}
                  isLastItem={allDiaryData.length - 1 === idx}
                  key={diary.id}
                />
              );
            })}
            {loading && <div>loading</div>}
          </>
        )}
      </>
    </S.Container>
  );
}
