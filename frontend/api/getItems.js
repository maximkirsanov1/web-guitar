import axios from "axios";
import { url } from "./constUrlApi";

export const getItems = async () => {
  const items = await axios.get(`${url}/api/getItems`);
  return items.data;
};
