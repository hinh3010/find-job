import axios from "axios";
import { BASE_URL } from "../../config/BASE_URL";

export function getAllCourses(page = 1, search, createdById) {
  return axios({
    url: search
      ? `${BASE_URL}/api/cms/course?page=${page}&search=${search}`
      : createdById
      ? `${BASE_URL}/api/cms/course?createdById=${createdById}`
      : `${BASE_URL}/api/cms/course?page=${page}`,
    method: "GET",
  });
}

export function getAllCoursesdat(page = 1, params={}) {
  return axios({
    url:`${BASE_URL}/api/cms/course?page=${page}&sort=-createdAt`,params,
    method: "GET",
  });
}
export function getCoursesByType(page = 1, type) {
  return axios({
    url: `${BASE_URL}/api/cms/course?page=${page}&type=${type}`,
    method: "GET",
  });
}

export function getCoursesByCost(page = 1, cost) {
  return axios({
    url: `${BASE_URL}/api/cms/course?page=${page}&cost=${cost}`,
    method: "GET",
  });
}

export function getDetailCourseById(id) {
  return axios({
    url: `${BASE_URL}/api/cms/course/${id}`,
    method: "GET",
  });
}
export function createCourse(data, token) {
  return axios({
    url: `${BASE_URL}/api/cms/course`,
    method: "POST",
    data,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
export function deleteCourseAction(id, token) {
  return axios({
    url: `${BASE_URL}/api/cms/course/${id}`,
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
