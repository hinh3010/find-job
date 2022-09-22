import React, { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Header from "./../Layout/Header";
import Footer from "./../Layout/Footer";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getDetailCourseApplicationByCourseIdAction } from "../../store/actions/CourseApplication/CourseApplicationActions";
import moment from "moment";
import { Pagination, Switch } from "antd";
import { updatePaymentStatusCourseApplication } from "../../services/CourseApplicationServices/CourseApplicationServices";
function CourseStudentList() {
  const [company, setCompany] = useState(false);
  const { courseID } = useParams();
  const [page, setPage] = useState(1);


  const { user, accessToken } = useSelector((state) => state.auth.auth);

  const { courseApplicants } = useSelector(
    (state) => state.CourseApplicationReducer,
  );
  const { applicants, totalPages } = courseApplicants;
  const dispatch = useDispatch();
  const handleGetDetailApplicants = () => {
    const action = getDetailCourseApplicationByCourseIdAction(
      courseID,
      accessToken.token,
      page,
    );
    dispatch(action);
  };
  useEffect(() => {
    handleGetDetailApplicants();
  }, [page]);

  const inputRef = useRef(null);
  const [input, setInput] = useState(true);
  return (
    <>
      <Header />
      <div className='page-content bg-white'>
        <div className='content-block'>
          <div className='section-full bg-white p-t50 p-b20'>
            <div className='container'>
              <div className='row'>
                <div className='col-xl-3 col-lg-4 m-b30'>
                  <div className='sticky-top'>
                    <div className='candidate-info company-info'>
                      <div className='candidate-detail text-center'>
                        <div className='canditate-des'>
                          <Link to={"#"}>
                            <img
                              alt=''
                              src={require("./../../images/logo/icon3.jpg")}
                            />
                          </Link>
                          <div
                            className='upload-link'
                            title='update'
                            data-toggle='tooltip'
                            data-placement='right'>
                            <input type='file' className='update-flie' />
                            <i className='fa fa-pencil'></i>
                          </div>
                        </div>
                        <div className='candidate-title'>
                          <h4 className='m-b5'>
                            <Link to={"#"}>Tên khóa học</Link>
                          </h4>
                        </div>
                      </div>
                      <ul>
                        {/* <li><Link to={"/ompany-profile"}>
													<i className="fa fa-user-o" aria-hidden="true"></i>
													<span>Thông tin công ty</span></Link></li> */}
                        <li>
                          <Link to={"/course-create"}>
                            <i
                              className='fa fa-file-text-o'
                              aria-hidden='true'></i>
                            <span>Tạo khóa học</span>
                          </Link>
                        </li>
                        {/* <li><Link to={"/company-transactions"}>
														<i className="fa fa-random" aria-hidden="true"></i>
														<span>Transactions</span></Link></li> */}
                        <li>
                          <Link to={"/course-manage"} className='active'>
                            <i
                              className='fa fa-briefcase'
                              aria-hidden='true'></i>
                            <span>Quản lý khóa học</span>
                          </Link>
                        </li>
                        {/* <li><Link to={"/company-resume"}>
													<i className="fa fa-id-card-o" aria-hidden="true"></i>
													<span>Quản lý CV</span></Link></li> */}
                        {/* <li><Link to={"/jobs-change-password"}>
													<i className="fa fa-key" aria-hidden="true"></i>
													<span>Đổi mật khẩu</span></Link></li>
												<li><Link to={"./"}>
													<i className="fa fa-sign-out" aria-hidden="true"></i>
													<span>Đăng xuất</span></Link></li> */}
                      </ul>
                    </div>
                  </div>
                </div>
                <div className='col-xl-9 col-lg-8 m-b30'>
                  <div className='job-bx browse-job clearfix'>
                    <div className='job-bx-title  clearfix'>
                      <h5 className='font-weight-700 pull-left text-uppercase'>
                        Quản lý học viên
                      </h5>
                      {/* <div className='float-right'>
                        <span className='select-title'>Sắp xếp</span>
                        <select className='custom-btn'>
                          <option>Tất cả</option>
                          <option>Không</option>
                          <option>Đã thanh toán</option>
                          <option>Chưa thanh toán</option>
                        </select>
                      </div> */}
                    </div>
                    <table className='table-job-bx cv-manager company-manage-job'>
                      <thead>
                        <tr>
                          {/* <th className="feature">
                                                        <div className="custom-control custom-checkbox">
                                                            <input type="checkbox" id="check12" className="custom-control-input selectAllCheckBox" name="example1" />
                                                            <label className="custom-control-label" htmlFor="check12"></label>
                                                        </div>
                                                    </th> */}
                          <th>Thanh toán</th>
                          <th>Họ và tên</th>
                          <th>Số điện thoại</th>
                          <th>Email</th>
                          <th>Thời gian</th>
                        </tr>
                      </thead>
                      <tbody>
                        {applicants.map((item, index) => (
                          <tr>
                            <td className='feature'>
                              <div >
                                <Switch
                                  checked={
                                    item.paymentStatus === "UNPAID"
                                      ? false
                                      : true
                                  }
                                  className='w-100'
                                  style={
                                    item.paymentStatus === "UNPAID"
                                      ? {
                                          backgroundColor: "  rgb(229, 55, 94)",
                                        }
                                      : {
                                          backgroundColor: "rgb(64, 227, 120) ",
                                        }
                                  }
                                  checkedChildren='Đã thanh toán'
                                  unCheckedChildren='Chưa thanh toán'
                                  onChange={() => {
                                    updatePaymentStatusCourseApplication(
                                      {
                                        paymentStatus:
                                          item.paymentStatus === "UNPAID"
                                            ? "PAID"
                                            : "UNPAID",
                                      },
                                      accessToken.token,
                                      item.id,
                                    ).then((res) => {
                                      handleGetDetailApplicants();
                                    });
                                  }}
                                />
                              </div>
                            </td>
                            <td className='job-name'>
                              <Link to={"#"}>{item.createdBy?.fullName}</Link>
                            </td>
                            <td className='application text-primary'>
                              {item.phone}
                            </td>
                            <td className='expired'>{item.email}</td>
                            <td className='expired'>
                              {moment(item.createdAt)
                                .subtract(10, "days")
                                .calendar()}
                            </td>
                            {/* <td className="job-links">
                                  <Link to={"#"} onClick={() => setCompany(true)}>
                                      <i className="fa fa-eye"></i></Link>
                                  <Link to={"#"}><i className="ti-trash"></i></Link>
                              </td> */}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <div className='pagination-bx m-t30 float-right'>
                      <ul className='pagination'>
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
                      className='modal fade modal-bx-info'>
                      <div className='modal-dialog my-0' role='document'>
                        <div className='modal-content'>
                          <div className='modal-header'>
                            <div className='logo-img'>
                              <img
                                alt=''
                                src={require("./../../images/logo/icon2.png")}
                              />
                            </div>
                            <h5 className='modal-title'>Company Name</h5>
                            <button
                              type='button'
                              className='close'
                              onClick={() => setCompany(false)}>
                              <span aria-hidden='true'>&times;</span>
                            </button>
                          </div>
                          <div className='modal-body'>
                            <ul>
                              <li>
                                <strong>Job Title :</strong>
                                <p> Web Developer – PHP, HTML, CSS </p>
                              </li>
                              <li>
                                <strong>Experience :</strong>
                                <p>5 Year 3 Months</p>
                              </li>
                              <li>
                                <strong>Deseription :</strong>
                                <p>
                                  Lorem Ipsum is simply dummy text of the
                                  printing and typesetting industry has been the
                                  industry's standard dummy text ever since.
                                </p>
                              </li>
                            </ul>
                          </div>
                          <div className='modal-footer'>
                            <button
                              type='button'
                              className='btn btn-secondary'
                              onClick={() => setCompany(false)}>
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
export default CourseStudentList;
