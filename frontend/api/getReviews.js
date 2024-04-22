import { url } from "./constUrlApi";
import axios from "axios";

export const getReviews = async (id) => {
  try {
    const response = await axios.get(`${url}/api/getReviews`, {
      params: { id: id },
    });

    return response.data;
  } catch (error) {
    console.log(error);
    return false;
  }
};
