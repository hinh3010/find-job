import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import Footer from "../Layout/Footer";
import Header from "../Layout/Header";
import { BASE_URL } from "../../config/BASE_URL";
import { Modal } from "antd";
import { useEffect } from "react";
import { getSurveyById, getSurveyRespondById } from "../../services/Survey/SurveyServices";
import moment from "moment";

export default function ResponseSurvey() {
  const { user, accessToken } = useSelector((state) => state.auth.auth);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalSurvey, setIsModalSurvey] = useState(false);
  const [dataModal, setDataModal] = useState();
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setIsModalSurvey(false);
  };

  const [detailSurvey, setDetailSurvey] = useState(undefined);
  const { id } = useParams();


  useEffect(() => {
    const fetch = getSurveyRespondById({surveyId: id}, accessToken.token);
    fetch
      .then((response) => {
        setDetailSurvey(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id, accessToken.token]);
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
                          <Link to={"/company-resume"}>
                            <i
                              className="fa fa-id-card-o"
                              aria-hidden="true"
                            ></i>
                            <span>Quản lý CV</span>
                          </Link>
                        </li>
                        <li>
                          <Link to={"/company-survey"} className="active">
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
                  <div className="job-bx table-job-bx clearfix">
                    <div className="job-bx-title clearfix d-flex align-items-center">
                      <h5 className="font-weight-700 pull-left text-uppercase m-0">
                        Phản hồi khảo sát
                      </h5>
                      <div className="ml-auto d-flex align-items-center">
                        <Link
                          to={"/company-survey"}
                          style={{ height: "fit-content" }}
                          className="site-button right-arrow button-sm float-right"
                        >
                          Back
                        </Link>
                      </div>
                    </div>

                    <form>
                      <div className="row submit-resume detail-survey">
                        <table>
                          <thead>
                            <tr>
                              <th>STT</th>
                              <th>Người phản hồi</th>
                              <th>Phản hồi</th>
                            </tr>
                          </thead>
                          <tbody>
                            {detailSurvey && detailSurvey.docs.map(
                              (item, index) => {
                                return (
                                  <tr key={index}>
                                    <td className="order-id text-primary">
                                      {index + 1}
                                    </td>
                                    <td className="order-id text-primary">
                                      {item.createdBy.fullName}
                                    </td>
                                    <td
                                      className="order-id expired pending cursor-pointer"
                                      onClick={() => {
                                        setDataModal(item);
                                        setIsModalSurvey(true);
                                      }}
                                    >
                                      Chi tiết
                                    </td>
                                  </tr>
                                );
                              }
                            )}
                          </tbody>
                        </table>
                        {/* {detailSurvey?.surveyResponses?.map((item, index) => {
                          return (
                            <div key={index} className="col-lg-6 col-md-6 mb-3">
                              <div className="response-wrap">
                                {item?.questionResponses.map((ques, index) => {
                                  return (
                                    <div className="form-group">
                                      <label className="mb-0 mt-3">
                                        {ques?.question}
                                      </label>
                                      <div
                                        key={index}
                                        className="mt-2 noShadow form-control"
                                      >
                                        - {ques?.response}
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          );
                        })} */}
                        <Modal
                          title="Chi tiết khảo sát"
                          visible={isModalSurvey}
                          maskClosable={true}
                          footer={null}
                          // closable= {false}
                          onCancel={handleCancel}
                        >
                           {dataModal?.questionResponses.map((ques, index) => {
                                  return (
                                    <div className="form-group">
                                      <label className="mb-0 mt-3">
                                        {ques?.question}
                                      </label>
                                      <div
                                        key={index}
                                        className="mt-2 noShadow form-control"
                                      >
                                        - {ques?.response}
                                      </div>
                                    </div>
                                  );
                                })}
                        </Modal>
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
