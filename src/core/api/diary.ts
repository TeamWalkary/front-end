import { axiosReq } from "./axios";
import qs from "qs";

function fetchDiary(date?: number) {
  const dateParams = qs.stringify({
    date: date,
  });
  return axiosReq.GET(`/apis/main/diary/${dateParams}`);
}

function deleteDiary(diaryId: number) {
  return axiosReq.DELETE(`/apis/main/diary/${diaryId}`);
}

export const diaryApi = {
  fetchDiary,
  deleteDiary,
};
