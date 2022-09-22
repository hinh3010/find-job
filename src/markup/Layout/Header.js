import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Modal } from "react-bootstrap";
import { connect } from "react-redux";
import Logout from "./Logout";
import moment from 'moment'
import "./../../css/custom.css";
import "./../../css/responsiveUI.css";
import logo2 from "./../../images/logo/tsc__logo.png";
import { BASE_URL } from "../../config/BASE_URL";
import { getAllNotification, readAll, updateNotification } from "../../store/actions/Notification/NotificationAction";
import { getAllNotifications } from "../../services/NotificationServices/NotificationServices";
import { Result, Button } from "antd";
var bnr3 = require("./../../images/background/bg3.jpg");

class Header extends Component {
  state = {
    // initial state
    show: false,
    // dataLogin: {},
    showLogin: false,
    showAlert: false,
    allNotification: []
  };

  handleClose = () => {
    this.setState({ show: false });
  };
  handleShow = () => {
    this.setState({ show: true });
  };

  componentDidMount() {


    // sidebar open/close
    var Navicon = document.querySelector(".navicon");
    var sidebarmenu = document.querySelector(".myNavbar ");
    // PC
    var showNotification = document.querySelector(".notification__icon");
    var showHandleLogin = document.querySelector(".notification--wrapper");
    //Tablet
    var showNotificationTablet = document.querySelector(
      ".notification__icon--wide-tablet",
    );
    var showHandleLoginTablet = document.querySelector(
      ".notification__avatar--wide-tablet",
    );
    //Mobile
    var showNotificationMobile = document.querySelector(".justify-icon__belt");

    function toggleFunc() {
      sidebarmenu.classList.toggle("show");
      //   Navicon.classList.toggle('open');
      var notification_subnav = document.querySelector(
        ".notification__subnav--medium-mobile",
      ).classList;
      var notification_style = document.querySelector(
        ".notification__belt--medium-mobile",
      ).classList;
      notification_subnav.remove("active__notification");
      notification_style.remove("active__notification-style");
    }
    Navicon.addEventListener("click", toggleFunc);

    // Sidenav li open close
    var navUl = [].slice.call(
      document.querySelectorAll(".navbar-nav > li > a, .sub-menu > li > a"),
    );
    for (var y = 0; y < navUl.length; y++) {
      navUl[y].addEventListener("click", function () {
        checkLi(this);
      });
    }

    function checkLi(current) {
      current.parentElement.parentElement
        .querySelectorAll("li")
        .forEach((el) =>
          current.parentElement !== el ? el.classList.remove("open") : "",
        );
      setTimeout(() => {
        current.parentElement.classList.toggle("open");
      }, 100);
    }
    /**PC */
    showNotification.addEventListener("click", onHanleToggleNotification);
    function onHanleToggleNotification() {
      var notification_subnav = document.querySelector(
        ".notification__subnav",
      ).classList;
      var notification_style = document.querySelector(
        ".notification__icon--belt",
      ).classList;
      notification_subnav.toggle("active__notification");
      notification_style.toggle("active__notification-style");
      /**Remove Classlist Login PC */
      var notificationLogin_subnav = document.querySelector(
        ".account-setting__subnav",
      ).classList;
      notificationLogin_subnav.remove("active__notification");
      var notificationLogin_style = document.querySelector(
        ".notification__avatar",
      ).classList;
      notificationLogin_style.remove("active__login-style");
    }

    showHandleLogin.addEventListener("click", onHandleToggleLogin);
    function onHandleToggleLogin() {
      var notificationLogin_subnav = document.querySelector(
        ".account-setting__subnav",
      ).classList;
      var notificationLogin_style = document.querySelector(
        ".notification__avatar",
      ).classList;
      notificationLogin_subnav.toggle("active__notification");
      notificationLogin_style.toggle("active__login-style");
      /**Remove Classlist Notification PC */
      var notification_subnav = document.querySelector(
        ".notification__subnav",
      ).classList;
      notification_subnav.remove("active__notification");
      var notification_style = document.querySelector(
        ".notification__icon--belt",
      ).classList;
      notification_style.remove("active__notification-style");
    }
    /**Tablet */
    showNotificationTablet.addEventListener(
      "click",
      onHanleToggleNotificationTablet,
    );
    function onHanleToggleNotificationTablet() {
      var notification_subnav = document.querySelector(
        ".notification__subnav--wide-tablet",
      ).classList;
      var notification_style = document.querySelector(
        ".notification__belt-wide-tablet",
      ).classList;
      notification_subnav.toggle("active__notification");
      notification_style.toggle("active__notification-style");
      /**Remove Classlist Login PC */
      var notificationLogin_subnav = document.querySelector(
        ".account-setting__subnav--wide-tablet",
      ).classList;
      notificationLogin_subnav.remove("active__notification");
    }

    showHandleLoginTablet.addEventListener("click", onHandleToggleLoginTablet);
    function onHandleToggleLoginTablet() {
      var notificationLogin_subnav = document.querySelector(
        ".account-setting__subnav--wide-tablet",
      ).classList;
      notificationLogin_subnav.toggle("active__notification");
      /**Remove Classlist Notification PC */
      var notification_subnav = document.querySelector(
        ".notification__subnav--wide-tablet",
      ).classList;
      var notification_style = document.querySelector(
        ".notification__belt-wide-tablet",
      ).classList;
      notification_subnav.remove("active__notification");
      notification_style.remove("active__notification-style");
    }
    // Mobile
    showNotificationMobile.addEventListener(
      "click",
      onHanleToggleNotificationMobile,
    );
    function onHanleToggleNotificationMobile() {
      var notification_subnav = document.querySelector(
        ".notification__subnav--medium-mobile",
      ).classList;
      var notification_style = document.querySelector(
        ".notification__belt--medium-mobile",
      ).classList;
      notification_subnav.toggle("active__notification");
      notification_style.toggle("active__notification-style");
      sidebarmenu.classList.remove("show");
    }
  }

