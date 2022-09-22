import {
  getAllJobs,
  getDetailJobById,
  getJobsCreateByCompany,
} from "../../../services/JobServices/JobServices";
import {
  GET_ALL_JOBS,
  GET_DETAIL_JOB_BY_ID,
  GET_JOBS_CREATE_BY_COMPANY,
  SEARCH_JOBS,
} from "./JobTypes";

export function confirmGetAllJob(jobs) {
  return {
    type: GET_ALL_JOBS,
    payload: jobs,
  };
}

export function confirmGetDetailJob(job) {
  return {
    type: GET_DETAIL_JOB_BY_ID,
    payload: job,
  };
}

export const getAllJobsAction = (pageNumber = 1, params={}) => {
  return async (dispatch) => {
    try {
      const result = await getAllJobs(pageNumber, params);
      dispatch(confirmGetAllJob(result.data));
    } catch (error) {
      console.error(error);
    }
  };
};
export const getDetailJobByIdAction = (id) => {
  return async (dispatch) => {
    try {
      const result = await getDetailJobById(id);
      dispatch(confirmGetDetailJob(result.data));
    } catch (error) {
      console.error(error);
    }
  };
};

// Belongs to Company API

export function confirmGetJobsCreateByCompany(jobs) {
  return {
    type: GET_JOBS_CREATE_BY_COMPANY,
    payload: jobs,
  };
}

export const getJobsCreateByCompanyAction = (id, token, page) => {
  return async (dispatch) => {
    try {
      const result = await getJobsCreateByCompany(id, token, page);
      dispatch(confirmGetJobsCreateByCompany(result.data));
    } catch (error) {
      console.error(error);
    }
  };
};

export const setSearchInfo = (data) => {
  return async (dispatch) => {
    dispatch({
      type: SEARCH_JOBS,
      payload: data,
    });
  };
};
