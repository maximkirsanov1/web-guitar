import axios from "axios";
import { url } from "./constUrlApi";
export const getPopularItems = async () => {
  try {
    const response = await axios.get(`${url}/api/popularItems`);
    return response.data;
  } catch (error) {
    console.log(error);
    return false;
  }
};