  componentWillMount() {

    const user = JSON.parse(localStorage.getItem('userDetail'));
    const userId = user.user.id;
    const token = user.accessToken.token;

    this.props.getAllNotifications(userId, token);

  }

  render() {
    const notification = this.props.allNotification.reverse();
    const user = JSON.parse(localStorage.getItem('userDetail'));
    const userId = user.user.id;
    const token = user.accessToken.token;

    let count = 0;
    notification.forEach((item) => {
      if (item.status === "UNREAD") {
        count = count + 1;
      }
    })

    const accountType = this.props.dataLogin.accountType;

    return (
      <>
        <header className='site-header mo-left header fullwidth'>
          <div className='sticky-header main-bar-wraper navbar-expand-lg'>
            <div className='main-bar clearfix'>
              <div className='container clearfix'>
                <div className='logo-header mostion'>
                  <Link to={"/"}>
                    <img src={logo2} className='logo' alt='img' />
                  </Link>
                </div>

                <button
                  className='navbar-toggler collapsed navicon  justify-content-end'
                  type='button'
                  data-toggle='collapse'
                  data-target='#navbarNavDropdown'
                  aria-controls='navbarNavDropdown'
                  aria-expanded='false'
                  aria-label='Toggle navigation'>
                  <span></span>
                  <span></span>
                  <span></span>
                </button>
                {/* Mobile Notification*/}
                <button
                  className='navbar-toggler collapsed navicon justify-content-end justify-icon__belt'
                  type='button'
                  data-toggle='collapse'
                  data-target='#navbarNavDropdown'
                  aria-controls='navbarNavDropdown'
                  aria-expanded='false'
                  aria-label='Toggle navigation'>
                  <div className='notification__icon--belt--medium-mobile'>
                    <div className='notification__belt--medium-mobile'>
                      <i className='fa fa-bell' aria-hidden='true'></i>
                    </div>
                    {count === 0 ?
                      ''
                      :
                      <div className='notification__alert--medium-mobile'>{`${count}+`}</div>
                    }
                  </div>
                  <div className='notification__subnav--medium-mobile'>
                    <h5 className='notification__heading'>Thông báo</h5>
                    <ul className='notification__subnav--list'>
                      {notification?.map((item, index) => {
                        let title = item.template.templateFormat;
                        item.template.params.forEach((value) => {
                          title = title.replace(`{{${value}}}`, item.data[`${value}`]);
                        })

                        return <li
                          onClick={() => {
                            this.props.updateNotifications(item.id, token, userId)
                          }}
                          key={index}
                          className='notification__wrap'
                        >
                          <img
                            alt="logo"
                            className='notification__logo'
                            src={logo2}
                          />
                          <div className={item.status === "UNREAD" ? 'notification__item' : 'notification__item seen'}>
                            <div className='notification__title--tablet'>
                              <div className="notification__content">
                                {title}
                              </div>
                            </div>
                            <div className='notification__time'>
                              <p className="m-0">{moment(item.createdAt).fromNow()}</p>
                            </div>
                          </div>
                        </li>
                      })}
                    </ul>
                    <div onClick={() => {
                      this.props.readAll(userId, token);
                    }} className="notification__marked">Đánh dấu tất cả là đã đọc</div>
                  </div>
                </button>

                {/* PC */}
                <div className='extra-nav'>
                  <div
                    className='notification__container'
                    style={{ display: "flex" }}>
                    <div className='notification__avatar'>
                      <div className='notification--wrapper'>
                        {this.props.dataLogin?.avatarUrl?.indexOf(
                          "https://",
                        ) === -1 ? (
                          <img
                            className='notification__avatar--img'
                            alt=''
                            src={`${BASE_URL}/${this.props.dataLogin?.avatarUrl}`}
                          />
                        ) : (
                          <img
                            className='notification__avatar--img'
                            alt=''
                            src={this.props.dataLogin?.avatarUrl}
                          />
                        )}
                        <span className='notification__avatar--name'>
                          {this.props.dataLogin && this.props.dataLogin.email}
                        </span>

                        <div className='account-setting__subnav'>
                          <ul
                            className='account-setting__list'
                            style={{ marginBottom: "3px" }}>
                            {accountType === "COMPANY" ? (
                              <Link
                                to='/company-profile'
                                className='account-setting__item'>
                                <Link to='/company-profile'>
                                  Đổi thông tin Doanh nghiệp
                                </Link>
                              </Link>
                            ) : (
                              ""
                            )}
                            <Link
                              to='/jobs-change-password'
                              className='account-setting__item'>
                              <Link to='/jobs-change-password'>
                                Đổi mật khẩu
                              </Link>
                            </Link>
                            <Link className='account-setting__item'>
                              <Logout />
                            </Link>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className='notification__icon'>
                      <div className='notification__icon--wrap'>
                        <div className='notification__icon--belt'>
                          <i style={{ userSelect: 'none' }} className='fa fa-bell' aria-hidden='true'></i>
                          {count === 0 ?
                            ''
                            :
                            <div className='notification__alert'>{`${count}+`}</div>
                          }
                        </div>

                        <div className='notification__subnav'>
                          <h5 className='notification__heading'>Thông báo</h5>
                          <ul className='notification__subnav--list'>
                            {notification.length > 0 ?
                              notification?.map((item, index) => {
                                let title = item.template.templateFormat;
                                item.template.params.forEach((value) => {
                                  title = title.replace(`{{${value}}}`, item.data[`${value}`]);
                                })
                                return <li
                                  onClick={() => {
                                    this.props.updateNotifications(item.id, token, userId)
                                  }}
                                  key={index}
                                  className='notification__wrap'
                                >
                                  <img
                                    alt="logo"
                                    className='notification__logo'
                                    src={logo2}
                                  />
                                  <div className={item.status === "UNREAD" ? 'notification__item' : 'notification__item seen'}>
                                    <div className='notification__title'>
                                      <span className="notification__content">
                                        {title}
                                      </span>
                                    </div>
                                    <div className='notification__time'>
                                      <p className="m-0">{moment(item.createdAt).fromNow()}</p>
                                    </div>
                                  </div>
                                </li>
                              })
                              :
                              <div className="d-flex h-100">
                                <Result
                                  status="warning"
                                  title="Bạn không có thông báo nào!"
                                  className="m-auto"
                                />
                              </div>
                            }
                          </ul>
                          <div onClick={() => {
                            this.props.readAll(userId, token);
                          }} className="notification__marked">Đánh dấu tất cả là đã đọc</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Mobile Config Logout */}
                <div
                  className='header-nav navbar-collapse collapse myNavbar justify-content-start'
                  id='navbarNavDropdown'>
                  <div className='logo-header mostion d-md-block d-lg-none'>
                    <Link to={"/"} className='dez-page'>
                      <img src={logo2} alt='' />
                    </Link>
                  </div>
                  <ul className='nav navbar-nav'>
                    <li className='notification__avatar--medium-mobile'>
                      <Link to={"#"}>
                        {this.props.dataLogin?.avatarUrl?.indexOf(
                          "https://",
                        ) === -1 ? (
                          <img
                            className='notification__avatar--img--medium-mobile'
                            alt=''
                            src={`${BASE_URL}/${this.props.dataLogin?.avatarUrl}`}
                          />
                        ) : (
                          <img
                            className='notification__avatar--img--medium-mobile'
                            alt=''
                            src={this.props.dataLogin?.avatarUrl}
                          />
                        )}
                        &nbsp;
                        <span className='notification__avatar--name--medium-mobile'>
                          {this.props.dataLogin && this.props.dataLogin.email}
                          <i className='fa fa-chevron-down icon-justify'></i>
                        </span>
                      </Link>
                      <ul className='sub-menu'>
                        {accountType === "COMPANY" ? (
                          <li className='account-setting__item--medium-mobile'>
                            <Link
                              className='account-setting__item--medium-mobile'
                              to='/company-profile'>
                              Đổi thông tin Doanh nghiệp
                            </Link>
                          </li>
                        ) : (
                          ""
                        )}
                        <li className='account-setting__item--medium-mobile'>
                          <Link
                            className='account-setting__item--medium-mobile'
                            to='/jobs-change-password'>
                            Đổi mật khẩu
                          </Link>
                        </li>
                        <li className='account-setting__item--medium-mobile'>
                          <Link
                            className='account-setting__item--medium-mobile'
                            to='/jobs-alerts'>
                            <Logout />
                          </Link>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <Link to={"#"}>
                        Đào tạo <i className='fa fa-chevron-down'></i>
                      </Link>
                      <ul className='sub-menu'>
                        <li>
                          <Link to={"#"} className='dez-page course-list'>
                            Khóa học <i className='fa fa-angle-right'></i>
                            <div className='course-subnav'>
                              <ul className='course-subnav__list'>
                                <li className='course-subnav-item'>
                                  <Link to='/courses/foreign-language'>
                                    Ngoại ngữ
                                  </Link>
                                </li>
                                <li className='course-subnav-item'>
                                  <Link to='/courses/social-skill'>
                                    Kỹ năng sống
                                  </Link>
                                </li>
                                <li className='course-subnav-item'>
                                  <Link to='/courses/soft-skill'>
                                    Kỹ năng mềm
                                  </Link>
                                </li>
                                <li className='course-subnav-item'>
                                  <Link to='/courses/career-skill'>
                                    Kỹ năng nghề nghiệp
                                  </Link>
                                </li>
                                <li className='course-subnav-item'>
                                  <Link to='/courses'>Tất cả khóa học</Link>
                                </li>
                              </ul>
                            </div>
                          </Link>
                          <ul className='sub-menu sub-menu-mobile'>
                            <li className='course-subnav-item'>
                              <Link to='/courses/foreign-language'>
                                Ngoại ngữ
                              </Link>
                            </li>
                            <li className='course-subnav-item'>
                              <Link to='/courses/social-skill'>
                                Kỹ năng sống
                              </Link>
                            </li>
                            <li className='course-subnav-item'>
                              <Link to='/courses/soft-skill'>Kỹ năng mềm</Link>
                            </li>
                            <li className='course-subnav-item'>
                              <Link to='/courses/career-skill'>
                                Kỹ năng nghề nghiệp
                              </Link>
                            </li>
                            <li className='course-subnav-item'>
                              <Link to='/courses'>Tất cả khóa học</Link>
                            </li>
                          </ul>
                        </li>
                        {accountType === "APPLICANT" && (
                          <li>
                            <Link
                              to={"/course-registered"}
                              className='dez-page'>
                              Khóa học đã đăng kí
                            </Link>
                          </li>
                        )}

                        <li>
                          <Link to={"/course-free"} className='dez-page'>
                            Khóa học miễn phí{" "}
                            <span className='new-page'>Free</span>
                          </Link>
                        </li>
                        {accountType === "COMPANY" ? (
                          <>
                            <li>
                              <Link to={"/course-create"} className='dez-page'>
                                Tạo khóa học
                              </Link>
                            </li>
                            <li>
                              <Link to={"/course-manage"} className='dez-page'>
                                Quản lý khóa học
                              </Link>
                            </li>
                          </>
                        ) : (
                          ""
                        )}
                      </ul>
                    </li>
                    <li>
                      <Link to={"#"} className='dez-page'>
                        Tìm kiếm công việc{" "}
                        <i className='fa fa-chevron-down'></i>
                      </Link>
                      <ul className='sub-menu'>
                        <li>
                          <Link to={"/browse-job-list"} className='dez-page'>
                            Dạng danh sách
                          </Link>
                        </li>
                        <li>
                          <Link to={"/browse-job-grid"} className='dez-page'>
                            Dạng lưới <span className='new-page'>New</span>
                          </Link>
                        </li>
                        <li>
                          <Link
                            to={"/browse-job-filter-list"}
                            className='dez-page'>
                            Lọc theo danh sách{" "}
                            <span className='new-page'>New</span>
                          </Link>
                        </li>
                        <li>
                          <Link
                            to={"/browse-job-filter-grid"}
                            className='dez-page'>
                            Lọc theo lưới <span className='new-page'>New</span>
                          </Link>
                        </li>
                      </ul>
                    </li>
                    {accountType === "APPLICANT" ? (
                      <li>
                        <Link to={"#"}>
                          Người ứng tuyển<i className='fa fa-chevron-down'></i>
                        </Link>
                        <ul className='sub-menu'>
                          <li>
                            <Link to={"/jobs-profile"} className='dez-page'>
                              Profile của tôi
                              <span className='new-page'>New</span>
                            </Link>
                          </li>
                          <li>
                            <Link to={"/jobs-my-resume"} className='dez-page'>
                              Lý lịch của tôi{" "}
                              <span className='new-page'>New</span>
                            </Link>
                          </li>
                          <li>
                            <Link to={"/jobs-applied-job"} className='dez-page'>
                              Công việc đã ứng tuyển{" "}
                              <span className='new-page'>New</span>
                            </Link>
                          </li>
                          <li>
                            <Link to={"/jobs-alerts"} className='dez-page'>
                              Thông báo công việc{" "}
                              <span className='new-page'>New</span>
                            </Link>
                          </li>
                          {/* <li><Link to={"/jobs-saved-jobs"} className="dez-page">Công việc đã lưu <span className="new-page">New</span></Link></li> */}
                          <li>
                            <Link to={"/jobs-cv-manager"} className='dez-page'>
                              Quản lý CV <span className='new-page'>New</span>
                            </Link>
                          </li>
                          <li>
                            <Link
                              to={"/jobs-change-password"}
                              className='dez-page'>
                              Đổi mật khẩu <span className='new-page'>New</span>
                            </Link>
                          </li>
                        </ul>
                      </li>
                    ) : (
                      ""
                    )}
                    {accountType === "COMPANY" ? (
                      <li>
                        <Link to={"#"}>
                          Nhà tuyển dụng<i className='fa fa-chevron-down'></i>
                        </Link>
                        <ul className='sub-menu'>
                          <li>
                            <Link to={"/company-profile"} className='dez-page'>
                              Thông tin công ty{" "}
                              <span className='new-page'>New</span>
                            </Link>
                          </li>
                          {/* <li><Link to={"/company-resume"} className="dez-page">Employer Resume <span className="new-page">New</span></Link></li> */}
                          <li>
                            <Link
                              to={"/company-post-jobs"}
                              className='dez-page'>
                              Đăng bài post{" "}
                              <span className='new-page'>New</span>
                            </Link>
                          </li>
                          <li>
                            <Link
                              to={"/company-resume"}
                              className='dez-page'>
                              Quản lý CV{" "}
                              <span className='new-page'>New</span>
                            </Link>
                          </li>
                          
                          <li>
                            <Link
                              to={"/company-manage-job"}
                              className='dez-page'>
                              Quản lý công việc{" "}
                              <span className='new-page'>New</span>
                            </Link>
                          </li>

                          {/* <li><Link to={"/browse-candidates"} className="dez-page">Đơn ứng tuyển</Link></li> */}
                        </ul>
                      </li>
                    ) : (
                      ""
                    )}
                    {accountType === "COMPANY" ? (
                      <li>
                        {" "}
                        <Link
                          to={"/company-survey"}
                        >
                          Khảo sát
                        </Link>
                      </li>
                    ) : (
                      ""
                    )}
                    <li>
                      <Link to={"#"}>
                        Giới thiệu<i className='fa fa-chevron-down'></i>
                      </Link>
                      <ul className='sub-menu'>
                        <li>
                          <Link to={"/companies"} className='dez-page'>
                            Đối tác
                          </Link>
                        </li>
                        {/* <li><Link to={"/job-detail"} className="dez-page">Job Detail</Link></li> */}
                        {/* <li><Link to={"/free-job-alerts"} className="dez-page">free job alerts <span className="new-page">New</span></Link></li> */}

                        <li>
                          <Link to={"/about-us"} className='dez-page'>
                            Thông tin công ty
                          </Link>
                        </li>
                        <li>
                          <Link to={"/contact"} className='dez-page'>
                            Liên hệ
                          </Link>
                        </li>
                        {/* <li><Link to={'#'} className="dez-page">Jobs<i className="fa fa-angle-right"></i></Link>
													<ul className="sub-menu">
														<li><Link to={"/category-all-jobs"} className="dez-page">all jobs <span className="new-page">New</span></Link></li>
														<li><Link to={"/category-company-jobs"} className="dez-page">company jobs <span className="new-page">New</span></Link></li>
														<li><Link to={"/category-designations-jobs"} className="dez-page">designations jobs <span className="new-page">New</span></Link></li>
														<li><Link to={"/category-jobs"} className="dez-page">category jobs <span className="new-page">New</span></Link></li>
														<li><Link to={"/category-location-jobs"} className="dez-page">location jobs <span className="new-page">New</span></Link></li>
														<li><Link to={"/category-skill-jobs"} className="dez-page">skill jobs <span className="new-page">New</span></Link></li>
													</ul>
												</li>
												<li><Link to={'#'} className="dez-page">Portfolio <i className="fa fa-angle-right"></i></Link>
													<ul className="sub-menu">
														<li><Link to={"/portfolio-grid-2"} className="dez-page">Portfolio Grid 2 </Link></li>

													</ul>
												</li> */}
                        {/* <li><Link to={'#'} className="dez-page">Login <i className="fa fa-angle-right"></i></Link>
													<ul className="sub-menu">
														<li><Link to={"/login"} className="dez-page">login 1</Link></li>
														<li><Link to={"/login-2"} className="dez-page">login 2 <span className="new-page">New</span></Link></li>
														<li><Link to={"/login-3"} className="dez-page">login 3 <span className="new-page">New</span></Link></li>
													</ul>
												</li> */}
                        {/* <li><Link to={'#'} className="dez-page">register <i className="fa fa-angle-right"></i></Link>
													<ul className="sub-menu">
														<li><Link to={"/register"} className="dez-page">register 1</Link></li>
														<li><Link to={"/register-2"} className="dez-page">register 2 <span className="new-page">New</span></Link></li>
													</ul>
												</li>
												<li><Link to={"/error-404"} className="dez-page">Error 404</Link></li> */}
                      </ul>
                    </li>
                    {/* <li>
											<Link to={'#'}>Đào tạo <i className="fa fa-chevron-down"></i></Link>
											<ul className="sub-menu">
												<li><Link to={"/blog-classic"} className="dez-page">Classic</Link></li>
												<li><Link to={"/blog-classic-sidebar"} className="dez-page">Classic Sidebar</Link></li>
												<li><Link to={"/blog-detailed-grid"} className="dez-page">Detailed Grid</Link></li>
												<li><Link to={"/blog-detailed-grid-sidebar"} className="dez-page">Detailed Grid Sidebar</Link></li>
												<li><Link to={"/blog-left-img"} className="dez-page">Left Image Sidebar</Link></li>
												<li><Link to={"/blog-details"} className="dez-page">Blog Details</Link></li>
											</ul>
										</li> */}
                    {/* Tablet */}
                    <li>
                      <div className='notification__container--wide-tablet'>
                        <div className='notification__avatar--wide-tablet'>
                          <div className='notification--wrapper--wide-tablet'>
                            {this.props.dataLogin?.avatarUrl?.indexOf(
                              "https://",
                            ) === -1 ? (
                              <img
                                className='notification__avatar--img--wide-tablet'
                                alt=''
                                src={`${BASE_URL}/${this.props.dataLogin?.avatarUrl}`}
                              />
                            ) : (
                              <img
                                className='notification__avatar--img--wide-tablet'
                                alt=''
                                src={this.props.dataLogin?.avatarUrl}
                              />
                            )}

                            <div className='account-setting__subnav--wide-tablet'>
                              <ul
                                className='account-setting__list--wide-tablet'
                                style={{ marginBottom: "3px" }}>
                                {accountType === "COMPANY" ? (
                                  <Link
                                    className='account-setting__item--wide-tablet'
                                    to='/company-profile'>
                                    <Link to='/company-profile'>
                                      Đổi thông tin Doanh nghiệp
                                    </Link>
                                  </Link>
                                ) : (
                                  ""
                                )}
                                <Link
                                  className='account-setting__item--wide-tablet'
                                  to='/jobs-change-password'>
                                  <Link to='/jobs-change-password'>
                                    Đổi mật khẩu
                                  </Link>
                                </Link>

                                <Link
                                  className='account-setting__item--wide-tablet'
                                  to=''>
                                  <Link to=''>
                                    <Logout />
                                  </Link>
                                </Link>
                              </ul>
                            </div>
                          </div>
                        </div>

                        <div className='notification__icon--wide-tablet'>
                          <div className='notification__icon--wrap--wide-tablet'>
                            <div className='notification__icon--belt--wide-tablet'>
                              <i
                                className='fa fa-bell notification__belt-wide-tablet'
                                aria-hidden='true'></i>
                              {count === 0 ?
                                ''
                                :
                                <div className='notification__alert--medium-mobile'>{`${count}+`}</div>
                              }
                            </div>

                            <div className='notification__subnav--wide-tablet'>
                              <h5 className='notification__heading'>Thông báo</h5>
                              <ul className='notification__subnav--list'>
                                {notification?.map((item, index) => {
                                  let title = item.template.templateFormat;
                                  item.template.params.forEach((value) => {
                                    title = title.replace(`{{${value}}}`, item.data[`${value}`]);
                                  })

                                  return <li
                                    onClick={() => {
                                      this.props.updateNotifications(item.id, token, userId)
                                    }}
                                    key={index}
                                    className='notification__wrap'
                                  >
                                    <img
                                      alt="logo"
                                      className='notification__logo'
                                      src={logo2}
                                    />
                                    <div className={item.status === "UNREAD" ? 'notification__item' : 'notification__item seen'}>
                                      <div className='notification__title'>
                                        <span className="notification__content">
                                          {title}
                                        </span>
                                      </div>
                                      <div className='notification__time'>
                                        <p className="m-0">{moment(item.createdAt).fromNow()}</p>
                                      </div>
                                    </div>
                                  </li>
                                })}
                              </ul>
                              <div onClick={() => {
                                this.props.readAll(userId, token);
                              }} className="notification__marked">Đánh dấu tất cả là đã đọc</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </header>
        {/*  Model Start */}
        <Modal
          className=' lead-form-modal'
          show={this.state.show}
          onHide={this.handleClose}
          centered>
          <div className='modal-dialog' role='document'>
            <div className='modal-content'>
              <button
                type='button'
                className='close'
                onClick={this.handleClose}>
                <span aria-hidden='true'>&times;</span>
              </button>
              <div className='modal-body row m-a0 clearfix'>
                <div
                  className='col-lg-6 col-md-6 overlay-primary-dark d-flex p-a0'
                  style={{
                    backgroundImage: "url(" + bnr3 + ")",
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                  }}>
                  <div className='form-info text-white align-self-center'>
                    <h3 className='m-b15'>Login To You Now</h3>
                    <p className='m-b15'>
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry has been the industry.
                    </p>
                    <ul className='list-inline m-a0'>
                      <li>
                        <Link to={"#"} className='m-r10 text-white'>
                          <i className='fa fa-facebook'></i>
                        </Link>
                      </li>
                      <li>
                        <Link to={"#"} className='m-r10 text-white'>
                          <i className='fa fa-google-plus'></i>
                        </Link>
                      </li>
                      <li>
                        <Link to={"#"} className='m-r10 text-white'>
                          <i className='fa fa-linkedin'></i>
                        </Link>
                      </li>
                      <li>
                        <Link to={"#"} className='m-r10 text-white'>
                          <i className='fa fa-instagram'></i>
                        </Link>
                      </li>
                      <li>
                        <Link to={"#"} className='m-r10 text-white'>
                          <i className='fa fa-twitter'></i>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className='col-lg-6 col-md-6 p-a0'>
                  <div className='lead-form browse-job text-left'>
                    <form>
                      <h3 className='m-t0'>Personal Details</h3>
                      <div className='form-group'>
                        <input className='form-control' placeholder='Name' />
                      </div>
                      <div className='form-group'>
                        <input
                          className='form-control'
                          placeholder='Mobile Number'
                        />
                      </div>
                      <div className='clearfix'>
                        <button
                          type='button'
                          className='btn-primary site-button btn-block'>
                          Submit{" "}
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal>
        {
          this.state.showAlert ? (
            <div class='alert alert-success position_bottom' role='alert'>
              Tính năng đang phát triển !
            </div>
          ) : (
            ""
          )
        }

        {/*  Model END */}
      </>
    );
  }
}
const mapStateProps = (state) => {
  return {
    dataLogin: state.auth.auth.user,
    allNotification: state.NotificationReducer.allNotifications,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllNotifications: (userId, token) => dispatch(getAllNotification(userId, token)),
    updateNotifications: (id, token, userId) => dispatch(updateNotification(id, token, userId)),
    readAll: (userId, token) => dispatch(readAll(userId, token)),
  }
}


export default connect(mapStateProps, mapDispatchToProps)(Header);
