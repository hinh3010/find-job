import axios from "axios";
import { BASE_URL } from "../../config/BASE_URL";

export function getAll( type, parent) {
  return axios({
    url: `${BASE_URL}/api/cms/location/?type=${type}&limit=1000&parent=${parent}`,
    method: "GET",
  });
}
export function getProviceById(id) {
  return axios({
    url: `${BASE_URL}/api/cms/location/${id}`,
    method: "GET",
  });
}
