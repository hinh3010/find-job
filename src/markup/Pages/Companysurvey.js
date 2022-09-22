import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux'
import { Link, useHistory } from 'react-router-dom';
import Header from './../Layout/Header';
import Footer from './../Layout/Footer';
import { useSelector } from 'react-redux';
import { BASE_URL } from '../../config/BASE_URL';
import { Modal, Pagination } from 'antd';
import { getListSurvey } from '../../services/Survey/SurveyServices';
import moment from 'moment';

function Companytransactions() {
	const { user, accessToken } = useSelector((state) => state.auth.auth);
	const history = useHistory();
	const [isModalVisible, setIsModalVisible] = useState(false);

	const showModal = () => {
		setIsModalVisible(true);
	};

	const handleOk = () => {
		setIsModalVisible(false);
	};

	const handleCancel = () => {
		setIsModalVisible(false);
	};

	const [listSurvey, setListSurvey] = useState(undefined);

	const [page, setPage] = useState(1);
	const [totalPage, setTotalPage] = useState(1);

	useEffect(() => {
		const fetch = getListSurvey(page, '-createdAt', "false", user.id, accessToken.token);

		fetch.then((response) => {
			setListSurvey(response.data.docs);
			setTotalPage(response.data.totalPages);
		}).catch((error) => {
			console.log(error)
		})
	}, [page, user.id, accessToken.token])

	return (
		<>
			<Header />
			<div className="page-content bg-white">
				<div className="content-block">
					<div className="section-full bg-white p-t50 p-b20">
						<div className="container">
							<div className="row">
								<div className="col-xl-3 col-lg-4 m-b30">
									<div className="sticky-top">
										<div className="candidate-info company-info">
											<div className="candidate-detail text-center">
												<div className='canditate-des'>
													<span style={{ cursor: 'pointer' }} onClick={showModal}>
														{
															user?.avatarUrl?.indexOf('https://') === -1 ?
																<img alt="" src={`${BASE_URL}/${user?.avatarUrl}`} /> :
																<img alt="" src={user?.avatarUrl} />
														}
													</span>
													<Modal title="Avatar" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
														{
															user?.avatarUrl?.indexOf('https://') === -1 ?
																<img style={{ objectFit: 'cover' }} className="w-100 h-100" alt="" src={`${BASE_URL}/${user?.avatarUrl}`} /> :
																<img style={{ objectFit: 'cover' }} className="w-100 h-100" alt="" src={user?.avatarUrl} />
														}
													</Modal>
												</div>
												<div className="candidate-title">
													<h4 className="m-b5"><Link to={"#"}>{user?.fullCompanyName}</Link></h4>
												</div>
											</div>
											<ul>
												<li><Link to={"/company-profile"}>
													<i className="fa fa-user-o" aria-hidden="true"></i>
													<span>Thông tin công ty</span></Link></li>
												<li><Link to={"/company-post-jobs"}>
													<i className="fa fa-file-text-o" aria-hidden="true"></i>
													<span>Đăng bài post</span></Link></li>
												{/* <li><Link to={"/company-transactions"}>
													<i className="fa fa-random" aria-hidden="true"></i>
													<span>Transactions</span></Link></li> */}
												<li><Link to={"/company-manage-job"}>
													<i className="fa fa-briefcase" aria-hidden="true"></i>
													<span>Quản lý công việc</span></Link></li>
												<li><Link to={"/company-resume"}>
													<i className="fa fa-id-card-o" aria-hidden="true"></i>
													<span>Quản lý CV</span></Link></li>
												<li><Link to={"/company-survey"} className="active">
													<i class="fa fa-bar-chart" aria-hidden="true"></i>
													<span>Khảo sát</span></Link>
												</li>
												<li><Link to={"/jobs-change-password"}>
													<i className="fa fa-key" aria-hidden="true"></i>
													<span>Đổi mật khẩu</span></Link></li>
											</ul>
										</div>
									</div>
								</div>
								<div className="col-xl-9 col-lg-8 m-b30">
									<div className="job-bx table-job-bx clearfix">
										<div className="job-bx-title clearfix d-flex align-items-center">
											<h5 className="font-weight-700 pull-left text-uppercase m-0">Bảng khảo sát</h5>
											<div className="ml-auto d-flex align-items-center">
												<button onClick={() => { history.push('/company-survey/create') }} className="servey__button mr-4">Tạo khảo sát</button>
												<Link to={"/company-post-jobs"} style={{ height: 'fit-content' }} className="site-button right-arrow button-sm float-right">Back</Link>
											</div>
										</div>
										<table>
											<thead>
												<tr>
													<th>STT</th>
													<th>Tên khảo sát</th>
													<th>Phản hồi</th>
													<th>Thời gian khảo sát</th>
													<th>Hạn khảo sát</th>
													<th>Chi tiết</th>
													<th>Phản hồi</th>
												</tr>
											</thead>
											<tbody>
												{listSurvey?.map((item, index) => {
													return <tr key={index}>
														<td className="order-id text-primary">{index + 1}</td>
														<td className="job-name"><Link to={`/company-survey/detail/${item.id}`}>{item.title}</Link></td>
														<td className="amount text-primary">{item.totalSurveyResponse}</td>
														<td className="date">{moment(item.surveyStartDate).format('DD-MM-YYYY')}</td>
														<td className="transfer">{moment(item.surveyEndDate).format('DD-MM-YYYY')}</td>
														<td className="expired pending cursor-pointer" onClick={() => { history.push(`/company-survey/detail/${item.id}`) }}>Chi tiết </td>
														<td className="expired success cursor-pointer" onClick={() => { history.push(`/company-survey/response/${item.id}`) }}>Phản hồi</td>
													</tr>
												})}
											</tbody>
										</table>
										<div className='pagination-bx m-t30'>
											<ul className='pagination'>
												<Pagination
													className="mx-auto"
													current={page}
													defaultCurrent={1}
													onChange={(page) => {
														setPage(page);
													}}
													total={totalPage * 10}
												/>
											</ul>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>

				</div>
			</div>
			<Footer />
		</>
	)
}
export default Companytransactions;