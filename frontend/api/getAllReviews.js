import { url } from "./constUrlApi";
import axios from "axios";

export const getAllReviews = async () => {
  try {
    const response = await axios.get(`${url}/api/getAllReviews`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.log(error);
    return false;
  }
};
