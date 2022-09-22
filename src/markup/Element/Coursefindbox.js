import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { getAllCourseInfosAction, setSearchCourseInfo } from "../../store/actions/Course/CourseActions";

function Coursefindbox() {
  const dispatch = useDispatch();
  const history = useHistory();
  const formik = useFormik({
    initialValues: {
      type: null,
      search: null,
    },
    onSubmit: (values) => {
      const action = setSearchCourseInfo(values);
      dispatch(action);
      history.push(`/courses`);
    },
  });
  const branchList = [
    {
      key: "nn",
      value: "ngoại ngữ",
      name: "Ngoại ngữ",
    },
    {
      key: "kns",
      value: "kỹ năng sống",
      name: "Kỹ năng sống",
    },
    {
      key: "knm",
      value: "kỹ năng mềm",
      name: "Kỹ năng mềm",
    },
    {
      key: "knnn",
      value: "kỹ năng nghề nghiệp",
      name: "Kỹ năng nghề nghiệp",
    },
  ];
  return (
    <div className="section-full browse-job-find">
      <div className="container">
        <div className="find-job-bx">
          <form onSubmit={formik.handleSubmit} className="dezPlaceAni">
            <div className="row">
              <div className="col-lg-5 col-md-6">
                <div className="form-group">
                  <div className="input-group">
                    <input
                      type="text"
                      name="search"
                      className="form-control"
                      onChange={formik.handleChange}
                      value={formik.values.search}
                      placeholder="Tên Khóa học"
                    />
                    <div className="input-group-append">
                      <span className="input-group-text">
                        <i className="fa fa-search"></i>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              {/* <div className="col-lg-3 col-md-6">
									<div className="form-group">
										<label>Thành phố</label>
										<div className="input-group">
											<input type="text" className="form-control" placeholder="" />
											<div className="input-group-append">
											  <span className="input-group-text"><i className="fa fa-map-marker"></i></span>
											</div>
										</div>
									</div>
								</div> */}
              <div className="col-lg-5 col-md-6">
                <div className="form-group">
                  <Form.Control
                    as="select"
                    custom
                    className="select-btn"
                    name="type"
                    onChange={formik.handleChange}
                    value={formik.values.type}                  
                  >
                    <option key='blankChoice' hidden value>Chọn ngành</option>
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
}
export default Coursefindbox;
