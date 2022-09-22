import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import Header from "./../Layout/Header";
import Footer from "./../Layout/Footer";
import { useSelector } from "react-redux";
import { BASE_URL } from "../../config/BASE_URL";
import swal from "sweetalert";
import { changePasswordService } from "../../services/AuthService";
import { Modal } from "antd";

function Changepasswordpage() {
  const dispatch = useDispatch();
  const { auth } = useSelector((state) => state.auth);
  const user = auth.user;
  const history = useHistory();
  let errorsObj = {
    currentPassword: "",
    password: "",
    confirmPassword: "",
  };

  const [errors, setErrors] = useState(errorsObj);
  const [currentPassword, setCurrentPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    let error = false;
    const errorObj = { ...errorsObj };

    if (!currentPassword.length) {
      errorObj.currentPassword = "Vui lòng nhập trường này!";
      error = true;
    } else {
      if (currentPassword.length < 6) {
        errorObj.currentPassword = "Mật khẩu phải lớn hơn 6 ký tự!!";
        error = true;
      }
    }

    if (!password.length) {
      errorObj.password = "Vui lòng nhập trường này!";
      error = true;
    } else if (password.length < 6) {
      errorObj.password = "Mật khẩu phải lớn hơn 6 ký tự!!";
      error = true;
    } else if (password !== confirmPassword) {
      errorObj.confirmPassword = "Mật khẩu không khớp!!";
      error = true;
    } else if (password === currentPassword) {
      errorObj.password = "Mật khẩu mới phải khác mật khẩu hiện tại!!";
      error = true;
    }

    setErrors(errorObj);
    if (error) return;

    const requestData = {
      oldPassword: currentPassword,
      newPassword: password,
    };

    try {
      const result = await changePasswordService(
        auth.accessToken.token,
        requestData,
        user.id
      );
      swal("Thành Công!", "Đổi mật khẩu thành công!", "success");
    } catch (error) {
      swal(
        "ERROR!!",
        "Đổi mật khẩu không thành công, vui lòng kiểm tra lại thông tin!",
        "error"
      );
    }
  };

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

  return (
    <>
      <Header />
      <div className="page-content bg-white">
        <div className="content-block">
          <div className="section-full bg-white browse-job p-t50 p-b20">
            <div className="container">
              <div className="row">
                <div className="col-xl-3 col-lg-4 m-b30">
                  <div className="sticky-top">
                    <div className="candidate-info">
                      <div className="candidate-detail text-center">
                        <div className="canditate-des">
                          <span
                            style={{ cursor: "pointer" }}
                            onClick={showModal}
                          >
                            {user?.avatarUrl?.indexOf("https://") === -1 ? (
                              <img
                                alt=""
                                src={`${BASE_URL}/${user?.avatarUrl}`}
                              />
                            ) : (
                              <img alt="" src={user?.avatarUrl} />
                            )}
                          </span>
                          <Modal
                            title="Avatar"
                            visible={isModalVisible}
                            onOk={handleOk}
                            onCancel={handleCancel}
                          >
                            {user?.avatarUrl?.indexOf("https://") === -1 ? (
                              <img
                                style={{ objectFit: "cover" }}
                                className="w-100 h-100"
                                alt=""
                                src={`${BASE_URL}/${user?.avatarUrl}`}
                              />
                            ) : (
                              <img
                                style={{ objectFit: "cover" }}
                                className="w-100 h-100"
                                alt=""
                                src={user?.avatarUrl}
                              />
                            )}
                          </Modal>
                        </div>
                        <div className="candidate-title">
                          <div className="">
                            <h4 className="m-b5">
                              {user.accountType === "COMPANY" && (
                                <Link to={"#"}>{user.fullCompanyName}</Link>
                              )}
                              <Link to={"#"}>{user.fullName}</Link>
                            </h4>
                            <p className="m-b0">
                              {user.accountType === "COMPANY" && (
                                <>
                                  <p style={{textAlign:'center'}}>
                                    Lĩnh vực: {'   '}
                                    {user.companyField}
                                  </p>
                                </>
                              )}
                              {user.accountType === "APPLICANT" && (
                                <>
                                  <p style={{textAlign:'center'}}>
                                    Vị trí: {'   '}
                                    {user.desiredCareer?.position}
                                  </p>
                                </>
                              )}
                            </p>
                          </div>
                        </div>
                      </div>
                      <ul>
                        <li>
                          {user.accountType === "APPLICANT" && (
                            <Link to={"/jobs-profile"}>
                              <i
                                className="fa fa-user-o"
                                aria-hidden="true"
                              ></i>
                              <span>Profile</span>
                            </Link>
                          )}
                          {user.accountType === "COMPANY" && (
                            <Link to={"/company-profile"}>
                              <i
                                className="fa fa-user-o"
                                aria-hidden="true"
                              ></i>
                              <span>Profile</span>
                            </Link>
                          )}
                        </li>
                        <li>
                          {user.accountType === "APPLICANT" && (
                            <Link to={"/jobs-my-resume"}>
                              <i
                                className="fa fa-file-text-o"
                                aria-hidden="true"
                              ></i>
                              <span>Lý lịch</span>
                            </Link>
                          )}
                        </li>
                        {/* <li><Link to={"/jobs-saved-jobs"}>
													<i className="fa fa-heart-o" ></i>
													<span>Công việc đã lưu</span></Link>
												</li> */}
                        <li>
                          {user.accountType === "APPLICANT" && (
                            <Link to={"/jobs-applied-job"}>
                              <i className="fa fa-briefcase"></i>
                              <span>Công việc đã ứng tuyển</span>
                            </Link>
                          )}
                        </li>
                        <li>
                          {user.accountType === "APPLICANT" && (
                            <Link to={"/jobs-alerts"}>
                              <i className="fa fa-bell-o"></i>
                              <span>Thông báo công việc</span>
                            </Link>
                          )}
                        </li>
                        <li>
                          {user.accountType === "APPLICANT" && (
                            <Link to={"/jobs-cv-manager"}>
                              <i className="fa fa-id-card-o"></i>
                              <span>Quản lý CV</span>
                            </Link>
                          )}
                        </li>
                        <li>
                          <Link to={"/jobs-change-password"} className="active">
                            <i className="fa fa-key"></i>
                            <span>Đổi mật khẩu</span>
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="col-xl-9 col-lg-8 m-b30">
                  <div className="job-bx job-profile">
                    <div className="job-bx-title clearfix">
                      <h5 className="font-weight-700 pull-left text-uppercase">
                        Đổi mật khẩu
                      </h5>
                      <Link
                        to={"/jobs-cv-manager"}
                        className="site-button right-arrow button-sm float-right"
                      >
                        Back
                      </Link>
                    </div>
                    <form onSubmit={handleSubmit}>
                      <div className="row">
                        <div className="col-lg-12">
                          <div className="form-group">
                            <label>Mật khẩu cũ</label>
                            <input
                              value={currentPassword}
                              onChange={(e) => {
                                setCurrentPassword(e.target.value);
                              }}
                              type="password"
                              className="form-control"
                            />
                            <div className="text-danger">
                              {errors.currentPassword && (
                                <div>{errors.currentPassword}</div>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="form-group">
                            <label>Mật khẩu mới </label>
                            <input
                              value={password}
                              onChange={(e) => {
                                setPassword(e.target.value);
                              }}
                              type="password"
                              className="form-control"
                            />
                            <div className="text-danger">
                              {errors.password && <div>{errors.password}</div>}
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="form-group">
                            <label>Xác nhận mật khẩu mới</label>
                            <input
                              value={confirmPassword}
                              onChange={(e) => {
                                setConfirmPassword(e.target.value);
                              }}
                              type="password"
                              className="form-control"
                            />
                            <div className="text-danger">
                              {errors.confirmPassword && (
                                <div>{errors.confirmPassword}</div>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-12 m-b10">
                          <button type="submit" className="site-button">
                            Cập nhật mật khẩu
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
export default Changepasswordpage;
