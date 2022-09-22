import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect, useDispatch, useSelector } from "react-redux";
import jwt_decode from 'jwt-decode'
import {
  confirmOTP,
  loadingToggleAction,
  loginWithGoogle,
  signupAction,
} from "../../store/actions/AuthActions";
import "../../css/custom.css";
import axios from "axios";
import { BASE_URL } from "../../config/BASE_URL";
import swal from "sweetalert";
import Loading from "../Element/Loading";
import { Button, Modal } from "antd";
var bnr = require("./../../images/background/bg6.jpg");

const clientId = '1056969454407-1f0vmn1ds67obcn486eklhd9li0cm5pq.apps.googleusercontent.com';


function Register2(props) {
  // const [email, setEmail] = useState('');
  // let errorsObj = { email: '', password: '' };
  // const [errors, setErrors] = useState(errorsObj);
  // const [password, setPassword] = useState('');
  // const [switchForm, setSwitchForm] = useState(true);
  const [switchForm, setSwitchForm] = useState(true);
  const dispatch = useDispatch();

  const infoModal = useSelector(state => state.auth.modal);

  let errorsObj = {
    firstName: "",
    lastName: "",
    // username: "",
    email: "",
    password: "",
    shortCompanyName: "",
    fullCompanyName: "",
    representative: "",
    imgPaperUrl: "",
    confirmPassword: "",
    startDate: ""
  };

  const [otp, setOtp] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  // const [username, setUsername] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [shortCompanyName, setShortCompanyName] = useState("");
  const [startDate, setStartDate] = useState(undefined);
  const [fullCompanyName, setFullCompanyName] = useState("");
  const [representative, setRepresentative] = useState("");
  const [imgPaperUrl, setImgPaperUrl] = useState("");
  const [errors, setErrors] = useState(errorsObj);
  const [errorFile, setErrorFile] = useState(false);
  const [type, setType] = useState("");

  const setImgUrl = async (value) => {
    if (value.files && value.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        document.getElementById('imgPaperUrl').src = e.target.result;
      }

      if (value.files[0].size > 3145728) {
        setErrorFile(true);
      } else {
        setErrorFile(false);
      }

      reader.readAsDataURL(value.files[0]);

      try {
        const formData = new FormData();
        formData.append("files", value.files[0])
        const path = await axios.post(`${BASE_URL}/api/cms/attachment/images`, formData);

        setImgPaperUrl(path.data[0].path);
      } catch (err) {
        setImgPaperUrl("");
        swal(
          "ERROR",
          "File quá lớn hoặc không hợp lệ!!",
          "error",
        );
      }
    }
  }
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onSignUp = (e) => {
    e.preventDefault();
    let resultObj = {};
    let error = false;
    const errorObj = { ...errorsObj };



    switch (type) {
      case "APPLICANT": {
        //VALIDATE APPLICANT
        if (firstName === "") {
          errorObj.firstName = "Vui lòng nhập trường này!!";
          error = true;
        } else {
          if (firstName.length > 30) {
            errorObj.firstName = "Họ phải nhỏ hơn 30 ký tự";
            error = true;
          }
        }

        if (lastName === "") {
          errorObj.lastName = "Vui lòng nhập trường này!!";
          error = true;
        } else {
          if (lastName.length > 30) {
            errorObj.lastName = "Tên phải nhỏ hơn 30 ký tự";
            error = true;
          }
        }
        resultObj = {
          firstName,
          lastName,
          // username,
          email,
          password,
          accountType: type,
        };
        break;
      }
      case "COMPANY": {
        //VALIDATE COMPANY
        if (fullCompanyName === "") {
          errorObj.fullCompanyName = "Vui lòng nhập trường này!!";
          error = true;
        } else {
          if (fullCompanyName.length < 6 || fullCompanyName.length > 30) {
            errorObj.fullCompanyName =
              "Tên đầy đủ phải nằm trong khoảng 6 đến 30 ký tự!!";
            error = true;
          }
        }

        if (shortCompanyName === "") {
          errorObj.shortCompanyName = "Vui lòng nhập trường này!!";
          error = true;
        }

        if (representative === "") {
          errorObj.representative = "Vui lòng nhập trường này!!";
          error = true;
        }

        if (imgPaperUrl === "") {
          errorObj.imgPaperUrl = "File không hợp lệ!!";
          error = true;
        }

        if (!startDate) {
          errorObj.startDate = "Định dạng ngày không hợp lệ!!";
          error = true;
        }

        resultObj = {
          // username,
          email,
          password,
          shortCompanyName,
          fullCompanyName,
          startDate,
          representative,
          imgPaperUrl,
          accountType: type,
        }
        break;
      }
      default:
        return;
    }

    //VALIDATE
    // if (username === '') {
    //   errorObj.username = 'Vui lòng nhập trường này!!';
    //   error = true;
    // } else {
    //   if (username.length > 30 || username.length < 6) {
    //     errorObj.username = 'userName phải nằm trong khoảng 6 đến 30 ký tự!!';
    //     error = true;
    //   }
    // }

    if (email === '') {
      errorObj.email = 'Vui lòng nhập trường này!!';
      error = true;
    }
    if (password === '') {
      errorObj.password = 'Vui lòng nhập trường này!!';
      error = true;
    } else {
      if (password.length < 6) {
        errorObj.password = 'Mật khẩu phải có ít nhất 6 ký tự!!';
        error = true;
      } else {
        if (password !== confirmPassword) {
          errorObj.confirmPassword = 'Mật khẩu không khớp!!';
          error = true;
        }
      }
    }

    setErrors(errorObj);
    if (error || errorFile) return;



    dispatch(loadingToggleAction(true));
    dispatch(signupAction(resultObj, props.history));
  }

  const onHandleSwitchForm = () => {
    setSwitchForm(!switchForm);
    setErrors(errorsObj);
  };

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

    dispatch(loginWithGoogle(objectData, props.history));
  }

  useEffect(() => {
    dispatch({
      type: 'hideModal'
    })
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
      <div className={`register__modal ${infoModal.status}`}>
        <div className="register__overlay"></div>
        <div className="modal-content register__content">
          <div className="modal-header">
            <h5 className="modal-title">Xác thực OTP</h5>
            <button onClick={() => {
              dispatch({
                type: "hideModal"
              })
            }}
              type="button"
              className="close"
            >
              <span>×</span>
            </button>
          </div>
          <div className="modal-body">
            <div className='form-group m-auto d-flex' style={{ width: 'fit-content', flexDirection: 'column' }}>
              <p className="register__label">Nhập OTP được gửi tới email của bạn</p>
              <div className="d-flex">
                <input
                  value={otp}
                  onChange={(e) => {
                    setOtp(e.target.value);
                  }}
                  className='form-control'
                />
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button
              onClick={() => {
                dispatch({
                  type: "hideModal"
                })
              }}
              type="button"
              className="btn btn-secondary"
            >Đóng</button>
            <button onClick={() => {
              dispatch(confirmOTP(infoModal, otp, props.history));
            }}
              type="button"
              className="btn btn-primary"
            >Xác nhận</button>
          </div>
        </div>
      </div>


      <div className='browse-job login-style3'>
        <div
          className='bg-img-fix register__background'
          style={{ height: "100vh" }}>
          <div className='row'>
            <div
              className='col-xl-4 col-lg-5 col-md-6 col-sm-12 bg-white z-index2 relative p-a0 register__justify login-style3 skew-section'
              style={{ height: "90vh" }}>
              <div className='login-form style-2 register__form--resize'>
                <div className='logo-header text-center p-tb30'>
                  <Link to={"./"}>
                    <img
                      src={require("../../images/logo/tsc__logo.png")}
                      alt=''
                    />
                  </Link>
                </div>
                <div className='clearfix'></div>
                <div className='tab-content nav p-b30 tab'>
                  <div id='login' className='tab-pane active '>
                    <form className=' dez-form p-b30 pr-2' onSubmit={onSignUp}>
                      <h4 className='form-title m-t0'>Đăng ký tài khoản</h4>
                      <div className='dez-separator-outer m-b5'>
                        <div className='dez-separator bg-primary style-liner'></div>
                      </div>

                      <ul className='convert__form' id='myTab' role='tablist'>
                        <li className='convert__form--item'>
                          <a
                            className={
                              switchForm === true
                                ? "active__form--register"
                                : ""
                            }
                            onClick={onHandleSwitchForm}>
                            Người ứng tuyển
                          </a>
                        </li>
                        <li className='convert__form--item'>
                          <a
                            className={
                              switchForm === false
                                ? "active__form--register"
                                : ""
                            }
                            onClick={onHandleSwitchForm}>
                            Nhà tuyển dụng
                          </a>
                        </li>
                      </ul>
                      {switchForm === true ? (
                        <div>
                          <p>Đăng ký tài khoản cho người ứng tuyển </p>
                          <div className='d-flex'>
                            <div className='form-group mr-1 w-50'>
                              <label>Họ</label>
                              <input
                                value={firstName}
                                onChange={(e) => {
                                  setFirstName(e.target.value);
                                }}
                                className='form-control'
                                placeholder=''
                              />
                              <div className='text-danger'>
                                {errors.firstName && <div>{errors.firstName}</div>}
                              </div>
                            </div>

                            <div className='form-group ml-1 w-50'>
                              <label>Tên</label>
                              <input
                                value={lastName}
                                onChange={(e) => {
                                  setLastName(e.target.value);
                                }}
                                className='form-control'
                                placeholder=''
                              />
                              <div className='text-danger'>
                                {errors.lastName && <div>{errors.lastName}</div>}
                              </div>
                            </div>
                          </div>
                          {/* <div className='form-group'>
                            <label>User name</label>
                            <input
                              value={username}
                              onChange={(e) => {
                                setUsername(e.target.value);
                              }}
                              className='form-control'
                              placeholder=''
                            />
                            <div className='text-danger'>
                              {errors.username && <div>{errors.username}</div>}
                            </div>
                          </div> */}

                          <div className='form-group'>
                            <label>Email</label>
                            <input
                              value={email}
                              onChange={(e) => {
                                setEmail(e.target.value)
                              }}
                              className='form-control'
                              placeholder=''
                              type='email'
                              title='Email không hợp lệ'
                            />
                            <div className='text-danger'>
                              {errors.email && <div>{errors.email}</div>}
                            </div>
                          </div>

                          <div className='form-group'>
                            <label>Mật khẩu</label>
                            <input
                              value={password}
                              onChange={(e) => {
                                setPassword(e.target.value)
                              }}
                              type='password'
                              className='form-control'
                            />
                            <div className='text-danger'>
                              {errors.password && <div>{errors.password}</div>}
                            </div>
                          </div>

                          <div className='form-group'>
                            <label>Nhập lại mật khẩu</label>
                            <input
                              value={confirmPassword}
                              onChange={(e) => {
                                setConfirmPassword(e.target.value);
                              }
                              }
                              type='password'
                              className='form-control'
                            />
                            <div className='text-danger'>
                              {errors.confirmPassword && (
                                <div>{errors.confirmPassword}</div>
                              )}
                            </div>
                          </div>

                          <div className='form-group text-left'>
                            <button
                              onClick={() => {
                                setType("APPLICANT")
                                setOtp('');
                              }}
                              type='submit'
                              className='site-button dz-xs-flex m-r5'>
                              Đăng ký tài khoản
                            </button>
                            &nbsp;
                            <span className='custom-control custom-checkbox'>
                              <input
                                type='checkbox'
                                className='custom-control-input'
                                id='check1'
                                name='example1'
                              />
                              <label
                                className='custom-control-label'
                                htmlFor='check1'>
                                Ghi nhớ đăng nhập
                              </label>
                            </span>
                            {/* <Link data-toggle="tab" to="#forgot-password" className="forget-pass m-l5"><i className="fa fa-unlock-alt"></i> Forgot Password</Link> */}
                          </div>
                        </div>
                      ) : (
                        <div>
                          <p>Đăng ký tài khoản cho nhà tuyển dụng </p>
                          <div className='form-group'>
                            <label>Tên đầy đủ</label>
                            <input
                              value={fullCompanyName}
                              onChange={(e) => {
                                setFullCompanyName(e.target.value);
                              }
                              }
                              className='form-control'
                              placeholder=''
                            />
                            <div className='text-danger'>
                              {errors.fullCompanyName && (
                                <div>{errors.fullCompanyName}</div>
                              )}
                            </div>
                          </div>

                          <div className='form-group'>
                            <label>Tên viết tắt</label>
                            <input
                              value={shortCompanyName}
                              onChange={(e) => {
                                setShortCompanyName(e.target.value);
                              }
                              }
                              className='form-control'
                              placeholder=''
                            />
                            <div className='text-danger'>
                              {errors.shortCompanyName && (
                                <div>{errors.shortCompanyName}</div>
                              )}
                            </div>
                          </div>

                          <div className='form-group'>
                            <label>Ngày thành lập</label>
                            <input
                              value={startDate}
                              onChange={(e) => {
                                if (e.target.value.length >= 11) {
                                  setStartDate(0);
                                  return;
                                } else {
                                  setStartDate(e.target.value)
                                }
                              }}
                              className='form-control'
                              placeholder=''
                              type='date'
                            />
                            <div className='text-danger'>
                              {errors.startDate && (
                                <div>{errors.startDate}</div>
                              )}
                            </div>
                          </div>

                          <div className='form-group'>
                            <label>Tên người đại diện</label>
                            <input
                              value={representative}
                              onChange={(e) =>
                                setRepresentative(e.target.value)
                              }
                              className='form-control'
                              placeholder=''
                            />
                            <div className='text-danger'>
                              {errors.representative && (
                                <div>{errors.representative}</div>
                              )}
                            </div>
                          </div>

                          <div className='form-group'>
                            <label>Email</label>
                            <input
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              className='form-control'
                              placeholder=''
                              type='email'
                              title='Email không hợp lệ'
                            />
                            <div className='text-danger'>
                              {errors.email && <div>{errors.email}</div>}
                            </div>
                          </div>

                          {/* <div className='form-group'>
                            <label>User name</label>
                            <input
                              value={username}
                              onChange={(e) => setUsername(e.target.value)}
                              className='form-control'
                              placeholder=''
                            />
                            <div className='text-danger'>
                              {errors.username && <div>{errors.username}</div>}
                            </div>
                          </div> */}

                          <div className='form-group'>
                            <label>Mật khẩu</label>
                            <input
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                              type='password'
                              className='form-control'
                            />
                            <div className='text-danger'>
                              {errors.password && <div>{errors.password}</div>}
                            </div>
                          </div>

                          <div className='form-group'>
                            <label>Nhập lại mật khẩu</label>
                            <input
                              value={confirmPassword}
                              onChange={(e) =>
                                setConfirmPassword(e.target.value)
                              }
                              type='password'
                              className='form-control'
                            />
                            <div className='text-danger'>
                              {errors.confirmPassword && (
                                <div>{errors.confirmPassword}</div>
                              )}
                            </div>
                          </div>

                          <div className="form-group">
                            <label className="">Chứng nhận, đăng ký của doanh nghiệp kinh doanh (jpg, png, ...)</label>
                            <div id="" className="job-bx bg-white m-b30">
                              <form className="attach-resume">
                                <div className="row">
                                  <div className="col-lg-12 col-md-12">
                                    <div className="form-group">
                                      <div className="custom-file">
                                        {<img src="" id="imgPaperUrl" alt=" Tải lên kích cỡ 3 MB" />}
                                        <input
                                          type="file"
                                          value=""
                                          accept="image/png, image/jpeg"
                                          onChange={(e) => {
                                            setImgUrl(e.target);
                                          }
                                          }
                                          onClick={(event) => {
                                            event.target.value = null
                                          }}
                                          className="site-button form-control"
                                          id="customFile"
                                          placeholder="Tải lên kích cỡ 3 MB"
                                        />
                                      </div>
                                      <div className='text-danger'>
                                        {errors.imgPaperUrl && (
                                          <div>{errors.imgPaperUrl}</div>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                {imgPaperUrl ?
                                  <>
                                    <Button type="primary" onClick={showModal}>
                                      Xem chứng nhận
                                    </Button>
                                    <Modal title="Chứng nhận" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                                      <img src={`${BASE_URL}/${imgPaperUrl}`} alt="Chứng nhận" />
                                    </Modal>
                                  </>
                                  :
                                  ""
                                }
                              </form>
                            </div>
                          </div>
                          <div className='form-group text-left'>
                            <button
                              type='submit'
                              onClick={() => {
                                setType("COMPANY");
                                setOtp('');
                              }}
                              className='site-button dz-xs-flex m-r5'>
                              Đăng ký tài khoản
                            </button>
                            &nbsp;
                            <span className='custom-control custom-checkbox'>
                              <input
                                type='checkbox'
                                className='custom-control-input'
                                id='check1'
                                name='example1'
                              />
                              <label
                                className='custom-control-label'
                                htmlFor='check1'>
                                Ghi nhớ đăng nhập
                              </label>
                            </span>
                            {/* <Link data-toggle="tab" to="#forgot-password" className="forget-pass m-l5"><i className="fa fa-unlock-alt"></i> Forgot Password</Link> */}
                          </div>
                        </div>
                      )}
                    </form>
                    {/* <div className='dz-social clearfix'>
                      <h5 className='form-title m-t5 pull-left'>
                        Đăng nhập với:
                      </h5>
                      <ul className='dez-social-icon dez-border pull-right dez-social-icon-lg text-white mr-2'>
                        <li>
                          <div id="signInDiv"></div>
                        </li>
                      </ul>
                    </div> */}

                    <div className='text-center bottom'>
                      <Link
                        to={"/login"}
                        className='site-button button-md btn-block text-white'>
                        Đăng nhập
                      </Link>
                    </div>
                  </div>
                </div>
                <div className='bottom-footer clearfix m-t10 m-b20 row text-center'>
                  <div className='col-lg-12 text-center'>
                    <span>
                      {" "}
                      © Copyright by{" "}
                      <i className='fa fa-heart m-lr5 text-red heart'></i>
                      <Link to={""}>TSC</Link> All rights reserved.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    errorMessage: state.auth.errorMessage,
    successMessage: state.auth.successMessage,
    showLoading: state.auth.showLoading,
  };
};
export default connect(mapStateToProps)(Register2);
