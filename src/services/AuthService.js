import axios from "axios";
import swal from "sweetalert";
import { loginConfirmedAction, logout } from "../store/actions/AuthActions";
import { LOGIN_URL } from "./constant";
import { BASE_URL } from "./constant";

export function signUp(result) {
  //axios call
  const postData = {
    ...result,
    // returnSecureToken: true,
  };
  return axios.post(`${BASE_URL}/register`, postData);
}

export function confirmOTPs(infoModal, otp) {
  const postData = {
    otp
  };
  return axios.post(`${BASE_URL}/verify-otp/${infoModal.email}`, postData);
}

export function resetPassword(email) {
  const postData = {
    email
  };
  return axios.post(`${BASE_URL}/request-reset-password`, postData);
}

export function createNewPassword(postData) {
  return axios.post(`${BASE_URL}/create-new-password`, postData);
}

export function login(email, password) {
  const postData = {
    email,
    password,
  };
  return axios.post(`${LOGIN_URL}`, postData);
}

export function loginWithGoogles(data) {
  const postData = data;
  return axios.post(`${BASE_URL}/google`, postData);
}

export function formatError(errorResponse) {
  switch (errorResponse.error.message) {
    case "EMAIL_EXISTS":
      //return 'Email already exists';
      swal("Oops", "Email already exists", "error");
      break;
    case "EMAIL_NOT_FOUND":
      //return 'Email not found';
      swal("Oops", "Email not found", "error", { button: "Try Again!" });
      break;
    case "INVALID_PASSWORD":
      //return 'Invalid Password';
      swal("Oops", "Invalid Password", "error", { button: "Try Again!" });
      break;
    case "USER_DISABLED":
      return "User Disabled";

    default:
      return "";
  }
}

export function saveTokenInLocalStorage(data) {
  // tokenDetails.expireDate = new Date(
  //     new Date().getTime() + tokenDetails.expiresIn * 1000,
  // );
  localStorage.setItem("userDetail", JSON.stringify(data));
}

export function runLogoutTimer(dispatch, timer, history) {
  setTimeout(() => {
    dispatch(logout(history));
  }, timer);
}

export function checkAutoLogin(dispatch, history) {
  const userDetail = JSON.parse(localStorage.getItem("userDetail"));
  if (!userDetail) {
    dispatch(logout(history));
    return;
  }
  else {
    dispatch(loginConfirmedAction(userDetail));
  }
}

export function changePasswordService(token, data, id) {
  return axios({
    url: `${BASE_URL}/change-password/${id}`,
    method: "POST",
    data,
    headers: {
      Authorization: "Bearer " + token,
    },
  });
}
