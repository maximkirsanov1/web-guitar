import axios from "axios";
import { url } from "./constUrlApi";

export const getUsers = async () => {
  try {
    const users = await axios.get(`${url}/api/getUsers`, {
      withCredentials: true,
    });
    return users.data;
  } catch (error) {
    console.log(error);
  }
};
