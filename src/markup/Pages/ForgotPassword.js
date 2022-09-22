import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';
import { createNewPassword, resetPassword } from '../../services/AuthService';
import { confirmOTP } from '../../store/actions/AuthActions';

import loginbg from "./../../images/bg6.jpg";
import logo2 from "./../../images/logo/tsc__logo.png";

export default function ForgotPassword(props) {
    const dispatch = useDispatch();
    const [switchForm, setSwitchForm] = useState(false);
    const [email, setEmail] = useState("");
    const [confirm, setConfirm] = useState({
        password: "",
        confirmPassword: "",
        otp: ""
    })
    const errorObject = {
        confirmPassword: "",
    }
    const [errors, setError] = useState(errorObject);


    const checkEmail = async (e) => {
        try {
            dispatch({
                type: "SHOW_LOADING"
            })
            e.preventDefault();
            const result = await resetPassword(email);
            setEmail(result.data.data.user.email)
            setSwitchForm(true)
            dispatch({
                type: "HIDE_LOADING"
            })
        } catch (error) {
            dispatch({
                type: "HIDE_LOADING"
            })
        }
    }

    const checkConfirm = async (e) => {
        e.preventDefault();
        const errorsObj = { ...errorObject }
        let error = false;
        if (confirm.confirmPassword !== confirm.password) {
            errorsObj.confirmPassword = "Mật khẩu không khớp!!"
            error = true;
        }

        setError(errorsObj);
        if (error) return;

        const objData = {
            email,
            otp: confirm.otp,
            password: confirm.password
        }

        try {
            dispatch({
                type: "SHOW_LOADING"
            })
            const result = await createNewPassword(objData);
            dispatch({
                type: "HIDE_LOADING"
            })
            props.history.push('/login');
            swal(
                "Success",
                "Thay đổi mật khẩu thành công!!",
                "success",
            );
        } catch (error) {
            dispatch({
                type: "HIDE_LOADING"
            })
            swal("Oops", "Otp không chính xác, vui lòng xác nhận lại!!", "error", {
                button: "Try Again!",
            });
        }

    }


    const infoModal = useSelector(state => state.auth.modal);
    const [otp, setOtp] = useState("");


    return (
        <div className='page-wraper'>
            <div className={`register__modal ${infoModal.status}`}>
                <div className="register__overlay"></div>
                <div className="modal-content register__content">
                    <div className="modal-header">
                        <h5 className="modal-title">Xác thực OTP</h5>
                        <button onClick={() => {
                            dispatch({
                                type: "hideModal"
                            })
                        }}
                            type="button"
                            className="close"
                        >
                            <span>×</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <div className='form-group m-auto d-flex' style={{ width: 'fit-content', flexDirection: 'column' }}>
                            <p className="register__label">Nhập OTP được gửi tới email của bạn</p>
                            <div className="d-flex">
                                <input
                                    value={otp}
                                    onChange={(e) => {
                                        setOtp(e.target.value);
                                    }}
                                    className='form-control'
                                />
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button
                            onClick={() => {
                                dispatch({
                                    type: "hideModal"
                                })
                            }}
                            type="button"
                            className="btn btn-secondary"
                        >Đóng</button>
                        <button onClick={() => {
                            dispatch(confirmOTP(infoModal, otp, props.history));
                        }}
                            type="button"
                            className="btn btn-primary"
                        >Xác nhận</button>
                    </div>
                </div>
            </div>
            <div
                className='page-content bg-white login-style2'
                style={{
                    backgroundImage: "url(" + loginbg + ")",
                    backgroundSize: "cover",
                }}>
                <div className='section-full'>
                    <div className='container'>
                        <div className='row'>
                            <div className='col-lg-6 col-md-6 d-flex'>
                                <div className='text-white max-w450 align-self-center'>
                                    <div className='logo logo__icon'>
                                        <Link to={"#"}>
                                            <img src={logo2} alt='' />
                                        </Link>
                                    </div>
                                    <span className='m-b10 logo__heading'>
                                        TRUNG TÂM HỖ TRỢ ĐÀO TẠO VÀ CUNG ỨNG NHÂN LỰC, BỘ GD&ĐT
                                    </span>
                                    <div className='m-b30'>
                                        <ul className='login__list--info'>
                                            <li className='login__item--info'>
                                                Địa chỉ: Số 12 - 14 Lê Thánh Tông – Q.Hoàn Kiếm – TP.Hà
                                                Nội
                                            </li>
                                            <li className='login__item--info'>
                                                Điện thoại (84-24) 38262018, Fax: (84-24) 38269466
                                            </li>
                                            <li className='login__item--info'>
                                                E-mail: trungtamhotrodaotao@moet.edu.vn
                                            </li>
                                        </ul>
                                    </div>

                                </div>
                            </div>
                            <div className='col-lg-6 col-md-6'>
                                <div className='login-2 submit-resume p-a30 seth'>
                                    <div className='nav'>
                                        {!switchForm ?
                                            <form onSubmit={checkEmail} className='col-12 p-a0 '>
                                                <h4>Quên mật khẩu</h4>
                                                <div className='form-group '>
                                                    <label>E-Mail</label>
                                                    <div className='input-group'>
                                                        <input
                                                            required
                                                            type='email'
                                                            className='form-control'
                                                            placeholder='Type Your Email Address'
                                                            value={email}
                                                            onChange={(e) => setEmail(e.target.value)}
                                                        />
                                                    </div>
                                                </div>
                                                <div className='text-center'>
                                                    <button className='site-button float-left'>
                                                        Xác nhận
                                                    </button>
                                                    <Link
                                                        to='/login'
                                                        className='site-button-link forget-pass m-t15 float-right'>
                                                        Đăng nhập
                                                    </Link>
                                                </div>
                                            </form>
                                            :
                                            <form onSubmit={checkConfirm} className='col-12 p-a0 '>
                                                <h4>Quên mật khẩu</h4>
                                                <div className='form-group '>
                                                    <label>Mật khẩu mới</label>
                                                    <div className='input-group'>
                                                        <input
                                                            required
                                                            minLength="6"
                                                            maxLength="30"
                                                            type='password'
                                                            className='form-control'
                                                            name="password"
                                                            placeholder='Mật khẩu'
                                                            value={confirm.password}
                                                            onChange={(e) => setConfirm({ ...confirm, [e.target.name]: e.target.value })}
                                                        />
                                                    </div>
                                                </div>
                                                <div className='form-group '>
                                                    <label>Nhập lại mật khẩu</label>
                                                    <div className='input-group'>
                                                        <input
                                                            required
                                                            minLength="6"
                                                            maxLength="30"
                                                            name="confirmPassword"
                                                            type='password'
                                                            className='form-control'
                                                            placeholder='Nhập lại mật khẩu'
                                                            value={confirm.confirmPassword}
                                                            onChange={(e) => setConfirm({ ...confirm, [e.target.name]: e.target.value })}
                                                        />
                                                    </div>
                                                    <div className='text-danger fs-12'>
                                                        {errors.confirmPassword}
                                                    </div>
                                                </div>
                                                <div className='form-group '>
                                                    <label>OTP gửi về email của bạn</label>
                                                    <div className='input-group'>
                                                        <input
                                                            required
                                                            minLength="6"
                                                            maxLength="6"
                                                            name="otp"
                                                            type='text'
                                                            className='form-control'
                                                            placeholder='OTP'
                                                            value={confirm.otp}
                                                            onChange={(e) => setConfirm({ ...confirm, [e.target.name]: e.target.value })}
                                                        />
                                                    </div>
                                                </div>
                                                <div className='text-center'>
                                                    <button className='site-button float-left'>
                                                        Xác nhận
                                                    </button>
                                                    <Link
                                                        to='/register-2'
                                                        className='site-button-link forget-pass m-t15 float-right'>
                                                        Đăng nhập
                                                    </Link>
                                                </div>
                                            </form>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <footer className='login-footer'>
                    <div className='container'>
                        <div className='row'>
                            <div className='col-lg-12 text-center'>
                                <span className='float-left'>
                                    © Copyright by{" "}
                                    <i className='fa fa-heart m-lr5 text-red heart'></i>
                                    <Link to={"#"}>TSC</Link>{" "}
                                </span>
                                <span className='float-right'>All rights reserved.</span>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        </div >
    );
}
