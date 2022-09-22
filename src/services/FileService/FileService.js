import axios from "axios";
import { BASE_URL } from "../../config/BASE_URL";

export function uploadImage(data, token) {
    return axios({
        url: `${BASE_URL}/api/cms/attachment/images`,
        method: "POST",
        data,
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}
