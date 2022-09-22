import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "./../Layout/Header";
import Footer from "./../Layout/Footer";
import PageTitle from "./../Layout/PageTitle";
import Coursefindbox from "../Element/Coursefindbox";
import AccordsidebarCourse from "../Element/AccorsideCourse";
import moment from "moment";

import "moment/locale/vi"; // momment js

//Images
import { useDispatch, useSelector } from "react-redux";
import {
  getAllCoursesAction,
  getAllCourseInfosAction,
  setSearchCourseInfo,
} from "../../store/actions/Course/CourseActions";
import { Pagination } from "antd";
var bnr = require("./../../images/banner/bnr1.jpg");
function Courses() {
  const [page, setPage] = useState(1);
  const { courses, maxPages, search, totalDocs } = useSelector(
    (state) => state.CourseReducer
  );
  const dispatch = useDispatch();

  useEffect(() => {
    const action = getAllCoursesAction(page, search);
    dispatch(action);
  }, [page, search]);
  const handleChangeTime = (e) => {
    const action = setSearchCourseInfo({ timeLimitInDay: e.target.value });
    dispatch(action);
  };
  return (
    <>
      <Header />
      <div className="page-content bg-white">
        <div
          className="dez-bnr-inr overlay-black-middle"
          style={{ backgroundImage: "url(" + bnr + ")" }}
        >
          <PageTitle
            motherName="Trang chủ"
            activeName="Lọc khóa học theo dạng danh sách"
          />
        </div>

        <Coursefindbox />
        <div className="content-block">
          <div className="section-full browse-job p-b50">
            <div className="container">
              <div className="row">
                <AccordsidebarCourse />
                <div className="col-xl-9 col-lg-8 col-md-7">
                  <div className="job-bx-title clearfix">
                    <h5 className="font-weight-700 pull-left text-uppercase">
                      {totalDocs} khóa học
                    </h5>
                    <div className="float-right">
                      <span className="select-title">Sắp xếp</span>
                      <select
                        className="custom-btn"
                        onChange={handleChangeTime}
                      >
                        <option value="60">2 tháng trước</option>
                        <option value="30">1 tháng trước</option>
                        <option value="7">1 tuân trước</option>
                        <option value="3">3 ngày trước</option>
                      </select>
                      <div className="float-right p-tb5 p-r10">
                        <Link to={"/browse-job-filter-list"} className="p-lr5">
                          <i className="fa fa-th-list"></i>
                        </Link>
                        <Link to={"/browse-job-filter-grid"} className="p-lr5">
                          <i className="fa fa-th"></i>
                        </Link>
                      </div>
                    </div>
                  </div>
                  <ul className="post-job-bx">
                    {courses.map((item, index) => (
                      <li key={index}>
                        <div className="post-bx">
                          <div className="d-flex m-b30">
                            <div className="job-post-company">
                              <Link to={"#"}>
                                <span>
                                  <img alt="" src={item.image} />
                                </span>
                              </Link>
                            </div>
                            <div className="job-post-info">
                              <h4>
                                <Link to={`/course-detail/${item._id}`}>
                                  {item.title}
                                </Link>
                              </h4>
                              <ul>
                                <li>
                                  <i className="fa fa-map-marker"></i>{" "}
                                  {item.address?.detailAddress}
                                </li>
                                <li>
                                  <i className="fa fa-bookmark-o"></i>
                                  {item.company?.shortCompanyName}
                                </li>
                                <li>
                                  <i className="fa fa-clock-o"></i>{" "}
                                  {moment(item.createdAt).fromNow()}
                                </li>
                              </ul>
                            </div>
                          </div>
                          <div className="d-flex">
                            <div className="job-time mr-auto">
                              <Link to={`/course-detail/${item._id}`}>
                                <span> Đăng ký</span>
                              </Link>
                            </div>
                            <div className="salary-bx">
                              <span>{item?.cost.toLocaleString()} VNĐ</span>
                            </div>
                          </div>
                          <label className="like-btn">
                            <input type="checkbox" />
                            <span className="checkmark"></span>
                          </label>
                        </div>
                      </li>
                    ))}
                  </ul>

                  <div className="pagination-bx float-right m-t30">
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
export default Courses;
