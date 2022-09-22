import { message } from 'antd'
import swal from "sweetalert";
import {
  confirmOTPs,
  formatError,
  login,
  loginWithGoogles,
  runLogoutTimer,
  saveTokenInLocalStorage,
  signUp,
} from "../../services/AuthService";


export const SIGNUP_CONFIRMED_ACTION = "[signup action] confirmed signup";
export const SIGNUP_FAILED_ACTION = "[signup action] failed signup";
export const LOGIN_CONFIRMED_ACTION = "[login action] confirmed login";
export const LOGIN_FAILED_ACTION = "[login action] failed login";
export const LOADING_TOGGLE_ACTION = "[Loading action] toggle loading";
export const LOGOUT_ACTION = "[Logout action] logout action";
export const UPDATE_USER_ACTION = "[Update user action] update user action";

export function signupAction(data, history) {
  return async (dispatch) => {
    try {
      dispatch({
        type: "SHOW_LOADING"
      })
      const result = await signUp(data);
      dispatch({
        type: "displayModal",
        email: result.data.data.user.email,
        accountType: result.data.data.user.accountType,
      })
      dispatch({
        type: "HIDE_LOADING"
      })
    } catch (error) {
      swal(
        "Đăng ký không thành công",
        "Email đã tồn tại, vui lòng chọn email khác!!",
        "error",
      );
      dispatch({
        type: "HIDE_LOADING"
      })
    }

  };
}

export function confirmOTP(infoModal, otp, history) {
  return async (dispatch) => {
    try {
      const result = await confirmOTPs(infoModal, otp);
      if (infoModal.accountType === "APPLICANT") {
        saveTokenInLocalStorage(result.data.data);
        dispatch(loginConfirmedAction(result.data.data, history));
        history.push("/home");
        swal(
          "Success",
          "Đăng ký thành công!!",
          "success",
        );
      } else {
        history.push("/login");
        swal(
          "Success",
          "Thông tin của bạn đã được ghi nhận, nếu đăng ký với tư cách nhà tuyển dụng, vui lòng chờ xác nhận!!",
          "success",
        );
      }
    } catch (error) {
      message.error("OTP không chính xác!!");
      console.log(error);
    }
  }
}

export function loginWithGoogle(data, history) {
  return async (dispatch) => {
    try {
      dispatch({
        type: "SHOW_LOADING"
      })
      const result = await loginWithGoogles(data);
      saveTokenInLocalStorage(result.data.data);
      dispatch(loginConfirmedAction(result.data.data, history));
      dispatch({
        type: "HIDE_LOADING"
      })
      history.push("/home");
    } catch (error) {
      dispatch({
        type: "HIDE_LOADING"
      })
      swal("Oops", "Email của bạn không đúng hoặc không hoạt động, vui lòng thử lại!!", "error", {
        button: "Try Again!",
      });
      console.log(error);
    }
  }
}

export function logout(history) {
  localStorage.removeItem("userDetail");
  history.push("/login");
  return {
    type: LOGOUT_ACTION,
  };
}

// export function logout() {
//     localStorage.removeItem('userDetail');
//     return {
//         type: LOGOUT_ACTION,
//     };
// }

export function loginAction(email, password, history) {
  return (dispatch) => {
    login(email, password)
      .then((response) => {
        dispatch({
          type: "SHOW_LOADING"
        })
        saveTokenInLocalStorage(response.data.data);
        dispatch(loginConfirmedAction(response.data.data));
        history.push("/home");
        dispatch({
          type: "HIDE_LOADING"
        })
      })
      .catch((error) => {
        console.log(error);
        swal("Oops", "Đăng nhập thất bại vui lòng kiểm tra và nhập đúng thông tin", "error", {
          button: "Try Again!",
        });
        dispatch({
          type: "HIDE_LOADING"
        })
      });
  };
}

export function loginFailedAction(data) {
  return {
    type: LOGIN_FAILED_ACTION,
    payload: data,
  };
}

export function loginConfirmedAction(data) {
  return {
    type: LOGIN_CONFIRMED_ACTION,
    payload: data,
  };
}

export function confirmedSignupAction(payload) {
  return {
    type: SIGNUP_CONFIRMED_ACTION,
    payload,
  };
}

export function signupFailedAction(message) {
  return {
    type: SIGNUP_FAILED_ACTION,
    payload: message,
  };
}

export function loadingToggleAction(status) {
  return {
    type: LOADING_TOGGLE_ACTION,
    payload: status,
  };
}

export function updateUserAction(data) {
  return {
    type: UPDATE_USER_ACTION,
    payload: data,
  }
}
