// import axios, { InternalAxiosRequestConfig } from "axios";

// const real = axios.create({
//   baseURL: "http://127.0.0.1:5173",
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// real.interceptors.request.use(
//   (config: InternalAxiosRequestConfig) => {
//     const token = localStorage.getItem("token");

//     if (token) {
//       config.headers["Authorization"] = `Bearer ${token}`;
//     }

//     return config;
//   },

//   (error) => Promise.reject(error)
// );

// export default real;

// export const realReq = {
//   async GET<T>(path: string, option?: { params: string }) {
//     const data = await real.get<T>(path, option);
//     return data.data;
//   },

//   async POST<T>(path: string, body: T) {
//     const data = await real.post(path, body);
//     return data.data;
//   },

//   async PUT<T>(path: string, body: T) {
//     const data = await real.put(path, body);
//     return data.data;
//   },

//   async PATCH<T>(path: string, body: T) {
//     await real.patch(path, body);
//   },
// };
