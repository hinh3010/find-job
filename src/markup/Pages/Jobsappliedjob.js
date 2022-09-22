import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Footer from "./../Layout/Footer";
import { getAllApplication } from "../../store/actions/Applicantion/ApplicationActions";
import { useDispatch, useSelector } from "react-redux";
import Header from "../Layout/Header";

import moment from "moment";
import "moment/locale/vi"; // momment js
import { Modal, Pagination } from "antd";
import { BASE_URL } from "../../config/BASE_URL";
function Jobsappliedjob() {
  const { auth } = useSelector((state) => state.auth);
  const [page, setPage] = useState(1);

  const user = auth.user;
  const dispatch = useDispatch();
  useEffect(() => {
    const action = getAllApplication("sort=-createdAt&", user._id, page);
    moment.locale("vi");
    dispatch(action);
  }, [page]);
  const { applications, maxPages } = useSelector(
    (state) => state.ApplicationReducer
  );

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
  const choseStatus = {
    WAITING_TO_REVIEW: "Chờ duyệt",
    APPROVED: "Chấp nhận",
    REJECT: "Từ chối",
    REQUEST_VIEW: "Yêu cầu xem",
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
                              <Link to={""}>{user?.fullName}</Link>
                            </h4>
                            {/* <p className='m-b0'>
                              <Link to={""}>Web developer</Link>
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
                          <Link to={"/jobs-applied-job"} className="active">
                            <i
                              className="fa fa-briefcase"
                              aria-hidden="true"
                            ></i>
                            <span>Công việc đã ứng tuyển</span>
                          </Link>
                        </li>
                        <li>
                          <Link to={"/jobs-alerts"}>
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
                          <Link to={"./"}>
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
                <div className="col-xl-9 col-lg-8 m-b30 browse-job">
                  <div className="job-bx-title  clearfix">
                    <h5 className="font-weight-700 pull-left text-uppercase">
                      {applications.length} công việc
                    </h5>
                    {/* <div className="float-right">
                      <span className="select-title">Sắp xếp</span>
                      <select className="custom-btn">
                        <option>Last 2 Months</option>
                        <option>Last Months</option>
                        <option>Last Weeks</option>
                        <option>Last 3 Days</option>
                      </select>
                    </div> */}
                  </div>
                  <ul className="post-job-bx browse-job">
                    {applications.map((item, index) => (
                      <li key={index}>
                        <div className="post-bx">
                          <div className="job-post-info m-a0">
                            <div
                              className=""
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                              }}
                            >
                              <h4>
                                <Link to={`/job-detail/${item.jobId}`}>
                                  {item.job[0]?.title}
                                </Link>
                              </h4>
                              <div>
                                <span>
                                  Trạng thái:{" "}
                                  <strong style={{ fontWeight: "bold" }}>
                                    {choseStatus[item.status]}
                                  </strong>
                                </span>
                              </div>
                            </div>

                            <div className="job-post-info">
                              {/* <h4>
                                <Link to={`/job-detail/${item._id}`}>
                                  {item.title}
                                </Link>
                              </h4> */}
                              {/* <h6 class='recent-job__name'>
                                <a href='/'>{item.job[0]?.company?.fullCompanyName}</a>
                              </h6> */}
                              <ul>
                                <li>
                                  <i className="fa fa-map-marker"></i>{" "}
                                  {item.job[0]?.address?.detailAddress}
                                </li>
                                <li>
                                  <i className="fa fa-bookmark-o"></i>{" "}
                                  {item.job[0]?.type.toUpperCase()}
                                </li>
                                <li>
                                  <i className="fa fa-money"></i>{" "}
                                  {item.job[0]?.maxSalary}
                                </li>
                                {/* <li>
                                  <i className="fa fa-clock-o"></i>{" "}
                                  {moment(item.createdAt).fromNow()}
                                </li> */}
                              </ul>
                            </div>

                            <div className="posted-info clearfix">
                              <p className="m-tb0 text-primary float-left">
                                <span className="text-black m-r10">
                                  Đã đăng:
                                </span>{" "}
                                {moment(item.createdAt).fromNow()}
                              </p>
                              {/* <Link
                                to={"/jobs-my-resume"}
                                className='site-button button-sm float-right'>
                                Ứng tuyển
                              </Link> */}
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                  <div className="pagination-bx m-t30">
                    <ul className="pagination">
                      <Pagination
                        current={page}
                        defaultCurrent={1}
                        onChange={(page) => {
                          setPage(page);
                        }}
                        total={maxPages * 10}
                      />
                    </ul>
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
export default Jobsappliedjob;
