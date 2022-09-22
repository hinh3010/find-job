import axios from "axios";
import { BASE_URL } from "../../config/BASE_URL";

export function getAllJobs(pageNumber = 1, params = {}) {
  return axios({
    url: `${BASE_URL}/api/cms/job?page=${pageNumber}&sort=-createdAt`,params,
    method: "GET",
  });
}

export function createJobs(data, token) {
  return axios({
    url: `${BASE_URL}/api/cms/job`,
    method: "POST",
    data,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export function getDetailJobById(id) {
  return axios({
    url: `${BASE_URL}/api/cms/job/${id}`,
    method: "GET",
  });
}

export function getJobsCreateByCompany(id, token, page = 1) {
  return axios({
    url: `${BASE_URL}/api/cms/job?createdById=${id}&page=${page}`,
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
export function deleteJobAction(id, token) {
  return axios({
    url: `${BASE_URL}/api/cms/job/${id}`,
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
