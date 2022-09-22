import { Modal } from 'antd';
import React from 'react';




function ModalHobby(props) {
    return (<Modal className="modal fade modal-bx-info editor w-100" show={props.onlineprofile} onHide={props.setOnlineProfile}>
        <div className="modal-dialog my-0" role="document">
            <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title">Sở thích</h5>
                    <button type="button" className="close" onClick={() => props.setOnlineProfile(false)}>
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="modal-body">
                    <p>
                        Đây là điều đầu tiên gây ấn tượng với nhà
                        tuyển dụng trong hồ sơ của bạn. Viết ngắn gọn
                        những gì khiến bạn trở nên độc đáo và là người
                        phù hợp với công việc mà bạn đang tìm kiếm.
                    </p>
                    <form>
                        <div className="row">
                            <div className="col-lg-12 col-md-12">
                                <div className="form-group">
                                    <label>Mô tả các sở thích: </label>
                                    <textarea onChange={e => props.setCurrentHobby(e.target.value)} style={{
                                        whiteSpace: "pre-wrap"
                                    }} className="form-control" placeholder="Vd: Đọc sách, du lịch ..."></textarea>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
                <div className="modal-footer">
                    <button type="button" className="site-button" onClick={() => props.setOnlineProfile(false)}>
                        Hủy
                    </button>
                    <button type="button" onClick={() => {
                        props.push(props.currentHobby);
                        props.setOnlineProfile(false);
                    }} className="site-button">
                        {" "}
                        Lưu
                    </button>
                </div>
            </div>
        </div>
    </Modal>);
}



export default ModalHobby