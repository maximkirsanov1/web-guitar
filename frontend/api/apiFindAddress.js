import { url } from "./constUrlApi";
import axios from "axios";

export const apiFindAddress = async (address) => {
  try {
    const response = await axios.get(`${url}/api/findAddress`, {
      params: { address: address },
    });

    return response.data.suggestions;
  } catch (error) {
    console.log(error);
    return false;
  }
};
