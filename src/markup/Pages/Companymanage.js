import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "./../Layout/Header";
import Footer from "./../Layout/Footer";
import { Modal, Form } from "react-bootstrap";
import { Modal as Modal2 } from "antd";
import Logout from "../Layout/Logout";
import { getJobsCreateByCompanyAction } from "../../store/actions/Job/JobsActions";
import { useDispatch, useSelector } from "react-redux";
import { Pagination } from "antd";
import swal from "sweetalert";
import { deleteJobAction } from "../../services/JobServices/JobServices";
import { BASE_URL } from "../../config/BASE_URL";

function Companymanage() {
  const [company, setCompany] = useState(false);
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const { auth } = useSelector((state) => state.auth);
  const user = auth.user;
  const [page, setPage] = useState(1);

  useEffect(() => {
    const action = getJobsCreateByCompanyAction(
      user.id,
      auth.accessToken.token,
      page
    );
    dispatch(action);
  }, [page]);
  const { companyPostJob, totalPages } = useSelector(
    (state) => state.CompanyReducer
  );
  const [currentJob, setCurrentJob] = useState({});
  const deleteJob = (id) => {
    deleteJobAction(id, auth.accessToken.token)
      .then((response) => {
        const action = getJobsCreateByCompanyAction(
          user.id,
          auth.accessToken.token
        );
        dispatch(action);
        swal("Thành Công", `Xóa  thành công! `, "success");
      })
      .catch((error) => {
        console.log(error);
      });
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
  console.log("dat",currentJob)
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
                    <div className="candidate-info company-info">
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
                          <Modal2
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
                          </Modal2>
                        </div>
                        <div className="candidate-title">
                          <h4 className="m-b5">
                            <Link to={"#"}>{user?.fullCompanyName}</Link>
                          </h4>
                        </div>
                      </div>
                      <ul>
                        <li>
                          <Link to={"/company-profile"}>
                            <i className="fa fa-user-o" aria-hidden="true"></i>
                            <span>Thông tin công ty</span>
                          </Link>
                        </li>
                        <li>
                          <Link to={"/company-post-jobs"}>
                            <i
                              className="fa fa-file-text-o"
                              aria-hidden="true"
                            ></i>
                            <span>Đăng bài post</span>
                          </Link>
                        </li>
                        <li>
                          <Link to={"/company-manage-job"} className="active">
                            <i
                              className="fa fa-briefcase"
                              aria-hidden="true"
                            ></i>
                            <span>Quản lý công việc</span>
                          </Link>
                        </li>
                        <li>
                          <Link to={"/company-resume"}>
                            <i
                              className="fa fa-id-card-o"
                              aria-hidden="true"
                            ></i>
                            <span>Quản lý CV</span>
                          </Link>
                        </li>
                        <li>
                          <Link to={"/company-survey"}>
                            <i class="fa fa-bar-chart" aria-hidden="true"></i>
                            <span>Khảo sát</span>
                          </Link>
                        </li>
                        <li>
                          <Link to={"/jobs-change-password"}>
                            <i className="fa fa-key" aria-hidden="true"></i>
                            <span>Đổi mật khẩu</span>
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="col-xl-9 col-lg-8 m-b30">
                  <div className="job-bx browse-job clearfix">
                    <div className="job-bx-title  clearfix">
                      <h5 className="font-weight-700 pull-left text-uppercase">
                        Quản lý công việc
                      </h5>
                      {/* <div className='float-right'>
                        <span className='select-title'>Sắp xếp</span>
                        <select className='custom-btn'>
                          <option>All</option>
                          <option>None</option>
                          <option>Read</option>
                          <option>Unread</option>
                          <option>Starred</option>
                          <option>Unstarred</option>
                        </select>
                      </div> */}
                    </div>
                    <table className="table-job-bx cv-manager company-manage-job">
                      <thead>
                        <tr>
                          {/* <th className='feature'>
                            <div className='custom-control custom-checkbox'>
                              <input
                                type='checkbox'
                                id='check12'
                                className='custom-control-input selectAllCheckBox'
                                name='example1'
                              />
                              <label
                                className='custom-control-label'
                                htmlFor='check12'></label>
                            </div>
                          </th> */}
                          <th style={{width: 340}}>Tên công việc</th>
                          <th>Số người ứng tuyển</th>
                          <th>Trạng thái xử lý</th>
                          <th>Tác vụ</th>
                        </tr>
                      </thead>
                      <tbody>
                        {companyPostJob.map((item, index) => (
                          <tr>
                            {/* <td className='feature'>
                              <div className='custom-control custom-checkbox'>
                                <input
                                  type='checkbox'
                                  className='custom-control-input'
                                  id='check1'
                                  name='example1'
                                />
                                <label
                                  className='custom-control-label'
                                  htmlFor='check1'></label>
                              </div>
                            </td> */}
                            <td className="job-name">
                              <Link to={`/job-detail/${item.id}`}>{item.title}</Link>
                              <ul className="job-post-info">
                                <li>
                                  <i className="fa fa-map-marker"></i>{" "}
                                  {item.address.detailAddress}
                                </li>
                                <li>
                                  <i className="fa fa-bookmark-o"></i>{" "}
                                  {item.type}
                                </li>
                                <li>
                                  <i className="fa fa-filter"></i>
                                  {item.jobField}
                                </li>
                              </ul>
                            </td>
                            <td className="application text-primary">
                              ({item.waitingApplication}) Ứng viên
                            </td>
                            <td className="expired pending">
                              <div
                                className={
                                  item.status === "APPROVED"
                                    ? "expired success"
                                    : item.status === "WAITING_TO_REVIEW"
                                      ? "expired text-primary"
                                      : "expired text-danger"
                                }
                              >
                                {item.status}
                              </div>
                            </td>
                            <td className="job-links" style={{ top: "12px" }}>
                              <Link
                                to={"#"}
                                onClick={() => {
                                  setCurrentJob(item);
                                  setCompany(true);
                                }}
                              >
                                <i className="fa fa-eye"></i>
                              </Link>
                              <Link
                                onClick={() => {
                                  deleteJob(item.id);
                                }}
                                to={"#"}
                              >
                                <i className="ti-trash"></i>
                              </Link>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <div className="pagination-bx m-t30 float-right">
                      <ul className="pagination">
                        <Pagination
                          current={page}
                          defaultCurrent={1}
                          onChange={(page) => {
                            setPage(page);
                          }}
                          total={totalPages * 10}
                        />
                      </ul>
                    </div>

                    <Modal
                      show={company}
                      onHide={setCompany}
                      className="modal fade modal-bx-info"
                    >
                      <div className="modal-dialog my-0 mx-0" role="document">
                        <div className="modal-content">
                          <div className="modal-header">
                            <div className="logo-img">
                              <img
                                alt=""
                                src={require("./../../images/logo/icon2.png")}
                              />
                            </div>
                            <h5 className="modal-title">{currentJob.company?.fullCompanyName}</h5>
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
                                <strong>Tên công việc :</strong>
                                <p> {currentJob?.title} </p>
                              </li>
                              <li>
                                <strong>Kinh nghiệm :</strong>
                                <p>{currentJob?.timeExperience}</p>
                              </li>
                              <li>
                                <strong>Mô tả :</strong>
                                <p>{currentJob?.description}</p>
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
                        </div>
                      </div>
                    </Modal>
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
export default Companymanage;
