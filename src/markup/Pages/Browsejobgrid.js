import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "./../Layout/Header";
import Footer from "./../Layout/Footer";
import PageTitle from "./../Layout/PageTitle";
import Jobfindbox from "./../Element/Jobfindbox";
import "./../../css/custom.css";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllJobsAction,
  setSearchInfo,
} from "../../store/actions/Job/JobsActions";
import moment from "moment";
import "moment/locale/vi"; // momment js
import { Pagination } from "antd";
var bnr = require("./../../images/banner/bnr1.jpg");

function Browsejobgrid() {
  const { jobs, maxPages, search, totalDocs } = useSelector((state) => state.JobReducer);
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  useEffect(() => {
    moment.locale("vi");

    if (search) {
      const action = getAllJobsAction(page, search);
      dispatch(action);
    } else {
      const action = getAllJobsAction(page);
      dispatch(action);
    }
  }, [page, search]);
  const handleChangeTime = (e) => {
    const action = setSearchInfo({ timeLimitInDay: e.target.value });
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
            activeName="Hiển thị công việc dạng lưới"
          />
        </div>
        <div className="content-block">
          <Jobfindbox />
          <div className="section-full bg-white browse-job p-b50">
            <div className="container">
              <div className="job-bx-title clearfix">
                <h5 className="font-weight-700 pull-left text-uppercase">
                  {totalDocs} công việc
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
                {jobs.map((item, index) => (
                  <li className="col-lg-4 col-md-6" key={index}>
                    <div className="post-bx">
                      <div className="d-flex m-b30">
                        <div className="job-post-info">
                          <h5>
                            <Link to={`/job-detail/${item._id}`}>
                              {item.title}
                            </Link>
                          </h5>
                          <h6 class="recent-job__name">
                            <a href="/">{item.company?.fullCompanyName}</a>
                          </h6>
                          <ul>
                            <li>
                              <i className="fa fa-map-marker"></i>{" "}
                              {item.address?.detailAddress}
                            </li>
                            <li>
                              <i className="fa fa-bookmark-o"></i>{" "}
                              {item.type.toUpperCase()}
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
                          <Link to={"#"}>
                            <span> {item.type.toUpperCase()}</span>
                          </Link>
                        </div>
                        <div className="salary-bx">
                          <span>
                            {" "}
                            {item.minSalary.toLocaleString()} VNĐ -{" "}
                            {item.maxSalary.toLocaleString()} VNĐ
                          </span>
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
export default Browsejobgrid;
