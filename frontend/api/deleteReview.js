import { url } from "./constUrlApi";
import axios from "axios";

export const deleteReview = async (id) => {
  try {
    await axios.delete(`${url}/api/review/${id}`, {
      withCredentials: true,
    });
  } catch (error) {
    console.log(error);
    return false;
  }
};
