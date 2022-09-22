import { GET_JOBS_CREATE_BY_COMPANY } from "../actions/Job/JobTypes";

const initialState = {
  companyPostJob: [],
  page: 1,
  totalPages: 1,
};

export const CompanyReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_JOBS_CREATE_BY_COMPANY:
      state.companyPostJob = action.payload.docs;
      state.page = action.payload.page;
      state.totalPages = action.payload.totalPages;
      return { ...state };

    default:
      return { ...state };
  }
};
