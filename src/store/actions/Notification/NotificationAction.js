import {
  getAllNotifications,
  readAlls,
  updateNotifications,
  getNotificationsUnRead,
} from "../../../services/NotificationServices/NotificationServices";
import {
  GET_ALL_NOTIFICATION,
  GET_NOTIFICATION_UNREAD,
  FILTER_NOTIFICATION,
} from "./NotificationTypes";

export function confirmGetAllNotification(data) {
  return {
    type: GET_ALL_NOTIFICATION,
    payload: data,
  };
}
export function confirmGetNotificationUnRead(data) {
  return {
    type: GET_NOTIFICATION_UNREAD,
    payload: data,
  };
}
export const getAllNotification = (userId, token) => {
  return async (dispatch) => {
    try {
      const result = await getAllNotifications(userId, token);
      dispatch(confirmGetAllNotification(result.data.docs));
    } catch (error) {
      console.error(error);
    }
  };
};

export const getNotificationUnread = (userId, token, params = {status: 'UNREAD'}) => {
  return async (dispatch) => {
    try {
      const result = await getNotificationsUnRead(userId, token, params);
      dispatch(confirmGetNotificationUnRead(result.data.docs));
    } catch (error) {
      console.error("datoc");
    }
  };
};
export const setFilterNotification = (filter) => {
  return async (dispatch) => {
    dispatch({
      type: FILTER_NOTIFICATION,
      payload: filter,
    });
  };
};
export const updateNotification = (id, token, userId) => {
  return async (dispatch) => {
    try {
      const result = await updateNotifications(id, token);
      dispatch(getAllNotification(userId, token));
      // dispatch(getNotificationUnread(userId, token))
    } catch (error) {
      console.log(error);
    }
  };
};
export const updateNotificationdat = (id, token, userId) => {
  return async (dispatch) => {
    try {
      const result = await updateNotifications(id, token);
      dispatch(getNotificationUnread(userId, token, ))
    } catch (error) {
      console.log(error);
    }
  };
};
export const readAll = (userId, token) => {
  return async (dispatch) => {
    try {
      const result = await readAlls(userId, token);
      dispatch(getAllNotification(userId, token));
    } catch (error) {
      console.log(error);
    }
  };
};
