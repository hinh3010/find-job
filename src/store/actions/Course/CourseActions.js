import {
  getAllCourses,
  getCoursesByCost,
  getCoursesByType,
  getDetailCourseById,
  getAllCoursesdat
} from "../../../services/CourseServices/CourseServices";
import { GET_ALL_COURSE, GET_DETAIL_BY_ID, SEARCH_COURSES } from "./CourseType";

export function confirmGetAllCourse(courses) {
  return {
    type: GET_ALL_COURSE,
    payload: courses,
  };
}
export function confirmGetDetailCourseByID(course) {
  return {
    type: GET_DETAIL_BY_ID,
    payload: course,
  };
}
export const getAllCoursesAction = (page = 1, params= {}) => {
  return async (dispatch) => {
    try {
      const result = await getAllCoursesdat(page, params);
      dispatch(confirmGetAllCourse(result.data));
    } catch (error) {
      console.error(error);
    }
  };
};
export const getCoursesByTypeAction = (page, type) => {
  return async (dispatch) => {
    try {
      const result = await getCoursesByType(page, type);
      console.log(result);
      dispatch(confirmGetAllCourse(result.data));
    } catch (error) {
      console.error(error);
    }
  };
};
export const getCoursesByCostAction = (page, cost) => {
  return async (dispatch) => {
    try {
      const result = await getCoursesByCost(page, cost);
      console.log(result);
      dispatch(confirmGetAllCourse(result.data));
    } catch (error) {
      console.error(error);
    }
  };
};
export const getDetailCoursesAction = (id) => {
  return async (dispatch) => {
    try {
      const result = await getDetailCourseById(id);
      dispatch(confirmGetDetailCourseByID(result.data));
    } catch (error) {
      console.error(error);
    }
  };
};
export const setSearchCourseInfo = (data) => {
  return async (dispatch) => {
    dispatch({
      type: SEARCH_COURSES,
      payload: data,
    });
  };
};
// export const setSearchCourse = ()=>{}
// export const getAllCourseInfosAction = (page = 1, params={}) => {
//   return async (dispatch) => {
//     try {
//       const result = await getAllCoursesdat(page, params);
//       dispatch(setSearchCourseInfo(result.data));
//     } catch (error) {
//       console.error(error);
//     }
//   };
// };
