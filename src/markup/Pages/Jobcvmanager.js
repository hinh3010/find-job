import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "./../Layout/Header";
import Footer from "./../Layout/Footer";
import "./../../css/custom.css";
import { useDispatch, useSelector } from "react-redux";
import { getAllCvAction } from "../../store/actions/CV/CvActions";
import moment from "moment";
import "moment/locale/vi"; // momment js
import { Pagination, Button, Modal as Modal1 } from "antd";
import CVTemplate from "./CVTemplate";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { deleteCV } from "../../services/CvServices/CvServices";
import swal from "sweetalert";
import { BASE_URL } from "../../config/BASE_URL";
import { Modal } from "react-bootstrap";

function Jobcvmanager() {
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
  const { accessToken, user } = useSelector((state) => state.auth.auth);
  const [cvPreview, setCVPreview] = useState(false);
  const [page, setPage] = useState(1);
  const { cv, maxPages } = useSelector((state) => state.CvReducer);

  // delete data

  const dispatch = useDispatch();

  const pdfGenerate = (fullName) => {
    const input = document.getElementById("CV-content");

    html2canvas(input, { useCORS: true }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const doc = new jsPDF("p", "mm", "a4");
      const imgProps = doc.getImageProperties(imgData);
      const pdfWidth = doc.internal.pageSize.getWidth();
      const pdfHeight = doc.internal.pageSize.getWidth();

      doc.addImage(imgData, "PNG", 0, 0, pdfWidth - 2, pdfHeight + 78);
      doc.save(`${fullName.replace(/\s/g, "_")}.pdf`);
    });
  };
  const deleteCv = (id) => {
    deleteCV(id, accessToken?.token)
      .then((response) => {
        const action = getAllCvAction(
          "ACTIVE",
          user?._id,
          page,
          "&sort=-createdAt"
        );
        dispatch(action);
        swal(
          "Thành Công",
          `Xóa cv ${response.data.fullName.replace(/\s/g, "_")} thành công! `,
          "success"
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    moment.locale("vi");
    const action = getAllCvAction(
      "ACTIVE",
      user?._id,
      page,
      "&sort=-createdAt"
    );
    dispatch(action);
  }, [page]);
  const [currentCv, setCurrentCv] = useState({});

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
                        </div>
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
                        <div className="candidate-title">
                          <div className="">
                            <h4 className="m-b5">
                              <Link to={"#"}>{user?.fullName}</Link>
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
                          <Link to={"/jobs-alerts"}>
                            <i className="fa fa-bell-o" aria-hidden="true"></i>
                            <span>Thông báo công việc</span>
                          </Link>
                        </li>
                        <li>
                          <Link to={"/jobs-cv-manager"} className="active">
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
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="col-xl-9 col-lg-8 m-b30">
                  <div className="job-bx browse-job clearfix">
                    <div className="job-bx-title clearfix">
                      <h5 className="font-weight-700 pull-left text-uppercase">
                        Quản lý CV
                      </h5>
                      <div className="float-right" style={{ display: "flex" }}>
                        {/* <span className='select-title'>Lọc theo thời gian</span>
                        <select className='custom-btn'>
                          <option>2 Tháng trước</option>
                          <option>1 Tháng trước</option>
                          <option>1 Tuần trước</option>
                          <option>3 Tuần trước</option>
                        </select> */}
                        <div className="createCV-btn">
                          <Link to={"/jobs-create-cv"} className="site-button">
                            <i
                              className="fa fa-pencil-square-o"
                              aria-hidden="true"
                            ></i>{" "}
                            &nbsp;Tạo mới CV
                          </Link>
                        </div>
                      </div>
                    </div>
                    <ul className="cv-manager">
                      {cv?.map((contact, index) => (
                        <li key={index}>
                          <div className="d-flex float-left">
                            <Modal
                              show={cvPreview}
                              onHide={setCVPreview}
                              className="modal fade modal-bx-info editor"
                            >
                              <div
                                className="modal-dialog my-0 "
                                role="document"
                              >
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
                                        <CVTemplate
                                          key={index}
                                          value={currentCv}
                                        />
                                      </div>
                                    </div>
                                  </div>
                                  <div className="modal-footer">
                                    <Button
                                      variant="danger"
                                      type="button"
                                      // className='cancel-cv__btn'
                                      onClick={() => setCVPreview(false)}
                                    >
                                      Hủy
                                    </Button>
                                    <button
                                      type="button"
                                      className="site-button download-cv__btn"
                                      onClick={() => {
                                        pdfGenerate(contact.fullName);
                                      }}
                                    >
                                      <i
                                        class="fa fa-download"
                                        aria-hidden="true"
                                      ></i>
                                      &nbsp; &nbsp;Tải xuống CVVV
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </Modal>
                            <div className="job-post-company">
                              <Link to={"#"}>
                                <span>
                                  <img
                                    className="w-100 h-100
                                    rounded
                                    "
                                    style={{ objectFit: "cover" }}
                                    alt=""
                                    src={`https://findjobapi.vtechsoft.vn/${contact.avatarUrl}`}
                                  />
                                </span>
                              </Link>
                            </div>
                            <div className="job-post-info">
                              <h6>
                                <Link
                                  onClick={() => {
                                    setCurrentCv(contact);
                                    setCVPreview(true);
                                  }}
                                  to={"#"}
                                >
                                  {contact.fullName}
                                </Link>
                              </h6>
                              <ul>
                                <li>
                                  <i className="fa fa-map-marker"></i>{" "}
                                  {contact.address?.detailAddress || "Việt Nam"}
                                </li>
                                <li>
                                  <i className="fa fa-bookmark-o"></i>{" "}
                                  {contact.desiredCareer?.jobType}
                                </li>
                                <li>
                                  <i className="fa fa-clock-o"></i>{" "}
                                  {moment(contact.createdAt).fromNow()}
                                </li>
                              </ul>
                            </div>
                          </div>
                          <div className="job-links action-bx d-flex">
                            <i
                              style={{
                                cursor: "pointer",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                              onClick={() => {
                                setCurrentCv(contact);
                                setCVPreview(true);
                              }}
                              className="fa fa-download"
                            ></i>
                            <i
                              style={{
                                cursor: "pointer",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                              onClick={() => deleteCv(contact.id)}
                              className="ti-trash"
                            ></i>
                          </div>
                        </li>
                      ))}
                    </ul>
                    {/* <div className='pagination-bx float-right'>
                      <ul className='pagination'>
                        <Pagination
                          current={page}
                          defaultCurrent={1}
                          onChange={(page) => {
                            setTimeout(() => {
                              setPage(page);
                            }, 1000);
                          }}
                          total={maxPages * 10}
                        />
                      </ul>
                    </div> */}
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
export default Jobcvmanager;
