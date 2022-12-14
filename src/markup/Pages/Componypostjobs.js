import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Header from "./../Layout/Header";
import Footer from "./../Layout/Footer";
import { Form } from "react-bootstrap";
import { getAll } from "../../services/ProvinceService/ProvinceService";
import { createJobs } from "../../services/JobServices/JobServices";
import { useSelector } from "react-redux";
import swal from "sweetalert";
import { BASE_URL } from "../../config/BASE_URL";
import { InputNumber, Modal } from "antd";

function Componypostjobs() {
  const dispatch = useDispatch();
  const { user, accessToken } = useSelector((state) => state.auth.auth);
  const [listProvince, setListProvince] = useState([]);
  const [listDistrict, setListDistrict] = useState([]);
  const [listWard, setListWard] = useState([]);
  const [valueSubmit, setValueSubmit] = useState({
    title: "",
    introduction: "",
    description: "",
    address: {
      detailAddress: "",
      provinceId: "",
      districtId: "",
      wardId: "",
    },
    minSalary: "",
    maxSalary: "",
    tel: "",
    requirement: [],
    timeExperience: "",
    type: "",
    jobStartDate: "",
    jobApplyDeadline: "",
  });

  const [errors, setErrors] = useState({
    title: "",
    introduction: "",
    description: "",
    detailAddress: "",
    provinceId: "",
    districtId: "",
    wardId: "",
    minSalary: "",
    maxSalary: "",
    tel: "",
    requirement: "",
    timeExperience: "",
    type: "",
    jobStartDate: "",
    jobApplyDeadline: "",
  });

  const onSubmit = () => {
    if (
      errors.title === "" &&
      errors.introduction === "" &&
      errors.description === "" &&
      errors.detailAddress === "" &&
      errors.provinceId === "" &&
      errors.districtId === "" &&
      errors.wardId === "" &&
      errors.minSalary === "" &&
      errors.maxSalary === "" &&
      errors.tel === "" &&
      errors.requirement === "" &&
      errors.timeExperience === "" &&
      errors.type === "" &&
      errors.jobStartDate === "" &&
      errors.jobApplyDeadline === ""
    ) {
      createJobs(valueSubmit, accessToken?.token)
        .then((response) => {
          if (response.data.message === "SUCCESS") {
            swal(
              "B??i ????ng c???a b???n ???? ??c g???i cho qu???n tr??? vi??n",
              "vui l??ng ch??? duy???t",
              "success"
            );
            setValueSubmit({
              title: "",
              introduction: "",
              description: "",
              address: {
                detailAddress: "",
                provinceId: "",
                districtId: "",
                wardId: "",
              },
              minSalary: "",
              maxSalary: "",
              tel: "",
              requirement: [],
              timeExperience: "",
              type: "",
              jobStartDate: "",
              jobApplyDeadline: "",
            });
          } else {
            swal(
              "B??i ????ng kh??ng th??? th???c hi???n",
              "Vui l??ng ki???m tra nh???p ????? th??ng tin v?? th??? l???i",
              "error"
            );
          }
        })
        .catch((error) => {
          swal(
            "B??i ????ng kh??ng th??? th???c hi???n",
            "Vui l??ng ki???m tra nh???p ????? th??ng tin v?? th??? l???i",
            "error"
          );
          console.log(error);
        });
    } else if (
      errors.title !== "" &&
      errors.introduction !== "" &&
      errors.description !== "" &&
      errors.detailAddress !== "" &&
      errors.provinceId !== "" &&
      errors.districtId !== "" &&
      errors.wardId !== "" &&
      errors.minSalary !== "" &&
      errors.maxSalary !== "" &&
      errors.tel !== "" &&
      errors.requirement !== "" &&
      errors.timeExperience !== "" &&
      errors.type !== "" &&
      errors.jobStartDate !== "" &&
      errors.jobApplyDeadline !== ""
    ) {
      swal(
        "B??i ????ng kh??ng th??? th???c hi???n",
        "Vui l??ng ki???m tra nh???p ????? th??ng tin v?? th??? l???i",
        "error"
      );
    }
  };

  const getListProvince = () => {
    getAll("province", "")
      .then((result) => {
        setListProvince(result.data.docs);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getListDistrict = (idProvince) => {
    getAll("district", idProvince)
      .then((result) => {
        setListDistrict(result.data.docs);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getListWard = (idDistrict) => {
    getAll("ward", idDistrict)
      .then((result) => {
        setListWard(result.data.docs);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getListProvince();
  }, []);
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
    <>
      <Header />
      <div className="page-content bg-white">
        <div className="content-block">
          <div className="section-full bg-white p-t50 p-b20">
            <div className="container">
              <div className="row">
                <div className="col-xl-3 col-lg-4 m-b30">
                  <div className="sticky-top">
                    <div className="candidate-info company-info">
                      <div className="candidate-detail text-center">
                        <div className="canditate-des">
                          <span
                            style={{ cursor: "pointer" }}
                            onClick={showModal}
                          >
                            {user?.avatarUrl?.indexOf("https://") === -1 ? (
                              <img
                                alt=""
                                src={`${BASE_URL}/${user?.avatarUrl}`}
                              />
                            ) : (
                              <img alt="" src={user?.avatarUrl} />
                            )}
                          </span>
                          <Modal
                            title="Avatar"
                            visible={isModalVisible}
                            onOk={handleOk}
                            onCancel={handleCancel}
                          >
                            {user?.avatarUrl?.indexOf("https://") === -1 ? (
                              <img
                                style={{ objectFit: "cover" }}
                                className="w-100 h-100"
                                alt=""
                                src={`${BASE_URL}/${user?.avatarUrl}`}
                              />
                            ) : (
                              <img
                                style={{ objectFit: "cover" }}
                                className="w-100 h-100"
                                alt=""
                                src={user?.avatarUrl}
                              />
                            )}
                          </Modal>
                        </div>
                        <div className="candidate-title">
                          <h4 className="m-b5">
                            <Link to={"#"}>{user?.fullCompanyName}</Link>
                          </h4>
                        </div>
                      </div>
                      <ul>
                        <li>
                          <Link to={"/company-profile"}>
                            <i className="fa fa-user-o" aria-hidden="true"></i>
                            <span>Th??ng tin c??ng ty</span>
                          </Link>
                        </li>
                        <li>
                          <Link to={"/company-post-jobs"} className="active">
                            <i
                              className="fa fa-file-text-o"
                              aria-hidden="true"
                            ></i>
                            <span>????ng b??i post</span>
                          </Link>
                        </li>
                        {/* <li><Link to={"/company-transactions"}>
													<i className="fa fa-random" aria-hidden="true"></i>
													<span>Transactions</span></Link></li> */}
                        <li>
                          <Link to={"/company-manage-job"}>
                            <i
                              className="fa fa-briefcase"
                              aria-hidden="true"
                            ></i>
                            <span>Qu???n l?? c??ng vi???c</span>
                          </Link>
                        </li>
                        <li>
                          <Link to={"/company-resume"}>
                            <i
                              className="fa fa-id-card-o"
                              aria-hidden="true"
                            ></i>
                            <span>Qu???n l?? CV</span>
                          </Link>
                        </li>
                        <li>
                          <Link to={"/company-survey"}>
                            <i
                              className="fa fa-bar-chart"
                              aria-hidden="true"
                            ></i>
                            <span>Kh???o s??t</span>
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="col-xl-9 col-lg-8 m-b30">
                  <div className="job-bx submit-resume">
                    <div className="job-bx-title clearfix">
                      <h5 className="font-weight-700 pull-left text-uppercase">
                        ????ng b??i vi???t tuy???n d???ng
                      </h5>
                      <Link
                        to={"/company-profile"}
                        className="site-button right-arrow button-sm float-right"
                      >
                        Back
                      </Link>
                    </div>
                    <form>
                      <div className="row">
                        <div className="col-lg-12 col-md-12">
                          <div className="form-group">
                            <label>T??n c??ng vi???c</label>
                            <input
                              onChange={(event) => {
                                if (event.target.value.trim() === "") {
                                  setErrors({
                                    ...errors,
                                    title: "Vui l??ng nh???p tr?????ng n??y !",
                                  });
                                } else {
                                  setErrors({ ...errors, title: "" });
                                }
                                setValueSubmit({
                                  ...valueSubmit,
                                  title: event.target.value,
                                });
                              }}
                              value={valueSubmit.title}
                              type="text"
                              className="form-control"
                              name="name"
                              placeholder="Nh???p t??n c??ng vi???c"
                            />
                            <p style={{ color: "red" }}>{errors.title}</p>
                          </div>
                        </div>
                        <div className="col-lg-12 col-md-12">
                          <div className="form-group">
                            <label>Gi???i thi???u c??ng vi???c</label>
                            <textarea
                              onChange={(event) => {
                                if (event.target.value.trim() === "") {
                                  setErrors({
                                    ...errors,
                                    introduction: "Vui l??ng nh???p tr?????ng n??y !",
                                  });
                                } else {
                                  setErrors({ ...errors, introduction: "" });
                                }
                                setValueSubmit({
                                  ...valueSubmit,
                                  introduction: event.target.value,
                                });
                              }}
                              value={valueSubmit.introduction}
                              placeholder="Nh???p gi???i thi???u c??ng vi???c"
                              type="text"
                              className="form-control tags_input"
                              name="tag"
                            />
                            <p style={{ color: "red" }}>
                              {errors.introduction}
                            </p>
                          </div>
                        </div>
                        <div className="col-lg-12 col-md-12">
                          <div className="form-group">
                            <label>M?? t??? c??ng vi???c</label>
                            <textarea
                              onChange={(event) => {
                                if (event.target.value.trim() === "") {
                                  setErrors({
                                    ...errors,
                                    description: "Vui l??ng nh???p tr?????ng n??y !",
                                  });
                                } else {
                                  setErrors({ ...errors, description: "" });
                                }
                                setValueSubmit({
                                  ...valueSubmit,
                                  description: event.target.value,
                                });
                              }}
                              value={valueSubmit.description}
                              placeholder="Nh???p m?? t??? c??ng vi???c"
                              type="text"
                              className="form-control tags_input"
                              name="tag"
                            />
                            <p style={{ color: "red" }}>{errors.description}</p>
                          </div>
                        </div>
                        <div className="col-lg-12 col-md-12">
                          <div className="form-group">
                            <label>Y??u c???u c??ng vi???c</label>
                            <textarea
                              onChange={(event) => {
                                if (event.target.value.trim() === "") {
                                  setErrors({
                                    ...errors,
                                    requirement: "Vui l??ng nh???p tr?????ng n??y !",
                                  });
                                } else {
                                  setErrors({ ...errors, requirement: "" });
                                }
                                setValueSubmit({
                                  ...valueSubmit,
                                  requirement: [event.target.value],
                                });
                              }}
                              value={valueSubmit.requirement[0]}
                              placeholder="Nh???p y??u c???u c??ng vi???c"
                              type="text"
                              className="form-control tags_input"
                              name="tag"
                            />
                            <p style={{ color: "red" }}>{errors.requirement}</p>
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                          <div className="form-group">
                            <label>Lo???i h??nh c??ng vi???c</label>
                            <Form.Control
                              onChange={(event) => {
                                if (event.target.value === "") {
                                  setErrors({
                                    ...errors,
                                    type: "Vui l??ng nh???p tr?????ng n??y !",
                                  });
                                } else {
                                  setErrors({ ...errors, type: "" });
                                }
                                setValueSubmit({
                                  ...valueSubmit,
                                  type: event.target.value,
                                });
                              }}
                              value={valueSubmit.type}
                              as="select"
                              custom
                              className="custom-select"
                              name="type"
                            >
                              <option value="">Ch???n lo???i h??nh c??ng vi???c</option>
                              <option value="FULLTIME">Full Time</option>
                              <option value="PARTTIME">Part Time</option>
                              <option value="INTERNSHIP">Internship</option>
                              <option value="FREELANCE">Freelance</option>
                            </Form.Control>
                            <p style={{ color: "red" }}>{errors.type}</p>
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                          <div className="form-group">
                            <label>Kinh nghi???m</label>
                            <Form.Control
                              onChange={(event) => {
                                if (event.target.value === "") {
                                  setErrors({
                                    ...errors,
                                    timeExperience:
                                      "Vui l??ng nh???p tr?????ng n??y !",
                                  });
                                } else {
                                  setErrors({ ...errors, timeExperience: "" });
                                }
                                setValueSubmit({
                                  ...valueSubmit,
                                  timeExperience: event.target.value,
                                });
                              }}
                              value={valueSubmit.timeExperience}
                              as="select"
                              custom
                              className="custom-select"
                              name="exp"
                            >
                              <option value="">
                                Ch???n th???i gian kinh nghi???m
                              </option>
                              <option value="D?????i 3 th??ng">D?????i 3 th??ng</option>
                              <option value="3 th??ng - 6 th??ng">
                                3 th??ng - 6 th??ng
                              </option>
                              <option value="6 th??ng - 1 n??m">
                                6 th??ng - 1 n??m
                              </option>
                              <option value="2 N??m">2 N??m</option>
                              <option value="3 N??m">3 N??m</option>
                              <option value="4 N??m">4 N??m</option>
                              <option value="5 N??m">5 N??m</option>
                              <option value="Tr??n 5 N??m">Tr??n 5 N??m</option>
                            </Form.Control>
                            <p style={{ color: "red" }}>
                              {errors.timeExperience}
                            </p>
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                          <div className="form-group">
                            <label>M???c l????ng t???i thi???u (VN??):</label>
                            <InputNumber
                              name="desiredCareer.expectedSalary"
                              formatter={(value) =>
                                ` ${value}`.replace(
                                  /\B(?=(\d{3})+(?!\d))/g,
                                  "."
                                )
                              }
                              parser={(value) =>
                                value.replace(/[A-Z]|[a-z]|[$ ]|\.+/g, "")
                              }
                              onChange={(value) => {
                                if (!value) {
                                  setErrors({
                                    ...errors,
                                    minSalary: "Vui l??ng nh???p tr?????ng n??y !",
                                  });
                                }
                                if (value) {
                                  if (valueSubmit.maxSalary === "") {
                                    setErrors({ ...errors, minSalary: "" });
                                  } else if (valueSubmit.maxSalary !== "") {
                                    if (
                                      value > valueSubmit.maxSalary ||
                                      value === valueSubmit.minSalary
                                    ) {
                                      setErrors({
                                        ...errors,
                                        minSalary:
                                          "M???c l????ng t???i thi???u ph???i nh??? h??n t???i ??a !",
                                      });
                                    } else if (value < valueSubmit.minSalary) {
                                      setErrors({
                                        ...errors,
                                        minSalary: "",
                                        maxSalary: "",
                                      });
                                    }
                                  }
                                }
                                setValueSubmit({
                                  ...valueSubmit,
                                  minSalary: value,
                                });
                              }}
                              value={valueSubmit.minSalary}
                              className="w-100 border-0 clearfix font-13 createCv__salary"
                              placeholder="
                           10 000 000 VN??"
                            />
                            <p style={{ color: "red" }}>{errors.minSalary}</p>
                          </div>
                        </div>

                        <div className="col-lg-6 col-md-6">
                          <div className="form-group">
                            <label>M???c l????ng t???i ??a (VN??):</label>

                            <InputNumber
                              name="desiredCareer.expectedSalary"
                              formatter={(value) =>
                                ` ${value}`.replace(
                                  /\B(?=(\d{3})+(?!\d))/g,
                                  "."
                                )
                              }
                              parser={(value) =>
                                value.replace(/[A-Z]|[a-z]|[$ ]|\.+/g, "")
                              }
                              onChange={(value) => {
                                if (!value) {
                                  setErrors({
                                    ...errors,
                                    maxSalary: "Vui l??ng nh???p tr?????ng n??y !",
                                  });
                                }
                                if (value) {
                                  if (valueSubmit.minSalary === "") {
                                    setErrors({ ...errors, maxSalary: "" });
                                  } else if (valueSubmit.minSalary !== "") {
                                    if (
                                      value < valueSubmit.minSalary ||
                                      value === valueSubmit.minSalary
                                    ) {
                                      setErrors({
                                        ...errors,
                                        maxSalary:
                                          "M???c l????ng t???i thi???u ph???i nh??? h??n t???i ??a !",
                                      });
                                    } else if (value > valueSubmit.minSalary) {
                                      setErrors({
                                        ...errors,
                                        minSalary: "",
                                        maxSalary: "",
                                      });
                                    }
                                  }
                                }
                                setValueSubmit({
                                  ...valueSubmit,
                                  maxSalary: value,
                                });
                              }}
                              value={valueSubmit.maxSalary}
                              className="w-100 border-0 clearfix font-13 createCv__salary"
                              placeholder="
                           10 000 000 VN??"
                            />
                            <p style={{ color: "red" }}>{errors.maxSalary}</p>
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                          <div className="form-group">
                            <label>Th???i gian b???t ?????u l??m vi???c:</label>
                            <input
                              onChange={(event) => {
                                if (event.target.value === "") {
                                  setErrors({
                                    ...errors,
                                    jobStartDate: "Vui l??ng nh???p tr?????ng n??y !",
                                  });
                                } else if (event.target.value !== "") {
                                  if (valueSubmit.jobApplyDeadline === "") {
                                    setErrors({ ...errors, jobStartDate: "" });
                                  } else if (
                                    valueSubmit.jobApplyDeadline !== ""
                                  ) {
                                    if (
                                      new Date(event.target.value) <
                                        new Date(
                                          valueSubmit.jobApplyDeadline
                                        ) ||
                                      new Date(event.target.value) ===
                                        new Date(valueSubmit.jobApplyDeadline)
                                    ) {
                                      setErrors({
                                        ...errors,
                                        jobStartDate:
                                          "Ng??y b???t ?????u l??m vi???c ph???i sau h???n ???ng tuy???n",
                                      });
                                    } else if (
                                      new Date(event.target.value) >
                                      new Date(valueSubmit.jobApplyDeadline)
                                    ) {
                                      setErrors({
                                        ...errors,
                                        jobStartDate: "",
                                        jobApplyDeadline: "",
                                      });
                                    }
                                  }
                                }
                                setValueSubmit({
                                  ...valueSubmit,
                                  jobStartDate: event.target.value,
                                });
                              }}
                              value={valueSubmit.jobStartDate}
                              type="date"
                              className="form-control"
                              placeholder="Vd: 19/05/2022"
                            />
                            <p style={{ color: "red" }}>
                              {errors.jobStartDate}
                            </p>
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                          <div className="form-group">
                            <label>H???n ???ng tuy???n:</label>
                            <input
                              onChange={(event) => {
                                if (event.target.value === "") {
                                  setErrors({
                                    ...errors,
                                    jobApplyDeadline:
                                      "Vui l??ng nh???p tr?????ng n??y !",
                                  });
                                } else if (event.target.value !== "") {
                                  if (valueSubmit.jobStartDate === "") {
                                    setErrors({
                                      ...errors,
                                      jobApplyDeadline: "",
                                    });
                                  } else if (valueSubmit.jobStartDate !== "") {
                                    if (
                                      new Date(event.target.value) >
                                        new Date(valueSubmit.jobStartDate) ||
                                      new Date(event.target.value) ===
                                        new Date(valueSubmit.jobStartDate)
                                    ) {
                                      setErrors({
                                        ...errors,
                                        jobApplyDeadline:
                                          "Ng??y b???t ?????u l??m vi???c ph???i sau h???n ???ng tuy???n",
                                      });
                                    } else if (
                                      new Date(event.target.value) <
                                      new Date(valueSubmit.jobStartDate)
                                    ) {
                                      setErrors({
                                        ...errors,
                                        jobStartDate: "",
                                        jobApplyDeadline: "",
                                      });
                                    }
                                  }
                                }
                                setValueSubmit({
                                  ...valueSubmit,
                                  jobApplyDeadline: event.target.value,
                                });
                              }}
                              value={valueSubmit.jobApplyDeadline}
                              type="date"
                              className="form-control"
                              placeholder="Vd: 25/05/2022"
                            />
                            <p style={{ color: "red" }}>
                              {errors.jobApplyDeadline}
                            </p>
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                          <div className="form-group">
                            <label>S??? ??i???n tho???i li??n h???</label>
                            <input
                              onKeyDown={(event) => {
                                var invalidChars = ["-", "+", "."];
                                if (invalidChars.includes(event.key)) {
                                  event.preventDefault();
                                }
                              }}
                              onChange={(event) => {
                                const phoneRegExp =
                                  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
                                if (event.target.value.trim() === "") {
                                  setErrors({
                                    ...errors,
                                    tel: "Vui l??ng nh???p tr?????ng n??y !",
                                  });
                                } else if (
                                  !event.target.value.match(phoneRegExp) ||
                                  event.target.value.trim().length < 10
                                ) {
                                  setErrors({
                                    ...errors,
                                    tel: "Vui l??ng nh???p ????ng ?????nh d???ng s??? ??i???n tho???i !",
                                  });
                                } else {
                                  setErrors({ ...errors, tel: "" });
                                }
                                setValueSubmit({
                                  ...valueSubmit,
                                  tel: event.target.value,
                                });
                              }}
                              value={valueSubmit.tel}
                              placeholder="Nh???p s??? ??i???n tho???i li??n h???"
                              type="number"
                              className="form-control tags_input"
                              name="tag"
                            />
                            <p style={{ color: "red" }}>{errors.tel}</p>
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                          <div className="form-group">
                            <label>T???nh / Th??nh ph???</label>
                            <Form.Control
                              onChange={(event) => {
                                if (event.target.value === "") {
                                  setErrors({
                                    ...errors,
                                    provinceId: "Vui l??ng nh???p tr?????ng n??y !",
                                  });
                                } else {
                                  setErrors({ ...errors, provinceId: "" });
                                }
                                setValueSubmit({
                                  ...valueSubmit,
                                  address: {
                                    ...valueSubmit.address,
                                    provinceId: event.target.value,
                                    districtId: "",
                                  },
                                });
                                getListDistrict(event.target.value);
                              }}
                              value={valueSubmit.address.provinceId}
                              as="select"
                              custom
                              className="custom-select"
                              name="region"
                            >
                              <option value="">Ch???n t???nh / th??nh ph???</option>
                              {listProvince?.map((province, index) => {
                                return (
                                  <option value={province?.id} key={index}>
                                    {province?.name}
                                  </option>
                                );
                              })}
                              <p style={{ color: "red" }}>
                                {errors.provinceId}
                              </p>
                            </Form.Control>
                          </div>
                        </div>
                        {valueSubmit.address.provinceId !== "" && (
                          <div className="col-lg-6 col-md-6">
                            <div className="form-group">
                              <label>Qu???n / Huy???n</label>
                              <Form.Control
                                onChange={(event) => {
                                  if (event.target.value === "") {
                                    setErrors({
                                      ...errors,
                                      districtId: "Vui l??ng nh???p tr?????ng n??y !",
                                    });
                                  } else {
                                    setErrors({ ...errors, districtId: "" });
                                  }
                                  setValueSubmit({
                                    ...valueSubmit,
                                    address: {
                                      ...valueSubmit.address,
                                      districtId: event.target.value,
                                    },
                                  });
                                  getListWard(event.target.value);
                                }}
                                value={valueSubmit.address.districtId}
                                as="select"
                                custom
                                className="custom-select"
                                name="region"
                              >
                                <option value="">Ch???n qu???n / huy???n</option>
                                {listDistrict?.map((district, index) => {
                                  return (
                                    <option value={district.id} key={index}>
                                      {district.name}
                                    </option>
                                  );
                                })}
                                <p style={{ color: "red" }}>
                                  {errors.districtId}
                                </p>
                              </Form.Control>
                            </div>
                          </div>
                        )}

                        {valueSubmit.address.districtId !== "" && (
                          <div className="col-lg-6 col-md-6">
                            <div className="form-group">
                              <label>Ph?????ng / X??</label>
                              <Form.Control
                                onChange={(event) => {
                                  if (event.target.value === "") {
                                    setErrors({
                                      ...errors,
                                      wardId: "Vui l??ng nh???p tr?????ng n??y !",
                                    });
                                  } else {
                                    setErrors({ ...errors, wardId: "" });
                                  }
                                  setValueSubmit({
                                    ...valueSubmit,
                                    address: {
                                      ...valueSubmit.address,
                                      wardId: event.target.value,
                                    },
                                  });
                                }}
                                value={valueSubmit.address.wardId}
                                as="select"
                                custom
                                className="custom-select"
                                name="region"
                              >
                                <option value="">Ch???n ph?????ng / x??</option>
                                {listWard?.map((ward, index) => {
                                  return (
                                    <option value={ward.id} key={index}>
                                      {ward.name}
                                    </option>
                                  );
                                })}
                                <p style={{ color: "red" }}>{errors.wardId}</p>
                              </Form.Control>
                            </div>
                          </div>
                        )}
                        <div className="col-lg-12 col-md-12">
                          <div className="form-group">
                            <label>?????a ch??? c??? th???</label>
                            <input
                              onChange={(event) => {
                                if (event.target.value.trim() === "") {
                                  setErrors({
                                    ...errors,
                                    detailAddress: "Vui l??ng nh???p tr?????ng n??y !",
                                  });
                                } else {
                                  setErrors({ ...errors, detailAddress: "" });
                                }
                                setValueSubmit({
                                  ...valueSubmit,
                                  address: {
                                    ...valueSubmit.address,
                                    detailAddress: event.target.value,
                                  },
                                });
                              }}
                              value={valueSubmit.address.detailAddress}
                              type="text"
                              className="form-control"
                              placeholder="S??? nh??, t??? d??n ph???"
                              name="location"
                            />
                            <p style={{ color: "red" }}>
                              {errors.detailAddress}
                            </p>
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          onSubmit();
                        }}
                        type="button"
                        className="site-button m-b30"
                      >
                        ????ng b??i vi???t
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
export default Componypostjobs;
