import axios, { AxiosRequestHeaders, InternalAxiosRequestConfig } from "axios";
import { RecoilState, useRecoilValue } from "recoil";
import { tokenState } from "../atom";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (request: InternalAxiosRequestConfig) => {
    request.headers = request.headers || ({} as AxiosRequestHeaders);
    // const token: RecoilState<string> = tokenState;
    const token = useRecoilValue(tokenState);
    console.log("axios>>", token);
    if (token !== "") {
      request.headers["Authorization"] = `${token}`;
    }
    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const axiosReq = {
  async GET(path: string) {
    const { data } = await axiosInstance(path);
    return data;
  },

  async POST<T>(path: string, body: T) {
    const { data } = await axiosInstance.post(path, body);
    return data;
  },

  async PUT<T>(path: string, body: T) {
    const { data } = await axiosInstance.put(path, body);
    return data;
  },

  async PATCH<T>(path: string, body: T) {
    await axiosInstance.patch(path, body);
  },

  async DELETE(path: string) {
    await axiosInstance.delete(path);
  },
};
