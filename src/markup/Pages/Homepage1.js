import React from 'react';
import Header from './../Layout/Header';
import Footer from './../Layout/Footer';
import CountUp from 'react-countup';
import IndexBanner from './../Element/IndexBanner';
import Jobcategories from './../Element/Jobcategories';
import Featureblog from './../Element/Featureblog';
import Jobsection from './../Element/Jobsection';
import Owltestimonial from './../Element/Owlblog1';
import SurveySection from '../Element/SurveySection';

//Images
var bnr2 = require('./../../images/background/bg4.jpg');
var bnr3 = require('./../../images/lines.png');

function Homepage() {
	const { accountType } = JSON.parse(localStorage.getItem('userDetail')).user;

	return (
		<div className="page-wraper">
			<Header />
			<div className="page-content">
				<IndexBanner />
				<div className="section-full job-categories content-inner-2 bg-white">
					<div className="container">
						<div className="section-head d-flex head-counter clearfix">
							<div className="mr-auto">
								<h2 className="m-b5">Các lĩnh vực công việc phổ biến</h2>
								<h6 className="fw3">20+ lĩnh vực công việc đang chờ bạn</h6>
							</div>
							<div className="head-counter-bx">
								<h2 className="m-b5 counter"><CountUp end={1800} duration={5} /></h2>
								<h6 className="fw3">Công việc</h6>
							</div>
							<div className="head-counter-bx">
								<h2 className="m-b5 counter"><CountUp end={4500} duration={5} /></h2>
								<h6 className="fw3">Khóa học</h6>
							</div>
							<div className="head-counter-bx">
								<h2 className="m-b5 counter"><CountUp end={1500} duration={5} /></h2>
								<h6 className="fw3">Freelancers</h6>
							</div>
						</div>
						<Jobcategories />
					</div>
				</div>
				{/* <Featureblog /> */}
				<Jobsection />
				{accountType === "APPLICANT" && <SurveySection />}
				<div className="section-full p-tb70 overlay-black-dark text-white text-center bg-img-fix" style={{ backgroundImage: "url(" + bnr2 + ")" }}>
					<div className="container">
						<div className="section-head text-center text-white">
							<h2 className="m-b5">Top các khóa học</h2>

						</div>
						<Owltestimonial />
					</div>
				</div>
			</div>
			<Footer />
		</div>
	)
}
export default Homepage;