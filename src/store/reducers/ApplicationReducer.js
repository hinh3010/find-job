import { GET_ALL_APPLICATION } from "../actions/Applicantion/ApplicationType";

const initialState = {
  applications: [],
  maxPages: 1,
  currentPage: 1,
};

export const ApplicationReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_APPLICATION:
      state.applications = action.payload.docs;
      state.maxPages = action.payload.totalPages;
      state.currentPage = action.payload.page;
      return { ...state };
    default:
      return { ...state };
  }
};
