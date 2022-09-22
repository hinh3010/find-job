import axios from "axios";
import { BASE_URL } from "../../config/BASE_URL";

export function getAllBank() {
  return axios({
    url: `${BASE_URL}/api/cms/bank`,
    method: "GET",
  });
}
