import axios from "axios";
import { BASE_URL } from "../../config/BASE_URL";

export function getAllPartner() {
  return axios({
    url: `${BASE_URL}/api/cms/partner?limit=50`,
    method: "GET",
  });
}
