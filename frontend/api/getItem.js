import { url } from "./constUrlApi";
import axios from "axios";

export const getItem = async (id) => {
  try {
    const response = await axios.get(`${url}/api/getItem`, {
      params: { id: id },
    });
    return response.data;
  } catch (error) {
    console.log(error);
    return false;
  }
};
