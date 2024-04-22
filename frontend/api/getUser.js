import axios from "axios";
import { url } from "./constUrlApi";
export const getUser = async (access) => {
  const response = await axios.get(`${url}/api/getUser`, {
    headers: {
      access: access,
    },
  });

  return response.data;
};
