import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Accordion, Card } from "react-bootstrap";
import { getAll } from "../../services/ProvinceService/ProvinceService";
import { useDispatch } from "react-redux";
import { setSearchCourseInfo } from "../../store/actions/Course/CourseActions";
function Accordsidebar() {
  const dispatch = useDispatch();
  const [radioDis, setRadioDis] = useState();
  const [radioPrice, setRadioPrice] = useState();
  const [listDis, setListDis] = useState();
  const [listPrice, setListPrice] = useState([
    {
      id: "duoi1",
      value: "0-1000000",
      label: "Dưới 1.000.000 VNĐ",
    },
    {
      id: "motden3",
      value: "1000000-3000000",
      label: "Từ 1.000.000 đến 3.000.000 VNĐ",
    },
    {
      id: "3den10",
      value: "3000000-10000000",
      label: "Từ 3.000.000 đến 10.000.000",
    },
    {
      id: "max",
      value: "10000000-500000000",
      label: "Trên 10.000.000 VNĐ",
    },
  ]);
  const getListDistrict = (idProvince) => {
    getAll("province", "")
      .then((res) => {
        setListDis(res.data.docs);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleChangeDis = (value) => {
    setRadioDis(value);
    const action = setSearchCourseInfo({ provinceId: value });
    dispatch(action);
  };
  const handleChangePrice = (value) => {
    setRadioPrice(value);
    const action = setSearchCourseInfo({ costRange: value });
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
                handleChangeDis(null);
                handleChangePrice(null);
              }}
            >
              Đặt lại
            </Link>
          </h6>

          <Accordion.Toggle as={Card} eventKey="0">
            <div className="acod-head">
              <h6 className="acod-title">
                <Link data-toggle="collapse" to="#companies">
                  Học phí
                </Link>
              </h6>
            </div>
          </Accordion.Toggle>

          <Accordion.Collapse eventKey="0">
            <div id="companies" className="acod-body collapse show">
              <div className="acod-content">
                {listPrice &&
                  listPrice.map((item, index) => {
                    return (
                      <div
                        className="custom-control custom-radio"
                        onChange={(e) => handleChangePrice(e.target.value)}
                      >
                        <input
                          className="custom-control-input"
                          id={item.id}
                          type="radio"
                          value={item.value}
                          name="radio-price"
                          checked={item.value === radioPrice}
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

          <Accordion.Toggle as={Card} eventKey="1" onClick={getListDistrict}>
            <div className="acod-head">
              <h6 className="acod-title">
                <a
                  data-toggle="collapse"
                  href="#experience"
                  className="collapsed"
                >
                  Địa điểm
                </a>
              </h6>
            </div>
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="1">
            <div id="experience" className="acod-body collapse show">
              <div className="acod-content">
                {listDis &&
                  listDis.map((item, index) => {
                    return (
                      <div
                        className="custom-control custom-radio"
                        onChange={(e) => handleChangeDis(e.target.value)}
                      >
                        <input
                          className="custom-control-input"
                          id={item.id}
                          type="radio"
                          value={item.id}
                          name="radio-district"
                          checked={item.id === radioDis}
                        />
                        <label
                          className="custom-control-label"
                          htmlFor={item.id}
                        >
                          {item.name}{" "}
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
