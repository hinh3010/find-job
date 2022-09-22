import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from './../Layout/Header';
import Footer from './../Layout/Footer';
import { Form } from 'react-bootstrap';
import { createCourse } from '../../services/CourseServices/CourseServices';
import { getAll } from '../../services/ProvinceService/ProvinceService';
import swal from 'sweetalert';
import { useDispatch, useSelector } from 'react-redux';
import { getAllBank } from '../../services/BankService/BankService';
import { BASE_URL } from '../../config/BASE_URL';

function CourseCreate() {
	const dispatch = useDispatch();
	const { user, accessToken } = useSelector((state) => state.auth.auth);
	const [listBank, setListBank] = useState([]);
	const [listProvince, setListProvince] = useState([]);
	const [listDistrict, setListDistrict] = useState([]);
	const [listWard, setListWard] = useState([]);
	const [isFree, setIsFree] = useState(false);
	let [valueSubmit, setValueSubmit] = useState({
		"title": "",
		"introduction": "",
		"description": "",
		"address": {
			"detailAddress": "",
			"provinceId": "",
			"districtId": "",
			"wardId": ""
		},
		"cost": "",
		"tel": "",
		"requirement": [],
		"status": "WAITING_TO_REVIEW",
		"type": "",
		"courseStartDate": "",
		"courseEndDate": "",
		"courseApplyDeadline": "",
		"bankName": "",
		"bankAccount": "",
		"bankDivision": "",
		"bankAccountName": "",
		"lessonNumber": "",
		"transferSyntax": ""
	})


	const [errors, setErrors] = useState({
		"title": '',
		"introduction": '',
		"description": '',
		"detailAddress": '',
		"provinceId": '',
		"districtId": '',
		"wardId": '',
		"cost": '',
		"tel": '',
		"requirement": '',
		"status": '',
		"courseEndDate": "",
		"type": '',
		"courseStartDate": '',
		"courseApplyDeadline": '',
		"bankName": '',
		"lessonNumber": "",
		"bankAccount": '',
		"bankDivision": '',
		"bankAccountName": '',
		"transferSyntax": ''
	})

	const [isError, setIsError] = useState(false);

	const onSubmit = () => {


		const errorContent = { ...errors };
		let error = false;

		if (!valueSubmit.title) {
			errorContent.title = 'Vui lòng nhập trường này';
			error = true;
		}


		if (!valueSubmit.lessonNumber) {
			errorContent.lessonNumber = 'Vui lòng nhập trường này';
			error = true;
		}


		if (!valueSubmit.courseEndDate) {
			errorContent.courseEndDate = 'Vui lòng nhập trường này';
			error = true;
		}

		if (!valueSubmit.tel) {
			errorContent.tel = 'Vui lòng nhập trường này';
			error = true;
		}

		if (!valueSubmit.type) {
			errorContent.type = 'Vui lòng nhập trường này';
			error = true;
		}

		if (!valueSubmit.introduction) {
			errorContent.introduction = 'Vui lòng nhập trường này';
			error = true;
		}

		if (!valueSubmit.description) {
			errorContent.description = 'Vui lòng nhập trường này';
			error = true;
		}

		if (!valueSubmit.cost) {
			errorContent.cost = 'Vui lòng nhập trường này';
			error = true;
		}


		if (!isFree) {
			if (!valueSubmit.bankName) {
				errorContent.bankName = 'Vui lòng nhập trường này';
				error = true;
			}

			if (!valueSubmit.bankDivision) {
				errorContent.bankDivision = 'Vui lòng nhập trường này';
				error = true;
			}

			if (!valueSubmit.bankAccount) {
				errorContent.bankAccount = 'Vui lòng nhập trường này';
				error = true;
			}

			if (!valueSubmit.bankAccountName) {
				errorContent.bankAccountName = 'Vui lòng nhập trường này';
				error = true;
			}

			if (!valueSubmit.transferSyntax) {
				errorContent.transferSyntax = 'Vui lòng nhập trường này';
				error = true;
			}
		}


		if (!valueSubmit.courseStartDate) {
			errorContent.courseStartDate = 'Vui lòng nhập trường này';
			error = true;
		}

		if (!valueSubmit.courseApplyDeadline) {
			errorContent.courseApplyDeadline = 'Vui lòng nhập trường này';
			error = true;
		}

		if (!valueSubmit.address.provinceId) {
			errorContent.provinceId = 'Vui lòng nhập trường này';
			error = true;
		}

		if (!valueSubmit.address.districtId) {
			errorContent.districtId = 'Vui lòng nhập trường này';
			error = true;
		}

		if (!valueSubmit.address.wardId) {
			errorContent.wardId = 'Vui lòng nhập trường này';
			error = true;
		}

		if (!valueSubmit.address.detailAddress) {
			errorContent.detailAddress = 'Vui lòng nhập trường này';
			error = true;
		}

		setErrors(errorContent);

		if (error) return;

		if (errors.bankDivision === '' && errors.lessonNumber === '' && errors.title === '' && errors.introduction === '' && errors.description === '' && errors.detailAddress === '' && errors.provinceId === '' && errors.districtId === '' && errors.wardId === '' && errors.cost === '' && errors.tel === '' && errors.requirement === '' && errors.type === '' && errors.courseStartDate === '' && errors.courseEndDate === '' && errors.courseApplyDeadline === '' && errors.bankName === '' && errors.bankAccount === '' && errors.bankAccountName === '' && errors.transferSyntax === '') {
			if (isFree === true) {
				delete valueSubmit.transferSyntax
			}
			createCourse(valueSubmit, accessToken?.token)
				.then((response) => {
					if (response.data.message === "SUCCESS") {
						swal("Yêu cầu của bạn đã đc gửi cho quản trị viên", "Vui lòng chờ duyệt", "success");
						setValueSubmit({
							"title": "",
							"introduction": "",
							"description": "",
							"address": {
								"detailAddress": "",
								"provinceId": "",
								"districtId": "",
								"wardId": ""
							},
							"cost": "",
							"tel": "",
							"lessonNumber": "",
							"requirement": [],
							"status": "WAITING_TO_REVIEW",
							"courseEndDate": "",
							"type": "",
							"courseStartDate": "",
							"courseApplyDeadline": "",
							"bankName": "",
							"bankAccount": "",
							"bankDivision": "",
							"bankAccountName": "",
							"transferSyntax": ""
						})
					}
					else {
						swal("Yêu cầu không thể thực hiện", "Vui lòng kiểm tra nhập đủ thông tin và thử lại", "error");
					}
					console.log(response);
				})
				.catch((error) => {
					swal("Yêu cầu không thể thực hiện", "Vui lòng kiểm tra nhập đủ thông tin và thử lại", "error");
					console.log(error);
				})
		}
		else if (errors.lessonNumber !== '' || errors.bankDivision !== '' || errors.title !== '' || errors.introduction !== '' || errors.description !== '' || errors.detailAddress !== '' || errors.provinceId !== '' || errors.districtId !== '' || errors.wardId !== '' || errors.cost !== '' || errors.tel !== '' || errors.requirement !== '' || errors.type !== '' || errors.courseStartDate !== '' || errors.courseEndDate !== '' || errors.courseApplyDeadline !== '' || errors.bankName !== '' || errors.bankAccount !== '' || errors.bankAccountName !== '' || errors.transferSyntax !== '') {
			swal("Yêu cầu không thể thực hiện", "Vui lòng kiểm tra nhập đủ thông tin và thử lại", "error");
		}
	}

	const getListBank = () => {
		getAllBank()
			.then((results) => {
				setListBank(results.data.docs);
			})
			.catch((error) => {
				console.log(error);
			})
	}

	const getListProvince = () => {
		getAll('province', '')
			.then((result) => {
				setListProvince(result.data.docs);
			})
			.catch((error) => {
				console.log(error);
			})
	}

	const getListDistrict = (idProvince) => {
		getAll('district', idProvince)
			.then((result) => {
				setListDistrict(result.data.docs);
			})
			.catch((error) => {
				console.log(error);
			})
	}

	const getListWard = (idDistrict) => {
		getAll('ward', idDistrict)
			.then((result) => {
				setListWard(result.data.docs);
			})
			.catch((error) => {
				console.log(error);
			})
	}

	useEffect(() => {
		getListProvince();
		getListBank();
	}, [])
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
													<Link
														onClick={() => {
															dispatch({
																type: "GET_AVATAR",
																payload: `${BASE_URL}/${user?.avatarUrl}`
															})
														}}
														to={`/avatar/${user.id}`}
													>
														{
															user?.avatarUrl?.indexOf('https://') === -1 ?
																<img alt="" src={`${BASE_URL}/${user?.avatarUrl}`} /> :
																<img alt="" src={user?.avatarUrl} />
														}
													</Link>
													{/* <div className="upload-link" title="update" data-toggle="tooltip" data-placement="right">
														<input type="file" className="update-flie" />
														<i className="fa fa-camera"></i>
													</div> */}
												</div>
												<div className="candidate-title">
													<h4 className="m-b5"><Link to={"#"}>Tên khóa học</Link></h4>
												</div>
											</div>
											<ul>
												<li><Link to={"/course-create"} className="active">
													<i className="fa fa-file-text-o" aria-hidden="true"></i>
													<span>Tạo khóa học</span></Link></li>
												<li><Link to={"/course-manage"}>
													<i className="fa fa-briefcase" aria-hidden="true"></i>
													<span>Quản lý khóa học</span></Link></li>
											</ul>
										</div>
									</div>
								</div>
								<div className="col-xl-9 col-lg-8 m-b30">
									<div className="job-bx submit-resume">
										<div className="job-bx-title clearfix">
											<h5 className="font-weight-700 pull-left text-uppercase">Tạo khóa học</h5>
											<Link to={"/course-create"} className="site-button right-arrow button-sm float-right">Quay lại</Link>
										</div>
										<form>
											<div className="row">
												<div className="col-lg-6 col-md-6">
													<div className="form-group">
														<label>Tên khóa học</label>
														<input onChange={(event) => {
															if (event.target.value.trim() === "") {
																setErrors({ ...errors, title: 'Vui lòng nhập trường này !' })
															}
															else {
																setErrors({ ...errors, title: '' })
															}
															setValueSubmit({ ...valueSubmit, title: event.target.value })
														}} value={valueSubmit.title} type="text" className="form-control" placeholder="Tên khóa học" />
														<p style={{ color: "red" }}>{errors.title}</p>
													</div>
												</div>
												<div className="col-lg-6 col-md-6">
													<div className="form-group">
														<label>Danh mục khóa học</label>
														<Form.Control onChange={(event) => {
															if (event.target.value.trim() === "") {
																setErrors({ ...errors, type: 'Vui lòng nhập trường này !' })
															}
															else {
																setErrors({ ...errors, type: '' })
															}
															setValueSubmit({ ...valueSubmit, type: event.target.value })
														}} value={valueSubmit.type} as="select" custom className="custom-select">
															<option value="">Chọn 1 mục</option>
															<option value="ngoại ngữ">Ngoại ngữ</option>
															<option value="kỹ năng sống">Kỹ năng sống</option>
															<option value="kỹ năng mềm">Kỹ năng mềm</option>
															<option value="kỹ năng nghề nghiệp">Kỹ năng nghề nghiệp</option>
														</Form.Control>
														<p style={{ color: "red" }}>{errors && errors.type}</p>
													</div>
												</div>
												<div className="col-lg-6 col-md-6">
													<div className="form-group">
														<label>Số buổi</label>
														<input onKeyDown={(event) => {
															var invalidChars = [
																"-",
																"+",
																".",
																"e"
															];
															if (invalidChars.includes(event.key)) {
																event.preventDefault();
															}
														}} onChange={(event) => {
															if (event.target.value.trim() === "") {
																setErrors({ ...errors, lessonNumber: 'Vui lòng nhập trường này !' })
															}
															else {
																setErrors({ ...errors, lessonNumber: '' })
															}
															setValueSubmit({ ...valueSubmit, lessonNumber: event.target.value })
														}} value={valueSubmit.lessonNumber} type="number" className="form-control" placeholder="Vd. 12" />
														<p style={{ color: "red" }}>{errors.lessonNumber}</p>
													</div>
												</div>
												<div className="col-lg-12 col-md-12">
													<div className="form-group">
														<label>Giới thiệu khóa học</label>
														<textarea onChange={(event) => {
															if (event.target.value.trim() === "") {
																setErrors({ ...errors, introduction: 'Vui lòng nhập trường này !' })
															}
															else {
																setErrors({ ...errors, introduction: '' })
															}
															setValueSubmit({ ...valueSubmit, introduction: event.target.value })
														}} value={valueSubmit.introduction} type="text" className="form-control tags_input" />
														<p style={{ color: "red" }}>{errors.introduction}</p>
													</div>
												</div>
												<div className="col-lg-12 col-md-12">
													<div className="form-group">
														<label>Mô tả khóa học</label>
														<textarea onChange={(event) => {
															if (event.target.value.trim() === "") {
																setErrors({ ...errors, description: 'Vui lòng nhập trường này !' })
															}
															else {
																setErrors({ ...errors, description: '' })
															}
															setValueSubmit({ ...valueSubmit, description: event.target.value })
														}} value={valueSubmit.description} type="text" className="form-control tags_input" />
														<p style={{ color: "red" }}>{errors.description}</p>
													</div>
												</div>
												<div className="col-lg-12 col-md-12">
													<div className="form-group">
														<label>Yêu cầu khóa học ( Không bắt buộc )</label>
														<textarea onChange={(event) => {
															setValueSubmit({ ...valueSubmit, requirement: [event.target.value] })
														}} type="text" className="form-control tags_input" />
													</div>
												</div>
												<div className="col-lg-6 col-md-6">
													<div className="form-group">
														<label>Hạn đăng ký học:</label>
														<input onChange={(event) => {
															if (event.target.value.length >= 11) {
																event.target.value = 0;
																return;
															} else {
																if (event.target.value === "") {
																	setErrors({ ...errors, courseApplyDeadline: 'Vui lòng nhập trường này !' })
																}
																else if (event.target.value !== '') {
																	if (valueSubmit.courseStartDate === "") {
																		setErrors({ ...errors, courseApplyDeadline: '' })
																	}
																	else if (valueSubmit.courseStartDate !== "") {
																		if (new Date(event.target.value) > new Date(valueSubmit.courseStartDate) || new Date(event.target.value) === new Date(valueSubmit.courseStartDate)) {
																			setErrors({ ...errors, courseApplyDeadline: 'Ngày bắt đầu khóa học phải sau hạn đăng ký học' })
																		}
																		else if (new Date(event.target.value) < new Date(valueSubmit.courseStartDate)) {
																			setErrors({ ...errors, courseStartDate: '', courseApplyDeadline: '' })
																		}
																	}
																}
															}
															setValueSubmit({ ...valueSubmit, courseApplyDeadline: event.target.value })
														}} value={valueSubmit.courseApplyDeadline} type="date" className="form-control" placeholder="Vd: 25/05/2022"
														/>
														<p style={{ color: "red" }}>{errors.courseApplyDeadline}</p>
													</div>
												</div>
												<div className="col-lg-6 col-md-6">
													<div className="form-group">
														<label>Thời gian bắt đầu khóa học:</label>
														<input onChange={(event) => {
															if (event.target.value.length >= 11) {
																event.target.value = 0;
																return;
															}
															if (event.target.value === "") {
																setErrors({ ...errors, courseStartDate: 'Vui lòng nhập trường này !' })
															}
															else if (event.target.value !== '') {
																if (valueSubmit.courseApplyDeadline === "") {
																	setErrors({ ...errors, courseStartDate: '' })
																}
																else if (valueSubmit.courseApplyDeadline !== "") {
																	if (new Date(event.target.value) < new Date(valueSubmit.courseApplyDeadline) || new Date(event.target.value) === new Date(valueSubmit.courseApplyDeadline)) {
																		setErrors({ ...errors, courseStartDate: 'Ngày bắt đầu khóa học phải sau hạn đăng ký học' })
																	}
																	else if (new Date(event.target.value) > new Date(valueSubmit.courseApplyDeadline)) {
																		setErrors({ ...errors, courseStartDate: '', courseApplyDeadline: '' })
																	}
																}
															}
															setValueSubmit({ ...valueSubmit, courseStartDate: event.target.value })
														}} value={valueSubmit.courseStartDate} type="date" className="form-control" placeholder="Vd: 19/05/2022"
														/>
														<p style={{ color: "red" }}>{errors.courseStartDate}</p>
													</div>
												</div>
												<div className="col-lg-6 col-md-6">
													<div className="form-group">
														<label>Thời gian kết thúc khóa học:</label>
														<input onChange={(event) => {
															if (event.target.value.length >= 11) {
																event.target.value = 0;
																return;
															}
															if (event.target.value === "") {
																setErrors({ ...errors, courseEndDate: 'Vui lòng nhập trường này !' })
															}
															else if (event.target.value !== '') {
																if (valueSubmit.courseStartDate === "") {
																	setErrors({ ...errors, courseEndDate: '' })
																}
																else if (valueSubmit.courseStartDate !== "") {
																	if (new Date(event.target.value) < new Date(valueSubmit.courseStartDate) || new Date(event.target.value) === new Date(valueSubmit.courseStartDate)) {
																		setErrors({ ...errors, courseEndDate: 'Ngày kết thúc khóa học phải sau ngày bắt đầu khóa học' })
																	}
																	else if (new Date(event.target.value) > new Date(valueSubmit.courseStartDate)) {
																		setErrors({ ...errors, courseEndDate: '' })
																	}
																}
															}
															setValueSubmit({ ...valueSubmit, courseEndDate: event.target.value })
														}} value={valueSubmit.courseEndDate} type="date" className="form-control" placeholder="Vd: 19/05/2022"
														/>
														<p style={{ color: "red" }}>{errors.courseEndDate}</p>
													</div>
												</div>

												<div className="col-lg-6 col-md-6">
													<div className="form-group">
														<label>Số điện thoại liên hệ :</label>
														<input onKeyDown={(event) => {
															var invalidChars = [
																"-",
																"+",
																".",
																"e"
															];
															if (invalidChars.includes(event.key)) {
																event.preventDefault();
															}
														}} onChange={(event) => {
															const phoneRegExp = /^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/;
															if (event.target.value.trim() === "") {
																setErrors({ ...errors, tel: 'Vui lòng nhập trường này !' })
															}
															else if (!phoneRegExp.test(event.target.value)) {
																setErrors({ ...errors, tel: 'Vui lòng nhập đúng định dạng số điện thoại !' })
															}
															else {
																setErrors({ ...errors, tel: '' })
															}
															setValueSubmit({ ...valueSubmit, tel: event.target.value })
														}} value={valueSubmit.tel} placeholder="Nhập số điện thoại liên hệ" type="number" className="form-control tags_input" name="tag"
														/>
														<p style={{ color: "red" }}>{errors.tel}</p>
													</div>
												</div>
												<div className="col-lg-6 col-md-6">
													<div className="course-free" style={{ display: "flex", marginTop: "47px" }}>
														<label>Miễn phí:</label>
														<div className="custom-control custom-checkbox" style={{ marginLeft: "10px" }}>
															<input onChange={(event) => {
																setIsFree(event.target.checked);
																if (event.target.checked === true) {
																	setValueSubmit({ ...valueSubmit, cost: '0', bankName: '', bankAccount: '', bankAccountName: '', transferSyntax: '' });
																	setErrors({ ...errors, cost: '', bankName: '', bankAccount: '', bankAccountName: '', transferSyntax: '' });
																}
																else if (event.target.checked === false) {
																	setValueSubmit({ ...valueSubmit, cost: '' });
																}
															}} type="checkbox" className="custom-control-input" id="check1" name="example1" />
															<label className="custom-control-label" htmlFor="check1"></label>
														</div>
													</div>
												</div>
												{isFree === false && <div className="col-lg-6 col-md-6">
													<div className="form-group">
														<label>Học phí:</label>
														<input onKeyDown={(event) => {
															var invalidChars = [
																"-",
																"+",
																"e"
															];
															if (invalidChars.includes(event.key)) {
																event.preventDefault();
															}
														}} onChange={(event) => {
															if (event.target.value.trim() === "") {
																setErrors({ ...errors, cost: 'Vui lòng nhập trường này !' })
															}
															else {
																setErrors({ ...errors, cost: '' })
															}
															setValueSubmit({ ...valueSubmit, cost: event.target.value })
														}} value={valueSubmit.cost} type="number" className="form-control" placeholder="Vd. 1.000.000 VNĐ" />
														<p style={{ color: "red" }}>{errors.cost}</p>
													</div>
												</div>}


												{isFree === false &&
													<>
														<div className="col-lg-6 col-md-6">
															<div className="form-group">
																<label>Tên ngân hàng</label>
																<Form.Control onChange={(event) => {
																	if (event.target.value.trim() === "") {
																		setErrors({ ...errors, bankName: 'Vui lòng nhập trường này !' })
																	}
																	else {
																		setErrors({ ...errors, bankName: '' })
																	}
																	setValueSubmit({ ...valueSubmit, bankName: event.target.value })
																}} value={valueSubmit.bankName} as="select" custom className="custom-select">
																	<option value="">Chọn ngân hàng</option>
																	{listBank.map((bank, index) => {
																		return <option key={index} value={bank.bankShortName}>{bank.bankFullName} ( {bank.bankShortName} )</option>
																	})}

																	<option value="Techcombank">Techcombank</option>
																	<option value="Vietcombank">Vietcombank</option>
																</Form.Control>
																<p style={{ color: "red" }}>{errors.bankName}</p>
															</div>
														</div>

														<div className="col-lg-6 col-md-6">
															<div className="form-group">
																<label>Tên chi nhánh</label>
																<input onChange={(event) => {
																	if (event.target.value.trim() === "") {
																		setErrors({ ...errors, bankDivision: 'Vui lòng nhập trường này !' })
																	}
																	else {
																		setErrors({ ...errors, bankDivision: '' })
																	}
																	setValueSubmit({ ...valueSubmit, bankDivision: event.target.value })
																}} value={valueSubmit.bankDivision} type="text" className="form-control" placeholder="" />
																<p style={{ color: "red" }}>{errors.bankDivision}</p>
															</div>
														</div>
													</>
												}

												{isFree === false && <div className="col-lg-6 col-md-6">
													<div className="form-group">
														<label>Số tài khoản</label>
														<input onKeyDown={(event) => {
															var invalidChars = [
																"-",
																"+",
																".",
																"e"
															];
															if (invalidChars.includes(event.key)) {
																event.preventDefault();
															}
														}} onChange={(event) => {
															if (event.target.value.trim() === "") {
																setErrors({ ...errors, bankAccount: 'Vui lòng nhập trường này !' })
															}
															else {
																setErrors({ ...errors, bankAccount: '' })
															}
															setValueSubmit({ ...valueSubmit, bankAccount: event.target.value })
														}} value={valueSubmit.bankAccount} type="number" className="form-control" placeholder="" />
														<p style={{ color: "red" }}>{errors.bankAccount}</p>
													</div>
												</div>}
												{isFree === false && <div className="col-lg-6 col-md-6">
													<div className="form-group">
														<label>Tên chủ tài khoản</label>
														<input onChange={(event) => {
															if (event.target.value.trim() === "") {
																setErrors({ ...errors, bankAccountName: 'Vui lòng nhập trường này !' })
															}
															else {
																setErrors({ ...errors, bankAccountName: '' })
															}
															setValueSubmit({ ...valueSubmit, bankAccountName: event.target.value })
														}} value={valueSubmit.bankAccountName} type="text" className="form-control" placeholder="" />
														<p style={{ color: "red" }}>{errors.bankAccountName}</p>
													</div>
												</div>}
												{isFree === false && <div className="col-lg-6 col-md-6">
													<div className="form-group">
														<label>Cú pháp đăng ký (Chuyển khoản)</label>
														<input onChange={(event) => {
															if (event.target.value.trim() === "") {
																setErrors({ ...errors, transferSyntax: 'Vui lòng nhập trường này !' })
															}
															else {
																setErrors({ ...errors, transferSyntax: '' })
															}
															setValueSubmit({ ...valueSubmit, transferSyntax: event.target.value })
														}} value={valueSubmit.transferSyntax} type="text" className="form-control" placeholder="vd: hoten_tenkhoahoc" />
														<p style={{ color: "red" }}>{errors.transferSyntax}</p>
													</div>
												</div>}

												<div className="col-lg-6 col-md-6">
													<div className="form-group">
														<label>Tỉnh / Thành phố</label>
														<Form.Control onChange={(event) => {
															if (event.target.value === "") {
																setErrors({ ...errors, provinceId: 'Vui lòng nhập trường này !' })
															}
															else {
																setErrors({ ...errors, provinceId: '' })
															}
															setValueSubmit({ ...valueSubmit, address: { ...valueSubmit.address, provinceId: event.target.value, districtId: '' } });
															getListDistrict(event.target.value);
														}} value={valueSubmit.address.provinceId} as="select" custom className="custom-select" name="region"
														>
															<option value="">Chọn tỉnh / thành phố</option>
															{listProvince?.map((province, index) => {
																return <option value={province?.id} key={index}>{province?.name}</option>
															})}
														</Form.Control>
														<p style={{ color: "red" }}>{errors.provinceId}</p>
													</div>
												</div>
												{valueSubmit.address.provinceId !== '' && <div className="col-lg-6 col-md-6">
													<div className="form-group">
														<label>Quận / Huyện</label>
														<Form.Control onChange={(event) => {
															if (event.target.value === "") {
																setErrors({ ...errors, districtId: 'Vui lòng nhập trường này !' })
															}
															else {
																setErrors({ ...errors, districtId: '' })
															}
															setValueSubmit({ ...valueSubmit, address: { ...valueSubmit.address, districtId: event.target.value } });
															getListWard(event.target.value);
														}} value={valueSubmit.address.districtId} as="select" custom className="custom-select" name="region">
															<option value="">Chọn quận / huyện</option>
															{listDistrict?.map((district, index) => {
																return <option value={district.id} key={index}>{district.name}</option>
															})}
														</Form.Control>
														<p style={{ color: "red" }}>{errors.districtId}</p>
													</div>
												</div>}

												{valueSubmit.address.districtId !== '' && <div className="col-lg-6 col-md-6">
													<div className="form-group">
														<label>Phường / Xã</label>
														<Form.Control onChange={(event) => {
															if (event.target.value === "") {
																setErrors({ ...errors, wardId: 'Vui lòng nhập trường này !' })
															}
															else {
																setErrors({ ...errors, wardId: '' })
															}
															setValueSubmit({ ...valueSubmit, address: { ...valueSubmit.address, wardId: event.target.value } });
														}} value={valueSubmit.address.wardId} as="select" custom className="custom-select" name="region">
															<option value="">Chọn phường / xã</option>
															{listWard?.map((ward, index) => {
																return <option value={ward.id} key={index}>{ward.name}</option>
															})}
														</Form.Control>
														<p style={{ color: "red" }}>{errors.wardId}</p>
													</div>
												</div>}
												<div className="col-lg-6 col-md-6">
													<div className="form-group">
														<label>Địa chỉ cụ thể</label>
														<input onChange={(event) => {
															if (event.target.value.trim() === "") {
																setErrors({ ...errors, detailAddress: 'Vui lòng nhập trường này !' })
															}
															else {
																setErrors({ ...errors, detailAddress: '' })
															}
															setValueSubmit({ ...valueSubmit, address: { ...valueSubmit.address, detailAddress: event.target.value } });
														}} value={valueSubmit.address.detailAddress} type="text" className="form-control" placeholder="Số nhà, tổ dân phố" name="location"
														/>
														<p style={{ color: "red" }}>{errors.detailAddress}</p>
													</div>
												</div>
											</div>
											<button onClick={() => { onSubmit() }} type="button" className="site-button m-b30">Tạo</button>
										</form>
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
export default CourseCreate;