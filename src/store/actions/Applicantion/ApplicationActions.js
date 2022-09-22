import { GET_ALL_APPLICATION } from "./ApplicationType";
import { getAllApplications } from "../../../services/ApplicationsServices/ApplicationsServices";

export function confirmGetAllApplication(applications) {
  return {
    type: GET_ALL_APPLICATION,
    payload: applications,
  };
}

export const getAllApplication = (params = "", userId, page) => {
  return async (dispatch) => {
    try {
      const result = await getAllApplications(params, userId, page);
      dispatch(confirmGetAllApplication(result.data));
    } catch (error) {
      console.error(error);
    }
  };
};
