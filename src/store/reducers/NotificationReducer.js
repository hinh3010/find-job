import {
  GET_ALL_NOTIFICATION,
  GET_NOTIFICATION_UNREAD,
  FILTER_NOTIFICATION
} from "../actions/Notification/NotificationTypes";

const initialState = {
  allNotifications: [],
  allNotificationsUnread: [],
  filter: { type: "JOB", status: "UNREAD" },
  checkdelte: '',
};

export const NotificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_NOTIFICATION: {
      state.allNotifications = action.payload;
      state.checkdelte = action.payload[0]?.id;
      return { ...state };
    }
    case GET_NOTIFICATION_UNREAD: {
      // state.allNotificationsUnread = action.payload;
      // state.checkdelte = action.payload[0]?.id;
      return { ...state,  allNotificationsUnread : action.payload};
    }
    case FILTER_NOTIFICATION:
    state.filter = { ...state.filter, ...action.payload };
    return { ...state };
    default:
      return { ...state };
  }
};
