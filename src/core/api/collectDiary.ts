import { axiosReq } from "./axios";
import qs from "qs";

function fetchDiary() {
  const dateParams = qs.stringify({
    limit: 5,
    offset: 0,
    sortBy: "latest",
    // search
  });

  return axiosReq.GET(`/apis/collect/diary?${dateParams}`);
}

export const diaryApi = {
  fetchDiary,
};
