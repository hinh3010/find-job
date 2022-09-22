import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "../../css/custom.css";
import { getAllJobsAction } from "../../store/actions/Job/JobsActions";
import moment from "moment";
import "moment/locale/vi"; // momment js

function Jobsection() {
  const dispatch = useDispatch();
  useEffect(() => {
    moment.locale("vi");

    const action = getAllJobsAction();
    dispatch(action);
  }, []);

  const { jobs } = useSelector((state) => state.JobReducer);
  return (
    <div className='section-full bg-white content-inner-2'>
      <div className='container'>
        <div className='d-flex job-title-bx section-head'>
          <div className='mr-auto'>
            <h2 className='m-b5'>Thông tin tuyển dụng gần đây</h2>
            <h6 className='fw4 m-b0'>20+ Công việc được thêm mới gần đây</h6>
          </div>
          <div className='align-self-end'>
            <Link to={"/browse-job-list"} className='site-button button-sm'>
              Duyệt qua tất cả công việc &nbsp;
              <i className='fa fa-long-arrow-right'></i>
            </Link>
          </div>
        </div>
        <div className='row'>
          <div className='col-lg-9'>
            <ul className='post-job-bx browse-job'>
              {jobs?.map((item, index) => (
                <li key={index}>
                  <div className='post-bx'>
                    <div className='d-flex m-b30'>
                      <div className='job-post-company'>
                        <span>
                          <img
                            alt=''
                            className='h-100'
                            src={
                              item.image ||
                              "https://hocvienagile.com/wp-content/uploads/2021/04/Senior-Dev.jpg"
                            }
                          />
                        </span>
                      </div>
                      <div className='job-post-info'>
                        <h4>
                          <Link to={`/job-detail/${item?._id}`}>
                            {item?.title}
                          </Link>
                        </h4>
                        <h6 className='recent-job__name'>
                          <Link to={``}>{item?.company?.fullCompanyName}</Link>
                        </h6>
                        <ul>
                          <li>
                            <i className='fa fa-map-marker'></i>{" "}
                            {item?.address?.detailAddress}
                          </li>
                          <li>
                            <i className='fa fa-bookmark-o'></i>
                            {item.type.toUpperCase()}
                          </li>
                          <li>
                            <i className='fa fa-clock-o'></i>
                            {moment(item.jobStartDate).fromNow()}
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className='d-flex'>
                      <div className='job-time mr-auto'>
                        <Link to={"#"}>
                          <span>{}</span>
                        </Link>
                      </div>
                      <div className='salary-bx'>
                        <span>
                          {" "}
                          {item.minSalary.toLocaleString()} VNĐ -{" "}
                          {item.maxSalary.toLocaleString()} VNĐ
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
            <div className='m-t30'>
              <div className='d-flex'>
                {/* <Link className='site-button button-sm mr-auto' to={""}>
                  <i className='ti-arrow-left'></i> Tiến tới
                </Link>
                <Link className='site-button button-sm' to={""}>
                  Lùi lại <i className='ti-arrow-right'></i>
                </Link> */}
              </div>
            </div>
          </div>
          <div className='col-lg-3'>
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
                      Tôi vừa nhận được một công việc mà tôi đã ứng tuyển qua
                      TSC! Tôi đã sử dụng trang web mọi lúc trong quá trình tìm
                      việc của mình.
                    </p>
                  </div>
                  <div className='testimonial-detail'>
                    {" "}
                    <strong className='testimonial-name'>
                      Richard Anderson
                    </strong>{" "}
                    <span className='testimonial-position'>
                      Hà Nội, Việt Nam
                    </span>{" "}
                  </div>
                </div>
              </div>
              <div className='quote-bx'>
                <div className='quote-info'>
                  <h4>
                    Tạo sự khác biệt với Sơ yếu lý lịch trực tuyến của bạn!
                  </h4>
                  <p>
                    Sơ yếu lý lịch của bạn trong vài phút với trợ lý sơ yếu lý
                    lịch TSC đã sẵn sàng!
                  </p>
                  <Link to={"/register-2"} className='site-button'>
                    Tạo tài khoản
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Jobsection;
