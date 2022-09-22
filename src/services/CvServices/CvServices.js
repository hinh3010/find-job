import axios from "axios";
import { BASE_URL } from "../../config/BASE_URL";

export function getAllCV(status, createdById, page, params) {
  return axios({
    url:
      status && createdById && page
        ? `${BASE_URL}/api/cms/cv?status=${status}&createdById=${createdById}&page=${page}&${params}`
        : `${BASE_URL}/api/cms/cv/`,
    method: "GET",
  });
}
export function getCVById(id, token) {
  return axios({
    url: `${BASE_URL}/api/cms/cv/${id}`,
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
}

export function createCV(data, token) {
  return axios({
    url: `${BASE_URL}/api/cms/cv`,
    method: "POST",
    data,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export function sendCv(data, token) {
  return axios({
    url: `${BASE_URL}/api/cms/application`,
    method: "PUT",
    data,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export function deleteCV(id, token) {
  return axios({
    url: `${BASE_URL}/api/cms/cv/${id}`,
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
