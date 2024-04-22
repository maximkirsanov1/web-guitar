import { url } from "./constUrlApi";
import axios from "axios";

export const approveReview = async (id) => {
  try {
    await axios.patch(
      `${url}/api/review`,
      {
        id: id,
      },
      { withCredentials: true }
    );
  } catch (error) {
    console.log(error);
    return false;
  }
};
