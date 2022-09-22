import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Slider from "react-slick";

const latestBlog = [
	{
		image: require('./../../images/team/2.jpg'),
		donVi: 'Văn phòng',
		viTri: 'Phụ trách phòng',
		ten: 'Lại Thị Hoa',
		sdt: '024.3826.2018',
		email: 'lthoa.htdt@moet.gov.vn'
	},
	{
		image: require('./../../images/team/1.jpg'),
		donVi: 'Lãnh đạo trung tâm',
		viTri: 'Giám đốc',
		ten: 'Bùi Văn Linh',
		sdt: '024.39333985',
		email: 'bvlinh@moet.gov.vn'
	},
	{
		image: require('./../../images/team/3.jpg'),
		donVi: 'Văn phòng',
		viTri: 'Phụ trách Kế toán',
		ten: 'Lò Thị Dũng',
		sdt: '024.3826.2018',
		email: 'ltdung.htdt@moet.gov.vn'
	},
	{
		image: require('./../../images/team/4.jpg'),
		donVi: 'Văn phòng',
		viTri: 'Chuyên viên',
		ten: 'Nguyễn Thị Diệu Tình',
		sdt: '024.3826.2018',
		email: 'ntdtinh@moet.gov.vn'
	},
	{
		image: require('./../../images/team/5.jpg'),
		donVi: 'Phòng Nghiên cứu và Dự báo',
		viTri: 'Phụ trách phòng',
		ten: 'Trần Phương',
		sdt: '024.39335071',
		email: 'tphuong@moet.gov.vn'
	},
	{
		image: require('./../../images/team/6.jpg'),
		donVi: 'Phòng Nghiên cứu và Dự báo',
		viTri: 'Chuyên viên',
		ten: 'Đặng Phương Mai',
		sdt: '024.39335071',
		email: 'dtpmai@moet.gov.vn'

	},
	{
		image: require('./../../images/team/7.jpg'),
		donVi: 'Phòng Cung ứng nhân lực',
		viTri: 'Chuyên viên',
		ten: 'Trần Thị Hoài Thu',
		sdt: '024.39336243',
		email: 'ttthu@moet.gov.vn'
	},
	{
		image: require('./../../images/team/8.jpg'),
		donVi: 'Phòng Cung ứng nhân lực',
		viTri: 'Chuyên viên',
		ten: 'Phạm Thị Thương Hiền',
		sdt: '024.39336243',
		email: 'ptthien.htdt@moet.gov.vn'
	},
	{
		image: require('./../../images/team/9.jpg'),
		donVi: 'Phòng Truyền thông',
		viTri: 'Chuyên viên',
		ten: 'Vũ Thị Minh Ngọc',
		sdt: '024.3833.1840',
		email: 'vtmngoc@moet.gov.vn'
	},
]
function SampleNextArrow(props) {
	const { onClick } = props;
	return (
		<div className="owl-nav">
			<div className="owl-next la la-angle-right " onClick={onClick} />
		</div>
	);
}

function SamplePrevArrow(props) {
	const { onClick } = props;
	return (
		<div className="owl-nav">
			<div className="owl-prev la la-angle-left " onClick={onClick} />
		</div>
	);
}

class Latestblogowl extends Component {
	render() {
		var settings = {
			arrows: true,
			slidesToShow: 3,
			infinite: true,
			autoplay: true,
			nextArrow: <SampleNextArrow />,
			prevArrow: <SamplePrevArrow />,
			responsive: [
				{
					breakpoint: 1200,
					settings: {
						slidesToShow: 3,
					}
				},
				{
					breakpoint: 991,
					settings: {
						slidesToShow: 2,
					}
				},
				{
					breakpoint: 576,
					settings: {
						slidesToShow: 1,
					}
				}
			]
		};
		return (

			<Slider className="blog-carousel owl-carousel owl-btn-center-lr owl-btn-3 owl-theme owl-btn-center-lr owl-btn-1 " {...settings}>
				{latestBlog.map((item, index) => (
					<div className="item p-3" key={index}>
						<div className="blog-post blog-grid blog-style-1">
							<div className="dez-post-media dez-img-effect radius-sm">
								<span>
									<img className="w-100" src={item.image} alt="" />
								</span>
							</div>
							<div className="dez-info">
								<div className="dez-post-meta">
									<ul className="d-flex align-items-center">
										<li className="post-date">{item.donVi}</li>
									</ul>
								</div>
								<div className="dez-post-title ">
									<h5 className="post-title font-20"><span>{item.viTri}: {item.ten}</span></h5>
								</div>
								<div className="dez-post-text">
									<span>Điện thoại: </span><span style={{fontStyle: 'oblique'}}>{item.sdt}</span>
								</div>
								<div className="dez-post-text">
									<span>Email: </span><span style={{fontStyle: 'oblique'}}>{item.email}</span>
								</div>
							</div>
						</div>
					</div>
				))}

			</Slider>


		)

	}

}

export default Latestblogowl;