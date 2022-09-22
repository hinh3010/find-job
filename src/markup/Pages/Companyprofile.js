import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Header from './../Layout/Header';
import Footer from './../Layout/Footer';
import moment from 'moment'
import { Form } from 'react-bootstrap';
import GoogleMaps from "simple-react-google-maps";
import { getAllCountry, getAllProvine } from '../../store/actions/Location/LocationAction';
import { getUserById, updateUser } from '../../store/actions/User/UserAction';
import swal from 'sweetalert';
import axios from 'axios';
import { BASE_URL } from '../../config/BASE_URL';
import { sensitiveUpdates, updateUsers } from '../../services/UserServices/UserServices';
import { updateUserAction } from '../../store/actions/AuthActions';
import { uploadImage } from '../../services/FileService/FileService';
import { Button, Modal } from 'antd';
import { Modal as Modal2 } from 'react-bootstrap';

function Companyprofile(props) {
	const dispatch = useDispatch();
	const { auth } = useSelector((state) => state.auth);
	const { user, accessToken } = useSelector((state) => state.auth.auth);
	const allProvince = useSelector(state => state.LocationReducer.provinces);
	const allCountry = useSelector(state => state.LocationReducer.country);
	const token = accessToken.token;

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


	const {
		fullCompanyName,
		shortCompanyName,
		email,
		id,
		startDate,
		introduction,
		imgPaperUrl,
		companyField,
		url,
		phone,
		representative,
		accountType,
		address,
	} = user;

	const [address1, setAddress1] = useState({
		countryId: address?.countryId || '6296ee56b4382126ae3b148e',
		provinceId: address?.provinceId || '61b327306583182246621370',
		detailAddress: address?.detailAddress || '',
	});

	let errorsObj = {
		fullCompanyName: "",
		shortCompanyName: "",
		representative: "",
		email: "",
		phone: "",
		url: "",
		imgPaperUrl: "",
		detailAddress: "",
		introduction: "",
		countryId: "",
		startDate: ""
	};

	const [errors, setErrors] = useState(errorsObj);

	const [sensitiveUpdate, setSensitiveUpdate] = useState({
		fullCompanyName,
		shortCompanyName,
		representative,
		imgPaperUrl,
	})

	const [companyInfo, setCompanyInfo] = useState({
		accountType,
		email,
		url,
		startDate: startDate,
		companyField: companyField || "bất động sản",
		address: {
			...address1
		},
		introduction,
		phone: phone
	});

	const onUpdate = (data) => {
		updateUsers(user.id, data, auth.accessToken.token)
			.then((response) => {
				dispatch(updateUserAction(response.data));
				const userDetail = { ...auth, user: response.data }
				localStorage.setItem("userDetail", JSON.stringify(userDetail));
			})
	}


	const setImgUrl = async (value) => {
		if (value.files && value.files[0]) {
			const reader = new FileReader();

			reader.onload = function (e) {
				document.getElementById('imgPaperUrl').src = e.target.result;
			}
			reader.readAsDataURL(value.files[0]);
			try {
				const formData = new FormData();
				formData.append("files", value.files[0])
				const path = await axios.post(`${BASE_URL}/api/cms/attachment/images`, formData, {
					headers: {
						Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2Mjk1OTkwNWFlMmRjMzU1ZjEyZDlmMDMiLCJpYXQiOjE2NTQ0ODkxMTF9.17v-FFQLP6lGzQ87oQBsjxvlCuaXK1Snq1OFQDHoHvE`
					}
				});
				setSensitiveUpdate({ ...sensitiveUpdate, imgPaperUrl: path.data[0].path })
			} catch (err) {
				setSensitiveUpdate({ ...sensitiveUpdate, imgPaperUrl: "" })
				swal(
					"ERROR",
					"File quá lớn hoặc không hợp lệ!!",
					"error",
				);
			}
		}
	}


	// const startDateFormat = moment(startDate).format('YYYY-MM-DD');

	const onHandleSubmitInfoCompany = () => {

		let error = false;
		const errorObj = { ...errorsObj };

		if (!companyInfo.email) {
			errorObj.email = 'Vui lòng nhập trường này!!';
			error = true;
		} else {
			const patternEmail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
			if (!patternEmail.test(companyInfo.email)) {
				errorObj.email = 'Email không hợp lệ!!';
				error = true;
			}
		}


		if (!companyInfo.phone) {
			errorObj.phone = 'Vui lòng nhập trường này!!';
			error = true;
		} else {
			const patternPhone = /^((\+)33|0)[1-9](\d{2}){4}$/;
			if (!patternPhone.test(companyInfo.phone)) {
				errorObj.phone = 'Số điện thoại không hợp lệ!!';
				error = true;
			}
		}

		if (companyInfo.url.length === 0) {
			errorObj.url = 'Vui lòng nhập trường này!!';
			error = true;
		} else {
			const patternUrl = /(https?:\/\/[^\s]+)/g;
			if (!patternUrl.test(companyInfo.url)) {
				errorObj.url = 'Websit không hợp lệ!!';
				error = true;
			}
		}

		if (!address1?.detailAddress) {
			errorObj.detailAddress = 'Vui lòng nhập trường này!!';
			error = true;
		} else {
			if (companyInfo.address.detailAddress.length > 30) {
				errorObj.detailAddress = 'Địa chỉ phải nhỏ hơn 30 ký tự!!';
				error = true;
			}
		}
		if (!companyInfo.introduction) {
			errorObj.introduction = 'Vui lòng nhập trường này!!';
			error = true;
		}

		if (address1?.countryId === 'empty' || address1?.countryId === '' || !address1?.countryId) {
			errorObj.countryId = 'Vui lòng nhập trường này!!';
			error = true;
		}

		if (!companyInfo.startDate || companyInfo.startDate === '00/00/0000') {
			errorObj.startDate = 'Ngày thành lập sai định dạng!!';
			error = true;
		}




		setErrors(errorObj);
		if (error) return;

		let objData = {}

		if (address1?.countryId !== "6296ee56b4382126ae3b148e") {
			objData = {
				...companyInfo,
				address: {
					...address1,
					provinceId: undefined
				},
				url: `${companyInfo.url}`,

			}
		} else {
			objData = {
				...companyInfo,
				address: {
					...address1,
				},
				url: `${companyInfo.url}`,
			}
		}

		dispatch(updateUser(id, objData, token, accessToken));
	}


	const handleSubmitSensitiveUpdate = () => {

		let error = false;
		const errorObj = { ...errorsObj };


		if (!sensitiveUpdate.fullCompanyName) {
			errorObj.fullCompanyName = 'Vui lòng nhập trường này!!';
			error = true;
		} else {
			if (sensitiveUpdate.fullCompanyName.length > 30) {
				errorObj.fullCompanyName = 'Tên đầy đủ phải nhỏ hơn 30 ký tự!!';
				error = true;
			}
		}

		if (!sensitiveUpdate.shortCompanyName) {
			errorObj.shortCompanyName = 'Vui lòng nhập trường này!!';
			error = true;
		} else {
			if (sensitiveUpdate.shortCompanyName.length > 30) {
				errorObj.shortCompanyName = 'Tên viết tắt phải nhỏ hơn 30 ký tự!!';
				error = true;
			}
		}

		if (!sensitiveUpdate.representative) {
			errorObj.representative = 'Vui lòng nhập trường này!!';
			error = true;
		} else {
			if (sensitiveUpdate.representative.length > 30) {
				errorObj.representative = 'Tên người đại diện phải nhỏ hơn 30 ký tự!!';
				error = true;
			}
		}

		if (sensitiveUpdate.imgPaperUrl === "") {
			errorObj.imgPaperUrl = "File không hợp lệ!!";
			error = true;
		}



		setErrors(errorObj);
		if (error) return;

		let objData = {
			sensitiveUpdate
		}
		sensitiveUpdates(id, objData, token)
			.then((response) => {
				swal(
					"SUCCESS",
					"Thông tin của bạn đã được ghi nhận, vui lòng chờ xét duyệt !!",
					"success",
				);
			})
			.catch((error) => {
				console.log(error);
			});
	};
	useEffect(() => {
		dispatch(getAllProvine());
		dispatch(getAllCountry());
		dispatch(getUserById(id, accessToken));
	}, [])

	const [modal, setModal] = useState(false);

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
												<div className="canditate-des">
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
													<div className="upload-link" title="update" data-toggle="tooltip" data-placement="right">
														<input onChange={(event) => {
															const data = new FormData();
															data.append("files", event.target.files[0]);
															uploadImage(data, auth.accessToken.token)
																.then((response) => {
																	onUpdate({ "accountType": "APPLICANT", "avatarUrl": response.data[0].path })
																})
														}} type="file" className="update-flie" />
														<i className='fa fa-camera'></i>
													</div>
												</div>
												<div className="candidate-title">
													<h4 className="m-b5"><Link to={"#"}>{user?.fullCompanyName}</Link></h4>
												</div>
											</div>
											<ul>
												<li><Link to={"/company-profile"} className="active">
													<i className="fa fa-user-o" aria-hidden="true"></i>
													<span>Thông tin công ty</span></Link></li>
												<li><Link to={"/company-post-jobs"}>
													<i className="fa fa-file-text-o" aria-hidden="true"></i>
													<span>Đăng bài post</span></Link></li>
												<li><Link to={"/company-manage-job"}>
													<i className="fa fa-briefcase" aria-hidden="true"></i>
													<span>Quản lý công việc</span></Link></li>
												<li><Link to={"/company-resume"}>
													<i className="fa fa-id-card-o" aria-hidden="true"></i>
													<span>Quản lý CV</span></Link>
												</li>
												<li><Link to={"/company-survey"}>
													<i className="fa fa-bar-chart" aria-hidden="true"></i>
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
									<div className="job-bx submit-resume">
										<div className="job-bx-title clearfix">
											<h5 className="font-weight-700 pull-left text-uppercase">Thông tin công ty (cần chờ xét duyệt)</h5>
											<span onClick={() => {
												props.history.goBack();
											}} className="site-button right-arrow button-sm float-right">Back</span>
										</div>
										<form>
											<div className="row m-b30">
												<div className="col-lg-6 col-md-6">
													<div className="form-group">
														<label>Tên đầy đủ</label>
														<input
															type="text"
															className="form-control"
															placeholder="Nhập vào tên công ty"
															name="fullCompanyName"
															defaultValue={fullCompanyName}
															onChange={(event) => setSensitiveUpdate({ ...sensitiveUpdate, [event.target.name]: event.target.value })}
														/>
														<div className='text-danger'>
															{errors.fullCompanyName && <div>{errors.fullCompanyName}</div>}
														</div>
													</div>
												</div>
												<div className="col-lg-6 col-md-6">
													<div className="form-group">
														<label>Tên viết tắt</label>
														<input
															type="text"
															className="form-control"
															placeholder="Nhập vào tên công ty"
															name="shortCompanyName"
															defaultValue={shortCompanyName}
															onChange={(event) => setSensitiveUpdate({ ...sensitiveUpdate, [event.target.name]: event.target.value })}
														/>
														<div className='text-danger'>
															{errors.shortCompanyName && <div>{errors.shortCompanyName}</div>}
														</div>
													</div>
												</div>
												<div className="col-lg-6 col-md-6">
													<div className="form-group">
														<label>Người đại diện</label>
														<input
															type="text"
															className="form-control"
															placeholder="Nhập vào tên người đại diện"
															name="representative"
															defaultValue={representative}
															onChange={(event) => setSensitiveUpdate({ ...sensitiveUpdate, [event.target.name]: event.target.value })}
														/>
														<div className='text-danger'>
															{errors.representative && <div>{errors.representative}</div>}
														</div>
													</div>
												</div>
												<div className="col-lg-6 col-md-6">
													<div className="form-group">
														<label className="">Chứng nhận, đăng ký của doanh nghiệp kinh doanh</label>
														<div id="" className="job-bx bg-white m-b30">
															<form className="attach-resume">
																<div className="row">
																	<div className="col-lg-12 col-md-12">
																		<div className="form-group">
																			<div className="custom-file">
																				{<img src={`${BASE_URL}/${imgPaperUrl}`} id="imgPaperUrl" alt=" Tải lên kích cỡ 3 MB" />}
																				<input
																					type="file"
																					value=""
																					onChange={(e) => setImgUrl(e.target)}
																					onClick={(event) => {
																						event.target.value = null
																					}}
																					className="site-button form-control"
																					id="customFile"
																					placeholder="Tải lên kích cỡ 3 MB"
																				/>
																			</div>
																		</div>
																	</div>
																</div>
															</form>
															{sensitiveUpdate.imgPaperUrl ?
																// <Link to={"/imgPaperUrl"} className="site-button">Xem chứng nhận</Link>
																<>
																	<Button type="primary" onClick={() => { setModal(true) }}>
																		Xem chứng nhận
																	</Button>
																	<Modal2
																		show={modal}
																		onHide={setModal}
																		className='modal fade modal-bx-info'>
																		<div className='modal-dialog my-0' role='document'>
																			<div className='modal-content'>
																				<div style={{ fontSize: '20px', fontWeight: 'bold' }} className='modal-header'>
																					Chứng nhận
																				</div>
																				<div className='modal-body'>
																					<img className="h-100 w-100" src={`${BASE_URL}/${sensitiveUpdate.imgPaperUrl}`} alt="ChungNhan" />
																				</div>
																				<div className='modal-footer'>
																					<button
																						type='button'
																						className='btn btn-secondary'
																						onClick={() => setModal(false)}>
																						Close
																					</button>
																				</div>
																			</div>
																		</div>
																	</Modal2>
																</>
																:
																""
															}
														</div>
														<div className='text-danger'>
															{errors.imgPaperUrl && <div>{errors.imgPaperUrl}</div>}
														</div>
													</div>
												</div>
												<div className="col-lg-5 col-md-6">
													<button type="button" className="site-button m-b30" onClick={handleSubmitSensitiveUpdate}>Gửi yêu cầu cập nhật</button>
												</div>
											</div>
											<div className="row m-b30">
												<div className="col-lg-12 col-md-12">
													<div className="job-bx-title clearfix">
														<h5 className="font-weight-700 pull-left text-uppercase">Thông tin cơ bản</h5>
													</div>

												</div>
												<div className="col-lg-6 col-md-6">
													<div className="form-group">
														<label>Email</label>
														<input
															type="email"
															className="form-control"
															placeholder="info@gmail.com"
															name="email"
															defaultValue={email}
															onChange={(event) => setCompanyInfo({ ...companyInfo, [event.target.name]: event.target.value })}
														/>
														<div className='text-danger'>
															{errors.email && <div>{errors.email}</div>}
														</div>
													</div>
												</div>



												<div className="col-lg-6 col-md-6">
													<div className="form-group">
														<label>Số điện thoại</label>
														<input
															type="number"
															className="form-control"
															placeholder="09xxxxxxxx"
															name="phone"
															defaultValue={phone}
															onChange={(event) => setCompanyInfo({ ...companyInfo, [event.target.name]: event.target.value })}
														/>
														<div className='text-danger'>
															{errors.phone && <div>{errors.phone}</div>}
														</div>
													</div>
												</div>

												<div className="col-lg-6 col-md-6">
													<div className="form-group">
														<label>Website</label>
														<input
															type="text"
															className="form-control"
															placeholder="Nhập liên kết đến Website công ty"
															name="url"
															defaultValue={url}
															onChange={(event) => setCompanyInfo({ ...companyInfo, [event.target.name]: event.target.value })}
														/>
														<div className='text-danger'>
															{errors.url && <div>{errors.url}</div>}
														</div>
													</div>
												</div>


												<div className="col-lg-6 col-md-6">
													<div className="form-group">
														<label>Ngày thành lập </label>
														<input
															type="date"
															className="form-control"
															placeholder="vd: 17/12/2018"
															name="startDate"
															value={moment(companyInfo.startDate).format('YYYY-MM-DD')}
															onChange={(event) => {																
																if (event.target.value.length >= 11) {
																	setCompanyInfo({
																		...companyInfo,
																		[event.target.name]: '00/00/0000',
																	})
																	return;
																} else {
																	setCompanyInfo({
																		...companyInfo,
																		[event.target.name]: event.target.value,
																	})
																}
															}
															}
														/>
														<div className='text-danger'>
															{errors.startDate && <div>{errors.startDate}</div>}
														</div>
													</div>
												</div>

												<div className="col-lg-6 col-md-6">
													<div className="form-group">
														<label>Loại công ty</label>
														<Form.Control
															as="select"
															custom
															className="custom-select"
															name="companyField"
															defaultValue={companyField}
															onChange={(event) => setCompanyInfo({ ...companyInfo, [event.target.name]: event.target.value })}>
															<option value="bất động sản">Bất động sản</option>
															<option value="giáo dục">Giáo dục</option>
															<option value="tài chính">Tài chính</option>
															<option value="bán lẻ">Bán lẻ</option>
															<option value="giải trí">Giải trí</option>
															<option value="dịch vụ">Dịch vụ</option>
															<option value="công nghệ">Công nghệ</option>
															<option value="khác">Khác</option>
														</Form.Control>
													</div>
												</div>
												<div className="col-lg-6 col-md-6 d-flex justify-content-between">

													<div className="mr-1 w-50">
														<div className="form-group">
															<label>Quốc gia</label>
															<Form.Control
																as="select"
																custom
																className="custom-select"
																value={address1.countryId}
																name="countryId"
																onChange={(event) => {
																	setAddress1({ ...address1, [event.target.name]: event.target.value })
																}
																}
															>
																{allCountry?.map((country, index) => {
																	return <option key={index} value={country.id}>{country.name}</option>
																})}
															</Form.Control>
															<div className='text-danger'>
																{errors.countryId && <div>{errors.countryId}</div>}
															</div>
														</div>
													</div>
													{address1?.countryId === "6296ee56b4382126ae3b148e" ?
														<div className="ml-1 w-50">
															<div className="form-group">
																<label>Tỉnh</label>
																<Form.Control
																	as="select"
																	custom
																	className="custom-select"
																	placeholder="Hà Nội"
																	value={address1.provinceId}
																	name="provinceId"
																	onChange={(event) => setAddress1({ ...address1, [event.target.name]: event.target.value })}
																>
																	{allProvince?.map((provine, index) => {
																		return <option key={index} value={provine.id}>{provine.name}</option>
																	})}
																</Form.Control>
															</div>
														</div>
														:
														''
													}
												</div>
												<div className="col-lg-6 col-md-6">
													<div className="form-group">
														<label>Địa chỉ cụ thể</label>
														<input
															type="text"
															className="form-control"
															placeholder="Vietnam"
															name="detailAddress"
															defaultValue={'' || companyInfo.address?.detailAddress}
															onChange={(event) => setAddress1({ ...address1, [event.target.name]: event.target.value })}
														/>
														<div className='text-danger'>
															{errors.detailAddress && <div>{errors.detailAddress}</div>}
														</div>
													</div>

												</div>

												<div className="col-lg-12 col-md-12">
													<div className="form-group">
														<label>Mô tả</label>
														<textarea
															className="form-control"
															name="introduction"
															defaultValue={introduction}
															onChange={(event) => setCompanyInfo({ ...companyInfo, [event.target.name]: event.target.value })}>
														</textarea>
														<div className='text-danger'>
															{errors.introduction && <div>{errors.introduction}</div>}
														</div>
													</div>
												</div>
											</div>
											<button type="button" className="site-button m-b30" onClick={onHandleSubmitInfoCompany}>Lưu thông tin</button>
										</form>
									</div>
								</div>
							</div>
						</div>
					</div>

				</div>
			</div >
			<Footer />
		</>
	)
}
export default Companyprofile;