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
			errorContent.title = 'Vui l??ng nh???p tr?????ng n??y';
			error = true;
		}


		if (!valueSubmit.lessonNumber) {
			errorContent.lessonNumber = 'Vui l??ng nh???p tr?????ng n??y';
			error = true;
		}


		if (!valueSubmit.courseEndDate) {
			errorContent.courseEndDate = 'Vui l??ng nh???p tr?????ng n??y';
			error = true;
		}

		if (!valueSubmit.tel) {
			errorContent.tel = 'Vui l??ng nh???p tr?????ng n??y';
			error = true;
		}

		if (!valueSubmit.type) {
			errorContent.type = 'Vui l??ng nh???p tr?????ng n??y';
			error = true;
		}

		if (!valueSubmit.introduction) {
			errorContent.introduction = 'Vui l??ng nh???p tr?????ng n??y';
			error = true;
		}

		if (!valueSubmit.description) {
			errorContent.description = 'Vui l??ng nh???p tr?????ng n??y';
			error = true;
		}

		if (!valueSubmit.cost) {
			errorContent.cost = 'Vui l??ng nh???p tr?????ng n??y';
			error = true;
		}


		if (!isFree) {
			if (!valueSubmit.bankName) {
				errorContent.bankName = 'Vui l??ng nh???p tr?????ng n??y';
				error = true;
			}

			if (!valueSubmit.bankDivision) {
				errorContent.bankDivision = 'Vui l??ng nh???p tr?????ng n??y';
				error = true;
			}

			if (!valueSubmit.bankAccount) {
				errorContent.bankAccount = 'Vui l??ng nh???p tr?????ng n??y';
				error = true;
			}

			if (!valueSubmit.bankAccountName) {
				errorContent.bankAccountName = 'Vui l??ng nh???p tr?????ng n??y';
				error = true;
			}

			if (!valueSubmit.transferSyntax) {
				errorContent.transferSyntax = 'Vui l??ng nh???p tr?????ng n??y';
				error = true;
			}
		}


		if (!valueSubmit.courseStartDate) {
			errorContent.courseStartDate = 'Vui l??ng nh???p tr?????ng n??y';
			error = true;
		}

		if (!valueSubmit.courseApplyDeadline) {
			errorContent.courseApplyDeadline = 'Vui l??ng nh???p tr?????ng n??y';
			error = true;
		}

		if (!valueSubmit.address.provinceId) {
			errorContent.provinceId = 'Vui l??ng nh???p tr?????ng n??y';
			error = true;
		}

		if (!valueSubmit.address.districtId) {
			errorContent.districtId = 'Vui l??ng nh???p tr?????ng n??y';
			error = true;
		}

		if (!valueSubmit.address.wardId) {
			errorContent.wardId = 'Vui l??ng nh???p tr?????ng n??y';
			error = true;
		}

		if (!valueSubmit.address.detailAddress) {
			errorContent.detailAddress = 'Vui l??ng nh???p tr?????ng n??y';
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
						swal("Y??u c???u c???a b???n ???? ??c g???i cho qu???n tr??? vi??n", "Vui l??ng ch??? duy???t", "success");
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
						swal("Y??u c???u kh??ng th??? th???c hi???n", "Vui l??ng ki???m tra nh???p ????? th??ng tin v?? th??? l???i", "error");
					}
					console.log(response);
				})
				.catch((error) => {
					swal("Y??u c???u kh??ng th??? th???c hi???n", "Vui l??ng ki???m tra nh???p ????? th??ng tin v?? th??? l???i", "error");
					console.log(error);
				})
		}
		else if (errors.lessonNumber !== '' || errors.bankDivision !== '' || errors.title !== '' || errors.introduction !== '' || errors.description !== '' || errors.detailAddress !== '' || errors.provinceId !== '' || errors.districtId !== '' || errors.wardId !== '' || errors.cost !== '' || errors.tel !== '' || errors.requirement !== '' || errors.type !== '' || errors.courseStartDate !== '' || errors.courseEndDate !== '' || errors.courseApplyDeadline !== '' || errors.bankName !== '' || errors.bankAccount !== '' || errors.bankAccountName !== '' || errors.transferSyntax !== '') {
			swal("Y??u c???u kh??ng th??? th???c hi???n", "Vui l??ng ki???m tra nh???p ????? th??ng tin v?? th??? l???i", "error");
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
													<h4 className="m-b5"><Link to={"#"}>T??n kh??a h???c</Link></h4>
												</div>
											</div>
											<ul>
												<li><Link to={"/course-create"} className="active">
													<i className="fa fa-file-text-o" aria-hidden="true"></i>
													<span>T???o kh??a h???c</span></Link></li>
												<li><Link to={"/course-manage"}>
													<i className="fa fa-briefcase" aria-hidden="true"></i>
													<span>Qu???n l?? kh??a h???c</span></Link></li>
											</ul>
										</div>
									</div>
								</div>
								<div className="col-xl-9 col-lg-8 m-b30">
									<div className="job-bx submit-resume">
										<div className="job-bx-title clearfix">
											<h5 className="font-weight-700 pull-left text-uppercase">T???o kh??a h???c</h5>
											<Link to={"/course-create"} className="site-button right-arrow button-sm float-right">Quay l???i</Link>
										</div>
										<form>
											<div className="row">
												<div className="col-lg-6 col-md-6">
													<div className="form-group">
														<label>T??n kh??a h???c</label>
														<input onChange={(event) => {
															if (event.target.value.trim() === "") {
																setErrors({ ...errors, title: 'Vui l??ng nh???p tr?????ng n??y !' })
															}
															else {
																setErrors({ ...errors, title: '' })
															}
															setValueSubmit({ ...valueSubmit, title: event.target.value })
														}} value={valueSubmit.title} type="text" className="form-control" placeholder="T??n kh??a h???c" />
														<p style={{ color: "red" }}>{errors.title}</p>
													</div>
												</div>
												<div className="col-lg-6 col-md-6">
													<div className="form-group">
														<label>Danh m???c kh??a h???c</label>
														<Form.Control onChange={(event) => {
															if (event.target.value.trim() === "") {
																setErrors({ ...errors, type: 'Vui l??ng nh???p tr?????ng n??y !' })
															}
															else {
																setErrors({ ...errors, type: '' })
															}
															setValueSubmit({ ...valueSubmit, type: event.target.value })
														}} value={valueSubmit.type} as="select" custom className="custom-select">
															<option value="">Ch???n 1 m???c</option>
															<option value="ngo???i ng???">Ngo???i ng???</option>
															<option value="k??? n??ng s???ng">K??? n??ng s???ng</option>
															<option value="k??? n??ng m???m">K??? n??ng m???m</option>
															<option value="k??? n??ng ngh??? nghi???p">K??? n??ng ngh??? nghi???p</option>
														</Form.Control>
														<p style={{ color: "red" }}>{errors && errors.type}</p>
													</div>
												</div>
												<div className="col-lg-6 col-md-6">
													<div className="form-group">
														<label>S??? bu???i</label>
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
																setErrors({ ...errors, lessonNumber: 'Vui l??ng nh???p tr?????ng n??y !' })
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
														<label>Gi???i thi???u kh??a h???c</label>
														<textarea onChange={(event) => {
															if (event.target.value.trim() === "") {
																setErrors({ ...errors, introduction: 'Vui l??ng nh???p tr?????ng n??y !' })
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
														<label>M?? t??? kh??a h???c</label>
														<textarea onChange={(event) => {
															if (event.target.value.trim() === "") {
																setErrors({ ...errors, description: 'Vui l??ng nh???p tr?????ng n??y !' })
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
														<label>Y??u c???u kh??a h???c ( Kh??ng b???t bu???c )</label>
														<textarea onChange={(event) => {
															setValueSubmit({ ...valueSubmit, requirement: [event.target.value] })
														}} type="text" className="form-control tags_input" />
													</div>
												</div>
												<div className="col-lg-6 col-md-6">
													<div className="form-group">
														<label>H???n ????ng k?? h???c:</label>
														<input onChange={(event) => {
															if (event.target.value.length >= 11) {
																event.target.value = 0;
																return;
															} else {
																if (event.target.value === "") {
																	setErrors({ ...errors, courseApplyDeadline: 'Vui l??ng nh???p tr?????ng n??y !' })
																}
																else if (event.target.value !== '') {
																	if (valueSubmit.courseStartDate === "") {
																		setErrors({ ...errors, courseApplyDeadline: '' })
																	}
																	else if (valueSubmit.courseStartDate !== "") {
																		if (new Date(event.target.value) > new Date(valueSubmit.courseStartDate) || new Date(event.target.value) === new Date(valueSubmit.courseStartDate)) {
																			setErrors({ ...errors, courseApplyDeadline: 'Ng??y b???t ?????u kh??a h???c ph???i sau h???n ????ng k?? h???c' })
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
														<label>Th???i gian b???t ?????u kh??a h???c:</label>
														<input onChange={(event) => {
															if (event.target.value.length >= 11) {
																event.target.value = 0;
																return;
															}
															if (event.target.value === "") {
																setErrors({ ...errors, courseStartDate: 'Vui l??ng nh???p tr?????ng n??y !' })
															}
															else if (event.target.value !== '') {
																if (valueSubmit.courseApplyDeadline === "") {
																	setErrors({ ...errors, courseStartDate: '' })
																}
																else if (valueSubmit.courseApplyDeadline !== "") {
																	if (new Date(event.target.value) < new Date(valueSubmit.courseApplyDeadline) || new Date(event.target.value) === new Date(valueSubmit.courseApplyDeadline)) {
																		setErrors({ ...errors, courseStartDate: 'Ng??y b???t ?????u kh??a h???c ph???i sau h???n ????ng k?? h???c' })
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
														<label>Th???i gian k???t th??c kh??a h???c:</label>
														<input onChange={(event) => {
															if (event.target.value.length >= 11) {
																event.target.value = 0;
																return;
															}
															if (event.target.value === "") {
																setErrors({ ...errors, courseEndDate: 'Vui l??ng nh???p tr?????ng n??y !' })
															}
															else if (event.target.value !== '') {
																if (valueSubmit.courseStartDate === "") {
																	setErrors({ ...errors, courseEndDate: '' })
																}
																else if (valueSubmit.courseStartDate !== "") {
																	if (new Date(event.target.value) < new Date(valueSubmit.courseStartDate) || new Date(event.target.value) === new Date(valueSubmit.courseStartDate)) {
																		setErrors({ ...errors, courseEndDate: 'Ng??y k???t th??c kh??a h???c ph???i sau ng??y b???t ?????u kh??a h???c' })
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
														<label>S??? ??i???n tho???i li??n h??? :</label>
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
																setErrors({ ...errors, tel: 'Vui l??ng nh???p tr?????ng n??y !' })
															}
															else if (!phoneRegExp.test(event.target.value)) {
																setErrors({ ...errors, tel: 'Vui l??ng nh???p ????ng ?????nh d???ng s??? ??i???n tho???i !' })
															}
															else {
																setErrors({ ...errors, tel: '' })
															}
															setValueSubmit({ ...valueSubmit, tel: event.target.value })
														}} value={valueSubmit.tel} placeholder="Nh???p s??? ??i???n tho???i li??n h???" type="number" className="form-control tags_input" name="tag"
														/>
														<p style={{ color: "red" }}>{errors.tel}</p>
													</div>
												</div>
												<div className="col-lg-6 col-md-6">
													<div className="course-free" style={{ display: "flex", marginTop: "47px" }}>
														<label>Mi???n ph??:</label>
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
														<label>H???c ph??:</label>
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
																setErrors({ ...errors, cost: 'Vui l??ng nh???p tr?????ng n??y !' })
															}
															else {
																setErrors({ ...errors, cost: '' })
															}
															setValueSubmit({ ...valueSubmit, cost: event.target.value })
														}} value={valueSubmit.cost} type="number" className="form-control" placeholder="Vd. 1.000.000 VN??" />
														<p style={{ color: "red" }}>{errors.cost}</p>
													</div>
												</div>}


												{isFree === false &&
													<>
														<div className="col-lg-6 col-md-6">
															<div className="form-group">
																<label>T??n ng??n h??ng</label>
																<Form.Control onChange={(event) => {
																	if (event.target.value.trim() === "") {
																		setErrors({ ...errors, bankName: 'Vui l??ng nh???p tr?????ng n??y !' })
																	}
																	else {
																		setErrors({ ...errors, bankName: '' })
																	}
																	setValueSubmit({ ...valueSubmit, bankName: event.target.value })
																}} value={valueSubmit.bankName} as="select" custom className="custom-select">
																	<option value="">Ch???n ng??n h??ng</option>
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
																<label>T??n chi nh??nh</label>
																<input onChange={(event) => {
																	if (event.target.value.trim() === "") {
																		setErrors({ ...errors, bankDivision: 'Vui l??ng nh???p tr?????ng n??y !' })
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
														<label>S??? t??i kho???n</label>
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
																setErrors({ ...errors, bankAccount: 'Vui l??ng nh???p tr?????ng n??y !' })
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
														<label>T??n ch??? t??i kho???n</label>
														<input onChange={(event) => {
															if (event.target.value.trim() === "") {
																setErrors({ ...errors, bankAccountName: 'Vui l??ng nh???p tr?????ng n??y !' })
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
														<label>C?? ph??p ????ng k?? (Chuy???n kho???n)</label>
														<input onChange={(event) => {
															if (event.target.value.trim() === "") {
																setErrors({ ...errors, transferSyntax: 'Vui l??ng nh???p tr?????ng n??y !' })
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
														<label>T???nh / Th??nh ph???</label>
														<Form.Control onChange={(event) => {
															if (event.target.value === "") {
																setErrors({ ...errors, provinceId: 'Vui l??ng nh???p tr?????ng n??y !' })
															}
															else {
																setErrors({ ...errors, provinceId: '' })
															}
															setValueSubmit({ ...valueSubmit, address: { ...valueSubmit.address, provinceId: event.target.value, districtId: '' } });
															getListDistrict(event.target.value);
														}} value={valueSubmit.address.provinceId} as="select" custom className="custom-select" name="region"
														>
															<option value="">Ch???n t???nh / th??nh ph???</option>
															{listProvince?.map((province, index) => {
																return <option value={province?.id} key={index}>{province?.name}</option>
															})}
														</Form.Control>
														<p style={{ color: "red" }}>{errors.provinceId}</p>
													</div>
												</div>
												{valueSubmit.address.provinceId !== '' && <div className="col-lg-6 col-md-6">
													<div className="form-group">
														<label>Qu???n / Huy???n</label>
														<Form.Control onChange={(event) => {
															if (event.target.value === "") {
																setErrors({ ...errors, districtId: 'Vui l??ng nh???p tr?????ng n??y !' })
															}
															else {
																setErrors({ ...errors, districtId: '' })
															}
															setValueSubmit({ ...valueSubmit, address: { ...valueSubmit.address, districtId: event.target.value } });
															getListWard(event.target.value);
														}} value={valueSubmit.address.districtId} as="select" custom className="custom-select" name="region">
															<option value="">Ch???n qu???n / huy???n</option>
															{listDistrict?.map((district, index) => {
																return <option value={district.id} key={index}>{district.name}</option>
															})}
														</Form.Control>
														<p style={{ color: "red" }}>{errors.districtId}</p>
													</div>
												</div>}

												{valueSubmit.address.districtId !== '' && <div className="col-lg-6 col-md-6">
													<div className="form-group">
														<label>Ph?????ng / X??</label>
														<Form.Control onChange={(event) => {
															if (event.target.value === "") {
																setErrors({ ...errors, wardId: 'Vui l??ng nh???p tr?????ng n??y !' })
															}
															else {
																setErrors({ ...errors, wardId: '' })
															}
															setValueSubmit({ ...valueSubmit, address: { ...valueSubmit.address, wardId: event.target.value } });
														}} value={valueSubmit.address.wardId} as="select" custom className="custom-select" name="region">
															<option value="">Ch???n ph?????ng / x??</option>
															{listWard?.map((ward, index) => {
																return <option value={ward.id} key={index}>{ward.name}</option>
															})}
														</Form.Control>
														<p style={{ color: "red" }}>{errors.wardId}</p>
													</div>
												</div>}
												<div className="col-lg-6 col-md-6">
													<div className="form-group">
														<label>?????a ch??? c??? th???</label>
														<input onChange={(event) => {
															if (event.target.value.trim() === "") {
																setErrors({ ...errors, detailAddress: 'Vui l??ng nh???p tr?????ng n??y !' })
															}
															else {
																setErrors({ ...errors, detailAddress: '' })
															}
															setValueSubmit({ ...valueSubmit, address: { ...valueSubmit.address, detailAddress: event.target.value } });
														}} value={valueSubmit.address.detailAddress} type="text" className="form-control" placeholder="S??? nh??, t??? d??n ph???" name="location"
														/>
														<p style={{ color: "red" }}>{errors.detailAddress}</p>
													</div>
												</div>
											</div>
											<button onClick={() => { onSubmit() }} type="button" className="site-button m-b30">T???o</button>
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