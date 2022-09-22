import { GET_ALL_CV } from "../actions/CV/CvTypes";

const initialState = {
  cv: undefined,
  maxPages: 1,
  currentPage: 1,
};

export const CvReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_CV:
      state.cv = action.payload.docs;
      state.maxPages = action.payload.totalPages;
      state.currentPage = action.payload.page;
      return { ...state };
    default:
      return { ...state };
  }
};
