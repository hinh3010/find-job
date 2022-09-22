import { getAllCV } from "../../../services/CvServices/CvServices";
import { GET_ALL_CV, CREATE_CV } from "./CvTypes";
import { createCV } from "../../../services/CvServices/CvServices";
export function confirmGetAllCv(cv) {
  return {
    type: GET_ALL_CV,
    payload: cv,
  };
}

export function create__CV(data) {
  return {
    type: CREATE_CV,
    payload: data,
  };
}

export const getAllCvAction = (status, createdById, page, params) => {
  return async (dispatch) => {
    try {
      const result = await getAllCV(status, createdById, page, params);
      dispatch(confirmGetAllCv(result.data));
    } catch (error) {
      console.error(error);
    }
  };
};

export const create_CV = (status, createdById, page, params) => {
  return async (dispatch) => {
    try {
      const result = await createCV(status, createdById, page, params);
      dispatch(create__CV(result.data));
    } catch (error) {
      console.error(error);
    }
  };
};
