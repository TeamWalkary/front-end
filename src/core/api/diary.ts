import { PostData } from "../../types/diary";
import { axiosReq } from "./axios";
import qs from "qs";

function fetchDiary(date?: number) {
  const dateParams = qs.stringify({
    date: date,
  });
  return axiosReq.GET(`/apis/main/diary/${dateParams}`);
}

function postDiary(postingDiary: PostData) {
  return axiosReq.POST(`/apis/diary`, postingDiary);
}

function patchDiary(diaryId: number, patchingDiary: PostData) {
  return axiosReq.PATCH(`/apis/diary/${diaryId}`, patchingDiary);
}

function deleteDiary(diaryId: number) {
  return axiosReq.DELETE(`/apis/main/diary/${diaryId}`);
}

export const diaryApi = {
  fetchDiary,
  postDiary,
  patchDiary,
  deleteDiary,
};
