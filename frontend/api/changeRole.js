import axios from "axios";
import { url } from "./constUrlApi";
export const changeRole = async (id, role) => {
  try {
    await axios.patch(
      `${url}/api/changeRole`,
      {
        id: id,
        role: role,
      },
      { withCredentials: true }
    );
    return true;
  } catch (error) {
    console.log(error);
  }
};
