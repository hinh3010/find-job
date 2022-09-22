import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "./../Layout/Header";
import Footer from "./../Layout/Footer";
import PageTitle from "./../Layout/PageTitle";
// import Jobfindbox from './../Element/Jobfindbox';
import Coursefindbox from "../Element/Coursefindbox";
import { Pagination } from "antd";
import moment from "moment";
import "moment/locale/vi";
import {
  getCoursesByTypeAction,
  getAllCoursesAction,
  setSearchCourseInfo,
} from "../../store/actions/Course/CourseActions";
import { useDispatch, useSelector } from "react-redux";

var bnr = require("./../../images/banner/bnr1.jpg");

function CoursesSoftSkill() {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);

  const { courses, maxPages, search, totalDocs } = useSelector(
    (state) => state.CourseReducer
  );

  useEffect(() => {
    const action = getAllCoursesAction(page, {
      ...search,
      type: "kỹ năng mềm",
    });
    dispatch(action);
    moment.locale("vi");
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
            motherName="Danh sách khóa học"
            activeName="Khoá học kỹ năng mềm"
          />
        </div>
        <div className="content-block">
          <Coursefindbox />
          <div className="section-full bg-white browse-job p-b50">
            <div className="container">
              <div className="job-bx-title clearfix">
                <h5 className="font-weight-700 pull-left text-uppercase">
                  {totalDocs} khóa học
                </h5>
                <div className="float-right">
                  <span className="select-title">Sắp xếp</span>
                  <select className="custom-btn" onChange={handleChangeTime}>
                    <option value="60">2 tháng trước</option>
                    <option value="30">1 tháng trước</option>
                    <option value="7">1 tuân trước</option>
                    <option value="3">3 ngày trước</option>
                  </select>
                </div>
              </div>
              <ul className="post-job-bx browse-job-grid row">
                {courses && courses.map((item, index) => (
                    <li className="col-lg-4 col-md-6" key={index}>
                      <div className="post-bx">
                        <div className="d-flex m-b30">
                          <div className="job-post-info">
                            <h5>
                              <Link to={`/course-detail/${item.id}`}>
                                {item.title}
                              </Link>
                            </h5>
                            <ul>
                              <li>
                                <i className="fa fa-map-marker"></i>
                                {item?.address?.detailAddress}
                              </li>
                              <li>
                                <i className="fa fa-clock-o"></i>
                                {moment(item.createdAt).fromNow()}
                              </li>
                            </ul>
                          </div>
                        </div>
                        <div className="d-flex">
                          <div className="job-time mr-auto">
                            <Link to={"#"}>
                              <span>Học phí</span>
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
      <Footer />
    </>
  );
}
export default CoursesSoftSkill;
