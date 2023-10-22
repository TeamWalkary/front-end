import axios, { AxiosHeaders, InternalAxiosRequestConfig } from "axios";

const real = axios.create({
  // baseURL: import.meta.env.REACT_APP_IP,
  baseURL: "https://d11ad427-0f9f-4d54-95a0-e88aeaa2b860.mock.pstmn.io",
  headers: new AxiosHeaders({
    "Content-Type": "application/json",
  }),
});

axios.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    config.headers = config.headers || {};
    if (localStorage.getItem("token") !== null) {
      config.headers["Authorization"] = `Bearer ${localStorage.getItem(
        "token"
      )}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const realReq = {
  GET_SWR(path: string) {
    return real.get(path);
  },

  async GET<T>(path: string, option?: { params: string }) {
    const data = await real.get<T>(path, option);
    return data.data;
  },

  async POST<T>(path: string, body: T) {
    const data = await real.post(path, body);
    return data.data;
  },

  async PUT<T>(path: string, body: T) {
    const data = await real.put(path, body);
    return data.data;
  },

  async PATCH<T>(path: string, body: T) {
    await real.patch(path, body);
  },
};
