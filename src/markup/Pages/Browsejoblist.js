import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Header from "./../Layout/Header";
import Footer from "./../Layout/Footer";
import PageTitle from "./../Layout/PageTitle";
import Jobfindbox from "./../Element/Jobfindbox";
import "./../../css/custom.css";
//Images
import Icon1 from "./../../images/logo/icon1.png";
import bnr from "./../../images/banner/bnr1.jpg";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllJobsAction,
  setSearchInfo,
} from "../../store/actions/Job/JobsActions";
import moment from "moment";
import "moment/locale/vi"; // momment js
import { Pagination } from "antd";

const brandLogo = [
  { image: Icon1 },
  { image: Icon1 },
  { image: Icon1 },
  { image: Icon1 },
  { image: Icon1 },
  { image: Icon1 },
  { image: Icon1 },
  { image: Icon1 },
  { image: Icon1 },
];

const bg1 = require('../../images/background/bg1.jpg');

function Browsejoblist() {
  const { jobs, maxPages, search, totalDocs } = useSelector((state) => state.JobReducer);
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  useEffect(() => {
    moment.locale("vi");
    if(search){
      const action = getAllJobsAction(page,search);
      dispatch(action);
    }
    else{
      const action = getAllJobsAction(page);
      dispatch(action);
    }
    // if (!search) {
    //   const action = getAllJobsAction(page);
    //   dispatch(action);
    // } else {
    //   if (search.search !== "") {
    //     const action = getAllJobsAction(
    //       1,
    //       search.provinceId && search.search
    //         ? `provinceId=${search.provinceId}&search=${search.search}`
    //         : search.provinceId && !search.search
    //         ? `provinceId=${search.provinceId}`
    //         : `&search=${search.search}`,
    //     );
    //     dispatch(action).then((res) => {
    //       const removeSearch = setSearchInfo(undefined);
    //       dispatch(removeSearch);
    //     });
    //   } else if (search.search === "") {
    //     if (search.provinceId) {
    //       const action = getAllJobsAction(1, `provinceId=${search.provinceId}`);
    //       dispatch(action).then((res) => {
    //         const removeSearch = setSearchInfo(undefined);
    //         dispatch(removeSearch);
    //       });
    //     } else {
    //       const action = getAllJobsAction(1, "");
    //       dispatch(action).then((res) => {
    //         const removeSearch = setSearchInfo(undefined);
    //         dispatch(removeSearch);
    //       });
    //     }
    //   }
    // }
  }, [page, search]);
  const handleChangeTime = (e) => {
    const action = setSearchInfo({ timeLimitInDay: e.target.value });
    dispatch(action);
  };
  return (
    <>
      <Header />
      <div className='page-content bg-white'>
        <div
          className='dez-bnr-inr overlay-black-middle'
          style={{ backgroundImage: "url(" + bnr + ")" }}>
          <PageTitle
            motherName='Trang ch???'
            activeName='Hi???n th??? c??ng vi???c theo d???ng danh s??ch'
          />
        </div>
        <Jobfindbox />
        <div className='content-block'>
          <div className='section-full browse-job p-b50'>
            <div className='container'>
              <div className='row'>
                <div className='col-xl-9 col-lg-8 col-md-7'>
                  <div className='job-bx-title clearfix'>
                    <h5 className='font-weight-700 pull-left text-uppercase'>
                      {totalDocs} c??ng vi???c
                    </h5>
                    <div className='float-right'>
                      <span className='select-title'>S???p x???p</span>
                      <select
                        className="custom-btn"
                        onChange={handleChangeTime}
                      >
                        <option value="60">2 th??ng tr?????c</option>
                        <option value="30">1 th??ng tr?????c</option>
                        <option value="7">1 tu??n tr?????c</option>
                        <option value="3">3 ng??y tr?????c</option>
                      </select>
                    </div>
                  </div>
                  <ul className='post-job-bx'>
                    {jobs.map((item, index) => (
                      <li key={index}>
                        <div className='post-bx'>
                          <div className='d-flex m-b30'>
                            <div className='job-post-company'>
                              <Link to={"#"}>
                                <span>
                                  <img className="w-100 h-100" style={{objectFit: 'cover' }} alt='' src={bg1} />
                                </span>
                              </Link>
                            </div>
                            <div className='job-post-info'>
                              <h4>
                                <Link to={`/job-detail/${item._id}`}>
                                  {item.title}
                                </Link>
                              </h4>
                              <h6 class='recent-job__name'>
                                <a href='/'>{item.company?.fullCompanyName}</a>
                              </h6>
                              <ul>
                                <li>
                                  <i className='fa fa-map-marker'></i>
                                  {item.address?.detailAddress}
                                </li>
                                <li>
                                  <i className='fa fa-bookmark-o'></i>{" "}
                                  {item.type.toUpperCase()}
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
                                <span>Full Time</span>
                              </Link>
                            </div>
                            <div className='salary-bx'>
                              <span>
                                {" "}
                                {item.minSalary.toLocaleString()} VN?? -{" "}
                                {item.maxSalary.toLocaleString()} VN??
                              </span>
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
                <div className='col-xl-3 col-lg-4 col-md-5'>
                  <div className='sticky-top'>
                    <div className='candidates-are-sys m-b30'>
                      <div className='candidates-bx'>
                        <div className='testimonial-pic radius'>
                          <img
                            src={require("./../../images/testimonials/pic3.jpg")}
                            alt=''
                            width='100'
                            height='100'
                          />
                        </div>
                        <div className='testimonial-text'>
                          <p>
                            T??i v???a nh???n ???????c m???t c??ng vi???c m?? t??i ???? ???ng tuy???n
                            qua TSC! T??i ???? s??? d???ng trang web m???i l??c trong qu??
                            tr??nh t??m vi???c c???a m??nh.
                          </p>
                        </div>
                        <div className='testimonial-detail'>
                          {" "}
                          <strong className='testimonial-name'>
                            Richard Anderson
                          </strong>{" "}
                          <span className='testimonial-position'>
                            H?? N???i, Vi???t Nam
                          </span>{" "}
                        </div>
                      </div>
                    </div>
                    <ul className='company-logo-wg sidebar bg-white job-bx m-b30 clearfix'>
                      {brandLogo.map((item, index) => (
                        <li className='brand-logo' key={index}>
                          <Link to={"#"}>
                            <img src={item.image} alt='' />
                          </Link>
                        </li>
                      ))}
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
export default Browsejoblist;
