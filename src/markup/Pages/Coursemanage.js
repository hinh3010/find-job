import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "./../Layout/Header";
import Footer from "./../Layout/Footer";
import { Modal } from "react-bootstrap";
import { Pagination } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getAllCoursesAction } from "../../store/actions/Course/CourseActions";
import swal from "sweetalert";
import { deleteCourseAction } from "../../services/CourseServices/CourseServices";
import { BASE_URL } from '../../config/BASE_URL';
import Item from "antd/lib/list/Item";

function Coursemanage() {
  const [company, setCompany] = useState(false);
  const [page, setPage] = useState(1);
  const { user, accessToken } = useSelector((state) => state.auth.auth);
  const { courses, maxPages } = useSelector((state) => state.CourseReducer);

  const dispatch = useDispatch();
  const deleteCourse = (id) => {
    deleteCourseAction(id, accessToken.token)
      .then((res) => {
        const action = getAllCoursesAction(page, undefined, user.id);
        dispatch(action);
        swal("Thành Công!", "Đã xóa thành công!", "success");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    const action = getAllCoursesAction(page, undefined, user.id);
    dispatch(action);
  }, [page]);

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
                          <Link
                            onClick={() => {
                              dispatch({
                                type: "GET_AVATAR",
                                payload: `${BASE_URL}/${user?.avatarUrl}`
                              })
                            }}
                            to={`/avatar/${user.id}`}
                          >
                            {
                              user?.avatarUrl?.indexOf('https://') === -1 ?
                                <img alt="" src={`${BASE_URL}/${user?.avatarUrl}`} /> :
                                <img alt="" src={user?.avatarUrl} />
                            }
                          </Link>
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
                        Quản lý khóa học
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
                    <table className='table-job-bx cv-manager company-manage-job'>
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
                          <th style={{width: 340}}>Tên khóa học</th>
                          <th>Số buổi học</th>
                          <th>Trạng thái</th>
                          <th>Tác vụ</th>
                        </tr>
                      </thead>
                      <tbody>
                        {courses?.map((course, index) => (
                          <tr key={index}>
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
                            <td className='job-name'>
                              <Link to={`course-detail/${course.id}`}>{course.title}</Link>
                              {course.cost === 0 ? <span className='new-page'>Free</span> : null}
                              <ul className='job-post-info'>
                                <li>
                                  <i className='fa fa-map-marker'></i>
                                  {course?.address?.detailAddress}
                                </li>
                                <li>
                                  <i className='fa fa-bookmark-o'></i>{" "}
                                  {course.type}
                                </li>
                                {/* <li><i className="fa fa-filter"></i> Web Designer</li> */}
                              </ul>
                            </td>
                            <td className='application text-primary'>{course.lessonNumber}</td>
                            <td
                              className={
                                course.status === "APPROVED"
                                  ? "expired success"
                                  : course.status === "WAITING_TO_REVIEW"
                                    ? "expired text-primary"
                                    : "expired text-danger"
                              }>
                              {course.status}
                            </td>
                            <td className='job-links'>
                              {/* <Link to={"#"} onClick={() => setCompany(true)}>
																  <i className="fa fa-eye"></i></Link> */}
                              <Link to={`/course-student-list/${course.id}`}>
                                <i
                                  className='fa fa-user'
                                  aria-hidden='true'></i>
                              </Link>
                              <Link
                                onClick={() => {
                                  deleteCourse(course.id);
                                }}
                                to={"#"}>
                                <i className='ti-trash'></i>
                              </Link>
                            </td>
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
                          total={maxPages * 10}
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
export default Coursemanage;
