import React, { useEffect, useState } from "react";
import { Link, Redirect, useHistory, useParams } from "react-router-dom";
import Header from "./../Layout/Header";
import Footer from "./../Layout/Footer";
import PageTitle from "./../Layout/PageTitle";
import { Modal, Form, Button } from "react-bootstrap";
import "./../../css/custom.css";
import { useDispatch, useSelector } from "react-redux";
import { getDetailJobByIdAction } from "../../store/actions/Job/JobsActions";
import moment from "moment";
import { getAllCvAction } from "../../store/actions/CV/CvActions";
import { sendCv } from "../../services/CvServices/CvServices";
import swal from "sweetalert";
import { checkIfSubmitCV } from "../../services/ApplicationsServices/ApplicationsServices";
var bnr = require("./../../images/banner/bnr1.jpg");

function Jobdetail() {
  const { id } = useParams();
  const { user, accessToken } = useSelector((state) => state.auth.auth);
  const [currentCVID, setCurrrentCVID] = useState("");
  const [status, setStatus] = useState();

  const dispatch = useDispatch();
  const checkRegister = (str) => {
    const status = {
      disabled: false,
      color: "primary",
      status: "ỨNG TUYỂN NGAY",
    };
    if (str === "con chim") {
      status.status = "ỨNG TUYỂN NGAY";
      status.disabled = false;
    } else if (str === "WAITING_TO_REVIEW") {
      status.status = "CHỜ ĐỢI PHỎNG VẤN";
      status.disabled = true;
    } else if (str === "REJECTED") {
      status.status = "Đã Bị Từ Chối";
      status.disabled = true;
      status.color = "danger";
    }
    return status;
  };

  useEffect(() => {
    const action = getDetailJobByIdAction(id);
    checkIfSubmitCV(accessToken, user?._id, id).then((response) => {
      if (response.data.docs.length === 0) {
        setStatus(checkRegister("con chim"));
      } else {
        setStatus(checkRegister(response.data.docs[0].status));
      }
    });
    dispatch(action);
  }, []);
  useEffect(() => {
    const action = getAllCvAction("ACTIVE", user?._id, 1, "&sort=-createdAt");
    dispatch(action);
  }, []);

  const { cv } = useSelector((state) => state.CvReducer);
  const { currentJob, jobs } = useSelector((state) => state.JobReducer);
  const [basicdetails, setBasicDetails] = useState(false);
  const [showCreditInfo, setShowCreditInfo] = useState(false);
  const randomNumber = Math.floor(Math.random());
  const history = useHistory();

  return (
    <>
      <Header />
      <div className="page-content bg-white">
        <div
          className="dez-bnr-inr overlay-black-middle"
          style={{ backgroundImage: "url(" + bnr + ")" }}
        >
          <PageTitle activeName="Mô tả công việc" motherName="Trang chủ" />
        </div>
        <div className="content-block">
          <div className="section-full content-inner-1">
            <div className="container">
              <div className="row">
                <div className="col-lg-4">
                  <div className="sticky-top">
                    <div className="row">
                      <div className="col-lg-12 col-md-6">
                        <div className="m-b30">
                          <img
                            src={require("./../../images/blog/grid/pic1.jpg")}
                            alt=""
                          />
                        </div>
                      </div>
                      <div className="col-lg-12 col-md-6">
                        <div className="widget bg-white p-lr20 p-t20  widget_getintuch radius-sm">
                          <h4 className="text-black font-weight-700 p-t10 m-b15">
                            {currentJob?.title}
                          </h4>
                          <ul>
                            <li>
                              <i
                                class="fa fa-building-o"
                                aria-hidden="true"
                              ></i>
                              <strong className="font-weight-700 text-black">
                                Tên doanh nghiệp
                              </strong>
                              <span className="text-black-light">
                                {" "}
                                {currentJob?.company?.fullCompanyName}{" "}
                              </span>
                            </li>
                            <li>
                              <i className="ti-location-pin"></i>
                              <strong className="font-weight-700 text-black">
                                Địa chỉ
                              </strong>
                              <span className="text-black-light">
                                {" "}
                                {currentJob?.address?.detailAddress}{" "}
                              </span>
                            </li>
                            <li>
                              <i className="ti-money"></i>
                              <strong className="font-weight-700 text-black">
                                Mức lương
                              </strong>{" "}
                              {currentJob?.minSalary} VNĐ -{" "}
                              {currentJob?.maxSalary} VNĐ
                            </li>
                            <li>
                              <i className="ti-shield"></i>
                              <strong className="font-weight-700 text-black">
                                Kinh nghiệm
                              </strong>
                              {currentJob?.timeExperience} kinh nghiệm
                            </li>
                            <li>
                              <i className="fa fa-phone" aria-hidden="true"></i>
                              <strong className="font-weight-700 text-black">
                                Liên hệ
                              </strong>
                              Số điện thoại: {currentJob?.tel}
                              <br />
                              Email: Trungtamhotrodaotao@Moet.Edu.Vn
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-8">
                  <div className="job-info-box">
                    <h3 className="m-t0 m-b10 font-weight-700 title-head">
                      <Link to={"#"} className="text-secondry m-r30">
                        {currentJob?.title}
                      </Link>
                    </h3>
                    <ul className="job-info">
                      <li>
                        <strong>Thời hạn ứng tuyển công việc:</strong>{" "}
                        {moment(currentJob?.jobApplyDeadline).format(
                          "Do/MM/YYYY,h:mm:ss"
                        )}
                      </li>
                      <li>
                        <i className="ti-location-pin text-black m-r5"></i>{" "}
                        {currentJob.address?.detailAddress}{" "}
                      </li>
                    </ul>
                    <p className="p-t20" style={{ whiteSpace: "pre-wrap" }}>
                      {currentJob?.introduction}
                    </p>
                    <h5 className="font-weight-600">Mô tả công việc</h5>
                    <div className="dez-divider divider-2px bg-gray-dark mb-4 mt-0"></div>
                    <p style={{ whiteSpace: "pre-wrap" }}>
                      {currentJob?.description}
                    </p>

                    <h5 className="font-weight-600">Yêu cầu công việc</h5>
                    <div className="dez-divider divider-2px bg-gray-dark mb-4 mt-0"></div>
                    <ul className="list-num-count no-round">
                      {currentJob?.requirement?.map((a, index) => (
                        <li key={index}>{a}</li>
                      ))}
                    </ul>
                    {Date.parse(currentJob?.jobApplyDeadline) < Date.now() ? (
                      <Button
                        to={"#"}
                        className="site-button"
                        disabled={true}
                        variant="danger"
                        onClick={() => setBasicDetails(true)}
                      >
                        Hết thời hạn đăng kí
                      </Button>
                    ) : (
                      <Button
                        to={"#"}
                        className="site-button"
                        disabled={status?.disabled}
                        variant={status?.color}
                        onClick={() => setBasicDetails(true)}
                      >
                        {status?.status}
                      </Button>
                    )}
                  </div>
                  <Modal
                    className="modal fade browse-job modal-bx-info editor"
                    show={basicdetails}
                    onHide={setBasicDetails}
                  >
                    <div className="modal-dialog my-0" role="document">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h5
                            className="modal-title"
                            id="ProfilenameModalLongTitle"
                          >
                            Danh sách CV đã tạo
                          </h5>
                          <button
                            type="button"
                            className="close"
                            onClick={() => setBasicDetails(false)}
                          >
                            <span aria-hidden="true">&times;</span>
                          </button>
                        </div>
                        <div className="modal-body">
                          <form>
                            <div className="row">
                              <div className="col-lg-12 col-md-12">
                                <p className="post-cv__guideline">
                                  Lựa chọn một CV trong danh sách các CV mà bạn
                                  đã tạo rồi nhấn Nộp CV
                                </p>
                                <div className="post-cv__list">
                                  {cv?.length === 0 ? (
                                    <>
                                      <p
                                        style={{
                                          fontSize: "1rem",
                                          fontWeight: "bold",
                                          color: "red",
                                        }}
                                      >
                                        Bạn chưa có CV nào để ứng tuyển.
                                      </p>
                                      <Link to="/jobs-create-cv">
                                        Click vào đây để tạo CV
                                      </Link>
                                    </>
                                  ) : (
                                    cv?.map((item, index) => (
                                      <div className="post-cv__item">
                                        <div
                                          className="custom-control custom-checkbox"
                                          style={{ marginLeft: "10px" }}
                                        >
                                          <input
                                            onClick={() =>
                                              setCurrrentCVID(item.id)
                                            }
                                            type="checkbox"
                                            className="custom-control-input"
                                            id={`check${index + 1}`}
                                            name={`example${index + 1}`}
                                          />
                                          <label
                                            className="custom-control-label"
                                            htmlFor={`check${index + 1}`}
                                          ></label>
                                        </div>

                                        <div className="post-cv__icon">
                                          <i
                                            className="fa fa-file-pdf-o"
                                            aria-hidden="true"
                                          ></i>
                                        </div>

                                        <div className="post-cv__heading">
                                          {item?.fullName?.split(" ").join("_")}
                                          .pdf
                                        </div>
                                      </div>
                                    ))
                                  )}
                                </div>
                              </div>
                            </div>
                          </form>
                        </div>
                        <div className="modal-footer">
                          <button
                            type="button"
                            className="site-button"
                            onClick={() => setBasicDetails(false)}
                          >
                            Thoát
                          </button>
                          <button
                            type="button"
                            onClick={() =>
                              sendCv(
                                {
                                  cvId: currentCVID,
                                  jobId: currentJob.id,
                                },
                                accessToken.token
                              ).then((res) => {
                                swal(
                                  "Good luck!",
                                  "Ứng Tuyển Thành Công!",
                                  "success"
                                );
                                history.go(0);
                                setBasicDetails(false);
                              })
                            }
                            className="site-button"
                          >
                            Nộp CV
                          </button>
                        </div>
                      </div>
                    </div>
                  </Modal>
                </div>
              </div>
            </div>
          </div>
          {/* <div className='section-full content-inner'>
            <div className='container'>
              <div className='row'>
                {jobs
                  .filter(
                    (item, index) =>
                      index > randomNumber && index < randomNumber + 5,
                  )
                  .map((item, index) => (
                    <div className='col-xl-3 col-lg-6 col-md-6' key={index}>
                      <div className='m-b30 blog-grid'>
                        <div className='dez-post-media dez-img-effect '>
                          {" "}
                          <Link to={`/job-detail/${item._id}`}>
                            <img
                              src={
                                item.image ||
                                "http://localhost:3000/static/media/pic2.32b62dc5.jpg"
                              }
                              alt=''
                            />
                          </Link>{" "}
                        </div>
                        <div className='dez-info p-a20 border-1'>
                          <div className='dez-post-title '>
                            <h5 className='post-title'>
                              <Link to={`/job-detail/${item._id}`}>
                                {item?.title}
                              </Link>
                            </h5>
                          </div>
                          <div className='dez-post-meta '>
                            <ul>
                              <li className='post-date'>
                                {" "}
                                <i className='ti-location-pin'></i> London{" "}
                              </li>
                              <li className='post-author'>
                                <i className='ti-user'></i>By{" "}
                                <Link to={"#"}>Jone</Link>{" "}
                              </li>
                            </ul>
                          </div>
                          <div className='dez-post-text'>
                            <p>{item.description}</p>
                          </div>
                          <div className='dez-post-readmore'>
                            <Link
                              to={`/job-detail/${item._id}`}
                              title='READ MORE'
                              rel='bookmark'
                              className='site-button-link'>
                              <span
                                onClick={() =>
                                  history.goBack(`/job-detail/${item._id}`)
                                }
                                className='fw6'>
                                Xem thêm
                              </span>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div> */}
        </div>
      </div>
      <Footer />
    </>
  );
}
export default Jobdetail;
