import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Modal } from 'react-bootstrap';
import Logout from './Logout';
import './../../css/custom.css';
import './../../css/responsiveUI.css';

var bnr3 = require('./../../images/background/bg3.jpg');

class Header2 extends Component {
	state = {
		// initial state
		show: false,
	}

	handleClose = () => {
		this.setState({ show: false });
	};
	handleShow = () => {
		this.setState({ show: true });
	};




	componentDidMount() {
		// sidebar open/close
		var Navicon = document.querySelector('.navicon');
		var sidebarmenu = document.querySelector('.myNavbar ');



		function toggleFunc() {
			sidebarmenu.classList.toggle('show');
			//   Navicon.classList.toggle('open');
		}
		Navicon.addEventListener('click', toggleFunc);

		// Sidenav li open close
		var navUl = [].slice.call(document.querySelectorAll('.navbar-nav > li > a, .sub-menu > li > a'));
		for (var y = 0; y < navUl.length; y++) {
			navUl[y].addEventListener('click', function () { checkLi(this) });
		}

		function checkLi(current) {
			current.parentElement.parentElement.querySelectorAll("li").forEach(el =>
				(current.parentElement !== el) ? el.classList.remove('open') : ''
			);
			setTimeout(() => {
				current.parentElement.classList.toggle('open');
			}, 100);
		}
	}
	render() {


		return (
			<>
				<header className="site-header mo-left header border-bottom fullwidth">

					<div className="sticky-header main-bar-wraper navbar-expand-lg">
						<div className="main-bar clearfix">
							<div className="container clearfix">

								<div className="logo-header mostion">
									<Link to={"./"}><img src={require('./../../images/logo/tsc__logo.png')} className="logo" alt="" /></Link>
								</div>

								<button className="navbar-toggler collapsed navicon justify-content-end" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
									<span></span>
									<span></span>
									<span></span>
								</button>

								<div className="extra-nav">
									<div className="extra-cell">
										<Link to={"/register-2"} className="site-button"><i className="fa fa-user"></i>&nbsp;Đăng ký</Link>
										{/* <Link to={'#'} title="READ MORE" onClick={this.handleShow} className="site-button"><i className="fa fa-lock"></i> login </Link> */}
										<Logout />
									</div>
								</div>

								<div className="header-nav navbar-collapse collapse myNavbar justify-content-start" id="navbarNavDropdown">
									<ul className="nav navbar-nav">
										<li className="">
											{/* <Link to={'#'} >Home
												<i className="fa fa-chevron-down"></i>
											</Link> */}
											{/* <ul className="sub-menu">
												<li><Link to={"./"} className="dez-page">Home 1</Link></li>
												<li><Link to={"/index-2"} className="dez-page">Home 2</Link></li>
											</ul> */}
										</li>
										<li>
											<Link to={'#'}>Đào tạo <i className="fa fa-chevron-down"></i></Link>
											<ul className="sub-menu">
												<li>
													<Link to={"#"} className="dez-page course-list">Khóa học <i className="fa fa-angle-right"></i>
														<div className="course-subnav">
															<ul className="course-subnav__list">
																<li className="course-subnav-item"><Link to="/courses/foreign-language">Ngoại ngữ</Link></li>
																<li className="course-subnav-item"><Link to="/courses/social-skill">Kỹ năng sống</Link></li>
																<li className="course-subnav-item"><Link to="/courses/soft-skill">Kỹ năng mềm</Link></li>
																<li className="course-subnav-item"><Link to="/courses/career-skill">Kỹ năng nghề nghiệp</Link></li>
																<li className="course-subnav-item"><Link to="/courses/creative-startup">Đổi mới sáng tạo - khởi nghiệp</Link></li>
																<li className="course-subnav-item"><Link to="/courses/other">Các kỹ năng khác</Link></li>
																<li className="course-subnav-item"><Link to="/courses">Tất cả khóa học</Link></li>
															</ul>
														</div>
													</Link>
													<ul className="sub-menu sub-menu-mobile">
														<li className="course-subnav-item"><Link to="/courses/foreign-language">Ngoại ngữ</Link></li>
														<li className="course-subnav-item"><Link to="/courses/social-skill">Kỹ năng sống</Link></li>
														<li className="course-subnav-item"><Link to="/courses/soft-skill">Kỹ năng mềm</Link></li>
														<li className="course-subnav-item"><Link to="/courses/career-skill">Kỹ năng nghề nghiệp</Link></li>
														<li className="course-subnav-item"><Link to="/courses/creative-startup">Đổi mới sáng tạo - khởi nghiệp</Link></li>
														<li className="course-subnav-item"><Link to="/courses/other">Các kỹ năng khác</Link></li>
														<li className="course-subnav-item"><Link to="/courses">Tất cả khóa học</Link></li>
													</ul>
												</li>
												<li><Link to={"/course-registered"} className="dez-page">Khóa học đã đăng kí</Link></li>
												<li><Link to={"/course-free"} className="dez-page">Khóa học miễn phí <span className="new-page">Free</span></Link></li>
												<li><Link to={"/course-create"} className="dez-page">Tạo khóa học</Link></li>
												<li><Link to={"/course-manage"} className="dez-page">Quản lý khóa học</Link></li>
											</ul>
										</li>
										<li>
											<Link to={"#"}>Người ứng tuyển <i className="fa fa-chevron-down"></i></Link>
											<ul className="sub-menu">
												<li><Link to={"/jobs-profile"} className="dez-page">Profile của tôi<span className="new-page">New</span></Link></li>
												<li><Link to={"/jobs-my-resume"} className="dez-page">Lý lịch của tôi <span className="new-page">New</span></Link></li>
												<li><Link to={"/jobs-applied-job"} className="dez-page">Công việc đã ứng tuyển <span className="new-page">New</span></Link></li>
												<li><Link to={"/jobs-alerts"} className="dez-page">Thông báo công việc <span className="new-page">New</span></Link></li>
												<li><Link to={"/jobs-cv-manager"} className="dez-page">Quản lý CV <span className="new-page">New</span></Link></li>
												<li><Link to={"/jobs-change-password"} className="dez-page">Đổi mật khẩu <span className="new-page">New</span></Link></li>
											</ul>
										</li>
										<li>
											<Link to={"#"}>Nhà tuyển dụng <i className="fa fa-chevron-down"></i></Link>
											<ul className="sub-menu">
												<li><Link to={"/company-profile"} className="dez-page">Thông tin công ty  <span className="new-page">New</span></Link></li>
												{/* <li><Link to={"/company-resume"} className="dez-page">Employer Resume <span className="new-page">New</span></Link></li> */}
												<li><Link to={"/company-post-jobs"} className="dez-page">Đăng bài post  <span className="new-page">New</span></Link></li>
												<li><Link to={"/company-manage-job"} className="dez-page">Quản lý công việc <span className="new-page">New</span></Link></li>
												<li><Link to={"/company-survey"} className="dez-page">Khảo sát <span className="new-page">New</span></Link></li>
												{/* <li><Link to={"/browse-candidates"} className="dez-page">Đơn ứng tuyển</Link></li> */}
											</ul>
										</li>
										<li>
											<Link to={"#"}>Giới thiệu <i className="fa fa-chevron-down"></i></Link>
											<ul className="sub-menu">
												<li><Link to={"/about-us"} className="dez-page">Liên hệ</Link></li>
												{/* <li><Link to={"/job-detail"} className="dez-page">Job Detail</Link></li> */}
												<li><Link to={"/companies"} className="dez-page">Đối tác</Link></li>
												{/* <li><Link to={"/free-job-alerts"} className="dez-page">free job alerts <span className="new-page">New</span></Link></li> */}
												<li><Link to={"/#"} className="dez-page">Hiển thị công việc<i className="fa fa-angle-right"></i></Link>
													<ul className="sub-menu">
														<li><Link to={"/browse-job-list"} className="dez-page">Dạng danh sách</Link></li>
														<li><Link to={"/browse-job-grid"} className="dez-page">Dạng lưới <span className="new-page">New</span></Link></li>
														<li><Link to={"/browse-job-filter-list"} className="dez-page">Lọc theo danh sách <span className="new-page">New</span></Link></li>
														<li><Link to={"/browse-job-filter-grid"} className="dez-page">Lọc theo lưới <span className="new-page">New</span></Link></li>
													</ul>
												</li>
												{/* <li><Link to={"#"} className="dez-page">Jobs<i className="fa fa-angle-right"></i></Link>
													<ul className="sub-menu">
														<li><Link to={"/category-all-jobs"} className="dez-page">all jobs <span className="new-page">New</span></Link></li>
														<li><Link to={"/category-company-jobs"} className="dez-page">company jobs <span className="new-page">New</span></Link></li>
														<li><Link to={"/category-designations-jobs"} className="dez-page">designations jobs <span className="new-page">New</span></Link></li>
														<li><Link to={"/category-jobs"} className="dez-page">category jobs <span className="new-page">New</span></Link></li>
														<li><Link to={"/category-location-jobs"} className="dez-page">location jobs <span className="new-page">New</span></Link></li>
														<li><Link to={"/category-skill-jobs"} className="dez-page">skill jobs <span className="new-page">New</span></Link></li>
													</ul>
												</li>
												<li><Link to={"#"} className="dez-page">Portfolio <i className="fa fa-angle-right"></i></Link>
													<ul className="sub-menu">
														<li><Link to={"/portfolio-grid-2"} className="dez-page">Portfolio Grid 2 </Link></li>

													</ul>
												</li>
												<li><Link to={"#"} className="dez-page">Login <i className="fa fa-angle-right"></i></Link>
													<ul className="sub-menu">
														<li><Link to={"/login"} className="dez-page">login 1</Link></li>
														<li><Link to={"/login-2"} className="dez-page">login 2 <span className="new-page">New</span></Link></li>
													</ul>
												</li>
												<li><Link to={"#"} className="dez-page">register <i className="fa fa-angle-right"></i></Link>
													<ul className="sub-menu">
														<li><Link to={"register"} className="dez-page">register 1</Link></li>
														<li><Link to={"register-2"} className="dez-page">register 2 <span className="new-page">New</span></Link></li>
													</ul>
												</li>
												<li><Link to={"/error-404"} className="dez-page">Error 404</Link></li> */}
												<li><Link to={"/contact"} className="dez-page">Contact Us</Link></li>
											</ul>
										</li>
									</ul>
								</div>
							</div>
						</div>
					</div>
				</header>
				{/*  Model Start */}
				<Modal show={this.state.show} onHide={this.handleClose} className=" lead-form-modal" centered >
					<div className="modal-dialog" role="document">
						<div className="modal-content">
							<button type="button" className="close" onClick={this.handleClose}>
								<span aria-hidden="true">&times;</span>
							</button>
							<div className="modal-body row m-a0 clearfix">
								<div className="col-lg-6 col-md-6 overlay-primary-dark d-flex p-a0" style={{ backgroundImage: "url(" + bnr3 + ")", backgroundPosition: "center", backgroundSize: "cover" }}>
									<div className="form-info text-white align-self-center">
										<h3 className="m-b15">Login To You Now</h3>
										<p className="m-b15">Lorem Ipsum is simply dummy text of the printing and typesetting industry has been the industry.</p>
										<ul className="list-inline m-a0">
											<li><Link to={"#"} className="m-r10 text-white"><i className="fa fa-facebook"></i></Link></li>
											<li><Link to={"#"} className="m-r10 text-white"><i className="fa fa-google-plus"></i></Link></li>
											<li><Link to={"#"} className="m-r10 text-white"><i className="fa fa-linkedin"></i></Link></li>
											<li><Link to={"#"} className="m-r10 text-white"><i className="fa fa-instagram"></i></Link></li>
											<li><Link to={"#"} className="m-r10 text-white"><i className="fa fa-twitter"></i></Link></li>
										</ul>
									</div>
								</div>
								<div className="col-lg-6 col-md-6 p-a0">
									<div className="lead-form browse-job text-left">
										<form>
											<h3 className="m-t0">Personal Details</h3>
											<div className="form-group">
												<input value="" className="form-control" placeholder="Name" />
											</div>
											<div className="form-group">
												<input value="" className="form-control" placeholder="Mobile Number" />
											</div>
											<div className="clearfix">
												<button type="button" className="btn-primary site-button btn-block">Submit </button>
											</div>
										</form>
									</div>
								</div>
							</div>
						</div>
					</div>


				</Modal>
				{/*  Model END */}
			</>
		)
	}
}

export default Header2;