import axios from "axios"
import { BASE_URL } from "../../config/BASE_URL";


export const createSurvey = (data, token) => {
    return axios({
        url: `${BASE_URL}/api/cms/survey`,
        method: "POST",
        data,
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

export const getListSurvey = (page, sort, active, id, token) => {
    const idText = id ? `&createdById=${id}` : '';
    return axios({
        url: `${BASE_URL}/api/cms/survey?activeSurvey=${active}&page=${page}&sort=${sort}&limit=8${idText}`,
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

export const getSurveyById = (id, token) => {
    return axios({
        url: `${BASE_URL}/api/cms/survey/${id}`,
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}
export const getSurveyRespondById = (param= {}, token) => {
    return axios({
        url: `${BASE_URL}/api/cms/survey-response`,param,
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}
export const createResponse = (data, token) => {
    return axios({
        url: `${BASE_URL}/api/cms/survey-response`,
        method: "POST",
        data,
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}