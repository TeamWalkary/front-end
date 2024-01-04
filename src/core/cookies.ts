import { Cookies } from "react-cookie";

const cookies = new Cookies();

export const setCookie = (name: string, token: string) => {
  return cookies.set("jwtToken", token, {
    path: "/",
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    httpOnly: true,
  });
};

export const getCookie = (name: string) => {
  return cookies.get(name);
};
