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
          "File qu?? l???n ho???c kh??ng h???p l???!!",
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
          errorObj.firstName = "Vui l??ng nh???p tr?????ng n??y!!";
          error = true;
        } else {
          if (firstName.length > 30) {
            errorObj.firstName = "H??? ph???i nh??? h??n 30 k?? t???";
            error = true;
          }
        }

        if (lastName === "") {
          errorObj.lastName = "Vui l??ng nh???p tr?????ng n??y!!";
          error = true;
        } else {
          if (lastName.length > 30) {
            errorObj.lastName = "T??n ph???i nh??? h??n 30 k?? t???";
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
          errorObj.fullCompanyName = "Vui l??ng nh???p tr?????ng n??y!!";
          error = true;
        } else {
          if (fullCompanyName.length < 6 || fullCompanyName.length > 30) {
            errorObj.fullCompanyName =
              "T??n ?????y ????? ph???i n???m trong kho???ng 6 ?????n 30 k?? t???!!";
            error = true;
          }
        }

        if (shortCompanyName === "") {
          errorObj.shortCompanyName = "Vui l??ng nh???p tr?????ng n??y!!";
          error = true;
        }

        if (representative === "") {
          errorObj.representative = "Vui l??ng nh???p tr?????ng n??y!!";
          error = true;
        }

        if (imgPaperUrl === "") {
          errorObj.imgPaperUrl = "File kh??ng h???p l???!!";
          error = true;
        }

        if (!startDate) {
          errorObj.startDate = "?????nh d???ng ng??y kh??ng h???p l???!!";
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
    //   errorObj.username = 'Vui l??ng nh???p tr?????ng n??y!!';
    //   error = true;
    // } else {
    //   if (username.length > 30 || username.length < 6) {
    //     errorObj.username = 'userName ph???i n???m trong kho???ng 6 ?????n 30 k?? t???!!';
    //     error = true;
    //   }
    // }

    if (email === '') {
      errorObj.email = 'Vui l??ng nh???p tr?????ng n??y!!';
      error = true;
    }
    if (password === '') {
      errorObj.password = 'Vui l??ng nh???p tr?????ng n??y!!';
      error = true;
    } else {
      if (password.length < 6) {
        errorObj.password = 'M???t kh???u ph???i c?? ??t nh???t 6 k?? t???!!';
        error = true;
      } else {
        if (password !== confirmPassword) {
          errorObj.confirmPassword = 'M???t kh???u kh??ng kh???p!!';
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
            <h5 className="modal-title">X??c th???c OTP</h5>
            <button onClick={() => {
              dispatch({
                type: "hideModal"
              })
            }}
              type="button"
              className="close"
            >
              <span>??</span>
            </button>
          </div>
          <div className="modal-body">
            <div className='form-group m-auto d-flex' style={{ width: 'fit-content', flexDirection: 'column' }}>
              <p className="register__label">Nh???p OTP ???????c g???i t???i email c???a b???n</p>
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
            >????ng</button>
            <button onClick={() => {
              dispatch(confirmOTP(infoModal, otp, props.history));
            }}
              type="button"
              className="btn btn-primary"
            >X??c nh???n</button>
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
                      <h4 className='form-title m-t0'>????ng k?? t??i kho???n</h4>
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
                            Ng?????i ???ng tuy???n
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
                            Nh?? tuy???n d???ng
                          </a>
                        </li>
                      </ul>
                      {switchForm === true ? (
                        <div>
                          <p>????ng k?? t??i kho???n cho ng?????i ???ng tuy???n </p>
                          <div className='d-flex'>
                            <div className='form-group mr-1 w-50'>
                              <label>H???</label>
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
                              <label>T??n</label>
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
                              title='Email kh??ng h???p l???'
                            />
                            <div className='text-danger'>
                              {errors.email && <div>{errors.email}</div>}
                            </div>
                          </div>

                          <div className='form-group'>
                            <label>M???t kh???u</label>
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
                            <label>Nh???p l???i m???t kh???u</label>
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
                              ????ng k?? t??i kho???n
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
                                Ghi nh??? ????ng nh???p
                              </label>
                            </span>
                            {/* <Link data-toggle="tab" to="#forgot-password" className="forget-pass m-l5"><i className="fa fa-unlock-alt"></i> Forgot Password</Link> */}
                          </div>
                        </div>
                      ) : (
                        <div>
                          <p>????ng k?? t??i kho???n cho nh?? tuy???n d???ng </p>
                          <div className='form-group'>
                            <label>T??n ?????y ?????</label>
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
                            <label>T??n vi???t t???t</label>
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
                            <label>Ng??y th??nh l???p</label>
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
                            <label>T??n ng?????i ?????i di???n</label>
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
                              title='Email kh??ng h???p l???'
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
                            <label>M???t kh???u</label>
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
                            <label>Nh???p l???i m???t kh???u</label>
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
                            <label className="">Ch???ng nh???n, ????ng k?? c???a doanh nghi???p kinh doanh (jpg, png, ...)</label>
                            <div id="" className="job-bx bg-white m-b30">
                              <form className="attach-resume">
                                <div className="row">
                                  <div className="col-lg-12 col-md-12">
                                    <div className="form-group">
                                      <div className="custom-file">
                                        {<img src="" id="imgPaperUrl" alt=" T???i l??n k??ch c??? 3 MB" />}
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
                                          placeholder="T???i l??n k??ch c??? 3 MB"
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
                                      Xem ch???ng nh???n
                                    </Button>
                                    <Modal title="Ch???ng nh???n" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                                      <img src={`${BASE_URL}/${imgPaperUrl}`} alt="Ch???ng nh???n" />
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
                              ????ng k?? t??i kho???n
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
                                Ghi nh??? ????ng nh???p
                              </label>
                            </span>
                            {/* <Link data-toggle="tab" to="#forgot-password" className="forget-pass m-l5"><i className="fa fa-unlock-alt"></i> Forgot Password</Link> */}
                          </div>
                        </div>
                      )}
                    </form>
                    {/* <div className='dz-social clearfix'>
                      <h5 className='form-title m-t5 pull-left'>
                        ????ng nh???p v???i:
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
                        ????ng nh???p
                      </Link>
                    </div>
                  </div>
                </div>
                <div className='bottom-footer clearfix m-t10 m-b20 row text-center'>
                  <div className='col-lg-12 text-center'>
                    <span>
                      {" "}
                      ?? Copyright by{" "}
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
