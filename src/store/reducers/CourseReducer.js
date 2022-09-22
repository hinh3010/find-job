import {
  GET_ALL_COURSE,
  GET_COURSE_BY_COST,
  GET_COURSE_BY_TYPE,
  GET_DETAIL_BY_ID,
  SEARCH_COURSES,
} from "../actions/Course/CourseType";

const initialState = {
  courses: [],
  currentCourse: [],
  maxPages: 1,
  currentPage: 1,
  search: {status: "APPROVED"},
  totalDocs: null,
};

export const CourseReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_COURSE:
      state.courses = action.payload.docs;
      state.maxPages = action.payload.totalPages;
      state.currentPage = action.payload.page;
      state.totalDocs = action.payload.totalDocs;
      return { ...state };
    case GET_DETAIL_BY_ID:
      state.currentCourse = action.payload;
      return { ...state };
    case GET_COURSE_BY_TYPE:
      state.courses = action.payload;
      state.maxPages = action.payload.totalPages;
      state.currentPage = action.payload.page;
    case GET_COURSE_BY_COST:
      state.courses = action.payload;
      state.maxPages = action.payload.totalPages;
      state.currentPage = action.payload.page;
    case SEARCH_COURSES:
      state.search = {...state.search,...action.payload};
      // state.maxPages = action.payload?.totalPages;
      return { ...state };
    default:
      return { ...state };
  }
};
