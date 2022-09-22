import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";
import { reducer as reduxFormReducer } from "redux-form";
import PostsReducer from "./reducers/PostsReducer";
import { AuthReducer } from "./reducers/AuthReducer";
import todoReducers from "./reducers/Reducers";
import { CourseReducer } from "./reducers/CourseReducer";
import { JobReducer } from "./reducers/JobReducer";
import { ApplicationReducer } from "./reducers/ApplicationReducer";
import { CourseApplicationReducer } from "./reducers/ApplicationCourse";
import { CompanyReducer } from "./reducers/CompanyReducer";

import { CvReducer } from "./reducers/CvReducer";

import { LocationReducer } from "./reducers/LocationReducer";
import { NotificationReducer } from "./reducers/NotificationReducer";
import { PartnerReducer } from "./reducers/PartnerReducer";
const middleware = applyMiddleware(thunk);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const reducers = combineReducers({
  posts: PostsReducer,
  auth: AuthReducer,
  todoReducers,
  CourseReducer,
  JobReducer,
  ApplicationReducer,
  CvReducer,
  CourseApplicationReducer,
  LocationReducer,
  CompanyReducer,
  NotificationReducer,
  PartnerReducer,
  form: reduxFormReducer,
});

//const store = createStore(rootReducers);

export const store = createStore(reducers, composeEnhancers(middleware));
