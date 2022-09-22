import React, { useEffect, useState } from 'react'
import moment from "moment"
import { useHistory } from 'react-router-dom'
import { Pagination } from 'antd'
import { getListSurvey } from '../../services/Survey/SurveyServices'


export default function SurveySection() {


    const { accessToken } = JSON.parse(localStorage.getItem('userDetail'));
    const history = useHistory();
    const [page, setPage] = useState(1);

    const [listSurvey, setListSurvey] = useState(undefined);
    // const listSurveyJoin = listSurvey?.map((item) => {
    //     if (!item.isJoin) {
    //         return item;
    //     }
    // })
    // const [isJoin, setIsJoin] = useState(false);
    const [totalPage, setTotalPages] = useState(1);

    const [sort, setSort] = useState('-createdAt');

    const [active, setActive] = useState("false");

    useEffect(() => {
        const fetch = getListSurvey(page, sort, active, undefined, accessToken.token);
        fetch.then((response) => {
            setListSurvey(response.data.docs);
            setTotalPages(response.data.totalPages);
        }).catch((error) => {
            console.log(error)
        })
    }, [sort, active, page])


    return (
        <div className="section-full bg-white content-inner-2">
            <div className="container">
                <div className='job-title-bx section-head'>
                    <div className='d-flex justify-content-between align-items-center mb-5'>
                        <h2 className=''>Danh sách bài khảo sát</h2>
                        <div className=''>


                            <span className='select-title'>Lọc</span>
                            <select
                                onChange={(event) => { setActive(event.target.value) }}
                                className='custom-btn mr-4'
                                defaultValue={"false"}
                            >
                                <option value="false">Tất cả</option>
                                <option value="true">Đang diễn ra</option>
                            </select>


                            <span className='select-title'>Sắp xếp</span>
                            <select
                                onChange={(event) => { setSort(event.target.value) }}
                                className='custom-btn'
                                defaultValue={"-createdAt"}
                            >
                                <option value="-createdAt">Mới nhất</option>
                                <option value="+createdAt">Cũ nhất</option>
                                <option value="+surveyStartDate">Sắp diễn ra</option>
                            </select>

                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-12">
                            <ul className="post-job-bx browse-job">
                                {listSurvey?.map((item, index) => {
                                    if (!item?.isJoined)
                                        return <li key={index}>
                                            <div className='post-bx'>
                                                <div className='d-flex'>
                                                    <div className='job-post-info'>
                                                        <h4>
                                                            <a
                                                                className="cursor-pointer"
                                                                onClick={() => {
                                                                    history.push(`/survey/${item.id}`);
                                                                }}
                                                            >
                                                                {item?.title}
                                                            </a>
                                                        </h4>
                                                        <h6 className='recent-job__name'>
                                                            <span>{item?.introduction}</span>
                                                        </h6>
                                                        <div style={{ color: "#2e55fa" }}>
                                                            {moment(item?.surveyStartDate).format('DD/MM/YYYY')} - {moment(item?.surveyApplyDeadline).format('DD/MM/YYYY')}
                                                        </div>
                                                    </div>
                                                </div>
                                                <label className='like-btn'>
                                                    <input type='checkbox' />
                                                    <span className='checkmark'></span>
                                                </label>
                                            </div>
                                        </li>
                                })}

                            </ul>
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
    )
}
