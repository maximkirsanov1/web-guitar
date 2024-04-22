import axios from "axios";
import { url } from "./constUrlApi";
export const getOrders = async (email) => {
  try {
    const response = await axios.get(`${url}/api/getOrders`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    return false;
  }
};
