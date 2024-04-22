import axios from "axios";
import { url } from "./constUrlApi";

const refreshToken = async (refresh, setCookie) => {
  const response = await axios.get(`${url}/api/refresh-token`, {
    headers: {
      refresh: refresh,
    },
  });
  if (!response.data) {
    return false;
  } else {
    setCookie("access", response.data.accessToken);
    setCookie("refresh", response.data.refreshToken);
    return response.data.accessToken;
  }
};

export const verifyToken = async (cookies, setCookie) => {
  if (!cookies.access || !cookies.refresh) {
    return false;
  }
  const response = await axios.get(`${url}/api/verify-token`, {
    headers: {
      access: cookies.access,
    },
  });
  if (!response.data) {
    const errorResponse = await refreshToken(cookies.refresh, setCookie);
    return errorResponse;
  } else {
    return cookies.access;
  }
};
