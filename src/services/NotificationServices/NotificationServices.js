import axios from "axios";
import { BASE_URL } from "../../config/BASE_URL";

export function getAllNotifications(userId, token) {
    return axios({
        url: `${BASE_URL}/api/cms/notification?receiverId=${userId}`,
        headers: {
            Authorization: `Bearer ${token}`,
        },
        method: "GET",
    });
}
export function getNotificationsUnRead(userId, token, params) {
    return axios({
        url: `${BASE_URL}/api/cms/notification?receiverId=${userId}`,params,
        headers: {
            Authorization: `Bearer ${token}`,
        },
        method: "GET",
    });
}
export function updateNotifications(id, token) {
    const data = {
        status: "READ"
    }
    return axios({
        url: `${BASE_URL}/api/cms/notification/${id}`,
        data,
        headers: {
            Authorization: `Bearer ${token}`,
        },
        method: "PATCH"
    })
}

export function readAlls(userId, token) {
    return axios({
        url: `${BASE_URL}/api/cms/notification/${userId}/read-all`,
        headers: {
            Authorization: `Bearer ${token}`,
        },
        method: "PATCH"
    })
}

