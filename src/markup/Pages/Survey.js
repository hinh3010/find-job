import React, { useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom';
import Footer from '../Layout/Footer'
import Header from '../Layout/Header'
import { createResponse, getSurveyById } from '../../services/Survey/SurveyServices'
import { useState } from 'react';
import { Button, Form, Input, message } from 'antd';

export default function Survey() {

    const { id } = useParams();
    const { user, accessToken } = JSON.parse(localStorage.getItem('userDetail'));
    const history = useHistory();

    const [detailSurvey, setDetailSurvey] = useState(undefined);

    const onFinish = (values) => {
        const data = []
        for (let index in values) {
            data.push({
                questionId: index,
                response: values[index]
            })
        }

        const valueSubmit = {
            surveyId: detailSurvey.id,
            questionResponses: data
        }

        const fetch = createResponse(valueSubmit, accessToken.token);
        fetch.then((response) => {
            message.success('Phản hồi thành công!');
            history.push('/');
        }).catch((error) => {
            message.error('!Error!, lỗi hệ thống');
        })

    };

    useEffect(() => {
        const fetch = getSurveyById(id, accessToken.token);
        fetch.then((response) => {
            setDetailSurvey(response.data);
        }).catch((error) => {
            console.log(error)
        })
    }, [id, accessToken.token])
    return (
        <div className="page-wraper ">
            <Header />
            <div style={{ margin: 40 }} className="page-content">
                <div className="text-center">
                    <h1>Khảo sát về {detailSurvey?.title}</h1>

                    <p>{detailSurvey?.description}</p>

                    <i style={{ color: "#2e55fa" }} className="mb-3 d-block">Vui lòng điền vào biểu mẫu</i>
                </div>
                <div className="job-bx">
                    <div className="add-contact-box">
                        <div className="add-contact-content survey-form">
                            <Form
                                name="basic"
                                onFinish={onFinish}
                                autoComplete="off"
                            >
                                {detailSurvey?.questions?.map((item, index) => {
                                    return <Form.Item
                                        key={index}
                                        label={item?.question}
                                        name={`${item?._id}`}
                                        title={item?.question}
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Vui lòng trả lời câu hỏi',
                                            },
                                        ]}
                                    >
                                        <Input />
                                    </Form.Item>
                                })}

                                <Form.Item>
                                    <Button size="large" type="primary" htmlType="submit">
                                        Submit
                                    </Button>
                                </Form.Item>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}
