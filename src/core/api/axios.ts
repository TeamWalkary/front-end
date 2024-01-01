import axios, { AxiosRequestHeaders, InternalAxiosRequestConfig } from 'axios';

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.response.use(response => {
  const customHeader = response.headers['authorization'];

  // console.log(response.headers['refreshAuthorization']);
  //const yourCookieValue = document.cookie
  //  .split('; ')
  //  .find(row => row.startsWith('refreshAuthorization='))
  //  .split('=')[1];

  axiosInstance.defaults.headers.common['authorization'] = customHeader;
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
