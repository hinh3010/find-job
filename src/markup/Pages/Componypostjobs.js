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
              "Bài đăng của bạn đã đc gửi cho quản trị viên",
              "vui lòng chờ duyệt",
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
              "Bài đăng không thể thực hiện",
              "Vui lòng kiểm tra nhập đủ thông tin và thử lại",
              "error"
            );
          }
        })
        .catch((error) => {
          swal(
            "Bài đăng không thể thực hiện",
            "Vui lòng kiểm tra nhập đủ thông tin và thử lại",
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
        "Bài đăng không thể thực hiện",
        "Vui lòng kiểm tra nhập đủ thông tin và thử lại",
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
                            <span>Thông tin công ty</span>
                          </Link>
                        </li>
                        <li>
                          <Link to={"/company-post-jobs"} className="active">
                            <i
                              className="fa fa-file-text-o"
                              aria-hidden="true"
                            ></i>
                            <span>Đăng bài post</span>
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
                            <span>Quản lý công việc</span>
                          </Link>
                        </li>
                        <li>
                          <Link to={"/company-resume"}>
                            <i
                              className="fa fa-id-card-o"
                              aria-hidden="true"
                            ></i>
                            <span>Quản lý CV</span>
                          </Link>
                        </li>
                        <li>
                          <Link to={"/company-survey"}>
                            <i
                              className="fa fa-bar-chart"
                              aria-hidden="true"
                            ></i>
                            <span>Khảo sát</span>
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
                        Đăng bài viết tuyển dụng
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
                            <label>Tên công việc</label>
                            <input
                              onChange={(event) => {
                                if (event.target.value.trim() === "") {
                                  setErrors({
                                    ...errors,
                                    title: "Vui lòng nhập trường này !",
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
                              placeholder="Nhập tên công việc"
                            />
                            <p style={{ color: "red" }}>{errors.title}</p>
                          </div>
                        </div>
                        <div className="col-lg-12 col-md-12">
                          <div className="form-group">
                            <label>Giới thiệu công việc</label>
                            <textarea
                              onChange={(event) => {
                                if (event.target.value.trim() === "") {
                                  setErrors({
                                    ...errors,
                                    introduction: "Vui lòng nhập trường này !",
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
                              placeholder="Nhập giới thiệu công việc"
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
                            <label>Mô tả công việc</label>
                            <textarea
                              onChange={(event) => {
                                if (event.target.value.trim() === "") {
                                  setErrors({
                                    ...errors,
                                    description: "Vui lòng nhập trường này !",
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
                              placeholder="Nhập mô tả công việc"
                              type="text"
                              className="form-control tags_input"
                              name="tag"
                            />
                            <p style={{ color: "red" }}>{errors.description}</p>
                          </div>
                        </div>
                        <div className="col-lg-12 col-md-12">
                          <div className="form-group">
                            <label>Yêu cầu công việc</label>
                            <textarea
                              onChange={(event) => {
                                if (event.target.value.trim() === "") {
                                  setErrors({
                                    ...errors,
                                    requirement: "Vui lòng nhập trường này !",
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
                              placeholder="Nhập yêu cầu công việc"
                              type="text"
                              className="form-control tags_input"
                              name="tag"
                            />
                            <p style={{ color: "red" }}>{errors.requirement}</p>
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                          <div className="form-group">
                            <label>Loại hình công việc</label>
                            <Form.Control
                              onChange={(event) => {
                                if (event.target.value === "") {
                                  setErrors({
                                    ...errors,
                                    type: "Vui lòng nhập trường này !",
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
                              <option value="">Chọn loại hình công việc</option>
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
                            <label>Kinh nghiệm</label>
                            <Form.Control
                              onChange={(event) => {
                                if (event.target.value === "") {
                                  setErrors({
                                    ...errors,
                                    timeExperience:
                                      "Vui lòng nhập trường này !",
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
                                Chọn thời gian kinh nghiệm
                              </option>
                              <option value="Dưới 3 tháng">Dưới 3 tháng</option>
                              <option value="3 tháng - 6 tháng">
                                3 tháng - 6 tháng
                              </option>
                              <option value="6 tháng - 1 năm">
                                6 tháng - 1 năm
                              </option>
                              <option value="2 Năm">2 Năm</option>
                              <option value="3 Năm">3 Năm</option>
                              <option value="4 Năm">4 Năm</option>
                              <option value="5 Năm">5 Năm</option>
                              <option value="Trên 5 Năm">Trên 5 Năm</option>
                            </Form.Control>
                            <p style={{ color: "red" }}>
                              {errors.timeExperience}
                            </p>
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                          <div className="form-group">
                            <label>Mức lương tối thiểu (VNĐ):</label>
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
                                    minSalary: "Vui lòng nhập trường này !",
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
                                          "Mức lương tối thiểu phải nhỏ hơn tối đa !",
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
                           10 000 000 VNĐ"
                            />
                            <p style={{ color: "red" }}>{errors.minSalary}</p>
                          </div>
                        </div>

                        <div className="col-lg-6 col-md-6">
                          <div className="form-group">
                            <label>Mức lương tối đa (VNĐ):</label>

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
                                    maxSalary: "Vui lòng nhập trường này !",
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
                                          "Mức lương tối thiểu phải nhỏ hơn tối đa !",
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
                           10 000 000 VNĐ"
                            />
                            <p style={{ color: "red" }}>{errors.maxSalary}</p>
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                          <div className="form-group">
                            <label>Thời gian bắt đầu làm việc:</label>
                            <input
                              onChange={(event) => {
                                if (event.target.value === "") {
                                  setErrors({
                                    ...errors,
                                    jobStartDate: "Vui lòng nhập trường này !",
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
                                          "Ngày bắt đầu làm việc phải sau hạn ứng tuyển",
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
                            <label>Hạn ứng tuyển:</label>
                            <input
                              onChange={(event) => {
                                if (event.target.value === "") {
                                  setErrors({
                                    ...errors,
                                    jobApplyDeadline:
                                      "Vui lòng nhập trường này !",
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
                                          "Ngày bắt đầu làm việc phải sau hạn ứng tuyển",
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
                            <label>Số điện thoại liên hệ</label>
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
                                    tel: "Vui lòng nhập trường này !",
                                  });
                                } else if (
                                  !event.target.value.match(phoneRegExp) ||
                                  event.target.value.trim().length < 10
                                ) {
                                  setErrors({
                                    ...errors,
                                    tel: "Vui lòng nhập đúng định dạng số điện thoại !",
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
                              placeholder="Nhập số điện thoại liên hệ"
                              type="number"
                              className="form-control tags_input"
                              name="tag"
                            />
                            <p style={{ color: "red" }}>{errors.tel}</p>
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                          <div className="form-group">
                            <label>Tỉnh / Thành phố</label>
                            <Form.Control
                              onChange={(event) => {
                                if (event.target.value === "") {
                                  setErrors({
                                    ...errors,
                                    provinceId: "Vui lòng nhập trường này !",
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
                              <option value="">Chọn tỉnh / thành phố</option>
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
                              <label>Quận / Huyện</label>
                              <Form.Control
                                onChange={(event) => {
                                  if (event.target.value === "") {
                                    setErrors({
                                      ...errors,
                                      districtId: "Vui lòng nhập trường này !",
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
                                <option value="">Chọn quận / huyện</option>
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
                              <label>Phường / Xã</label>
                              <Form.Control
                                onChange={(event) => {
                                  if (event.target.value === "") {
                                    setErrors({
                                      ...errors,
                                      wardId: "Vui lòng nhập trường này !",
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
                                <option value="">Chọn phường / xã</option>
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
                            <label>Địa chỉ cụ thể</label>
                            <input
                              onChange={(event) => {
                                if (event.target.value.trim() === "") {
                                  setErrors({
                                    ...errors,
                                    detailAddress: "Vui lòng nhập trường này !",
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
                              placeholder="Số nhà, tổ dân phố"
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
                        Đăng bài viết
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
