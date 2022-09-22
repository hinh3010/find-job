import React from 'react';
import { Link } from "react-scroll";


function Listingsidebar() {
	return (
		<div className="sticky-top bg-white">
			<div className="candidate-info onepage">
				<ul>
					<li>
						<Link activeClass="active"
							className="scroll-bar nav-link" to="resume_headline_bx" smooth={true} offset={-70} duration={500}><span>Giới thiệu</span>
						</Link>
					</li>
					<li>
						<Link activeClass="active"
							className="scroll-bar nav-link" to="key_skills_bx" smooth={true} offset={-70} duration={500}><span>Kỹ năng chính</span>
						</Link>
					</li>
					<li>
						<Link activeClass="active"
							className="scroll-bar nav-link" to="education_bx" smooth={true} offset={-70} duration={500}><span>Học vấn</span>
						</Link>
					</li>
					<li>
						<Link activeClass="active"
							className="scroll-bar nav-link" to="projects_bx" smooth={true} offset={-70} duration={500}><span>Kinh nghiệm làm việc</span>
						</Link>
					</li>

					{/* <li>
						<Link activeClass="active"
							className="scroll-bar nav-link" to="it_skills_bx" smooth={true} offset={-70} duration={500}><span>Kỹ năng CNTT</span>
						</Link>
					</li>
					<li>
						<Link activeClass="active"
							className="scroll-bar nav-link" to="projects_bx" smooth={true} offset={-70} duration={500}><span>Dự án đã tham gia</span>
						</Link>
					</li> */}
					<li>
						<Link activeClass="active"
							className="scroll-bar nav-link" to="accomplishments_bx" smooth={true} offset={-70} duration={500}><span>Tóm tắt bản thân</span>
						</Link>
					</li>
					{/* <li>
						<Link activeClass="active"
							className="scroll-bar nav-link" to="accomplishments_bx" smooth={true} offset={-70} duration={500}><span>Thành tựu</span>
						</Link>
					</li> */}
					<li>
						<Link activeClass="active"
							className="scroll-bar nav-link" to="desired_career_profile_bx" smooth={true} offset={-70} duration={500}><span>Hồ sơ nghề nghiệp mong muốn</span>
						</Link>
					</li>
					<li>
						<Link activeClass="active"
							className="scroll-bar nav-link" to="personal_details_bx" smooth={true} offset={-70} duration={500}><span>Thông tin chi tiết cá nhân</span>
						</Link>
					</li>
					{/* <li>
						<Link activeClass="active"
							className="scroll-bar nav-link" to="attach_resume_bx" smooth={true} offset={-70} duration={500}><span>Hồ sơ đính kèm</span>
						</Link>
					</li> */}
				</ul>
			</div>
		</div>
	)
}
export default Listingsidebar;