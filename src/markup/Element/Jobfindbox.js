import { AutoComplete } from "antd";
import { useFormik } from "formik";
import React, { Component, useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getAll } from "../../services/ProvinceService/ProvinceService";
import { getAllJobsAction } from "../../store/actions/Job/JobsActions";
const Jobfindbox = () => {
  const dispatch = useDispatch();
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
  const options = [
    {
      value: "Burns Bay Road",
    },
    {
      value: "Downing Street",
    },
    {
      value: "Wall Street",
    },
  ];
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
      getAll("province", "")
        .then((res) => {
          setProvinceList(res.data.docs);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    // Placeholder Animation End
  }, []);
  const initDataSearch = useSelector((state)=> state.JobReducer.search)
  const formik = useFormik({
    initialValues: {
      provinceId: null,
      search: null,
      jobField: null,
    },

    onSubmit: (values) => {
      const action = getAllJobsAction(
        1,
        values
      );
      dispatch(action);
    },
  });
  return (
    <div className="section-full browse-job-find">
      <div className="container">
        <div className="find-job-bx">
          <form onSubmit={formik.handleSubmit} className="dezPlaceAni">
            <div className="row">
              <div className="col-lg-4 col-md-6">
                <div className="form-group">
                  <label>Chức vụ, Từ khóa</label>
                  <div className="input-group">
                    <Form.Control
                      options={options}
                      filterOption={(inputValue, option) =>
                        option.value
                          .toUpperCase()
                          .indexOf(inputValue.toUpperCase()) !== -1
                      }
                      name="search"
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
                      <option>Chọn tỉnh</option>
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
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-6">
                <div className="form-group">
                  <Form.Control
                    as="select"
                    custom
                    className="select-btn p-2"
                    name="jobField"
                    onChange={formik.handleChange}
                    value={formik.values.jobField}
                  >
                    <option>Chọn ngành</option>
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
                <button type="submit" className="site-button btn-block">
                  Tìm kiếm
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Jobfindbox;
