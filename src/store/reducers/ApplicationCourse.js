import {
  GET_ALL_COURSE_APPLICATION,
  GET_DETAIL_COURSE_APPLICANTS,
} from "../actions/CourseApplication/CourseApplicationType";

const initialState = {
  coursesApplications: [],
  maxPages: 1,
  currentPage: 1,
  courseApplicants: {
    applicants: [],
    totalDocs: 1,
    totalPages: 1,
  },
};

export const CourseApplicationReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_COURSE_APPLICATION:
      state.coursesApplications = action.payload.docs;
      state.maxPages = action.payload.totalPages;
      state.currentPage = action.payload.page;
      return { ...state };
    case GET_DETAIL_COURSE_APPLICANTS:
      state.courseApplicants.applicants = action.payload.docs;
      state.courseApplicants.totalPages = action.payload.totalPages;
      state.courseApplicants.totalDocs = action.payload.totalDocs;
      return { ...state };

    default:
      return { ...state };
  }
};
