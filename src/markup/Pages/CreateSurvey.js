import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom'
import { PlusCircleOutlined, CloseCircleOutlined } from '@ant-design/icons'
import Footer from '../Layout/Footer'
import Header from '../Layout/Header'
import { BASE_URL } from '../../config/BASE_URL';
import { message, Modal } from 'antd';
import FormList from 'antd/lib/form/FormList';
import { useFormik } from 'formik';
import { createSurvey } from '../../services/Survey/SurveyServices';



export default function CreateSurvey() {

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

    const errorObj = {
        title: "",
        startDate: "",
        endDate: "",
        introduction: "",
        description: "",
    }

    const [errors, setErrors] = useState(errorObj);

    const [isErrors, setIsErrors] = useState(false);

    const [contentQuestion, setContentQuestion] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [question, setQuestion] = useState([]);

    const renderQuestion = () => {
        return question?.map((item, index) => {
            return <div key={index} className="col-lg-6 col-md-6 ">
                <div className="form-group d-flex survey-question">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Nhập vào nội dung câu hỏi"
                        value={item.question}
                        disabled
                    />
                    <CloseCircleOutlined
                        onClick={() => {
                            const data = [...question];
                            const index = data.findIndex(value => value.question === item.question);
                            data.splice(index, 1);
                            setQuestion(data);
                        }}
                        className="icon" />
                </div>
            </div>
        })
    }

    const handlePushQuestion = () => {

        const content = [...question];
        if (!contentQuestion) {
            message.error('Không được để trống!!');
            return;
        }
        if (content.length > 0) {
            let isPush = true;
            for (let i = 0; i < content.length; i++) {
                if (contentQuestion === content[i].question) {
                    isPush = false;
                }
            }
            if (!isPush) {
                message.error('Câu hỏi đã tồn tại')
                return;
            }
            setContentQuestion('');
            content.push({
                question: contentQuestion
            })
            setQuestion(content)
        } else {
            setContentQuestion('');
            content.push({
                question: contentQuestion
            })
            setQuestion(content)
        }
    }


    const formik = useFormik({
        initialValues: {
            title: "",
            description: "",
            introduction: ""
        },
        onSubmit: (values) => {
            const err = { ...errorObj }
            let isError = false;
            if (values.title === '') {
                err.title = "Vui lòng nhập trường này";
                isError = true;
            }

            if (!values.description) {
                err.description = "Vui lòng nhập trường này";
                isError = true;
            }

            if (!values.introduction) {
                err.introduction = "Vui lòng nhập trường này";
                isError = true;
            }

            if(startDate >= endDate) {
                err.startDate = "Ngày bắt đầu phải trước ngày kết thúc khảo sát"
                isError = true;
            }

            if (!startDate) {
                err.startDate = "Vui lòng nhập trường này";
                isError = true;
            }

            if (!endDate) {
                err.endDate = "Vui lòng nhập trường này";
                isError = true;
            }

            if (question?.length === 0) {
                message.error("Vui lòng thêm câu hỏi!!");
                isError = true;
            }


            setErrors(err)
            if (isError) return;




            const valueSubmit = {
                ...values,
                surveyStartDate: startDate,
                surveyEndDate: endDate,
                questions: question
            }

            const fetch = createSurvey(valueSubmit, accessToken.token);
            fetch.then((response) => {
                message.success('Tạo khảo sát thành công!!');
                history.push('/company-survey')
            }).catch((error) => {
                message.error('ERROR!!, Vui lòng kiểm tra lại thông tin!!')
            })
        }
    })


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
                                            <h5 className="font-weight-700 pull-left text-uppercase m-0">Tạo khảo sát</h5>
                                            <div className="ml-auto d-flex align-items-center">
                                                <Link to={"/company-survey"} style={{ height: 'fit-content' }} className="site-button right-arrow button-sm float-right">Back</Link>
                                            </div>
                                        </div>

                                        <form onSubmit={formik.handleSubmit}>
                                            <div className="row submit-resume">
                                                <div className="col-lg-6 col-md-6 ">
                                                    <div className="form-group">
                                                        <label>Tên khảo sát</label>
                                                        <input
                                                            onChange={formik.handleChange}
                                                            type="text"
                                                            className="form-control"
                                                            placeholder="Nhập vào tên bài khảo sát"
                                                            name="title"
                                                        />
                                                        <div className='text-danger'>
                                                            {errors.title && <div>{errors.title}</div>}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-lg-6 col-md-6">
                                                    <div className="form-group">
                                                        <label>Thời gian bắt đầu khảo sát:</label>
                                                        <input
                                                            onChange={(event) => {
                                                                if (event.target.value.length >= 11) {
                                                                    event.target.value = 0;
                                                                    return;
                                                                }
                                                                if (event.target.value === "") {
                                                                    setErrors({ ...errors, startDate: 'Vui lòng nhập trường này !' })
                                                                }
                                                                else if (event.target.value !== '') {
                                                                    if (endDate === "") {
                                                                        setErrors({ ...errors, startDate: '' })
                                                                    }
                                                                    else if (endDate !== "") {
                                                                        if (new Date(event.target.value) < new Date(endDate) || new Date(event.target.value) === new Date(endDate)) {
                                                                            setErrors({ ...errors, startDate: 'Ngày bắt đầu khảo sát phải sau hạn đăng ký học' })
                                                                        }
                                                                        else if (new Date(event.target.value) > new Date(endDate)) {
                                                                            setErrors({ ...errors, startDate: '', endDate: '' })
                                                                        }
                                                                    }
                                                                }
                                                                setStartDate(event.target.value)
                                                            }}
                                                            value={startDate}
                                                            type="date"
                                                            className="form-control"
                                                            placeholder="Vd: 19/05/2022"
                                                        />
                                                        <p style={{ color: "red" }}>{errors.startDate}</p>
                                                    </div>
                                                </div>

                                                <div className="col-lg-6 col-md-6">
                                                    <div className="form-group">
                                                        <label>Thời gian kết thúc khảo sát:</label>
                                                        <input
                                                            onChange={(event) => {
                                                                if (event.target.value.length >= 11) {
                                                                    event.target.value = 0;
                                                                    return;
                                                                }
                                                                if (event.target.value === "") {
                                                                    setErrors({ ...errors, endDate: 'Vui lòng nhập trường này !' })
                                                                }
                                                                else if (event.target.value !== '') {
                                                                    if (startDate === "") {
                                                                        setErrors({ ...errors, endDate: '' })
                                                                    }
                                                                    else if (startDate !== "") {
                                                                        if (new Date(event.target.value) < new Date(startDate) || new Date(event.target.value) === new Date(startDate)) {
                                                                            setErrors({ ...errors, endDate: 'Ngày kết thúc khảo sát phải sau ngày bắt đầu khảo sát' })
                                                                        }
                                                                        else if (new Date(event.target.value) > new Date(startDate)) {
                                                                            setErrors({ ...errors, endDate: '' })
                                                                        }
                                                                    }
                                                                }
                                                                setEndDate(event.target.value)
                                                            }}
                                                            value={endDate}
                                                            type="date"
                                                            className="form-control"
                                                            placeholder="Vd: 19/05/2022"
                                                        />
                                                        <p style={{ color: "red" }}>{errors.endDate}</p>
                                                    </div>
                                                </div>

                                                <div className="col-lg-6 col-md-6 ">
                                                    <div className="form-group">
                                                        <label>Giới thiệu</label>
                                                        <input
                                                            onChange={formik.handleChange}
                                                            type="text"
                                                            className="form-control"
                                                            placeholder="Giới thiệu"
                                                            name="introduction"
                                                        />
                                                        <div className="text-danger">
                                                            {errors.introduction && <div>{errors.introduction}</div>}
                                                        </div>

                                                    </div>
                                                </div>

                                                <div className="col-lg-12 col-md-12 ">
                                                    <div className="form-group">
                                                        <label>Mô tả</label>
                                                        <textarea
                                                            onChange={formik.handleChange}
                                                            className="form-control"
                                                            placeholder=""
                                                            name="description"
                                                        />
                                                        <div className="text-danger">
                                                            {errors.description && <div>{errors.description}</div>}

                                                        </div>

                                                    </div>
                                                </div>

                                                <div className="col-lg-12 col-md-12">
                                                    <h3>
                                                        Tạo câu hỏi
                                                    </h3>
                                                </div>

                                                <div className="col-lg-6 col-md-6 ">
                                                    <div className="form-group">
                                                        <label>Câu hỏi khảo sát</label>
                                                        <input
                                                            value={contentQuestion}
                                                            onChange={(event) => { setContentQuestion(event.target.value) }}
                                                            type="text"
                                                            className="form-control"
                                                            placeholder="Nhập vào nội dung câu hỏi"
                                                        />

                                                        <div className='text-danger'>
                                                            {/* {errors.fullCompanyName && <div>{errors.fullCompanyName}</div>} */}
                                                        </div>
                                                    </div>
                                                </div>




                                                <div className="col-lg-4 col-md-4">
                                                    <div className="h-100 d-flex align-items-center">
                                                        <div
                                                            onClick={() => { handlePushQuestion() }}
                                                            className="d-flex align-items-center add-survey cursor-pointer"
                                                        >
                                                            <PlusCircleOutlined style={{ fontSize: 24 }} />
                                                            <span className="ml-2 ">Thêm câu hỏi</span>
                                                        </div>
                                                    </div>
                                                </div>

                                                {renderQuestion()}

                                                <div className="col-lg-12 col-md-12 mt-4">
                                                    <div className="create-survey">
                                                        <button type="submit">Tạo khảo sát</button>
                                                    </div>
                                                </div>
                                            </div>
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
