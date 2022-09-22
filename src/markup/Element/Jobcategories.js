import React from "react";
import { Link, useHistory } from "react-router-dom";
import {
  getAllJobsAction,
  setSearchInfo,
} from "../../store/actions/Job/JobsActions";
import { useDispatch } from "react-redux";

function Jobcategories() {
  const dispatch = useDispatch();
  const history = useHistory();
  const handleClickSearch = (values) => {
    const action = setSearchInfo(values);
    dispatch(action);
    history.push("/browse-job-list");
  };
  return (
    <div className="row sp20">
      <div className="col-lg-3 col-md-6 col-sm-6">
        <div className="icon-bx-wraper">
          <div className="icon-content" onClick={(e) => handleClickSearch({jobField: 'công nghệ'})}>
            <div className="icon-md text-primary m-b20">
              <i className="ti-location-pin"></i>
            </div>
            <Link to={"#"} className="dez-tilte">
              Công nghệ
            </Link>
            <p className="m-a0">198 vị trí</p>
            <div className="rotate-icon">
              <i className="ti-location-pin"></i>
            </div>
          </div>
        </div>
      </div>
      <div className="col-lg-3 col-md-6 col-sm-6">
        <div className="icon-bx-wraper">
          <div className="icon-content" onClick={(e) => handleClickSearch({jobField: 'giáo dục'})}>
            <div className="icon-md text-primary m-b20">
              <i className="ti-wand"></i>
            </div>
            <Link to={"/company-manage-job"} className="dez-tilte">
              Giáo dục và đào tạo
            </Link>
            <p className="m-a0">198 vị trí</p>
            <div className="rotate-icon">
              <i className="ti-wand"></i>
            </div>
          </div>
        </div>
      </div>
      <div className="col-lg-3 col-md-6 col-sm-6">
        <div className="icon-bx-wraper">
          <div className="icon-content" onClick={(e) => handleClickSearch({jobField: 'tài chính'})}>
            <div className="icon-md text-primary m-b20">
              <i className="ti-wallet"></i>
            </div>
            <Link to="#" className="dez-tilte">
              Tài chính
            </Link>
            <p className="m-a0">198 vị trí</p>
            <div className="rotate-icon">
              <i className="ti-wallet"></i>
            </div>
          </div>
        </div>
      </div>
      <div className="col-lg-3 col-md-6 col-sm-6">
        <div className="icon-bx-wraper">
          <div className="icon-content" onClick={(e) => handleClickSearch({jobField: 'bán lẻ'})}>
            <div className="icon-md text-primary m-b20">
              <i className="ti-cloud-up"></i>
            </div>
            <Link to="#" className="dez-tilte">
              Bán lẻ
            </Link>
            <p className="m-a0">198 vị trí</p>
            <div className="rotate-icon">
              <i className="ti-cloud-up"></i>
            </div>
          </div>
        </div>
      </div>
      <div className="col-lg-3 col-md-6 col-sm-6">
        <div className="icon-bx-wraper">
          <div className="icon-content" onClick={(e) => handleClickSearch({jobField: 'giải trí'})}>
            <div className="icon-md text-primary m-b20">
              <i className="ti-bar-chart"></i>
            </div>
            <Link to="#" className="dez-tilte">
              Giải trí
            </Link>
            <p className="m-a0">198 vị trí</p>
            <div className="rotate-icon">
              <i className="ti-bar-chart"></i>
            </div>
          </div>
        </div>
      </div>
      <div className="col-lg-3 col-md-6 col-sm-6">
        <div className="icon-bx-wraper">
          <div className="icon-content" onClick={(e) => handleClickSearch({jobField: 'dịch vụ'})}>
            <div className="icon-md text-primary m-b20">
              <i className="ti-tablet"></i>
            </div>
            <Link to="#" className="dez-tilte">
              Dịch vụ
            </Link>
            <p className="m-a0">198 vị trí</p>
            <div className="rotate-icon">
              <i className="ti-tablet"></i>
            </div>
          </div>
        </div>
      </div>
      <div className="col-lg-3 col-md-6 col-sm-6">
        <div className="icon-bx-wraper">
          <div className="icon-content" onClick={(e) => handleClickSearch({jobField: 'bất động sản'})}>
            <div className="icon-md text-primary m-b20">
              <i className="ti-camera"></i>
            </div>
            <Link to="#" className="dez-tilte">
              Bất động sản
            </Link>
            <p className="m-a0">198 vị trí</p>
            <div className="rotate-icon">
              <i className="ti-camera"></i>
            </div>
          </div>
        </div>
      </div>
      <div className="col-lg-3 col-md-6 col-sm-6">
        <div className="icon-bx-wraper">
          <div className="icon-content" onClick={(e) => handleClickSearch({jobField: 'khác'})}>
            <div className="icon-md text-primary m-b20">
              <i className="ti-panel"></i>
            </div>
            <Link to="#" className="dez-tilte">
              Khác
            </Link>
            <p className="m-a0">198 vị trí</p>
            <div className="rotate-icon">
              <i className="ti-panel"></i>
            </div>
          </div>
        </div>
      </div>
      <div className="col-lg-12 text-center m-t30">
        <button className="site-button radius-xl">Xem toàn bộ</button>
      </div>
    </div>
  );
}

export default Jobcategories;
