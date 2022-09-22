import {
  getAllCoursesApplication,
  getDetailCourseApplicationByCourseId,
} from "../../../services/CourseApplicationServices/CourseApplicationServices";
import {
  GET_ALL_COURSE_APPLICATION,
  GET_DETAIL_COURSE_APPLICANTS,
} from "./CourseApplicationType";

export function confirmGetAllCourseApplication(courseApplications) {
  return {
    type: GET_ALL_COURSE_APPLICATION,
    payload: courseApplications,
  };
}

export const getAllCoursesApplicationAction = (
  params = "",
  userId = "",
  page = 1,
  courseId = null,
) => {
  return async (dispatch) => {
    try {
      let result;
      if (courseId) {
        result = await getAllCoursesApplication(params, userId, courseId);
      } else {
        result = await getAllCoursesApplication(params, userId, page);
      }
      dispatch(confirmGetAllCourseApplication(result.data));
    } catch (error) {
      console.error(error);
    }
  };
};

export function confirmGetDetailCourseApplicationByCourseIdAction(
  courseApplicants,
) {
  return {
    type: GET_DETAIL_COURSE_APPLICANTS,
    payload: courseApplicants,
  };
}
export const getDetailCourseApplicationByCourseIdAction = (
  courseId,
  token,
  page,
) => {
  return async (dispatch) => {
    try {
      const result = await getDetailCourseApplicationByCourseId(
        courseId,
        token,
        page,
      );
      dispatch(confirmGetDetailCourseApplicationByCourseIdAction(result.data));
    } catch (error) {
      console.error(error);
    }
  };
};

