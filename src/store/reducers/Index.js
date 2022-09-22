import todoReducers from "./Reducers";
import { combineReducers } from "redux";
import { CourseReducer } from "./CourseReducer";
import { JobReducer } from "./JobReducer";
import { LocationReducer } from "./LocationReducer";

const rootReducers = combineReducers({
  todoReducers,
  CourseReducer,
  JobReducer,
});

export default rootReducers;
