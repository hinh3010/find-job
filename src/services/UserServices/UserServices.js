import axios from "axios";
import { BASE_URL } from "../../config/BASE_URL";

export function updateUsers(id, data, token) {
    return axios({
        url: `${BASE_URL}/api/v1/user/${id}`,
        method: "PATCH",
        data,
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

export function sensitiveUpdates(id, data, token) {
    return axios({
        url: `${BASE_URL}/api/v1/user/${id}/update-sensitive`,
        method: "PATCH",
        data,
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

export function getUserByIds(id, token) {
    return axios({
        url: `${BASE_URL}/api/v1/user/${id}`,
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export function createContacts(data, token) {
    return axios({
        url: `${BASE_URL}/api/cms/contact`,
        method: "POST",
        data, 
    })
}
