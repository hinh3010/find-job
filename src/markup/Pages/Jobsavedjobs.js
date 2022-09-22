import React from "react";
import { Link } from "react-router-dom";
import Header from "./../Layout/Header";
import Footer from "./../Layout/Footer";
import SavedJobs from "./../Element/SavedJobs";
import { useSelector } from "react-redux";

function Jobsavedjobs() {
  const { auth } = useSelector((state) => state.auth);
  const user = auth.user;

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
                    <div className='candidate-info'>
                      <div className='candidate-detail text-center'>
                        <div className='canditate-des'>
                          <Link to={"#"}>
                            <img
                              alt=''
                              src={require("./../../images/team/pic1.jpg")}
                            />
                          </Link>
                          <div
                            className='upload-link'
                            title='update'
                            data-toggle='tooltip'
                            data-placement='right'>
                            <input type='file' className='update-flie' />
                            <i className='fa fa-camera'></i>
                          </div>
                        </div>
                        <div className='candidate-title'>
                          <div className=''>
                            <h4 className='m-b5'>
                              <Link to={"#"}>{user.fullName}</Link>
                            </h4>
                            {/* <p className='m-b0'>
                              <Link to={"#"}>Web developer</Link>
                            </p> */}
                          </div>
                        </div>
                      </div>
                      <ul>
                        <li>
                          <Link to={"/jobs-profile"}>
                            <i className='fa fa-user-o' aria-hidden='true'></i>
                            <span>Profile</span>
                          </Link>
                        </li>
                        <li>
                          <Link to={"/jobs-my-resume"}>
                            <i
                              className='fa fa-file-text-o'
                              aria-hidden='true'></i>
                            <span>Lý lịch</span>
                          </Link>
                        </li>
                        {/* <li><Link to={"/jobs-saved-jobs"} className="active">
													<i className="fa fa-heart-o" aria-hidden="true"></i>
													<span>Công việc đã lưu</span></Link></li> */}
                        <li>
                          <Link to={"/jobs-applied-job"}>
                            <i
                              className='fa fa-briefcase'
                              aria-hidden='true'></i>
                            <span>Công việc đã ứng tuyển</span>
                          </Link>
                        </li>
                        <li>
                          <Link to={"/jobs-alerts"}>
                            <i className='fa fa-bell-o' aria-hidden='true'></i>
                            <span>Thông báo công việc</span>
                          </Link>
                        </li>
                        <li>
                          <Link to={"/jobs-cv-manager"}>
                            <i
                              className='fa fa-id-card-o'
                              aria-hidden='true'></i>
                            <span>Quản lý CV</span>
                          </Link>
                        </li>
                        <li>
                          <Link to={"/jobs-change-password"}>
                            <i className='fa fa-key' aria-hidden='true'></i>
                            <span>Đổi mật khẩu</span>
                          </Link>
                        </li>
                        <li>
                          <Link to={"./"}>
                            <i
                              className='fa fa-sign-out'
                              aria-hidden='true'></i>
                            <span>Đăng xuất</span>
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className='col-xl-9 col-lg-8 m-b30'>
                  <SavedJobs />
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

export default Jobsavedjobs;
