import React, {useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { updateUsers } from "../../services/UserServices/UserServices";
import { updateUserAction } from "../../store/actions/AuthActions";
import { BASE_URL } from "../../config/BASE_URL";
import { uploadImage } from "../../services/FileService/FileService";
import { Modal } from "antd";

function Profilesidebar() {
  const dispatch = useDispatch();
  const { auth } = useSelector((state) => state.auth);
  const user = auth.user;

  const onUpdate = (data) => {
    updateUsers(user.id, data, auth.accessToken.token)
      .then((response) => {
        dispatch(updateUserAction(response.data));
        const userDetail = { ...auth, user: response.data }
        localStorage.setItem("userDetail", JSON.stringify(userDetail));
      })
  }

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


  return (
    <div className='col-xl-3 col-lg-4 m-b30'>
      <div className='sticky-top'>
        <div className='candidate-info'>
          <div className='candidate-detail text-center'>
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
              <div
                className='upload-link'
                title='update'
                data-toggle='tooltip'
                data-placement='right'>
                <input onChange={(event) => {
                  const data = new FormData();
                  data.append("files", event.target.files[0]);
                  uploadImage(data, auth.accessToken.token)
                    .then((response) => {
                      onUpdate({ "accountType": "APPLICANT", "avatarUrl": response.data[0].path })
                    })
                }} type='file' className='update-flie' />
                <i className='fa fa-camera'></i>
              </div>
            </div>
            <div className='candidate-title'>
              <div className=''>
                <h4 className='m-b5'>
                  <Link to={"#"}>{user.fullName}</Link>
                </h4>
                {/* <p className='m-b0'>
                  <Link to={"#"}>Web developer</Link>
                </p> */}
              </div>
            </div>
          </div>
          <ul>
            <li>
              <Link to={"/jobs-profile"} className='active'>
                <i className='fa fa-user-o' aria-hidden='true'></i>
                <span>Profile</span>
              </Link>
            </li>
            <li>
              <Link to={"/jobs-my-resume"}>
                <i className='fa fa-file-text-o' aria-hidden='true'></i>
                <span>Lý lịch</span>
              </Link>
            </li>
            {/* <li><Link to={"/jobs-saved-jobs"}>
							<i className="fa fa-heart-o" aria-hidden="true"></i>
							<span>Công việc đã lưu</span></Link></li> */}
            <li>
              <Link to={"/jobs-applied-job"}>
                <i className='fa fa-briefcase' aria-hidden='true'></i>
                <span>Công việc đã ứng tuyển</span>
              </Link>
            </li>
            <li>
              <Link to={"/jobs-alerts"}>
                <i className='fa fa-bell-o' aria-hidden='true'></i>
                <span>Thông báo công việc</span>
              </Link>
            </li>
            <li>
              <Link to={"/jobs-cv-manager"}>
                <i className='fa fa-id-card-o' aria-hidden='true'></i>
                <span>Quản lý CV</span>
              </Link>
            </li>
            <li>
              <Link to={"/jobs-change-password"}>
                <i className='fa fa-key' aria-hidden='true'></i>
                <span>Đổi mật khẩu</span>
              </Link>
            </li>
            <li>
              <Link to={"./"}>
                <i className='fa fa-sign-out' aria-hidden='true'></i>
                <span>Đăng xuất</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
export default Profilesidebar;
