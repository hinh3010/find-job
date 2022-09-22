import React, { useState, useEffect, useId } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Header from "./../Layout/Header";
import Footer from "./../Layout/Footer";
import { BASE_URL } from "../../config/BASE_URL";
import { Modal } from "antd";
import moment from "moment";
import { Pagination } from "antd";
import {
  getNotificationUnread,
  setFilterNotification,
  updateNotificationdat,
  updateNotification,
} from "../../store/actions/Notification/NotificationAction";
function Jobsalert() {
  const dispatch = useDispatch();
  const { allNotifications, filter, allNotificationsUnread, checkdelte } =
    useSelector((state) => state.NotificationReducer);
  const userif = JSON.parse(localStorage.getItem("userDetail"));
  const userId = userif.user.id;
  const token = userif.accessToken.token;
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPages] = useState(1);
  const [company, setCompany] = useState(false);
  const [contacts, setContacts] = useState(allNotificationsUnread);
  const [dataModal, setDataModal] = useState();

  const handleDeleteClick = (contactId) => {
    const action = updateNotificationdat(contactId, token, userId);
    dispatch(action);
  };
  const handleChangeTime = (e) => {
    const action = setFilterNotification({
      ...filter,
      timeLimitInDay: e.target.value,
    });
    dispatch(action);
  };
  useEffect(() => {
    const action = getNotificationUnread(userId, token, filter);
    dispatch(action);
  }, [filter, checkdelte]);
  const { auth } = useSelector((state) => state.auth);
  const user = auth.user;

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
          <div className="section-full bg-white p-t50 p-b20">
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
                          <div
                            className="upload-link"
                            title="update"
                            data-toggle="tooltip"
                            data-placement="right"
                          >
                            <input type="file" className="update-flie" />
                            <i className="fa fa-camera"></i>
                          </div>
                        </div>
                        <div className="candidate-title">
                          <div className="">
                            <h4 className="m-b5">
                              <Link to={"#"}>{user.fullName}</Link>
                            </h4>
                            {/* <p className='m-b0'>
                              <Link to={"#"}>Web developer</Link>
                            </p> */}
                          </div>
                        </div>
                      </div>
                      <ul>
                        <li>
                          <Link to={"/jobs-profile"}>
                            <i className="fa fa-user-o" aria-hidden="true"></i>
                            <span>Profile</span>
                          </Link>
                        </li>
                        <li>
                          <Link to={"/jobs-my-resume"}>
                            <i
                              className="fa fa-file-text-o"
                              aria-hidden="true"
                            ></i>
                            <span>Lý lịch</span>
                          </Link>
                        </li>
                        {/* <li><Link to={"/jobs-saved-jobs"}>
													<i className="fa fa-heart-o" aria-hidden="true"></i>
													<span>Công việc đã lưu</span></Link></li> */}
                        <li>
                          <Link to={"/jobs-applied-job"}>
                            <i
                              className="fa fa-briefcase"
                              aria-hidden="true"
                            ></i>
                            <span>Công việc đã ứng tuyển</span>
                          </Link>
                        </li>
                        <li>
                          <Link to={"/jobs-alerts"} className="active">
                            <i className="fa fa-bell-o" aria-hidden="true"></i>
                            <span>Thông báo công việc</span>
                          </Link>
                        </li>
                        <li>
                          <Link to={"/jobs-cv-manager"}>
                            <i
                              className="fa fa-id-card-o"
                              aria-hidden="true"
                            ></i>
                            <span>Quản lý CV</span>
                          </Link>
                        </li>
                        <li>
                          <Link to={"/jobs-change-password"}>
                            <i className="fa fa-key" aria-hidden="true"></i>
                            <span>Đổi mật khẩu</span>
                          </Link>
                        </li>
                        <li>
                          <Link to={"#"}>
                            <i
                              className="fa fa-sign-out"
                              aria-hidden="true"
                            ></i>
                            <span>Đăng xuất</span>
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="col-xl-9 col-lg-8 m-b30">
                  <div className="job-bx table-job-bx browse-job clearfix">
                    <div className="job-bx-title clearfix">
                      <h5 className="font-weight-700 pull-left text-uppercase">
                        Thông báo công việc
                      </h5>
                      <div className="float-right">
                        <span className="select-title">Lọc theo thời gian</span>
                        <select
                          className="custom-btn"
                          onChange={handleChangeTime}
                        >
                          <option value="60">2 tháng trước</option>
                          <option value="30">1 tháng trước</option>
                          <option value="7">1 tuân trước</option>
                          <option value="3">3 ngày trước</option>
                        </select>
                      </div>
                    </div>
                    <table>
                      <thead>
                        <tr>
                          <th>Công việc</th>
                          <th>Nội dung</th>
                          <th>Thời gian</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        {allNotificationsUnread.map((contact, index) => {
                          let title = contact.template.templateFormat;
                          contact.template.params.forEach((value) => {
                            title = title.replace(
                              `{{${value}}}`,
                              contact.data[`${value}`]
                            );
                          });
                          return (
                            <tr key={index}>
                              <td className="job-name">
                                <Link to={"/job-detail"}>
                                  {contact.data.jobTitle}
                                </Link>
                              </td>
                              <td className="criterias">{title}</td>
                              <td className="date">
                                {moment(contact.createdAt).fromNow()}
                              </td>
                              <td className="job-links">
                                <Link
                                  to={`/job-detail/${contact.data.jobId}`}
                                  // onClick={() => {
                                  //   setCompany(true);
                                  //   setDataModal(contact);
                                  // }}
                                >
                                  <i className="fa fa-eye"></i>
                                </Link>
                                <Link
                                  to={"#"}
                                  onClick={() => handleDeleteClick(contact.id)}
                                >
                                  <i className="ti-trash"></i>
                                </Link>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                    <div className="pagination-bx float-right">
                      <ul className="pagination">
                        <Pagination
                          className="mx-auto"
                          current={page}
                          defaultCurrent={1}
                          onChange={(page) => {
                            setPage(page);
                          }}
                          total={totalPage * 10}
                        />
                      </ul>
                    </div>
                  </div>

                  <Modal
                    // show={company}
                    closable={false}
                    visible={company}
                    onHide={setCompany}
                    footer={null}
                  >
                    <div className="modal-header">
                      <div className="logo-img">
                        <img
                          alt=""
                          src={require("./../../images/logo/icon2.png")}
                        />
                      </div>
                      <h5 className="modal-title">
                        {dataModal?.data.jobTitle}
                      </h5>
                      <button
                        type="button"
                        className="close"
                        onClick={() => setCompany(false)}
                      >
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div className="modal-body">
                      <ul>
                        <li>
                          <strong>Job Title :</strong>
                          <p> {dataModal?.data.jobTitle} </p>
                        </li>
                        <li>
                          <strong>Experience :</strong>
                          <p>5 Year 3 Months</p>
                        </li>
                        <li>
                          <strong>Deseription :</strong>
                          <p>
                            Lorem Ipsum is simply dummy text of the printing and
                            typesetting industry has been the industry's
                            standard dummy text ever since.
                          </p>
                        </li>
                      </ul>
                    </div>
                    <div className="modal-footer">
                      <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={() => setCompany(false)}
                      >
                        Close
                      </button>
                    </div>
                    {/* </div>
                    </div> */}
                  </Modal>
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
export default Jobsalert;
