import React from 'react';
import { Link } from 'react-router-dom';
import Header from './../Layout/Header';
import Footer from './../Layout/Footer';
import Latestblogowl from './../Element/Owlblog2';

var bnr1 = require('./../../images/banner/bnr5.jpg');
var bnr2 = require('./../../images/banner/bnr6.jpg');

function Aboutus() {
	return (
		<div className="page-wraper">
			<Header />
			<div className="page-content bg-white">
				<div className="dez-bnr-inr overlay-black-middle" style={{ backgroundImage: "url(" + bnr1 + ")" }}>
					<div className="container">
						<div className="dez-bnr-inr-entry">
							<h1 className="text-white">Thông tin chúng tôi</h1>
							<div className="breadcrumb-row">
								<ul className="list-inline">
									<li><Link to={"/"}>Trang chủ</Link></li>
									<li>Thông tin chúng tôi</li>
								</ul>
							</div>

						</div>
					</div>
				</div>
				<div className="content-block">
					<div className="section-full content-inner overlay-white-middle">
						<div className="container">
							<div className="row align-items-center">
								<div className="col-md-12 col-lg-6 m-b20">
									<h2 className="m-b5">Thông tin chúng tôi</h2>
									<h3 className="fw4 mt-3 about-us__title">QUÁ TRÌNH HÌNH THÀNH VÀ PHÁT TRIỂN TRUNG TÂM HỖ TRỢ ĐÀO TẠO VÀ CUNG ỨNG NHÂN LỰC</h3>
									<h3 className="fw4 mt-3 about-us__stage">GIAI ĐOẠN 1991-2008</h3>
									<p className="m-b15">Căn cứ Quyết định số 126/CP ngày 19/3/1981 của Chính phủ "Về công tác hướng nghiệp trong trường phổ thông và việc sử dụng hợp lý học sinh các cấp phổ thông cơ sở và phổ thông trung học tốt nghiệp ra trường", i ngày 18/3/1991, Bộ Giáo dục và Đào tạo đã thành lập Trung tâm Lao động - Hướng nghiệp (Quyết định số 663/TCCB ngày 18/3/1991) để giúp Bộ trưởng chỉ đạo hoạt động lao động  hướng nghiệp toàn ngành.</p>
									<p className="m-b15">Trong giai đoạn 1991-2008, Trung tâm đã có những thành tựu cơ bản sau:

										- Về nhiệm vụ quản lý nhà nước: Trung tâm đã tham mưu cho Bộ củng cố, phát triển hệ thống Trung tâm KTTH-HN-DN cấp tỉnh và cấp huyện từ 106 lên 320 trung tâm. Các Trung tâm KTTH-HN-DN đã phát huy được vai trò giáo dục lao động và hướng nghiệp cho học sinh các trường THCS, THPT trên cả nước.

										- Về lĩnh vực nghiên cứu xây dựng, biên soạn chương trình, tài liệu giáo khoa, Trung tâm đã chủ trì xây dựng biên soạn chương trình:

										+ Chương trình môn kĩ thuật tiểu học.

										+ Chương trình môn kĩ thuật THCS.

										+ Chương trình môn kĩ thuật của trung học chuyên ban.

										+ Biên soạn tài liệu giáo khoa: 46 cuốn sách về kĩ thuật, kĩ thuật ứng dụng và sách hướng dẫn, bồi dưỡng cán bộ, giáo viên.</p>
									{/* <Link to={"#"} className="site-button">Read More</Link> */}
								</div>
								<div className="col-md-12 col-lg-6">
									<img src={require('./../../images/our-work/pic5.jpg')} alt="" style={{ borderRadius: '3px' }} />
								</div>
							</div>
							<div className="row">
								<div className="col-lg-12 col-md-12 col-sm-12 m-b30">
									<h3 className="fw4 mt-3 about-us__stage">GIAI ĐOẠN 2009 - 2018</h3>
									<p className="m-b15">
										Thực hiện Nghị quyết của Chính phủ về đổi mới căn bản và toàn diện giáo dục đại học Việt Nam giai đoạn 2006-2020, Bộ Giáo dục và Đào tạo chỉ đạo năm học 2007-2008 là năm học đầu tiên của giai đoạn 3 năm đột phá vào việc "Nói không với đào tạo không đạt chuẩn, không đáp ứng nhu cầu của xã hội". Với sứ mệnh là đơn vị của Bộ hỗ trợ các cơ sở đào tạo trong triển khai đào tạo đáp ứng nhu cầu xã hội, ngày 17/02/2009 Bộ trưởng Bộ Giáo dục và Đào tạo ký Quyết định số 955/QĐ-BGDĐT thành lập Trung tâm Hỗ trợ đào tạo và Cung ứng nhân lực trên cơ sở tổ chức lại Trung tâm Lao động – Hướng nghiệp.

										Nhiệm vụ chính của Trung tâm là hỗ trợ đào tạo và hỗ trợ cung ứng, xuất khẩu nhân lực, trong đó cần tổ chức nghiên cứu, điều tra phân tích và dự báo nhu cầu nhân lực phục vụ cho việc xây dựng chính sách hỗ trợ phát triển nguồn nhân lực của ngành; tập hợp nhu cầu nhân lực theo đặt hàng của các đơn vị sử dụng lao động để lập kế hoạch đào tạo và cung ứng nhân lực; thực hiện xuất khẩu nhân lực.

										Việc thay đổi hoàn toàn về chức năng, nhiệm vụ vừa là thời cơ để Trung tâm phát triển vừa là thách thức đối với Trung tâm cả về chuyên môn nghiệp vụ, kinh nghiệm công tác của cán bộ viên chức, cả về điều kiện kinh phí, cơ sở vật chất phục vụ công tác chuyên môn.

										Một số kết quả nổi bật

										- Làm đơn vị đầu mối của Bộ phối hợp với UBND tỉnh Hà Tĩnh thực hiện công tác bảo đảm nhân lực cho Khu kinh tế Vũng Áng.

										- Xây dựng Đề án "Xây dựng mạng thông tin cung - cầu trong đào tạo và sử dụng nhân lực ngành giáo dục". Đề án đã được Bộ trưởng Bộ Giáo dục và Đào tạo phê duyệt tại Quyết định số 4014/QĐ-BGDĐT ngày 30/9/2015.

										-  Hoàn thành các đề tài nghiên cứu khoa học cấp Bộ:

										+ Nghiên cứu đề xuất biện pháp hỗ trợ đào tạo giáo viên phổ thông đáp ứng yêu cầu phát triển giáo dục ở khu vực miền núi phía Bắc; Mã số: B2010-39-08; Chủ nhiệm đề tài: ThS. Nguyễn Văn Học

										+ Nghiên cứu xây dựng hệ thống thông tin và cơ sở dữ liệu phục vụ hoạt động hỗ trợ đào tạo và cung ứng nhân lực theo nhu cầu xã hội; Mã số: B2009-39-07; Chủ nhiệm đề tài: TS. Lê Ngọc Sơn

										Thực hiện dịch vụ công

										+ Xây dựng Quy hoạch phát triển nhân lực của thành phố Hồ Chí Minh giai đoạn 2011-2020, được Ủy ban Nhân dân thành phố Hồ Chí Minh phê duyệt theo Quyết định số 1335/QĐ-UBND ngày 15/3/2012.

										+ Tổ chức bồi dưỡng chuyên môn nghiệp vụ cho giáo viên các cấp học của nhiều địa phương và phối hợp với một số cơ sở đào tạo tổ chức bồi dưỡng kỹ năng mềm cho sinh viên.
									</p>
								</div>
							</div>
							<div className="row">
								<div className="col-md-12 col-lg-6">
									<img src={require('./../../images/our-work/pic6.jpg')} alt="" style={{ borderRadius: '3px' }} />
								</div>
								<div className="col-md-12 col-lg-6">
									<h3 className="fw4 about-us__stage">TỪ 2018- NAY</h3>
									<p className="m-b15">
										Ngày 02/4/2018, Bộ trưởng Bộ Giáo dục và Đào tạo ký Quyết định số 1244/QĐ-BGDĐT ban hành Quy chế tổ chức và hoạt động của Trung tâm Hỗ trợ đào tạo và Cung ứng nhân lực.

										Chức năng của Trung tâm: Nghiên cứu, dự báo phát triển nguồn nhân lực trình độ đại học trở lên và nhân lực ngành sư phạm; định hướng nghề nghiệp, việc làm cho học sinh, sinh viên; cung ứng nhân lực có trình độ đại học trở lên; thông tin và truyền thông về tuyển sinh, hướng nghiệp, việc làm, đào tạo và sử dụng nhân lực.

										Nhiệm vụ chính:

										- Nghiên cứu và dự báo.

										- Cung ứng nhân lực, bồi dưỡng chuyên môn nghiệp vụ.

										- Thông tin và truyền thông.

										Hoạt động chính của Trung tâm:

										- Báo cáo khảo sát việc làm sinh viên

										- Xây dựng cơ sở dữ liệu, kết nối thông tin cung – cầu nhân lực ngành giáo dục (website: nhanlucgiaoduc.vn).

										- Xây dựng Cổng thông tin điện tử "Đào tạo và việc làm sinh viên"

										- Tổ chức Chương trình tư vấn hướng nghiệp, tư vấn tuyển sinh ĐH cho học sinh THPT

										- Giới thiệu việc làm cho lưu học sinh

										- Triển khai nghiên cứu Đề tài cấp Bộ "Nghiên cứu dự báo nhu cầu đào tạo trình độ đại học nhóm ngành Kỹ thuật – Công nghệ trong bối cảnh cách mạng công nghiệp 4.0"(Mã số B2018-TĐC-01)

										- Bồi dưỡng chuyên môn, nghiệp vụ cho cán bộ, giáo viên theo các chuyên đề: công tác tư vấn, hướng nghiệp, tham vấn học đường, phương pháp dạy học, chuẩn chức danh nghề nghiệp giáo viên, tin học, ngoại ngữ, tiếng dân tộc thiểu số,…
									</p>
								</div>
							</div>
						</div>
					</div>
					<div className="section-full content-inner-2 call-to-action overlay-black-dark text-white text-center bg-img-fix" style={{ backgroundImage: "url(" + bnr2 + ")" }}>
						<div className="container">
							<div className="row">
								<div className="col-lg-12">
									<h2 className="m-b10">Luôn sẵn sàng mang công việc tới!</h2>
									<p className="m-b0"> Cung ứng nhân lực, bồi dưỡng chuyên môn nghiệp vụ.</p>
									<Link to={"/browse-job-list"} className="site-button m-t20 outline outline-2 radius-xl">Tìm việc ngay</Link>
								</div>
							</div>
						</div>
					</div>
					<div className="section-full content-inner-2 overlay-white-middle">
						<div className="container">
							<div className="section-head text-black text-center">
								<h2 className="text-uppercase m-b0 text-center">Cơ cấu tổ chức</h2>
								<p>TRUNG TÂM HỖ TRỢ ĐÀO TẠO VÀ CUNG ỨNG NHÂN LỰC, BỘ GIÁO DỤC VÀ ĐÀO TẠO</p>
							</div>
							<Latestblogowl />
						</div>
					</div>
				</div>
			</div>
			<Footer />
		</div>
	)

}
export default Aboutus;
