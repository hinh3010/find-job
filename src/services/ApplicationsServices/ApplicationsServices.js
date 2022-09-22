import axios from "axios";
import { BASE_URL } from "../../config/BASE_URL";

export function getAllApplications(params = "", userID = "", page = 1) {
  return axios({
    url: `${BASE_URL}/api/cms/application?page=${page}&${params}&createdById=${userID}`,
    method: "GET",
  });
}
export function requestViewApplicationById(id, token, data = {}) {
  return axios({
    url: `${BASE_URL}/api/cms/application/${id}/request-view-by-job`,
    data,
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
export function checkIfSubmitCV(token, createdById, jobId) {
  return axios({
    url: `${BASE_URL}/api/cms/application?createdById=${createdById}&jobId=${jobId}`,
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
export function getSubmitsCV(token, params = {}) {
  return axios({
    url: `${BASE_URL}/api/cms/application`,
    params,
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
