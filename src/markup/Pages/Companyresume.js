import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "./../Layout/Header";
import Footer from "./../Layout/Footer";
import "./../../css/custom.css";
import { useDispatch, useSelector } from "react-redux";
import { getAllApplication } from "../../store/actions/Applicantion/ApplicationActions";
import { getJobsCreateByCompanyAction } from "../../store/actions/Job/JobsActions";
import {
  getSubmitsCV,
  requestViewApplicationById,
} from "../../services/ApplicationsServices/ApplicationsServices";
import { BASE_URL } from "../../config/BASE_URL";
import CVTemplate from "./CVTemplate";
import { getCVById } from "../../services/CvServices/CvServices";
import { Button } from "react-bootstrap";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { Pagination, Modal as Modal1 } from "antd";
import { Modal } from "react-bootstrap";
import swal from "sweetalert";

const pdfGenerate = (fullName) => {
  const input = document.getElementById("CV-content");
  html2canvas(input, { useCORS: true }).then((canvas) => {
    const imgData = canvas.toDataURL("image/png");
    const doc = new jsPDF("p", "mm", "a4");
    const imgProps = doc.getImageProperties(imgData);
    const pdfWidth = doc.internal.pageSize.getWidth();
    const pdfHeight = doc.internal.pageSize.getWidth();

    doc.addImage(imgData, "PNG", 0, 0, pdfWidth - 2, pdfHeight + 78);
    debugger;

    doc.save(`${fullName.replace(/\s/g, "_")}.pdf`);
  });
};
function Companyresume() {
  const [showContent, setShowContent] = useState(1);
  const [currentListCV, setCurrentListCV] = useState([]);
  const [currentCv, setCurrentCV] = useState([]);
  const handleSwitch = (param) => {
    setShowContent(param);
  };
  const [openCvtemplate, setOpenCvTemplate] = useState(false);
  const { auth } = useSelector((state) => state.auth);
  const [page, setPage] = useState(1);
  const [cvPage, setCvPage] = useState(1);
  const user = auth.user;
  const dispatch = useDispatch();
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
  const [totalPageCV, setTotalPageCV] = useState();
  const [jobid, setJobid] = useState(null);

  useEffect(() => {
    if (jobid !== null) {
      getDetailsCvByJob(currentItem);
    }
  }, [cvPage]);

  const getDetailsCvByJob = () => {
    getSubmitsCV(auth.accessToken.token, {
      jobId: jobid,
      page: cvPage,
      status: "APPROVED",
    }).then((res) => {
      setTotalPageCV(res.data.totalPages);
      setCurrentListCV(res.data.docs);
    });
  };

  const handleRequestPermission = (id) => {
    requestViewApplicationById(id, auth.accessToken.token, {
      status: "REQUEST_VIEW",
    })
      .then((res) => {
        handleSwitch(3);
      })
      .catch((error) => {
        handleSwitch(2);
      });
  };
  const [currentItem, setCurrentItem] = useState({});
  const [cvPreview, setCVPreview] = useState(false);

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
                          <Modal1
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
                          </Modal1>
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
                        {/* <li><Link to={"/company-transactions"}>
													<i className="fa fa-random" aria-hidden="true"></i>
													<span>Transactions</span></Link></li> */}
                        <li>
                          <Link to={"/company-manage-job"}>
                            <i
                              className="fa fa-briefcase"
                              aria-hidden="true"
                            ></i>
                            <span>Quản lý công việc</span>
                          </Link>
                        </li>
                        <li>
                          <Link to={"/company-resume"} className="active">
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
                  {/* Show CV Component */}
                  <div
                    className="job-bx clearfix"
                    style={
                      showContent == 3
                        ? { display: "block" }
                        : { display: "none" }
                    }
                  >
                    <div className="job-bx-title clearfix">
                      <h5 className="font-weight-700 pull-left text-uppercase">
                        Resume
                      </h5>
                      <button
                        onClick={() => handleSwitch(1)}
                        className="site-button right-arrow button-sm float-right"
                      >
                        Back
                      </button>
                    </div>
                    <ul className="post-job-bx browse-job-grid post-resume row">
                      {currentListCV &&
                        currentListCV.map((item, index) => (
                          <li className="col-lg-6 col-md-6" key={index}>
                            <div className="post-bx">
                              <div className="d-flex m-b20">
                                <div className="job-post-info">
                                  <h5 className="m-b0">
                                    <span
                                      style={{ cursor: "pointer" }}
                                      onClick={() => {
                                        getCVById(
                                          item.cvId,
                                          auth.accessToken?.token
                                        )
                                          .then(async (res) => {
                                            setCurrentCV(res.data);
                                            setCVPreview(true);
                                          })
                                          .catch((error) => {
                                            swal(
                                              "Thất bại !",
                                              "Không tìm thấy cv !",
                                              "error"
                                            );
                                          });
                                      }}
                                    >
                                      {item.cv[0]?.firstName +
                                        " " +
                                        item.cv[0]?.lastName}
                                    </span>
                                  </h5>
                                  <p className="m-b5 font-13">
                                    <span
                                      style={{ cursor: "pointer" }}
                                      className="text-primary"
                                    >
                                      {item.title}{" "}
                                    </span>
                                    {item.cv[0]?.objective}
                                  </p>
                                  <ul>
                                    <li>
                                      <i className="fa fa-map-marker"></i>
                                      {item.cv[0]?.address?.detailAddress}
                                    </li>
                                    <li>
                                      <i className="fa fa-money"></i>{" "}
                                      {item.job[0]?.minSalary?.toLocaleString()}{" "}
                                      VNĐ
                                    </li>
                                  </ul>
                                </div>
                              </div>
                              <div className="job-time m-t15 m-b10">
                                {item.cv[0]?.skill?.map((skill, index) => (
                                  <Link to={"#"} className="mr-1" key={index}>
                                    <span>{skill.skillName}</span>
                                  </Link>
                                ))}
                              </div>
                            </div>
                          </li>
                        ))}
                    </ul>
                    <div className="pagination-bx float-right">
                      <ul className="pagination">
                        <Pagination
                          current={cvPage}
                          defaultCurrent={1}
                          onChange={(cvPage) => {
                            setTimeout(() => {
                              setCvPage(cvPage);
                            }, 1000);
                          }}
                          total={totalPageCV * 10}
                        />
                      </ul>
                    </div>
                  </div>
                  {/* Show Notification Request */}
                  <div
                    className="manage-notification__wrap"
                    style={
                      showContent == 2
                        ? { display: "block" }
                        : { display: "none" }
                    }
                  >
                    <div className="manage-notification__content-wrap">
                      <div className="manage-notification__content">
                        <div className="warning-btn-group">
                          <i
                            class="fa fa-exclamation-triangle warning-icon"
                            aria-hidden="true"
                          ></i>
                        </div>

                        <span className="manage-notification__heading">
                          Bạn cần được sự cho phép của Admin để sử dụng chức
                          năng này
                        </span>
                        <div className="manage-notification__btn-group">
                          <button
                            type="button"
                            className="btn btn-primary"
                            onClick={() => {
                              handleRequestPermission(currentItem);
                            }}
                          >
                            Yêu cầu truy cập
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Show list jobs */}
                  <div
                    className="job-bx browse-job clearfix"
                    style={
                      showContent == 1
                        ? { display: "block" }
                        : { display: "none" }
                    }
                  >
                    <div className="job-bx-title  clearfix">
                      <h5 className="font-weight-700 pull-left text-uppercase">
                        Danh mục công việc tuyển dụng
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
                          <th>Tên công việc</th>
                          <th>Số người ứng tuyển</th>
                          <th>Xem CV</th>
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
                              <Link to={`/job-detail/${item.id}`}>
                                {item.title}
                              </Link>
                              <ul className="job-post-info">
                                <li>
                                  <i className="fa fa-map-marker"></i>{" "}
                                  {item.detailAddress}
                                </li>
                                <li>
                                  <i className="fa fa-bookmark-o"></i>{" "}
                                  {item.type}
                                </li>
                                <li>
                                  <i className="fa fa-filter"></i>{" "}
                                  {item.jobField}
                                </li>
                              </ul>
                            </td>
                            <td className="application text-primary">
                              ({item.waitingApplication}) Ứng viên
                            </td>
                            <td
                              className="job-links"
                              style={{ top: "0", left: "26px" }}
                            >
                              <div className="show-cv__btn">
                                <div
                                  onClick={() => {
                                    setCurrentItem(item.id);
                                    setJobid(item.id);
                                    getDetailsCvByJob();
                                    handleSwitch(2);
                                  }}
                                  style={{ cursor: "pointer" }}
                                >
                                  <i className="fa fa-eye"></i>
                                </div>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <Modal
                      show={cvPreview}
                      onHide={setCVPreview}
                      className="modal fade modal-bx-info editor"
                    >
                      <div className="modal-dialog my-0 " role="document">
                        <div className="modal-content">
                          <div className="modal-header">
                            <h5
                              className="modal-title"
                              id="EmploymentModalLongTitle"
                            >
                              Xem trước CV của bạn
                            </h5>
                            <button
                              type="button"
                              className="close"
                              onClick={() => setCVPreview(false)}
                            >
                              <span aria-hidden="true">&times;</span>
                            </button>
                          </div>
                          <div className="modal-body">
                            <div className="CV-content__preview">
                              <div id="CV-content">
                                <CVTemplate value={currentCv} />
                              </div>
                            </div>
                          </div>
                          <div className="modal-footer">
                            <Button
                              variant="danger"
                              type="button"
                              className="cancel-cv__btn"
                              onClick={() => setCVPreview(false)}
                            >
                              Hủy
                            </Button>
                            <button
                              type="button"
                              className="site-button download-cv__btn"
                              onClick={() => {
                                pdfGenerate("");
                              }}
                            >
                              <i class="fa fa-download" aria-hidden="true"></i>
                              &nbsp; &nbsp;Tải xuống CV
                            </button>
                          </div>
                        </div>
                      </div>
                    </Modal>
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

// ok
export default Companyresume;
