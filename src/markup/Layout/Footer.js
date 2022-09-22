import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
	return (
		<footer className="site-footer">
			<div className="footer-top">
				<div className="container">
					<div className="row">
						<div className="col-xl-6 col-lg-7 col-md-4 col-sm-12">
							<div className="widget">
								<img src={require("./../../images/logo/tsc__logo.png")} width="140" className="m-b16" alt="" />
								<p className="text-capitalize m-b20"></p>
								<ul>
									<li><p className="text-capitalize m-b5">TRUNG TÂM HỖ TRỢ ĐÀO TẠO VÀ CUNG ỨNG NHÂN LỰC, <br />BỘ GIÁO DỤC VÀ ĐÀO TẠO</p></li>
									<li><p className="text-capitalize m-b5">Giấy phép hoạt động: 161/GP-TTĐT Bộ Thông tin và Truyền thông cấp ngày 13/11/2009</p></li>
									<li><p className="text-capitalize m-b5">Trụ sở: Số 12 - 14 Lê Thánh Tông – Q.Hoàn Kiếm – TP.Hà Nội</p></li>
									<li><p className="text-capitalize m-b5">Số điện thoại: (84-24) 38262018</p></li>
									<li><p className="text-capitalize m-b5">Fax: (84-24) 38269466</p></li>
									<li><p className="text-capitalize m-b5">E-mail: trungtamhotrodaotao@moet.edu.vn</p></li>
								</ul>
								<div className="subscribe-form m-b20">
									<form className="dzSubscribe" action="script/mailchamp.php" method="post">
										<div className="dzSubscribeMsg"></div>
										<div className="input-group">
											<input name="dzEmail" required="required" className="form-control" placeholder="Your Email Address" type="email" />
											<span className="input-group-btn">
												<button name="submit" value="Submit" type="submit" className="site-button radius-xl">Đăng ký</button>
											</span>
										</div>
									</form>
								</div>
							</div>
						</div>
						<div className="col-xl-6 col-lg-5 col-md-8 col-sm-12 col-12 footer__ajust--center">
							<div className="widget border-0">
								<h5 className="m-b30 text-white">Những câu hỏi thường gặp</h5>
								<ul className="list-line">
									<li><Link to={''}>Quyền riêng tư & bảo mật</Link></li>
									<li><Link to={''}>Communications</Link></li>
									<li><Link to={''}>Term of Service</Link></li>
									<li><Link to={''}>Support</Link></li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className="footer-bottom">
				<div className="container">
					<div className="row">
						<div className="col-lg-12 text-center">
							<span> © Copyright by <i className="fa fa-heart m-lr5 text-red heart"></i>
								<Link to={''}>TSC</Link> All rights reserved.</span>
						</div>
					</div>
				</div>
			</div>
		</footer>
	)
}

export default Footer;