import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom'
import Footer from '../Layout/Footer'
import Header from '../Layout/Header'
import { BASE_URL } from '../../config/BASE_URL';
import { Modal } from 'antd';
import { useEffect } from 'react';
import { getSurveyById } from '../../services/Survey/SurveyServices';
import moment from 'moment';



export default function DetailSurvey() {

    const { user, accessToken } = useSelector((state) => state.auth.auth);

    const { id } = useParams();

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

    const [detailSurvey, setDetailSurvey] = useState(undefined)

    useEffect(() => {
        const fetch = getSurveyById(id, accessToken.token);
        fetch.then((response) => {
            setDetailSurvey(response.data)
        }).catch((error) => {
            console.log(error);
        })
    }, [id, accessToken.token])


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
                                            <h5 className="font-weight-700 pull-left text-uppercase m-0">Chi tiết khảo sát</h5>
                                            <div className="ml-auto d-flex align-items-center">
                                                <Link to={"/company-survey"} style={{ height: 'fit-content' }} className="site-button right-arrow button-sm float-right">Back</Link>
                                            </div>
                                        </div>

                                        <form>
                                            <div className="row submit-resume detail-survey">
                                                <div className="col-lg-6 col-md-6 ">
                                                    <div className="form-group">
                                                        <label>Tên khảo sát</label>
                                                        <div className="form-control">
                                                            {detailSurvey?.title}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div />
                                                <div className="col-lg-6 col-md-6">
                                                    <div className="form-group">
                                                        <label>Giới thiệu</label>
                                                        <div className="form-control">
                                                            {detailSurvey?.introduction}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-lg-6 col-md-6">
                                                    <div className="form-group">
                                                        <label>Chi tiết</label>
                                                        <div className="form-control">
                                                            {detailSurvey?.description}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-lg-6 col-md-6">
                                                    <div className="form-group">
                                                        <label>Số lượng phản hồi</label>
                                                        <div className="form-control">
                                                            {detailSurvey?.surveyResponses.length}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-lg-6 col-md-6">
                                                    <div className="form-group">
                                                        <label>Thời gian khảo sát</label>
                                                        <div className="form-control">
                                                            {moment(detailSurvey?.surveyStartDate).format('DD-MM-YYYY')}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-lg-6 col-md-6">
                                                    <div className="form-group">
                                                        <label>Hạn khảo sát</label>
                                                        <div className="form-control">
                                                            {detailSurvey?.surveyEndDate}
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="col-lg-12 col-md-12 mt-4">
                                                    <h3>Danh sách câu hỏi trong bài khảo sát</h3>
                                                </div>
                                                {detailSurvey?.questions.map((item, index) => {
                                                    return <div key={index} className="col-lg-12 col-md-12">
                                                        <div className="form-group">
                                                            <div className="form-control">
                                                                {item?.question}
                                                            </div>
                                                        </div>
                                                    </div>
                                                })}
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
