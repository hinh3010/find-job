import { Modal } from 'antd';
import React from 'react';
function ModalDesc(props) {
    return (
        <Modal show={props.socialLink} onHide={props.setSocialLink} className="modal fade modal-bx-info editor w-100">
            <div className="modal-dialog my-0" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="KeyskillsModalLongTitle">
                            Social Link
                        </h5>
                        <button type="button" className="close" onClick={() => props.setSocialLink(false)}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <p>
                            Đây là điều đầu tiên gây ấn tượng với nhà tuyển
                            dụng trong hồ sơ của bạn. Thêm vào kỹ năng văn
                            phòng, ngôn ngữ khiến bạn trở nên độc đáo và là
                            người phù hợp với công việc mà bạn đang tìm kiếm.
                        </p>
                        <form>
                            <div className="row">
                                <div className="col-lg-12 col-md-12">
                                    <div className="form-group">
                                        <label>Tiêu đề: </label>
                                        <input required onChange={e => props.setCurrentSocialLink({
                                            ...props.currentSocialLink,
                                            title: e.target.value
                                        })} className="form-control" placeholder="Vd: Facebook" />
                                    </div>
                                </div>
                                <div className="col-lg-12 col-md-12">
                                    <div className="form-group">
                                        <label>Link liên kết: </label>
                                        <textarea required onChange={e => props.setCurrentSocialLink({
                                            ...props.currentSocialLink,
                                            link: e.target.value
                                        })} className="form-control" placeholder="https://www.facebook.com/"></textarea>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="site-button" onClick={() => props.setSocialLink(false)}>
                            Hủy
                        </button>
                        <button onClick={() => {
                            props.push(props.currentSocialLink);
                            props.setSocialLink(false);
                        }} type="button" className="site-button">
                            Lưu
                        </button>
                    </div>
                </div>
            </div>
        </Modal>
    );
}

export default ModalDesc