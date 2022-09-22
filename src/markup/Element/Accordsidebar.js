import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Accordion, Card } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { setSearchInfo } from "../../store/actions/Job/JobsActions";
function Accordsidebar() {
  const dispatch = useDispatch();
  const [radioExp, setRadioExp] = useState();
  const [radioSalary, setRadioSalary] = useState();
  const [radioType, setRadioType] = useState();
  const expList = [
    {
      id: "duoi3thang",
      value: "dưới 3 tháng",
      label: "Dưới 3 tháng",
    },
    {
      id: "3to6",
      value: "3 tháng - 6 tháng",
      label: "3 tháng - 6 tháng",
    },
    {
      id: "6to1y",
      value: "6 tháng - 1 năm",
      label: "Dưới 1 năm",
    },
    {
      id: "12y",
      value: "2 năm",
      label: "2 Năm",
    },
    {
      id: "23y",
      value: "3 năm",
      label: "3 Năm",
    },
    {
      id: "34y",
      value: "4 năm",
      label: "4 Năm",
    },
    {
      id: "45y",
      value: "5 năm",
      label: "5 Năm",
    },
  ];
  const salaryList = [
    {
      id: "35",
      value: "3000000-5000000",
      label: "3 - 5",
    },
    {
      id: "58",
      value: "5000000-8000000",
      label: "5 - 8",
    },
    {
      id: "815",
      value: "8000000-15000000",
      label: "8 - 15",
    },
    {
      id: "1530",
      value: "15000000-30000000",
      label: "15 - 30",
    },
    {
      id: "300",
      value: "30000000-500000000",
      label: "Trên 30",
    },
  ];
  const typeJobList = [
    {
      id: "parttime",
      value: "PARTTIME",
      label: "PARTTIME",
    },
    {
      id: "fulltime",
      value: "FULLTIME",
      label: "FULLTIME",
    },
  ];
  const handleChangeExp = (value) => {
    setRadioExp(value);
    const action = setSearchInfo({ timeExperience: value });
    dispatch(action);
  };
  const handleChangeSalary = (value) => {
    setRadioSalary(value);
    const action = setSearchInfo({ salaryRange: value });
    dispatch(action);
  };
  const handleChangeType = (value) => {
    setRadioType(value);
    const action = setSearchInfo({ type: value });
    dispatch(action);
  };
  return (
    <div className="col-xl-3 col-lg-4 col-md-5 m-b30">
      <aside id="accordion1" className="sticky-top sidebar-filter bg-white">
        <Accordion defaultActiveKey="0">
          <h6 className="title">
            <i className="fa fa-sliders m-r5"></i> Bộ lọc{" "}
            <Link
              to={"#"}
              className="font-12 float-right"
              onClick={() => {
                handleChangeExp(null);
                handleChangeSalary(null);
                handleChangeType(null);
              }}
            >
              Đặt lại
            </Link>
          </h6>

          {/* <Accordion.Toggle as={Card} eventKey="0">
						<div className="acod-head">
							<h6 className="acod-title">
								<Link data-toggle="collapse" to="#companies">Công ty</Link>
							</h6>
						</div>
					</Accordion.Toggle>

					<Accordion.Collapse eventKey="0">
						<div id="companies" className="acod-body collapse show">
							<div className="acod-content">
								<div className="custom-control custom-checkbox">
									<input className="custom-control-input" id="companies1" type="checkbox" name="checkbox-companies" />
									<label className="custom-control-label" htmlFor="companies1">Job Mirror Consultancy <span>(50)</span> </label>
								</div>
								<div className="custom-control custom-checkbox">
									<input className="custom-control-input" id="companies2" type="checkbox" name="checkbox-companies" />
									<label className="custom-control-label" htmlFor="companies2">Engineering Group <span>(80)</span> </label>
								</div>
								<div className="custom-control custom-checkbox">
									<input className="custom-control-input" id="companies3" type="checkbox" name="checkbox-companies" />
									<label className="custom-control-label" htmlFor="companies3">Electric Co. <span>(235)</span> </label>
								</div>
								<div className="custom-control custom-checkbox">
									<input className="custom-control-input" id="companies4" type="checkbox" name="checkbox-companies" />
									<label className="custom-control-label" htmlFor="companies4">Telecom industry <span>(568)</span></label>
								</div>
								<div className="custom-control custom-checkbox">
									<input className="custom-control-input" id="companies5" type="checkbox" name="checkbox-companies" />
									<label className="custom-control-label" htmlFor="companies5">Safety/ Health <span>(798)</span></label>
								</div>
							</div>
						</div>
					</Accordion.Collapse> */}

          <Accordion.Toggle as={Card} eventKey="1">
            <div className="acod-head">
              <h6 className="acod-title">
                <a
                  data-toggle="collapse"
                  href="#experience"
                  className="collapsed"
                >
                  Kinh nghiệm
                </a>
              </h6>
            </div>
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="1">
            <div id="experience" className="acod-body collapse show">
              <div className="acod-content">
                {expList &&
                  expList.map((item, index) => {
                    return (
                      <div
                        className="custom-control custom-radio"
                        onChange={(e) => handleChangeExp(e.target.value)}
                      >
                        <input
                          className="custom-control-input"
                          id={item.id}
                          value={item.value}
                          type="radio"
                          name="radio-years"
                          checked={item.value === radioExp}
                        />
                        <label
                          className="custom-control-label"
                          htmlFor={item.id}
                        >
                          {item.label}{" "}
                        </label>
                      </div>
                    );
                  })}
              </div>
            </div>
          </Accordion.Collapse>

          <Accordion.Toggle as={Card} eventKey="2">
            <div className="acod-head">
              <h6 className="acod-title">
                <a data-toggle="collapse" href="#salary" className="collapsed">
                  Lương
                </a>
              </h6>
            </div>
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="2">
            <div id="salary" className="acod-body collapse show">
              <div className="acod-content">
                {salaryList &&
                  salaryList.map((item, index) => {
                    return (
                      <div
                        className="custom-control custom-radio"
                        onChange={(e) => handleChangeSalary(e.target.value)}
                      >
                        <input
                          className="custom-control-input"
                          id={item.id}
                          value={item.value}
                          type="radio"
                          name="radio-currency"
                          checked={item.value === radioSalary}
                        />
                        <label
                          className="custom-control-label"
                          htmlFor={item.id}
                        >
                          {item.label}
                          <span> Triệu đồng</span>{" "}
                        </label>
                      </div>
                    );
                  })}
              </div>
            </div>
          </Accordion.Collapse>
          <Accordion.Toggle as={Card} eventKey="3">
            <div className="acod-head">
              <h6 className="acod-title">
                <a
                  data-toggle="collapse"
                  href="#job-function"
                  className="collapsed"
                >
                  Công việc
                </a>
              </h6>
            </div>
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="3">
            <div id="job-function" className="acod-body collapse show">
              <div className="acod-content">
                {typeJobList &&
                  typeJobList.map((item, index) => {
                    return (
                      <div
                        className="custom-control custom-radio"
                        onChange={(e) => handleChangeType(e.target.value)}
                      >
                        <input
                          className="custom-control-input"
                          id={item.id}
                          value={item.value}
                          type="radio"
                          name="radio-typeJob"
                          checked={item.value === radioType}
                        />
                        <label
                          className="custom-control-label"
                          htmlFor={item.id}
                        >
                          {item.label}{" "}
                        </label>
                      </div>
                    );
                  })}
              </div>
            </div>
          </Accordion.Collapse>
        </Accordion>
      </aside>
    </div>
  );
}
export default Accordsidebar;
