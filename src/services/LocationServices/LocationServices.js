import axios from "axios";
import { BASE_URL } from "../../config/BASE_URL";

export function getProvine() {
    return axios({
        url: `${BASE_URL}/api/cms/location/?type=province&limit=63`,
        method: "GET",
    });
}

export function getCountry() {
    return axios({
        url: `${BASE_URL}/api/cms/location/?type=country&limit=227`,
        method: "GET"
    })
}