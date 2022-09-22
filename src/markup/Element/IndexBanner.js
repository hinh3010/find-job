import React, { Component, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Form } from "react-bootstrap";
import { getAll } from "../../services/ProvinceService/ProvinceService";
import {
  getAllJobsAction,
  setSearchInfo,
} from "../../store/actions/Job/JobsActions";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";

var bnr1 = require("./../../images/main-slider/slide2.jpg");
var bnr2 = require("./../../images/main-slider/slide1.jpg");

function IndexBanner() {
  const [provinceList, setProvinceList] = useState([]);
  const branchList = [
    {
      key: "cn",
      value: "công nghệ",
      name: "Công nghệ",
    },
    {
      key: "bdt",
      value: "bất động sản",
      name: "Bất động sản",
    },
    {
      key: "tc",
      value: "tài chính",
      name: "Tài chính",
    },
    {
      key: "bl",
      value: "bán lẻ",
      name: "Bán lẻ",
    },
    {
      key: "gd",
      value: "giáo dục",
      name: "Giáo dục",
    },
    {
      key: "gt",
      value: "giải trí",
      name: "Giải trí",
    },
    {
      key: "dv",
      value: "dịch vụ",
      name: "Dịch vụ",
    },
    {
      key: "khac",
      value: "khác",
      name: "Khác",
    },
  ];
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    var i = 0;

    // Placeholder Animation Start
    var inputSelector = document.querySelectorAll("input, textarea");

    for (i = 0; i < inputSelector.length; i++) {
      inputSelector[i].addEventListener("focus", function (event) {
        return this.parentElement.parentElement.classList.add("focused");
      });
    }

    for (i = 0; i < inputSelector.length; i++) {
      inputSelector[i].addEventListener("blur", function (event) {
        var inputValue = this.value;
        if (inputValue === "") {
          this.parentElement.parentElement.classList.remove("filled");
          this.parentElement.parentElement.classList.remove("focused");
        } else {
          this.parentElement.parentElement.classList.add("filled");
        }
      });
    }
    getAll("province", "")
      .then((res) => {
        setProvinceList(res.data.docs);
      })
      .catch((error) => {
        console.log(error);
      });

    // Placeholder Animation End
  }, []);
  const formik = useFormik({
    initialValues: {
      provinceId: null,
      search: null,
      jobField: null,
    },
    // values.search && values.provinceId
    //       ? `provinceId=${values.provinceId}&search=${values.search}`
    //       : values.provinceId && !values.search ?  `provinceId=${values.provinceId}` : !values.provinceId && values.search ? `&search=${values.search}`
    onSubmit: (values) => {
      const action = setSearchInfo(values);
      dispatch(action);
      history.push("/browse-job-list");
    },
  });
  return (
    <div
      className="dez-bnr-inr dez-bnr-inr-md"
      style={{ backgroundImage: `url("${bnr1}")` }}
    >
      <div className="container">
        <div className="dez-bnr-inr-entry align-m">
          <div className="find-job-bx">
            <Link to={"/browse-job"} className="site-button button-sm">
              Tìm kiếm việc làm, Cơ hội việc làm & Nghề nghiệp
            </Link>
            <h2>
              Tìm kiếm công việc <br />{" "}
              <span className="text-primary">50,000</span> Công việc đang chờ.
            </h2>
            <form onSubmit={formik.handleSubmit} className="dezPlaceAni">
              <div className="row">
                <div className="col-lg-4 col-md-6">
                  <div className="form-group">
                    <label>Tên công việc</label>
                    <div className="input-group">
                      <input
                        type="text"
                        name="search"
                        className="form-control"
                        onChange={formik.handleChange}
                        value={formik.values.search}
                      />
                      <div className="input-group-append">
                        <span className="input-group-text">
                          <i className="fa fa-search"></i>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-md-6">
                  <div className="form-group">
                    <div className="input-group">
                      <Form.Control
                        as="select"
                        custom
                        name="provinceId"
                        onChange={formik.handleChange}
                        value={formik.values.provinceId}
                        className="select-btn p-2"
                      >
                        {provinceList.map((item) => (
                          <option value={item.id} key={item.id}>
                            {item.name}
                          </option>
                        ))}
                        <div className="input-group-append">
                          <span className="input-group-text">
                            <i className="fa fa-map-marker"></i>
                          </span>
                        </div>
                      </Form.Control>
                      <div className="input-group-append">
                        <span className="input-group-text">
                          <i className="fa fa-map-marker"></i>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-md-6">
                  <div className="form-group">
                    <Form.Control
                      as="select"
                      custom
                      className="select-btn"
                      name="jobField"
                      onChange={formik.handleChange}
                      value={formik.values.jobField}
                    >
                      <option>Lĩnh vực</option>
                      {branchList.map((item) => {
                        return (
                          <option key={item.key} value={item.value}>
                            {item.name}
                          </option>
                        );
                      })}
                    </Form.Control>
                  </div>
                </div>
                <div className="col-lg-2 col-md-6">
                  <button
                    type="submit"
                    to="/browse-job"
                    className="site-button btn-block"
                  >
                    Tìm việc
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default IndexBanner;
