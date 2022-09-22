import { DatePicker, Modal } from 'antd';
import moment from 'moment';
import React from 'react';
const { RangePicker } = DatePicker;

function ModalEducation(props) {
    const { education, setEducation, onSubmit } = props;

    const [formData, setFormData] = React.useState({
        major: "",
        duration: '',
        school: "",
        lavel: ""
    })

    return (
        <Modal
            className="modal fade modal-bx-info editor w-100"
            show={education}
            onHide={setEducation}
        >
            <div className="modal-dialog my-0" role="document">
                <form onSubmit={onSubmit}>
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5
                                className="modal-title"
                                id="EducationModalLongTitle"
                            >
                                Học vấn
                            </h5>
                            <button
                                type="button"
                                className="close"
                                onClick={() => setEducation(false)}
                            >
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="row">
                                    <div className="col-lg-12 col-md-12">
                                        <div className="form-group">
                                            <label>Chuyên ngành: </label>
                                            <input
                                                required
                                                onChange={(e) =>
                                                    setFormData({
                                                        ...formData,
                                                        major: e.target.value,
                                                    })
                                                }
                                                className="form-control"
                                                placeholder="Vd: Công nghệ thông tin"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-lg-12 col-md-12 col-xs-12">
                                        <div className="form-group">
                                            <label>Thời gian học:</label>
                                            <RangePicker
                                                required
                                                className="form-control d-flex"
                                                onChange={(e, date) => {
                                                    setFormData({
                                                        ...formData,
                                                        duration: `${moment(date[0]).format(
                                                            "DD-MM-YYYY"
                                                        )} - ${moment(date[1]).format(
                                                            "DD-MM-YYYY"
                                                        )}`,
                                                    });
                                                }}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-lg-12 col-md-12">
                                        <div className="form-group">
                                            <label>Theo học tại: </label>
                                            <input
                                                onChange={(e) =>
                                                    setFormData({
                                                        ...formData,
                                                        school: e.target.value,
                                                    })
                                                }
                                                className="form-control"
                                                placeholder="Vd: HUTECH"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-lg-12 col-md-12">
                                        <div className="form-group">
                                            <label>Xếp loại: </label>
                                            <input
                                                onChange={(e) =>
                                                    setFormData({
                                                        ...formData,
                                                        level: e.target.value,
                                                    })
                                                }
                                                className="form-control"
                                                placeholder="Vd: Giỏi"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="site-button"
                                onClick={() => setEducation(false)}
                            >
                                Hủy
                            </button>
                            <button
                                className="site-button"
                            >
                                Lưu
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </Modal>
    );
}

export default ModalEducation;