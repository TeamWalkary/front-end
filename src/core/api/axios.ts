import axios, { InternalAxiosRequestConfig } from "axios";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (request: InternalAxiosRequestConfig) => {
    request.headers = request.headers || {};
    if (localStorage.getItem("token") !== null) {
      request.headers["Authorization"] = `${localStorage.getItem("token")}`;
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
