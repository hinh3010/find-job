import React, { useEffect, useState } from "react";
import moment from 'moment'
import { Link } from "react-router-dom";
import Header from "./../Layout/Header";
import Footer from "./../Layout/Footer";
import Profilesidebar from "./../Element/Profilesidebar";
import { useSelector, useDispatch } from "react-redux";
import { Form, ListGroupItem } from "react-bootstrap";
import "../../css/custom.css";
import { getAllCountry, getAllProvine } from "../../store/actions/Location/LocationAction";
import { updateUser } from "../../store/actions/User/UserAction";


function Jobprofile() {
  const dispatch = useDispatch();
  const allProvince = useSelector(state => state.LocationReducer.provinces);
  const allCountry = useSelector(state => state.LocationReducer.country);
  const { auth } = useSelector((state) => state.auth);
  const { user, accessToken } = auth;
  const ADDRESS = user?.address;
  let errorsObj = {
    firstName: '',
    lastName: '',
    gender: '',
    email: '',
    phone: '',
    currentSalary: '',
    introduction: "",
    detailAddress: "",
    countryId: "",
    provinceId: "",
    birthday: "",
  };
  const [errors, setErrors] = useState(errorsObj);

  const [address, setAddress] = useState({
    detailAddress: ADDRESS?.detailAddress || '',
    countryId: ADDRESS?.countryId || '6296ee56b4382126ae3b148e',
    provinceId: ADDRESS?.provinceId || '61b327306583182246621370',
  })

  const [personInfo, setPersonInfo] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    gender: user?.gender || 'Nam',
    birthday: user?.birthday || '',
    email: user.email,
    phone: user?.phone || '',
    currentSalary: user?.currentSalary || '',
    introduction: user?.introduction || '',
    accountType: "APPLICANT",
  });

  const onHandleSubmitInfoPerson = () => {

    const errorObj = { ...errorsObj }
    let error = false;

    if (!personInfo.firstName) {
      errorObj.firstName = "Vui lòng nhập trường này!";
      error = true;
    } else {
      if (errorObj.firstName.length > 30) {
        errorObj.firstName = "Họ phải nhỏ hơn 30 ký tự";
        error = true;
      }
    }

    if (!personInfo.lastName) {
      errorObj.lastName = "Vui lòng nhập trường này!";
      error = true;
    } else {
      if (errorObj.lastName.length > 30) {
        errorObj.lastName = "Tên phải nhỏ hơn 30 ký tự";
        error = true;
      }
    }

    if (!personInfo.birthday || personInfo.birthday === '00/00/0000') {
      errorObj.birthday = "Ngày sinh sai định dạng!";
      error = true;
    }


    if (!personInfo.currentSalary) {
      errorObj.currentSalary = "Vui lòng nhập trường này!";
      error = true;
    } else {
      if (personInfo.currentSalary < 1000) {
        errorObj.currentSalary = "Lương hiện tại phải lớn hơn 1000!";
        error = true;
      }
    }

    if (!personInfo.introduction) {
      errorObj.introduction = "Vui lòng nhập trường này!";
      error = true;
    }

    if (!personInfo.email) {
      errorObj.email = 'Vui lòng nhập trường này!!';
      error = true;
    } else {
      const patternEmail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (!patternEmail.test(personInfo.email)) {
        errorObj.email = 'Email không hợp lệ!!';
        error = true;
      }
    }

    if (!personInfo.phone) {
      errorObj.phone = 'Vui lòng nhập trường này!!';
      error = true;
    } else {
      const patternPhone = /^((\+)33|0)[1-9](\d{2}){4}$/;
      if (!patternPhone.test(personInfo.phone)) {
        errorObj.phone = 'Số điện thoại không hợp lệ!!';
        error = true;
      }
    }


    if (!address.detailAddress) {
      errorObj.detailAddress = "Vui lòng nhập trường này!";
      error = true;
    }

    if (!address.countryId || address.countryId === "empty") {
      errorObj.countryId = "Vui lòng nhập trường này!";
      error = true;
    }

    setErrors(errorObj);
    if (error) return;


    let objData = {}

    if (address.countryId !== "6296ee56b4382126ae3b148e") {
      objData = {
        ...personInfo,
        address: {
          ...address,
          provinceId: undefined,
        }
      }
    } else {
      objData = {
        ...personInfo,
        address: {
          ...address
        }
      }
    }
    dispatch(updateUser(user.id, objData, accessToken.token, accessToken));
  };


  useEffect(() => {
    dispatch(getAllProvine());
    dispatch(getAllCountry());
  }, [])

  return (
    <>
      <Header />
      <div className='page-content bg-white'>
        <div className='content-block'>
          <div className='section-full bg-white browse-job p-t50 p-b20'>
            <div className='container'>
              <div className='row'>
                <Profilesidebar />
                <div className='col-xl-9 col-lg-8 m-b30'>
                  <div className='job-bx job-profile'>
                    <div className='job-bx-title clearfix'>
                      <h5 className='font-weight-700 pull-left text-uppercase'>
                        Thông tin cơ bản
                      </h5>
                      <Link
                        to={"./"}
                        className='site-button right-arrow button-sm float-right'>
                        Quay lại
                      </Link>
                    </div>
                    <form>
                      <div className='row m-b30 submit-resume'>
                        <div className='col-lg-6 col-md-6 d-flex'>
                          <div className='form-group mr-1'>
                            <label>Họ </label>
                            <input
                              type='text'
                              className='form-control'
                              placeholder='Nguyễn'
                              name='firstName'
                              value={personInfo.firstName}
                              onChange={(event) =>
                                setPersonInfo({
                                  ...personInfo,
                                  [event.target.name]: event.target.value,
                                })
                              }
                            />
                            <div className='text-danger'>
                              {errors.firstName && <div>{errors.firstName}</div>}
                            </div>
                          </div>
                          <div className='form-group ml-1'>
                            <label>Tên </label>
                            <input
                              type='text'
                              className='form-control'
                              placeholder='Trường'
                              name='lastName'
                              value={personInfo.lastName}
                              onChange={(event) =>
                                setPersonInfo({
                                  ...personInfo,
                                  [event.target.name]: event.target.value,
                                })
                              }
                            />
                            <div className='text-danger'>
                              {errors.lastName && <div>{errors.lastName}</div>}
                            </div>
                          </div>
                        </div>
                        <div className='col-lg-6 col-md-6 d-flex'>
                          <div className='form-group w-50  mr-1'>
                            <label>Ngày sinh</label>
                            <input
                              type='date'
                              className='form-control'
                              placeholder='32 tuổi'
                              name='birthday'
                              value={moment(personInfo.birthday).format('YYYY-MM-DD')}
                              onChange={(event) => {
                                if (event.target.value.length >= 11) {
                                  setPersonInfo({
                                    ...personInfo,
                                    [event.target.name]: '00/00/0000',
                                  })
                                  return;
                                } else {
                                  setPersonInfo({
                                    ...personInfo,
                                    [event.target.name]: event.target.value,
                                  })
                                }
                              }
                              }
                            />
                            <div className='text-danger'>
                              {errors.birthday && <div>{errors.birthday}</div>}
                            </div>
                          </div>
                          <div className='form-group w-50 ml-1'>
                            <label>Giới tính</label>
                            <Form.Control
                              custom
                              as="select"
                              className="custom-select"
                              name="gender"
                              value={personInfo.gender}
                              onChange={(event) => setPersonInfo({ ...personInfo, [event.target.name]: event.target.value })}>
                              <option value="Nam">Nam</option>
                              <option value="Nữ">Nữ</option>
                            </Form.Control>
                          </div>
                        </div>
                        <div className='col-lg-6 col-md-6'>
                          <div className='form-group'>
                            <label>Mức lương hiện tại</label>
                            <input
                              type='number'
                              className='form-control'
                              placeholder='VND'
                              name='currentSalary'
                              value={personInfo.currentSalary}
                              onChange={(event) =>
                                setPersonInfo({
                                  ...personInfo,
                                  [event.target.name]: Number(event.target.value),
                                })
                              }
                            />
                            <div className='text-danger'>
                              {errors.currentSalary && <div>{errors.currentSalary}</div>}
                            </div>
                          </div>
                        </div>

                        <div className='col-lg-12 col-md-12'>
                          <div className='form-group'>
                            <label>Mô tả</label>
                            <textarea
                              className='form-control'
                              name='introduction'
                              value={personInfo.introduction}
                              onChange={(event) =>
                                setPersonInfo({
                                  ...personInfo,
                                  [event.target.name]: event.target.value,
                                })
                              }></textarea>
                            <div className='text-danger'>
                              {errors.introduction && <div>{errors.introduction}</div>}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className='job-bx-title clearfix'>
                        <h5 className='font-weight-700 pull-left text-uppercase'>
                          Thông tin liên hệ
                        </h5>
                      </div>
                      <div className='row'>
                        <div className='col-lg-6 col-md-6'>
                          <div className='form-group'>
                            <label>Số điện thoại</label>
                            <input
                              type='number'
                              className='form-control'
                              placeholder='09xxxxxxxx'
                              name='phone'
                              value={personInfo.phone}
                              onChange={(event) =>
                                setPersonInfo({
                                  ...personInfo,
                                  [event.target.name]: event.target.value,
                                })
                              }
                            />
                            <div className='text-danger'>
                              {errors.phone && <div>{errors.phone}</div>}
                            </div>
                          </div>
                        </div>
                        <div className='col-lg-6 col-md-6'>
                          <div className='form-group'>
                            <label>Email</label>
                            <input
                              type='email'
                              className='form-control'
                              placeholder={`${user.email}`}
                              name='email'
                              value={`${personInfo.email}`}
                              onChange={(event) =>
                                setPersonInfo({
                                  ...personInfo,
                                  [event.target.name]: event.target.value,
                                })
                              }
                            />
                            <div className='text-danger'>
                              {errors.email && <div>{errors.email}</div>}
                            </div>
                          </div>
                        </div>
                        <div className='col-lg-6 col-md-6 submit-resume'>
                          <div className='form-group'>
                            <label>Quốc gia</label>
                            <Form.Control
                              custom
                              as="select"
                              className="custom-select"
                              name='countryId'
                              value={address.countryId}
                              onChange={(event) =>
                                setAddress({
                                  ...address,
                                  [event.target.name]: event.target.value,
                                })
                              }
                            >
                              {allCountry?.map((country, index) => {
                                return <option value={country.id} key={index}>{country.name}</option>
                              })}
                            </Form.Control>
                          </div>
                        </div>
                        {address.countryId === "6296ee56b4382126ae3b148e" ?
                          <div className='col-lg-6 col-md-6 submit-resume'>
                            <div className='form-group'>
                              <label>Tỉnh/Thành phố</label>
                              <Form.Control
                                custom
                                as="select"
                                className="custom-select"
                                name='provinceId'
                                value={address.provinceId}
                                onChange={(event) =>
                                  setAddress({
                                    ...address,
                                    [event.target.name]: event.target.value,
                                  })
                                }
                              >
                                {allProvince?.map((province, index) => {
                                  return <option key={index} value={province.id}>{province.name}</option>
                                })}
                              </Form.Control>
                            </div>
                          </div>
                          :
                          ""
                        }
                        <div className='col-lg-6 col-md-6'>
                          <div className='form-group'>
                            <label>Địa chỉ cụ thể</label>
                            <input
                              type='text'
                              className='form-control'
                              placeholder=''
                              name='detailAddress'
                              value={address.detailAddress}
                              onChange={(event) =>
                                setAddress({
                                  ...address,
                                  [event.target.name]: event.target.value,
                                })
                              }
                            />
                            <div className='text-danger'>
                              {errors.detailAddress && <div>{errors.detailAddress}</div>}
                            </div>
                          </div>
                        </div>
                      </div>
                      <button
                        className='site-button m-b30'
                        type='button'
                        onClick={onHandleSubmitInfoPerson}>
                        Lưu thông tin
                      </button>
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
  );
}
export default Jobprofile;
