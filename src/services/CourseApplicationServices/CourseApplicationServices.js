import axios from "axios";
import { BASE_URL } from "../../config/BASE_URL";

export function getCheckRegister (params= {}) {
  return axios({
    url:  `${BASE_URL}/api/cms/courseApplication`,params,
    method: "GET",
  });
}

export function getAllCoursesApplication(
  params = "",
  userId = "",
  page,
  courseId,
) {
  return axios({
    url: courseId
      ? `${BASE_URL}/api/cms/courseApplication/${courseId}`
      : `${BASE_URL}/api/cms/courseApplication?${params}&createdById=${userId}&page=${page}`,
    method: "GET",
  });
}
export function getDetailCourseApplicationByCourseId(courseId, token, page) {
  return axios({
    url: `${BASE_URL}/api/cms/courseApplication/?page=${page}&courseId=${courseId}`,
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export function registerCourseApplication(data, token) {
  return axios({
    url: `${BASE_URL}/api/cms/courseApplication`,
    method: "POST",
    data,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
export function updatePaymentStatusCourseApplication(data, token, id) {
  return axios({
    url: `${BASE_URL}/api/cms/courseApplication/${id}`,
    method: "PATCH",
    data,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
