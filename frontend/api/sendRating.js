import { url } from "./constUrlApi";
import axios from "axios";
export const sendRating = async (id, rating, review) => {
  try {
    await axios.patch(
      `${url}/api/setRating/${id}`,
      { rating: rating, review: review },
      {
        withCredentials: true,
      }
    );
    window.location.reload();
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};
