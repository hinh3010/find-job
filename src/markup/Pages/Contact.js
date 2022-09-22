import React from 'react';
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom';
import Header from './../Layout/Header';
import Footer from './../Layout/Footer';
import PageTitle from './../Layout/PageTitle';
import { useFormik } from "formik";
import Map from '../Element/Map';
import { createContact } from '../../store/actions/User/UserAction';

var bnr = require('./../../images/banner/bnr1.jpg');

const key = "AIzaSyBPDjB2qkV4Yxn9h0tGSk2X5uH6NKmssXw";

function Contact() {
	const dispatch = useDispatch();

	const {user, accessToken} = JSON.parse(localStorage.getItem('userDetail'));


	const formik = useFormik({
		initialValues: {
			name: "",
			email: "",
			message: ""
		},
		onSubmit: (values) => {
			dispatch(createContact(values, accessToken.token))
		},
	})

	return (
		<>
			<Header />
			<div className="page-content bg-white">
				<div className="dez-bnr-inr overlay-black-middle" style={{ backgroundImage: "url(" + bnr + ")" }}>
					<PageTitle motherName="Home" activeName="Contact Us" />
				</div>
				<div className="section-full content-inner bg-white contact-style-1">
					<div className="container">
						<div className="row">
							<div className="col-lg-4 col-md-6 d-lg-flex d-md-flex">
								<div className="p-a30 border m-b30 contact-area border-1 align-self-stretch radius-sm">
									<h4 className="m-b10">Liên hệ nhanh</h4>
									<p>Nếu như bạn có bất kì câu hỏi nào, vui lòng liên hệ với chúng tôi.</p>
									<ul className="no-margin">
										<li className="icon-bx-wraper left m-b30">
											<div className="icon-bx-xs border-1"> <Link to={"#"} className="icon-cell"><i className="ti-location-pin"></i></Link> </div>
											<div className="icon-content">
												<h6 className="text-uppercase m-tb0 dez-tilte">Địa chỉ:</h6>
												<p>Số 12 - 14 Lê Thánh Tông – Q. Hoàn Kiếm – TP. Hà Nội</p>
											</div>
										</li>
										<li className="icon-bx-wraper left  m-b30">
											<div className="icon-bx-xs border-1"> <Link to={"#"} className="icon-cell"><i className="ti-email"></i></Link> </div>
											<div className="icon-content">
												<h6 className="text-uppercase m-tb0 dez-tilte">Email:</h6>
												<p>trungtamhotrodaotao@moet.edu.vn</p>
											</div>
										</li>
										<li className="icon-bx-wraper left">
											<div className="icon-bx-xs border-1"> <Link to={"#"} className="icon-cell"><i className="ti-mobile"></i></Link> </div>
											<div className="icon-content">
												<h6 className="text-uppercase m-tb0 dez-tilte">Số điện thoại:</h6>
												<p>(84-24) 38262018</p>
											</div>
										</li>
									</ul>
								</div>
							</div>
							<div className="col-lg-4 col-md-6">
								<div className="p-a30 m-b30 radius-sm bg-gray clearfix">
									<h4>Gửi tin nhắn cho chúng tôi</h4>
									<div className="dzFormMsg"></div>
									<form method="post" onSubmit={formik.handleSubmit} className="dzForm" action="script/contact.php">
										<input type="hidden" value="Contact" name="dzToDo" />
										<div className="row">
											<div className="col-lg-12">
												<div className="form-group">
													<div className="input-group">
														<input
															name="name"
															minLength="6"
															maxLength="30"
															type="text"
															required
															className="form-control"
															placeholder="Họ và tên"
															onChange={formik.handleChange}
														/>
													</div>
												</div>
											</div>
											<div className="col-lg-12">
												<div className="form-group">
													<div className="input-group">
														<input
															name="email"
															type="email"
															className="form-control"
															required
															placeholder="Email"
															onChange={formik.handleChange}
														/>
													</div>
												</div>
											</div>
											<div className="col-lg-12">
												<div className="form-group">
													<div className="input-group">
														<textarea
															name="message"
															onChange={formik.handleChange}
															rows="4"
															className="form-control"
															required
															placeholder="Tin nhắn của bạn..."></textarea>
													</div>
												</div>
											</div>
											{/* <div className="col-lg-12">
												<div className="recaptcha-bx">
													<div className="input-group">
														<div className="g-recaptcha" data-sitekey="6LefsVUUAAAAADBPsLZzsNnETChealv6PYGzv3ZN" data-callback="verifyRecaptchaCallback" data-expired-callback="expiredRecaptchaCallback"></div>
														<input className="form-control d-none" style={{display:"none"}} data-recaptcha="true" required data-error="Please complete the Captchaddddddddddddddddddddd" />
													</div>
												</div>
											</div> */}
											<div className="col-lg-12">
												<button name="submit" type="submit" value="Submit" className="site-button "> <span>Gửi</span> </button>
											</div>
										</div>
									</form>
								</div>
							</div>
							<div className="col-lg-4 col-md-12 d-lg-flex m-b30">
								<Map
									googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${key}`}
									loadingElement={<div style={{ height: `100%`, width: '100%' }} />}
									containerElement={<div style={{ height: `100%`, width: '100%', margin: `auto` }} />}
									mapElement={<div style={{ width: '100%', height: `100%` }} />}
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
			<Footer />
		</>
	)
}

export default Contact;