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
		companyField: companyField || "b???t ?????ng s???n",
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
					"File qu?? l???n ho???c kh??ng h???p l???!!",
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
			errorObj.email = 'Vui l??ng nh???p tr?????ng n??y!!';
			error = true;
		} else {
			const patternEmail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
			if (!patternEmail.test(companyInfo.email)) {
				errorObj.email = 'Email kh??ng h???p l???!!';
				error = true;
			}
		}


		if (!companyInfo.phone) {
			errorObj.phone = 'Vui l??ng nh???p tr?????ng n??y!!';
			error = true;
		} else {
			const patternPhone = /^((\+)33|0)[1-9](\d{2}){4}$/;
			if (!patternPhone.test(companyInfo.phone)) {
				errorObj.phone = 'S??? ??i???n tho???i kh??ng h???p l???!!';
				error = true;
			}
		}

		if (companyInfo.url.length === 0) {
			errorObj.url = 'Vui l??ng nh???p tr?????ng n??y!!';
			error = true;
		} else {
			const patternUrl = /(https?:\/\/[^\s]+)/g;
			if (!patternUrl.test(companyInfo.url)) {
				errorObj.url = 'Websit kh??ng h???p l???!!';
				error = true;
			}
		}

		if (!address1?.detailAddress) {
			errorObj.detailAddress = 'Vui l??ng nh???p tr?????ng n??y!!';
			error = true;
		} else {
			if (companyInfo.address.detailAddress.length > 30) {
				errorObj.detailAddress = '?????a ch??? ph???i nh??? h??n 30 k?? t???!!';
				error = true;
			}
		}
		if (!companyInfo.introduction) {
			errorObj.introduction = 'Vui l??ng nh???p tr?????ng n??y!!';
			error = true;
		}

		if (address1?.countryId === 'empty' || address1?.countryId === '' || !address1?.countryId) {
			errorObj.countryId = 'Vui l??ng nh???p tr?????ng n??y!!';
			error = true;
		}

		if (!companyInfo.startDate || companyInfo.startDate === '00/00/0000') {
			errorObj.startDate = 'Ng??y th??nh l???p sai ?????nh d???ng!!';
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
			errorObj.fullCompanyName = 'Vui l??ng nh???p tr?????ng n??y!!';
			error = true;
		} else {
			if (sensitiveUpdate.fullCompanyName.length > 30) {
				errorObj.fullCompanyName = 'T??n ?????y ????? ph???i nh??? h??n 30 k?? t???!!';
				error = true;
			}
		}

		if (!sensitiveUpdate.shortCompanyName) {
			errorObj.shortCompanyName = 'Vui l??ng nh???p tr?????ng n??y!!';
			error = true;
		} else {
			if (sensitiveUpdate.shortCompanyName.length > 30) {
				errorObj.shortCompanyName = 'T??n vi???t t???t ph???i nh??? h??n 30 k?? t???!!';
				error = true;
			}
		}

		if (!sensitiveUpdate.representative) {
			errorObj.representative = 'Vui l??ng nh???p tr?????ng n??y!!';
			error = true;
		} else {
			if (sensitiveUpdate.representative.length > 30) {
				errorObj.representative = 'T??n ng?????i ?????i di???n ph???i nh??? h??n 30 k?? t???!!';
				error = true;
			}
		}

		if (sensitiveUpdate.imgPaperUrl === "") {
			errorObj.imgPaperUrl = "File kh??ng h???p l???!!";
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
					"Th??ng tin c???a b???n ???? ???????c ghi nh???n, vui l??ng ch??? x??t duy???t !!",
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
													<span>Th??ng tin c??ng ty</span></Link></li>
												<li><Link to={"/company-post-jobs"}>
													<i className="fa fa-file-text-o" aria-hidden="true"></i>
													<span>????ng b??i post</span></Link></li>
												<li><Link to={"/company-manage-job"}>
													<i className="fa fa-briefcase" aria-hidden="true"></i>
													<span>Qu???n l?? c??ng vi???c</span></Link></li>
												<li><Link to={"/company-resume"}>
													<i className="fa fa-id-card-o" aria-hidden="true"></i>
													<span>Qu???n l?? CV</span></Link>
												</li>
												<li><Link to={"/company-survey"}>
													<i className="fa fa-bar-chart" aria-hidden="true"></i>
													<span>Kh???o s??t</span></Link>
												</li>
												<li><Link to={"/jobs-change-password"}>
													<i className="fa fa-key" aria-hidden="true"></i>
													<span>?????i m???t kh???u</span></Link></li>
											</ul>
										</div>
									</div>
								</div>
								<div className="col-xl-9 col-lg-8 m-b30">
									<div className="job-bx submit-resume">
										<div className="job-bx-title clearfix">
											<h5 className="font-weight-700 pull-left text-uppercase">Th??ng tin c??ng ty (c???n ch??? x??t duy???t)</h5>
											<span onClick={() => {
												props.history.goBack();
											}} className="site-button right-arrow button-sm float-right">Back</span>
										</div>
										<form>
											<div className="row m-b30">
												<div className="col-lg-6 col-md-6">
													<div className="form-group">
														<label>T??n ?????y ?????</label>
														<input
															type="text"
															className="form-control"
															placeholder="Nh???p v??o t??n c??ng ty"
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
														<label>T??n vi???t t???t</label>
														<input
															type="text"
															className="form-control"
															placeholder="Nh???p v??o t??n c??ng ty"
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
														<label>Ng?????i ?????i di???n</label>
														<input
															type="text"
															className="form-control"
															placeholder="Nh???p v??o t??n ng?????i ?????i di???n"
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
														<label className="">Ch???ng nh???n, ????ng k?? c???a doanh nghi???p kinh doanh</label>
														<div id="" className="job-bx bg-white m-b30">
															<form className="attach-resume">
																<div className="row">
																	<div className="col-lg-12 col-md-12">
																		<div className="form-group">
																			<div className="custom-file">
																				{<img src={`${BASE_URL}/${imgPaperUrl}`} id="imgPaperUrl" alt=" T???i l??n k??ch c??? 3 MB" />}
																				<input
																					type="file"
																					value=""
																					onChange={(e) => setImgUrl(e.target)}
																					onClick={(event) => {
																						event.target.value = null
																					}}
																					className="site-button form-control"
																					id="customFile"
																					placeholder="T???i l??n k??ch c??? 3 MB"
																				/>
																			</div>
																		</div>
																	</div>
																</div>
															</form>
															{sensitiveUpdate.imgPaperUrl ?
																// <Link to={"/imgPaperUrl"} className="site-button">Xem ch???ng nh???n</Link>
																<>
																	<Button type="primary" onClick={() => { setModal(true) }}>
																		Xem ch???ng nh???n
																	</Button>
																	<Modal2
																		show={modal}
																		onHide={setModal}
																		className='modal fade modal-bx-info'>
																		<div className='modal-dialog my-0' role='document'>
																			<div className='modal-content'>
																				<div style={{ fontSize: '20px', fontWeight: 'bold' }} className='modal-header'>
																					Ch???ng nh???n
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
													<button type="button" className="site-button m-b30" onClick={handleSubmitSensitiveUpdate}>G???i y??u c???u c???p nh???t</button>
												</div>
											</div>
											<div className="row m-b30">
												<div className="col-lg-12 col-md-12">
													<div className="job-bx-title clearfix">
														<h5 className="font-weight-700 pull-left text-uppercase">Th??ng tin c?? b???n</h5>
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
														<label>S??? ??i???n tho???i</label>
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
															placeholder="Nh???p li??n k???t ?????n Website c??ng ty"
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
														<label>Ng??y th??nh l???p </label>
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
														<label>Lo???i c??ng ty</label>
														<Form.Control
															as="select"
															custom
															className="custom-select"
															name="companyField"
															defaultValue={companyField}
															onChange={(event) => setCompanyInfo({ ...companyInfo, [event.target.name]: event.target.value })}>
															<option value="b???t ?????ng s???n">B???t ?????ng s???n</option>
															<option value="gi??o d???c">Gi??o d???c</option>
															<option value="t??i ch??nh">T??i ch??nh</option>
															<option value="b??n l???">B??n l???</option>
															<option value="gi???i tr??">Gi???i tr??</option>
															<option value="d???ch v???">D???ch v???</option>
															<option value="c??ng ngh???">C??ng ngh???</option>
															<option value="kh??c">Kh??c</option>
														</Form.Control>
													</div>
												</div>
												<div className="col-lg-6 col-md-6 d-flex justify-content-between">

													<div className="mr-1 w-50">
														<div className="form-group">
															<label>Qu???c gia</label>
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
																<label>T???nh</label>
																<Form.Control
																	as="select"
																	custom
																	className="custom-select"
																	placeholder="H?? N???i"
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
														<label>?????a ch??? c??? th???</label>
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
														<label>M?? t???</label>
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
											<button type="button" className="site-button m-b30" onClick={onHandleSubmitInfoCompany}>L??u th??ng tin</button>
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