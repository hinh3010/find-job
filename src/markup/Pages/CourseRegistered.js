import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "./../Layout/Header";
import Footer from "./../Layout/Footer";
import PageTitle from "./../Layout/PageTitle";
import Coursefindbox from "../Element/Coursefindbox";
import { useDispatch, useSelector } from "react-redux";
import { getAllCoursesApplicationAction } from "../../store/actions/CourseApplication/CourseApplicationActions";
import moment from "moment";

import "moment/locale/vi"; // momment js
import { Pagination } from "antd";

var bnr = require("./../../images/banner/bnr1.jpg");

function CourseRegistered() {
  const { auth } = useSelector((state) => state.auth);
  const user = auth.user;

  const dispatch = useDispatch();

  const { coursesApplications, maxPages, currentPage } = useSelector(
    (state) => state.CourseApplicationReducer,
  );
  const [page, setPage] = useState(currentPage || 1);
  useEffect(() => {
    const action = getAllCoursesApplicationAction("", user.id, page);
    moment.locale("vi");

    dispatch(action);
  }, [page, user.id, dispatch]);

  return (
    <>
      <Header />
      <div className='page-content bg-white'>
        <div
          className='dez-bnr-inr overlay-black-middle'
          style={{ backgroundImage: "url(" + bnr + ")" }}>
          <PageTitle motherName='Trang chủ' activeName='Khóa học đã đăng kí' />
        </div>
        <div className='content-block'>
          {/* <Coursefindbox /> */}
          <div className='section-full bg-white browse-job p-b50'>
            <div className='container'>
              <div className='job-bx-title clearfix'>
                <h5 className='font-weight-700 pull-left text-uppercase'>
                  {coursesApplications.length} khóa học
                </h5>
                {/* <div className='float-right'>
                  <span className='select-title'>Sắp xếp</span>
                  <select className='custom-btn'>
                    <option>2 tháng trước</option>
                    <option>1 tháng trước</option>
                    <option>1 tuân trước</option>
                    <option>3 ngày trước</option>
                  </select>
                </div> */}
              </div>
              <ul className='post-job-bx browse-job-grid row'>
                {coursesApplications.map((item, index) => (
                  <li className='col-lg-6 col-md-6' key={index}>
                    <div className='post-bx'>
                      <div className='d-flex m-b30'>
                        <div className='job-post-info'>
                          <h5>
                            <Link
                              style={{ textOverflow: "ellipsis" }}
                              to={`/course-detail/${item.course.id}`}>
                              {item.course?.title}
                            </Link>
                          </h5>
                          <ul>
                            <li>
                              <i className='fa fa-map-marker'></i>{" "}
                              {item.address?.detailAddress}
                            </li>
                            <li>
                              <i className='fa fa-bookmark-o'></i> 7 pm : 9 pm
                            </li>
                            <li>
                              <i className='fa fa-clock-o'></i>{" "}
                              {moment(item.createdAt).fromNow()}
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className='d-flex'>
                        <div className='job-time mr-auto'>
                          <Link to={"#"}>
                            <span>Trạng Thái</span>
                          </Link>
                        </div>
                        <div className='salary-bx '>
                          <span className='text-primary'>{item.status}</span>
                        </div>
                      </div>
                      <label className='like-btn'>
                        <input type='checkbox' />
                        <span className='checkmark'></span>
                      </label>
                    </div>
                  </li>
                ))}
              </ul>
              <div className='pagination-bx m-t30'>
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
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
export default CourseRegistered;
