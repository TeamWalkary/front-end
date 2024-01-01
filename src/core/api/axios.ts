import axios, { AxiosRequestHeaders, InternalAxiosRequestConfig } from 'axios';

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

axiosInstance.interceptors.response.use(response => {
  const customHeader = response.headers['Authorization'];

  console.log(response.headers['refreshAuthorization']);

  console.log(response.headers);
  //const yourCookieValue = document.cookie
  //  .split('; ')
  //  .find(row => row.startsWith('refreshAuthorization='))
  //  .split('=')[1];

  axiosInstance.defaults.headers.common['Authorization'] = customHeader;
  //axiosInstance.defaults.headers.common[
  // 'Cookie'
  //] = `refreshAuthorization=${yourCookieValue}`;

  return response;
});

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
