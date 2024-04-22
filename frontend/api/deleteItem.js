import axios from "axios";
import { url } from "./constUrlApi";
export const deleteItem = async (id) => {
  try {
    await axios.delete(`${url}/api/deleteItem/${id}`, {
      id: id,
      withCredentials: true,
    });
    return true;
  } catch (error) {
    return;
  }
};
