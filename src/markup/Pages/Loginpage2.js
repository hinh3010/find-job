import React, { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import jwt_decode from 'jwt-decode'
import { Link } from "react-router-dom";
import {
  loadingToggleAction,
  loginAction,
  loginWithGoogle,
} from "../../store/actions/AuthActions";
import "../../css/custom.css";

// image
//import logo from "../../images/logo-full-white.png";
import loginbg from "./../../images/bg6.jpg";
import logo2 from "./../../images/logo/tsc__logo.png";



const clientId = '1056969454407-1f0vmn1ds67obcn486eklhd9li0cm5pq.apps.googleusercontent.com';


function Login(props) {
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const regaxEmail =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  function onLogin(e) {
    e.preventDefault();
    if (email === "" && password === "") {
      setErrors({
        ...errors,
        email: "Vui lòng nhập email !",
        password: "Vui lòng nhập mật khẩu !",
      });
    }
    if (email === "") {
      setErrors({ ...errors, email: "Vui lòng nhập email !" });
    }
    if (regaxEmail.test(email) === false && email !== "") {
      setErrors({ ...errors, email: "Vui lòng nhập đúng định dạng email !" });
    }
    if (password === "") {
      setErrors({ ...errors, password: "Vui lòng nhập mật khẩu !" });
    }
    if (email !== "" && password !== "" && regaxEmail.test(email) === true) {
      dispatch(loadingToggleAction(true));
      dispatch(loginAction(email, password, props.history));
    }
  }



  const handleResponse = (response) => {
    const { email, email_verified, name, picture, given_name, family_name } = jwt_decode(response.credential);
    const objectData = {
      email,
      email_verified,
      name,
      picture,
      given_name,
      family_name
    }
    dispatch(loadingToggleAction(true));
    dispatch(loginWithGoogle(objectData, props.history))
  }

  useEffect(() => {
    const google = window.google;
    google.accounts.id.initialize({
      client_id: clientId,
      callback: handleResponse
    });

    google.accounts.id.renderButton(
      document.getElementById("signInDiv"),
      {
        theme: "outline",
        size: "medium",
        type: "icon",
        shape: "rectangular",
        logo_alignment: "left",
      }
    );
  }, [])

  return (
    <div className='page-wraper'>
      <div
        className='page-content bg-white login-style2'
        style={{
          backgroundImage: "url(" + loginbg + ")",
          backgroundSize: "cover",
        }}>
        <div className='section-full'>
          <div className='container'>
            <div className='row'>
              <div className='col-lg-6 col-md-6 d-flex'>
                <div className='text-white max-w450 align-self-center'>
                  <div className='logo logo__icon'>
                    <Link to={"#"}>
                      <img src={logo2} alt='' />
                    </Link>
                  </div>
                  <span className='m-b10 logo__heading'>
                    TRUNG TÂM HỖ TRỢ ĐÀO TẠO VÀ CUNG ỨNG NHÂN LỰC, BỘ GD&ĐT
                  </span>
                  <div className='m-b30'>
                    <ul className='login__list--info'>
                      <li className='login__item--info'>
                        Địa chỉ: Số 12 - 14 Lê Thánh Tông – Q.Hoàn Kiếm – TP.Hà
                        Nội
                      </li>
                      <li className='login__item--info'>
                        Điện thoại (84-24) 38262018, Fax: (84-24) 38269466
                      </li>
                      <li className='login__item--info'>
                        E-mail: trungtamhotrodaotao@moet.edu.vn
                      </li>
                    </ul>
                  </div>
                  <div className="d-flex align-items-center">
                    <span className="logo__list--social-network-heading">Đăng nhập bằng:&nbsp;</span>
                    <div className='logo__list--social-network'>

                      <ul className='list-inline m-a0 logo__list--social-network-icon'>
                        <li>
                          <div id="signInDiv"></div>
                          {/* <div id="g_id_onload"
                            data-client_id={clientId}
                            data-auto_prompt="false"
                          >
                          </div>
                          <div className="g_id_signin"
                            data-type="icon"
                            data-size="medium"
                            data-theme="outline"
                            data-text="sign_in_with"
                            data-shape="rectangular"
                            data-logo_alignment="left"
                            >
                          </div> */}
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className='col-lg-6 col-md-6'>
                <div className='login-2 submit-resume p-a30 seth'>
                  <div className='nav'>
                    <form onSubmit={onLogin} className='col-12 p-a0 '>
                      {/* <p className="font-weight-600">Đăng nhập</p> */}
                      <h4>Đăng nhập</h4>
                      {props.errorMessage && (
                        <div className='bg-red-300 text-red-900 border border-red-900 p-1 my-2'>
                          {props.errorMessage}
                        </div>
                      )}
                      {props.successMessage && (
                        <div className='bg-green-300 text-green-900 border border-green-900 p-1 my-2'>
                          {props.successMessage}
                        </div>
                      )}
                      <div className='form-group '>
                        <label>E-Mail</label>
                        <div className='input-group'>
                          <input
                            type='email'
                            className='form-control'
                            placeholder='Type Your Email Address'
                            value={email}
                            onChange={(e) => {
                              if (e.target.value.trim() === "") {
                                setErrors({
                                  ...errors,
                                  email: "Vui lòng nhập email !",
                                });
                              } else if (
                                e.target.value.trim() !== "" &&
                                regaxEmail.test(e.target.value.trim()) === false
                              ) {
                                setErrors({
                                  ...errors,
                                  email: "Vui lòng nhập đúng định dạng email !",
                                });
                              } else {
                                setErrors({ ...errors, email: "" });
                              }
                              setEmail(e.target.value);
                            }}
                          />
                        </div>
                        <div className='text-danger fs-12'>{errors.email}</div>
                      </div>
                      <div className='form-group'>
                        <label>Mật khẩu</label>
                        <div className='input-group'>
                          <input
                            type='password'
                            className='form-control'
                            value={password}
                            placeholder='Type Your Password'
                            onChange={(e) => {
                              if (e.target.value.trim() === "") {
                                setErrors({
                                  ...errors,
                                  password: "Vui lòng nhập mật khẩu !",
                                });
                              } else {
                                setErrors({ ...errors, password: "" });
                              }
                              setPassword(e.target.value);
                            }}
                          />
                        </div>
                        <div className='text-danger fs-12'>
                          {errors.password}
                        </div>
                      </div>
                      <div className='text-center'>
                        <button className='site-button float-left'>
                          Đăng nhập
                        </button>
                        <Link
                          to='/register-2'
                          className='site-button-link forget-pass m-t15 float-right'>
                          <i className='fa fa-unlock-alt'></i>&nbsp;Đăng ký
                        </Link>
                      </div>
                    </form>
                    <Link to={'/forgot-password'} onClick={() => { }} className="site-button-link forget-pass m-t15 float-right">Quên mật khẩu</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <footer className='login-footer'>
          <div className='container'>
            <div className='row'>
              <div className='col-lg-12 text-center'>
                <span className='float-left'>
                  © Copyright by{" "}
                  <i className='fa fa-heart m-lr5 text-red heart'></i>
                  <Link to={"#"}>TSC</Link>{" "}
                </span>
                <span className='float-right'>All rights reserved.</span>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div >
  );
}

const mapStateToProps = (state) => {
  return {
    errorMessage: state.auth.errorMessage,
    successMessage: state.auth.successMessage,
    showLoading: state.auth.showLoading,
  };
};
export default connect(mapStateToProps)(Login);
