import axios from "axios";
import { url } from "./constUrlApi";

export const registration = async (name, email, pass, setCookie) => {
  const response = await axios.post(`${url}/api/sign_up`, {
    name: name,
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
