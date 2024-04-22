import axios from "axios";
import { url } from "./constUrlApi";

export const authorization = async (email, pass, setCookie) => {
  const response = await axios.post(`${url}/api/login`, {
    email: email,
    pass: pass,
  });

  if (!response.data) {
    return false;
  }
  setCookie("access", response.data.accessToken);
  setCookie("refresh", response.data.refreshToken);
  location.reload();
  return true;
};
