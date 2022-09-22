import {
  GET_ALL_JOBS,
  GET_DETAIL_JOB_BY_ID,
  SEARCH_JOBS,
} from "../actions/Job/JobTypes";

const initialState = {
  jobs: [],
  maxPages: 1,
  currentPage: 1,
  currentJob: [],
  search: null,
};

export const JobReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_JOBS:
      state.jobs = action.payload.docs;
      state.maxPages = action.payload.totalPages;
      state.currentPage = action.payload.page;
      state.totalDocs = action.payload.totalDocs;
      return { ...state };
    case GET_DETAIL_JOB_BY_ID:
      state.currentJob = action.payload;
      return { ...state };
    case SEARCH_JOBS:
      state.search = {...state.search,...action.payload};
      return { ...state };

    default:
      return { ...state };
  }
};
