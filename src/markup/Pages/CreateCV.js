import {
  EnvironmentOutlined, InfoOutlined, MailOutlined, PhoneOutlined, UserOutlined
} from "@ant-design/icons";
import { DatePicker, Input, InputNumber, Popover } from "antd";
import { useFormik } from "formik";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import moment from "moment";
import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import swal from "sweetalert";
import { createCV } from "../../services/CvServices/CvServices";
import { uploadImage } from "../../services/UploadServices/UploadServices";
import "../Pages/Styles/creatCVStyles.css";
import "./../../css/custom.css";
import ListingsidebarCV from "./../Element/ListingsidebarCV";
import Footer from "./../Layout/Footer";
import Header from "./../Layout/Header";
import ModalDesc from "./CreateCv/Modal/ModalDesc";
import CVTemplate from "./CVTemplate";
const { RangePicker } = DatePicker;






function Jobmyresume() {
  const { TextArea } = Input;

  const [keyskill, setKeyskill] = useState(false);
  const [education, setEducation] = useState(false);
  const [projects, setProjects] = useState(false);
  const [onlineprofile, setOnlineProfile] = useState(false);
  const [worksample, setWorkSample] = useState(false);
  const [certification, setCertification] = useState(false);
  const [disabled, isDisabled] = useState(true);
  const [salary, setSalary] = useState(0);
  /**State value form */
  const [error, setError] = useState({
    objective: "",
  });
  const [cvPreview, setCVPreview] = useState(false);

  const [socialLink, setSocialLink] = useState(false);
  // Function Handle Submit
  const { accessToken, user } = useSelector((state) => state.auth.auth);


  const [currentSkill, setCurrentSkill] = useState({
    skillName: "",
    description: "",
  });
  const [currentEducation, setCurrentEducation] = useState({
    school: "",
    major: "",
    duration: "",
  });
  const [currentWorkExperience, setCurrentWorkExperience] = useState({
    companyName: "",
    position: "",
    duration: "",
  });
  const [currentHobby, setCurrentHobby] = useState("");

  const [currentActivity, setCurrentActivity] = useState({
    title: "",
    description: "",
    organization: "",
    duration: "",
  });
  const [currentCertificate, setCurrentCertificate] = useState({
    title: "",
    time: "",
  });
  const [currentSocialLink, setCurrentSocialLink] = useState({
    title: "",
    link: "",
  });
  const pdfGenerate = (fullName) => {
    const input = document.getElementById("CV-content");
    html2canvas(input, { useCORS: true }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const doc = new jsPDF("p", "mm", "a4");
      const pdfWidth = doc.internal.pageSize.getWidth();
      const pdfHeight = doc.internal.pageSize.getWidth();

      doc.addImage(imgData, "PNG", 0, 0, pdfWidth - 2, pdfHeight + 78);
      doc.save(`${fullName.replace(/\s/g, "_")}.pdf`);
    });
  };
  // do thing

  const hide = (funcClick, funcHovered) => {
    funcClick(false);
    funcHovered(false);
  };
  const history = useHistory();

  const handleHoverChange = (funcClick, funcHovered, visible) => {
    funcHovered(visible);
    funcClick(false);
  };

  const handleClickChange = (funcClick, funcHovered, visible) => {
    funcHovered(false);
    funcClick(visible);
  };

  const hoverContent = (
    <div className="text-warning">Click ????? thay ?????i n???i dung!</div>
  );
  // doing something
  const formik = useFormik({
    initialValues: {
      firstName: user.firstName,
      lastName: user.lastName,
      title: "",
      description: `Xin ch??o t??i t??n l?? ${user.fullName}`,
      email: user.email,
      birthday: "",
      socialLink: [],
      gender: "Nam",
      married: true,
      address: {},
      phone: "",
      objective: "",
      education: [],
      workExperience: [],
      skill: [],
      certificate: [],
      hobby: [],
      currentSalary: 0,
      avatarUrl: "",
      activity: [],
      desiredCareer: {
        position: "",
        jobType: "FullTime",
        expectedSalary: "",
      },
      status: "ACTIVE",
    },
    onSubmit: async (values) => {
      setError(validate(values));
      console.log(values)
      if (!values.desiredCareer.position) {
        delete values.desiredCareer.position
      }
      if (!values.education.duration) {
        delete values.education.duration
      }
      if (!values.workExperience.duration) {
        delete values.workExperience.duration
      }
      if (!values.activity.duration) {
        delete values.activity.duration
      }
      const objSubmit = { ...values };
      objSubmit.desiredCareer.expectedSalary = salary;
      if (Object.keys(error).length === 0 && error.constructor === Object) {
        isDisabled(false);
        createCV(objSubmit, accessToken?.token)
          .then((res) => {
            swal("Th??nh c??ng!", "???? l??u cv!", "success");
          })
          .catch((err) => {
            swal({
              title: "B???n c?? mu???n chuy???n h?????ng t???i qu???n l?? cv ?",
              text: "Cv ???? ?????t s??? l?????ng t???i ??a l?? 5!",
              icon: "warning",
              buttons: true,
              dangerMode: true,
            }).then((willDelete) => {
              if (willDelete) {
                swal("???? chuy???n ?????n qu???n l?? cv !", {
                  icon: "success",
                });
                history.push("/jobs-cv-manager");
              } else {
              }
            });
          });
      } else {
        isDisabled(true);
        swal("Th???t B???i!", "Kh??ng ???????c ????? tr???ng ", "error");
      }
    },
  });

  const validate = (values) => {
    let errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    const regexPhone =
      /^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/;
    if (!values.email) {
      errors.email = "Kh??ng ???????c ????? tr???ng";
    } else if (!regex.test(values.email)) {
      errors.email = "Email kh??ng h???p l???";
    }
    if (!values.firstName) {
      errors.firstName = "Kh??ng ???????c ????? tr???ng";
    }
    if (!values.lastName) {
      errors.lastName = "Kh??ng ???????c ????? tr???ng";
    }
    if (!values.title) {
      errors.title = "Kh??ng ???????c ????? tr???ng";
    }
    if (!values.description) {
      errors.description = "Kh??ng ???????c ????? tr???ng";
    }
    if (!values.skill[0]) {
      errors.skill = "Kh??ng ???????c ????? tr???ng";
    }
    if (!values.address) {
      errors.address = "Kh??ng ???????c ????? tr???ng";
    }
    if (!values.workExperience[0]) {
      errors.workExperience = "Kh??ng ???????c ????? tr???ng";
    }
    if (!salary) {
      errors.expectedSalary = "Kh??ng ???????c ????? tr???ng";
    }
    if (!values.objective) {
      errors.objective = "Kh??ng ???????c ????? tr???ng";
    } else if (values.objective) {
      delete errors.objective;
    }
    if (!values.phone) {
      errors.phone = "Kh??ng ???????c ????? tr???ng";
    } else if (!regexPhone.test(values.phone)) {
      errors.phone = "S??? ??i???n tho???i kh??ng h???p l???.";
    }
    if (!values.birthday) {
      errors.birthday = "Kh??ng ???????c ????? tr???ng";
    }
    if (Object.keys(error).length === 0 && error.constructor === Object) {
      isDisabled(false);
    } else {
      isDisabled(true);
    }

    return errors;
  };

  const handleCreateCv = () => {
    let errors = {};
    const values = formik.values;
    let isError = false;
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    const regexPhone =
      /^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/;
    if (!values.email) {
      errors.email = "Kh??ng ???????c ????? tr???ng";
      isError = true;
    } else if (!regex.test(values.email)) {
      errors.email = "Email kh??ng h???p l???";
      isError = true;
    }
    if (!values.firstName) {
      errors.firstName = "Kh??ng ???????c ????? tr???ng";
      isError = true;
    }
    if (!values.lastName) {
      errors.lastName = "Kh??ng ???????c ????? tr???ng";
      isError = true;
    }
    if (!values.title) {
      errors.title = "Kh??ng ???????c ????? tr???ng";
      isError = true;
    }
    if (!values.description) {
      errors.description = "Kh??ng ???????c ????? tr???ng";
      isError = true;
    }
    if (!values.skill[0]) {
      errors.skill = "Kh??ng ???????c ????? tr???ng";
      isError = true;
    }
    if (!values.address) {
      errors.address = "Kh??ng ???????c ????? tr???ng";
      isError = true;
    }
    if (!values.workExperience[0]) {
      errors.workExperience = "Kh??ng ???????c ????? tr???ng";
      isError = true;
    }
    if (!salary) {
      errors.expectedSalary = "Kh??ng ???????c ????? tr???ng";
      isError = true;
    }
    if (!values.objective) {
      errors.objective = "Kh??ng ???????c ????? tr???ng";
      isError = true;
    } else if (values.objective) {
      delete errors.objective;
    }
    if (!values.phone) {
      errors.phone = "Kh??ng ???????c ????? tr???ng";
      isError = true;
    } else if (!regexPhone.test(values.phone)) {
      errors.phone = "S??? ??i???n tho???i kh??ng h???p l???.";
      isError = true;
    }
    if (!values.birthday) {
      errors.birthday = "Kh??ng ???????c ????? tr???ng";
      isError = true;
    }
    if (Object.keys(error).length === 0 && error.constructor === Object) {
      isDisabled(false);
    } else {
      isDisabled(true);
    }
    setError(errors);

    if (isError) {
      swal("Th???t B???i!", "Kh??ng ???????c ????? tr???ng ", "error");
      return;
    }

    setCVPreview(true);
  };
  const [clickedSkill, setClickedSkill] = useState(false);
  const [hoveredSkill, setHoveredSkill] = useState(false);
  const [clickedEducation, setClickedEducation] = useState(false);
  const [hoveredEducation, setHoveredEducation] = useState(false);
  const [clickedExp, setClickedExp] = useState(false);
  const [hoveredExp, setHoveredExp] = useState(false);
  const [clickedSocailLink, setClickedSocailLink] = useState(false);
  const [hoveredSocailLink, setHoveredSocailLink] = useState(false);
  const [clickedActivity, setClickedActivity] = useState(false);
  const [hoveredActivity, setHoveredActivity] = useState(false);
  const [clickedCer, setClickedCer] = useState(false);
  const [hoveredCer, setHoveredCer] = useState(false);
  const [showImage, setShowImage] = useState(false);
  const setImgUrl = (value) => {
    if (value.files && value.files[0]) {
      try {
        if (value.files[0].size > 3145728) {
          swal("ERROR", "File qu?? l???n ho???c kh??ng h???p l???!!", "error");
        } else {
          const reader = new FileReader();
          reader.onload = (e) => {
            document.getElementById("imgPaperUrl").src = e.target.result;
          };
          reader.readAsDataURL(value.files[0]);
          const formData = new FormData();
          formData.append("files", value.files[0]);
          uploadImage(formData, accessToken.token)
            .then((res) => {
              setShowImage(true);
              formik.values.avatarUrl = res.data[0].path;
            })
            .catch((error) => {
              console.log(error);
            });
        }
      } catch (error) {
        swal("ERROR", "File qu?? l???n ho???c kh??ng h???p l???!!", "error");
      }
    }
  };

  const [skill, setSkill] = useState(formik.values?.skill);

  return (
    <>
      <Header />
      <div className="page-content">
        <form onSubmit={formik.handleSubmit} className="content-block">
          <div className="CV-overlay"></div>
          <div className="section-full browse-job content-inner-2">
            <div className="container">
              <div className="row">
                <div className="col-xl-3 col-lg-4 col-md-4 col-sm-12 m-b30">
                  <ListingsidebarCV />
                </div>
                <div className="col-xl-9 col-lg-8 col-md-8 col-sm-12">
                  <div
                    id="resume_headline_bx"
                    className="job-bx bg-white m-b30"
                  >
                    <h5 className="m-b10">???nh h??? s?? c???a b???n</h5>
                    <form className="attach-resume">
                      <div className="row">
                        <div className="col-lg-12 col-md-12">
                          <div className="form-group">
                            <div className="custom-file">
                              <img
                                src=""
                                style={{
                                  display: showImage ? "block" : "none",
                                  width: "100%",
                                  height: "100%",
                                  borderRadius: "50%",
                                }}
                                id="imgPaperUrl"
                                alt=""
                              />
                              {!showImage ? (
                                <p className="m-auto align-self-center">
                                  <i className="fa fa-upload"></i>
                                  T???i l??n k??ch c??? 3 MB
                                </p>
                              ) : (
                                <></>
                              )}

                              <input
                                onChange={(e) => {
                                  setImgUrl(e.target);
                                }}
                                type="file"
                                className="site-button form-control"
                                id="customFile"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                  <div className="row">
                    <div className="col-md-6 col-lg-6">
                      <div className="mb-3">
                        <label className="m-b0">H???</label>
                        <Input
                          name="firstName"
                          onChange={formik.handleChange}
                          value={formik.values.firstName}
                          className="w-100 border-0 clearfix font-13"
                          placeholder="
                            Nguy???n V??n"
                          prefix={<UserOutlined />}
                        />

                        {error.firstName && (
                          <span className="text-danger">{error.firstName}</span>
                        )}
                      </div>
                      <div className="mb-3">
                        <label className="m-b0">T??n</label>
                        <Input
                          name="lastName"
                          onChange={formik.handleChange}
                          value={formik.values.lastName}
                          className="w-100 border-0 clearfix font-13"
                          placeholder="
                             A"
                          prefix={<UserOutlined />}
                        />

                        {error.lastName && (
                          <span className="text-danger">{error.lastName}</span>
                        )}
                      </div>
                      <div className="mb-3">
                        <label className="m-b0">S??? ??i???n tho???i</label>
                        <Input
                          name="phone"
                          onChange={formik.handleChange}
                          value={formik.values.phone}
                          className="w-100 border-0 clearfix font-13"
                          placeholder="
                          012*******"
                          prefix={<PhoneOutlined />}
                        />

                        {error.phone && (
                          <span className="text-danger">{error.phone}</span>
                        )}
                      </div>

                      <div className="mb-3">
                        <label className="m-b0">T??nh tr???ng h??n nh??n</label>
                        <Form.Control
                          name="married"
                          onChange={formik.handleChange}
                          value={formik.values.married}
                          as="select"
                        >
                          <option value={true}>???? k???t h??n</option>
                          <option value={false}>?????c Th??n</option>
                        </Form.Control>
                      </div>
                    </div>
                    <div className="col-md-6 col-lg-6">
                      <div className="mb-3">
                        <label className="m-b0">Email</label>
                        <Input
                          type="email"
                          name="email"
                          onChange={formik.handleChange}
                          value={formik.values.email}
                          className="w-100 border-0 clearfix font-13"
                          placeholder="
                            abc@example.com"
                          prefix={<MailOutlined />}
                        />

                        {error.email && (
                          <span className="text-danger">{error.email}</span>
                        )}
                      </div>

                      <div className="mb-3">
                        <label className="m-b0">Ti??u ????? h??? s??</label>
                        <Input
                          name="title"
                          onChange={formik.handleChange}
                          value={formik.values.title}
                          className="w-100 border-0 clearfix font-13"
                          placeholder="
                              Ca s??"
                          prefix={<InfoOutlined />}
                        />

                        {error.title && (
                          <span className="text-danger">{error.title}</span>
                        )}
                      </div>
                      <div className="mb-3">
                        <label className="m-b0">Gi???i T??nh</label>
                        <Form.Control
                          name="gender"
                          onChange={formik.handleChange}
                          value={formik.values.gender}
                          as="select"
                        >
                          <option value="Nam">Nam</option>
                          <option value="N???">N???</option>
                        </Form.Control>
                      </div>
                    </div>
                  </div>
                  <div id="key_skills_bx" className=" job-bx bg-white m-b30">
                    <div className="d-flex">
                      <h5 className="m-b15">Gi???i thi???u</h5>
                    </div>
                    <TextArea
                      name="description"
                      allowClear
                      onChange={formik.handleChange}
                      value={formik.values.description}
                      placeholder="Hello, My name is John"
                    />
                    {error.description && (
                      <span className="text-danger">{error.description}</span>
                    )}
                  </div>
                  <div id="employment_bx" className="job-bx bg-white m-b30">
                    <div className="d-flex">
                      <h5 className="m-b15">K??? n??ng</h5>
                      <Link
                        to={"#"}
                        data-toggle="modal"
                        data-target="#keyskills"
                        onClick={() => setKeyskill(true)}
                        className="site-button add-btn button-sm"
                      >
                        <i className="fa fa-pencil m-r5"></i> Th??m
                      </Link>
                    </div>
                    {error.skill && (
                      <span className="text-danger">{error.skill}</span>
                    )}
                    {skill.map((value, index) => (
                      <div className="d-flex ">
                        <div
                          key={index}
                          style={{ position: "releative", width: "90%" }}
                          className="job-time mr-auto "
                        >
                          <Popover
                            content={hoverContent}
                            title={`${value.skillName}`}
                            trigger="hover"
                            style={{
                              position: "absolute",
                              top: "0",
                              left: "0",
                            }}
                            visible={hoveredSkill}
                            className="background-0"
                            onVisibleChange={() => {
                              handleHoverChange(
                                setClickedSkill,
                                setHoveredSkill
                              );
                            }}
                          >
                            <Popover
                              style={{
                                position: "absolute",
                                top: "0",
                                left: "0",
                              }}
                              content={
                                <div className="row">
                                  <div className="col-md-6 col-lg-6">
                                    <Button
                                      onClick={() => {
                                        hide(setClickedSkill, setHoveredSkill);
                                      }}
                                    >
                                      Close
                                    </Button>
                                  </div>
                                  <div className="col-md-6 col-lg-6">
                                    <Button
                                      onClick={() => {
                                        value.skillName =
                                          currentSkill.skillName;
                                        value.description =
                                          currentSkill.description;
                                      }}
                                    >
                                      Submit
                                    </Button>
                                  </div>
                                </div>
                              }
                              title="Nh???p n???i dung c???n thay ?????i"
                              trigger="click"
                              visible={clickedSkill}
                              onVisibleChange={() => {
                                handleClickChange(
                                  setClickedSkill,
                                  setHoveredSkill
                                );
                              }}
                            >
                              {/* <div className="d-flex">
                            <div> */}
                              <h4
                                contenteditable="true"
                                onInput={(e) => {
                                  value.skillName = e.currentTarget.textContent;
                                  // setCurrentSkill({
                                  //   ...currentSkill,
                                  //   skillName: e.currentTarget.textContent,
                                  // });
                                }}
                                className="font-14  m-b0"
                                style={{
                                  color: "black",
                                  width: "90%",
                                  position: "relative",
                                  bottom: 2,
                                }}
                              >
                                {" "}
                                {value.skillName}
                              </h4>
                              <p
                                className="text-black"
                                onInput={(e) => {
                                  value.description =
                                    e.currentTarget.textContent;

                                  // setCurrentSkill({
                                  //   ...currentSkill,
                                  //   description: e.currentTarget.textContent,
                                  // });
                                }}
                                style={{
                                  color: "black",
                                  width: "90%",
                                  position: "relative",
                                  bottom: 2,
                                  whiteSpace: "pre-wrap",
                                }}
                                contenteditable="true"
                              >
                                {value.description}
                              </p>
                            </Popover>
                          </Popover>
                        </div>
                        <Link
                          to={"#"}
                          data-toggle="modal"
                          data-target="#keyskills"
                          onClick={() => {
                            formik.values.skill.splice(value, 1);
                          }}
                          className="site-button add-btn button-sm mt-2"
                          style={{ backgroundColor: "red" }}
                        >
                          <i className="fa fa-trash m-r5"></i> X??a
                        </Link>
                      </div>
                    ))}

                    <Modal
                      show={keyskill}
                      onHide={setKeyskill}
                      className="modal fade modal-bx-info editor w-100"
                    >
                      <div className="modal-dialog my-0" role="document">
                        <form onSubmit={(e) => {
                          e.stopPropagation()
                          e.preventDefault()
                          formik.values.skill.push(currentSkill);
                          setKeyskill(false);
                        }}>
                          <div className="modal-content">
                            <div className="modal-header">
                              <h5
                                className="modal-title"
                                id="KeyskillsModalLongTitle"
                              >
                                K??? n??ng
                              </h5>
                              <button
                                type="button"
                                className="close"
                                onClick={() => setKeyskill(false)}
                              >
                                <span aria-hidden="true">&times;</span>
                              </button>
                            </div>
                            <div className="modal-body">
                              <p>
                                ????y l?? ??i???u ?????u ti??n g??y ???n t?????ng v???i nh?? tuy???n
                                d???ng trong h??? s?? c???a b???n. Th??m v??o k??? n??ng v??n
                                ph??ng, ng??n ng??? khi???n b???n tr??? n??n ?????c ????o v?? l??
                                ng?????i ph?? h???p v???i c??ng vi???c m?? b???n ??ang t??m ki???m.
                              </p>
                              <div className="row">
                                <div className="col-lg-12 col-md-12">
                                  <div className="form-group">
                                    <label>Ti??u ?????: </label>
                                    <input
                                      required
                                      onChange={(e) =>
                                        setCurrentSkill({
                                          ...currentSkill,
                                          skillName: e.target.value,
                                        })
                                      }
                                      className="form-control"
                                      placeholder="Vd: Tin h???c v??n ph??ng"
                                    />
                                  </div>
                                </div>
                                <div className="col-lg-12 col-md-12">
                                  <div className="form-group">
                                    <label>M?? t??? v??? k??? n??ng: </label>
                                    <textarea
                                      required
                                      onChange={(e) =>
                                        setCurrentSkill({
                                          ...currentSkill,
                                          description: e.target.value,
                                        })
                                      }
                                      className="form-control"
                                      placeholder="Vd: S??? d???ng th??nh th???o Word, PowerPoint"
                                    ></textarea>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="modal-footer">
                              <button
                                type="button"
                                className="site-button"
                                onClick={() => setKeyskill(false)}
                              >
                                H???y
                              </button>
                              <button
                                // onClick={() => {
                                //   formik.values.skill.push(currentSkill);
                                //   setKeyskill(false);
                                // }}
                                className="site-button"
                              >
                                L??u
                              </button>
                            </div>
                          </div>
                        </form>
                      </div>
                    </Modal>
                  </div>

                  <div id="education_bx" className="job-bx bg-white m-b30">
                    <div className="d-flex">
                      <h5 className="m-b15">H???c v???n</h5>
                      <Link
                        to={"#"}
                        onClick={() => setEducation(true)}
                        className="site-button add-btn button-sm"
                      >
                        <i className="fa fa-pencil m-r5"></i> Th??m
                      </Link>
                    </div>

                    {formik.values?.education.map((value, index) => (
                      <div className="d-flex ">
                        <div
                          key={index}
                          style={{ position: "releative", width: "90%" }}
                          className="job-time mr-auto"
                        >
                          <Popover
                            content={hoverContent}
                            title={`${value.major}`}
                            trigger="hover"
                            style={{
                              position: "absolute",
                              top: "0",
                              left: "0",
                            }}
                            visible={hoveredEducation}
                            className="background-0"
                            onVisibleChange={() => {
                              handleHoverChange(
                                setClickedSkill,
                                setHoveredSkill
                              );
                            }}
                          >
                            <Popover
                              style={{
                                position: "absolute",
                                top: "0",
                                left: "0",
                              }}
                              content={
                                <div className="row">
                                  <div className="col-md-6 col-lg-6">
                                    <Button
                                      onClick={() => {
                                        hide(setClickedSkill, setHoveredSkill);
                                      }}
                                    >
                                      Close
                                    </Button>
                                  </div>
                                  <div className="col-md-6 col-lg-6">
                                    <Button
                                      onClick={() => {
                                        value.major = currentEducation.major;
                                        value.duration =
                                          currentEducation.duration;

                                        value.school = currentEducation.school;
                                      }}
                                    >
                                      Submit
                                    </Button>
                                  </div>
                                </div>
                              }
                              title="Nh???p n???i dung c???n thay ?????i"
                              trigger="click"
                              visible={clickedEducation}
                              onVisibleChange={() => {
                                handleClickChange(
                                  setClickedEducation,
                                  setHoveredEducation
                                );
                              }}
                            >
                              <div className=" datdt-change d-flex  align-center ">
                                <label className="mx-2">Chuy??n ng??nh:</label>
                                <h4
                                  contenteditable="true"
                                  style={{
                                    color: "black",
                                    width: "90%",
                                    position: "relative",
                                    // bottom: 1,
                                  }}
                                  onInput={(e) => {
                                    value.major = e.currentTarget.textContent;
                                    // setCurrentEducation({
                                    //   ...currentEducation,
                                    //   major: e.currentTarget.textContent,
                                    // });
                                  }}
                                  className="font-14 m-b0"
                                >
                                  {" "}
                                  {value.major}
                                </h4>
                              </div>
                              <div className=" datdt-change d-flex  align-center ">
                                <label className="long_text mx-2">
                                  Th???i gian theo h???c:
                                </label>

                                <p
                                  onInput={(e) => {
                                    value.duration =
                                      e.currentTarget.textContent;
                                    // setCurrentEducation({
                                    //   ...currentEducation,
                                    //   duration: e.currentTarget.textContent,
                                    // });
                                  }}
                                  contenteditable="true"
                                  style={{
                                    color: "black",
                                    width: "90%",
                                    position: "relative",
                                    // bottom: 1,
                                  }}
                                  className="m-b0 "
                                >
                                  {value.duration}
                                </p>
                              </div>
                              <div className=" datdt-change d-flex  align-center ">
                                <label className="mx-2">H???c t???i:</label>

                                <p
                                  onInput={(e) => {
                                    value.school = e.currentTarget.textContent;
                                    // setCurrentEducation({
                                    //   ...currentEducation,
                                    //   school: e.currentTarget.textContent,
                                    // });
                                  }}
                                  contenteditable="true"
                                  style={{
                                    color: "black",
                                    width: "90%",
                                    position: "relative",
                                    // bottom: 1,
                                  }}
                                  className="m-b0 "
                                >
                                  {value.school}
                                </p>
                              </div>
                              <div className="datdt-change d-flex  align-center ">
                                <label className="mx-2">X???p lo???i:</label>

                                <p
                                  onInput={(e) => {
                                    value.level = e.currentTarget.textContent;
                                    // setCurrentEducation({
                                    //   ...currentEducation,
                                    //   school: e.currentTarget.textContent,
                                    // });
                                  }}
                                  contenteditable="true"
                                  style={{
                                    color: "black",
                                    width: "90%",
                                    position: "relative",
                                    // bottom: 1,
                                  }}
                                  className="m-b0 "
                                >
                                  {value.level}
                                </p>
                              </div>
                            </Popover>
                          </Popover>
                        </div>
                        <Link
                          to={"#"}
                          data-toggle="modal"
                          data-target="#keyskills"
                          onClick={() => {
                            formik.values.education.splice(value, 1);
                          }}
                          className="site-button add-btn button-sm mt-2"
                          style={{ backgroundColor: "red" }}
                        >
                          <i className="fa fa-trash m-r5"></i> X??a
                        </Link>
                      </div>
                    ))}



                    <div className="row">
                      <div className="col-lg-12 col-md-12 col-sm-12">
                        {/* {submitInfo.educationInfo.map((item) => {
													return <div className="clearfix m-b20">
														<label className="m-b0">{`${item.level} - ${item.school}`}</label>
														<span className="clearfix font-13">{`Kh??a ${item.course}`}</span>
													</div>
												})} */}
                      </div>
                    </div>
                  </div>
                  <div id="projects_bx" className="job-bx bg-white m-b30">
                    <div className="d-flex">
                      <h5 className="m-b15">Kinh nghi???m l??m vi???c</h5>
                      <Link
                        to={"#"}
                        onClick={() => setProjects(true)}
                        className="site-button add-btn button-sm"
                      >
                        <i className="fa fa-pencil m-r5"></i> Th??m
                      </Link>
                    </div>
                    {error.workExperience && (
                      <span className="text-danger">
                        {error.workExperience}
                      </span>
                    )}
                    {formik.values?.workExperience.map((value, index) => (
                      <div className="d-flex ">
                        <div
                          key={index}
                          style={{ position: "releative", width: "90%" }}
                          className="job-time mr-auto"
                        >
                          <Popover
                            style={{
                              position: "absolute",
                              top: "0",
                              left: "0",
                            }}
                            content={hoverContent}
                            title={`${value.position}`}
                            trigger="hover"
                            visible={hoveredExp}
                            className="background-0"
                            onVisibleChange={() => {
                              handleHoverChange(setClickedExp, setHoveredExp);
                            }}
                          >
                            <Popover
                              style={{
                                position: "absolute",
                                top: "0",
                                left: "0",
                              }}
                              content={
                                <div className="row">
                                  <div className="col-md-6 col-lg-6">
                                    <Button
                                      onClick={() => {
                                        hide(setClickedExp, setHoveredExp);
                                      }}
                                    >
                                      Close
                                    </Button>
                                  </div>
                                  <div className="col-md-6 col-lg-6">
                                    <Button
                                      onClick={() => {
                                        value.companyName =
                                          currentWorkExperience.companyName;
                                        value.position =
                                          currentWorkExperience.position;

                                        value.duration =
                                          currentWorkExperience.duration;
                                      }}
                                    >
                                      Submit
                                    </Button>
                                  </div>
                                </div>
                              }
                              title="Nh???p n???i dung c???n thay ?????i"
                              trigger="click"
                              visible={clickedExp}
                              onVisibleChange={() => {
                                handleClickChange(setClickedExp, setHoveredExp);
                              }}
                            >
                              <div className="datdt-change d-flex  align-center ">
                                <label className="mx-2 ">L??m vi???c t???i:</label>
                                <h4
                                  contenteditable="true"
                                  onInput={(e) => {
                                    value.companyName =
                                      e.currentTarget.textContent;
                                    // setCurrentEducation({
                                    //   ...currentEducation,
                                    //   major: e.currentTarget.textContent,
                                    // });
                                  }}
                                  className="font-14 m-b0  pl-0"
                                  style={{
                                    color: "black",
                                    width: "90%",
                                    position: "relative",
                                    bottom: 1,
                                  }}
                                >
                                  {" "}
                                  {value.companyName}
                                </h4>
                              </div>

                              <div className="datdt-change d-flex  align-center ">
                                <label className="mx-2">V??? tr??:</label>

                                <p
                                  onInput={(e) => {
                                    value.position =
                                      e.currentTarget.textContent;
                                    // setCurrentEducation({
                                    //   ...currentEducation,
                                    //   school: e.currentTarget.textContent,
                                    // });
                                  }}
                                  contenteditable="true"
                                  style={{
                                    color: "black",
                                    width: "90%",
                                    position: "relative",
                                    bottom: 1,
                                  }}
                                  className="m-b0 "
                                >
                                  {value.position}
                                </p>
                              </div>
                              <div className="datdt-change d-flex  align-center ">
                                <label className="mx-2">Th???i gian:</label>
                                <p
                                  onInput={(e) => {
                                    value.duration =
                                      e.currentTarget.textContent;
                                    // setCurrentEducation({
                                    //   ...currentEducation,
                                    //   school: e.currentTarget.textContent,
                                    // });
                                  }}
                                  contenteditable="true"
                                  style={{
                                    color: "black",
                                    width: "90%",
                                    position: "relative",
                                    bottom: 1,
                                  }}
                                  className="m-b0 "
                                >
                                  {value.duration}
                                </p>
                              </div>
                            </Popover>
                          </Popover>
                        </div>
                        <Link
                          to={"#"}
                          data-toggle="modal"
                          data-target="#keyskills"
                          onClick={() => {
                            formik.values.workExperience.splice(value, 1);
                          }}
                          className="site-button add-btn button-sm mt-2"
                          style={{ backgroundColor: "red" }}
                        >
                          <i className="fa fa-trash m-r5"></i> X??a
                        </Link>
                      </div>
                    ))}


                  </div>
                  <div id="employment_bx" className="job-bx bg-white m-b30">
                    <div className="d-flex">
                      <h5 className="m-b15">Social Link</h5>
                      <Link
                        to={"#"}
                        data-toggle="modal"
                        onClick={() => setSocialLink(true)}
                        className="site-button add-btn button-sm"
                      >
                        <i className="fa fa-pencil m-r5"></i> Th??m
                      </Link>
                    </div>
                    {formik.values?.socialLink.map((value, index) => (
                      <div className="d-flex ">
                        <div
                          key={index}
                          className="job-time mr-auto"
                          style={{ position: "releative", width: "90%" }}
                        >
                          <Popover
                            style={{
                              position: "absolute",
                              top: "0",
                              left: "0",
                            }}
                            content={hoverContent}
                            title={`${value.title}`}
                            trigger="hover"
                            visible={hoveredSocailLink}
                            className="background-0"
                            onVisibleChange={() => {
                              handleHoverChange(
                                setClickedSocailLink,
                                setHoveredSocailLink
                              );
                            }}
                          >
                            <Popover
                              style={{
                                position: "absolute",
                                top: "0",
                                left: "0",
                              }}
                              content={
                                <div className="row">
                                  <div className="col-md-6 col-lg-6">
                                    <Button
                                      onClick={() => {
                                        hide(
                                          setClickedSocailLink,
                                          setHoveredSocailLink
                                        );
                                      }}
                                    >
                                      Close
                                    </Button>
                                  </div>
                                  <div className="col-md-6 col-lg-6">
                                    <Button
                                      onClick={() => {
                                        value.title = currentSocialLink.title;
                                        value.link = currentSocialLink.link;
                                      }}
                                    >
                                      Submit
                                    </Button>
                                  </div>
                                </div>
                              }
                              title="Nh???p n???i dung c???n thay ?????i"
                              trigger="click"
                              visible={clickedSocailLink}
                              onVisibleChange={() => {
                                handleClickChange(
                                  setClickedSocailLink,
                                  setHoveredSocailLink
                                );
                              }}
                            >
                              <h4
                                contenteditable="true"
                                onInput={(e) => {
                                  value.title = e.currentTarget.textContent;
                                  // setCurrentSocialLink({
                                  //   ...currentSocialLink,
                                  //   title: e.currentTarget.textContent,
                                  // });
                                }}
                                key={index}
                                style={{
                                  color: "black",
                                  width: "90%",
                                  position: "relative",
                                  bottom: 2,
                                }}
                                className="font-14 text-left"
                              >
                                {" "}
                                {value.title}
                              </h4>
                              <a
                                href="###"
                                contenteditable="true"
                                onInput={(e) => {
                                  value.link = e.currentTarget.textContent;
                                }}
                                className="m-b0 "
                                style={{
                                  color: "black",
                                  width: "90%",
                                  position: "relative",
                                  bottom: 2,
                                }}
                              >
                                {value.link}
                              </a>
                            </Popover>
                          </Popover>
                        </div>
                        <Link
                          to={"#"}
                          data-toggle="modal"
                          data-target="#keyskills"
                          onClick={() => {
                            formik.values.socialLink.splice(value, 1);
                          }}
                          className="site-button add-btn button-sm mt-2"
                          style={{ backgroundColor: "red" }}
                        >
                          <i className="fa fa-trash m-r5"></i> X??a
                        </Link>
                      </div>
                    ))}

                  </div>
                  <div
                    id="accomplishments_bx"
                    className="job-bx bg-white m-b30"
                  >
                    <h5 className="m-b10">T??m t???t b???n th??n</h5>
                    <div className="list-row">
                      <div className="list-line">
                        <div className="d-flex">
                          <h6 className="font-14 m-b5">S??? th??ch</h6>
                          <Link
                            to={"#"}
                            onClick={() => setOnlineProfile(true)}
                            className="site-button add-btn button-sm"
                          >
                            <i className="fa fa-pencil m-r5"></i> Th??m
                          </Link>
                        </div>
                        {formik.values.hobby?.map((item, index) => (
                          <div className="d-flex ">
                            <p
                              key={index}
                              onInput={(e) => {
                                item = e.currentTarget.textContent;
                              }}
                              contenteditable="true"
                              style={{
                                color: "black",
                                width: "90%",
                                position: "relative",
                                bottom: 2,
                              }}
                              className="font-14 "
                            >
                              - {item}
                            </p>
                            <Link
                              to={"#"}
                              data-toggle="modal"
                              data-target="#keyskills"
                              onClick={() => {
                                formik.values.hobby.splice(item, 1);
                              }}
                              className="site-button add-btn button-sm mt-2"
                              style={{ backgroundColor: "red" }}
                            >
                              <i className="fa fa-trash m-r5"></i> X??a
                            </Link>
                          </div>
                        ))}



                        <div className="list-line">
                          <div className="d-flex">
                            <h6 className="font-14 m-b5">Ho???t ?????ng</h6>
                            <Link
                              to={"#"}
                              onClick={() => setWorkSample(true)}
                              className="site-button add-btn button-sm"
                            >
                              <i className="fa fa-pencil m-r5"></i> Th??m
                            </Link>
                          </div>
                          {formik.values.activity?.map((value, index) => (
                            <div className="d-flex ">
                              <div
                                key={index}
                                style={{ position: "releative", width: "90%" }}
                                className="job-time mr-auto"
                              >
                                <Popover
                                  style={{
                                    position: "absolute",
                                    top: "0",
                                    left: "0",
                                  }}
                                  content={hoverContent}
                                  title={`${value.title}`}
                                  trigger="hover"
                                  visible={hoveredActivity}
                                  className="background-0"
                                  onVisibleChange={() => {
                                    handleHoverChange(
                                      setClickedActivity,
                                      setHoveredActivity
                                    );
                                  }}
                                >
                                  <Popover
                                    style={{
                                      position: "absolute",
                                      top: "0",
                                      left: "0",
                                    }}
                                    content={
                                      <div className="row">
                                        <div className="col-md-6 col-lg-6">
                                          <Button
                                            onClick={() => {
                                              hide(
                                                setClickedActivity,
                                                setHoveredActivity
                                              );
                                            }}
                                          >
                                            Close
                                          </Button>
                                        </div>
                                        <div className="col-md-6 col-lg-6">
                                          <Button
                                            onClick={() => {
                                              value.title =
                                                currentActivity.title;
                                              value.organization =
                                                currentActivity.organization;

                                              value.duration =
                                                currentActivity.duration;
                                              value.description =
                                                currentActivity.description;
                                            }}
                                          >
                                            Submit
                                          </Button>
                                        </div>
                                      </div>
                                    }
                                    title="Nh???p n???i dung c???n thay ?????i"
                                    trigger="click"
                                    visible={clickedActivity}
                                    onVisibleChange={() => {
                                      handleClickChange(
                                        setClickedActivity,
                                        setHoveredActivity
                                      );
                                    }}
                                  >
                                    <div className="datdt-change  d-flex  align-center ">
                                      <label className="mx-2">
                                        T??n ho???t ?????ng:
                                      </label>
                                      <h4
                                        contenteditable="true"
                                        onInput={(e) => {
                                          // setCurrentActivity({
                                          //   ...currentActivity,
                                          //   title: e.currentTarget.textContent,
                                          // });
                                          value.title =
                                            e.currentTarget.textContent;
                                        }}
                                        key={index}
                                        style={{
                                          color: "black",
                                          width: "90%",
                                          position: "relative",
                                          bottom: 1,
                                        }}
                                        className="font-14 m-b0  pl-0"
                                      >
                                        {" "}
                                        {value.title}
                                      </h4>
                                    </div>
                                    <div className="datdt-change d-flex  align-center ">
                                      <label className="mx-2">
                                        ????n v??? t??? ch???c:
                                      </label>

                                      <p
                                        onInput={(e) => {
                                          // setCurrentActivity({
                                          //   ...currentActivity,
                                          //   organization:
                                          //     e.currentTarget.textContent,
                                          // });
                                          value.organization =
                                            e.currentTarget.textContent;
                                        }}
                                        contenteditable="true"
                                        style={{
                                          color: "black",
                                          width: "90%",
                                          position: "relative",
                                          bottom: 1,
                                        }}
                                        className=""
                                      >
                                        {" "}
                                        {value.organization}
                                      </p>
                                    </div>
                                    <div className="datdt-change d-flex  align-center ">
                                      <label className="mx-2">
                                        Th???i gian tham gia:
                                      </label>

                                      <p
                                        onInput={(e) => {
                                          // setCurrentActivity({
                                          //   ...currentActivity,
                                          //   duration: e.currentTarget.textContent,
                                          // });
                                          value.duration =
                                            e.currentTarget.textContent;
                                        }}
                                        contenteditable="true"
                                        style={{
                                          color: "black",
                                          width: "90%",
                                          position: "relative",
                                          // bottom: 2,
                                        }}
                                        className=" "
                                      >
                                        {value.duration}
                                      </p>
                                    </div>
                                    <div className="datdt-change d-flex  align-center ">
                                      <label
                                        className="mx-2"
                                        style={{ textAlign: "left" }}
                                      >
                                        M?? t???:
                                      </label>

                                      <p
                                        onInput={(e) => {
                                          // setCurrentActivity({
                                          //   ...currentActivity,
                                          //   description:
                                          //     e.currentTarget.textContent,
                                          // });
                                          value.description =
                                            e.currentTarget.textContent;
                                        }}
                                        contenteditable="true"
                                        style={{
                                          color: "black",
                                          width: "90%",
                                          position: "relative",
                                          bottom: 1,
                                          whiteSpace: "pre-wrap",
                                        }}
                                        className=""
                                      >
                                        {" "}
                                        {value.description}
                                      </p>
                                    </div>
                                  </Popover>
                                </Popover>
                              </div>
                              <Link
                                to={"#"}
                                data-toggle="modal"
                                data-target="#keyskills"
                                onClick={() => {
                                  formik.values.activity.splice(value, 1);
                                }}
                                className="site-button add-btn button-sm mt-2"
                                style={{ backgroundColor: "red" }}
                              >
                                <i className="fa fa-trash m-r5"></i> X??a
                              </Link>
                            </div>
                          ))}


                        </div>

                        <div className="list-line">
                          <div className="d-flex">
                            <h6 className="font-14 m-b5">Ch???ng ch???</h6>
                            <Link
                              to={"#"}
                              onClick={() => setCertification(true)}
                              className="site-button add-btn button-sm"
                            >
                              <i className="fa fa-pencil m-r5"></i> Th??m
                            </Link>
                          </div>
                          {formik.values.certificate?.map((item, index) => (
                            <div className="d-flex ">
                              <div
                                key={index}
                                style={{ position: "releative", width: "90%" }}
                                className="job-time mr-auto"
                              >
                                <Popover
                                  style={{
                                    position: "absolute",
                                    top: "0",
                                    left: "0",
                                  }}
                                  content={hoverContent}
                                  title={`${item.title}`}
                                  trigger="hover"
                                  visible={hoveredCer}
                                  className="background-0"
                                  onVisibleChange={() => {
                                    handleHoverChange(
                                      setClickedCer,
                                      setHoveredCer
                                    );
                                  }}
                                >
                                  <Popover
                                    style={{
                                      position: "absolute",
                                      top: "0",
                                      left: "0",
                                    }}
                                    content={
                                      <div className="row">
                                        <div className="col-md-6 col-lg-6">
                                          <Button
                                            onClick={() => {
                                              hide(
                                                setClickedCer,
                                                setHoveredCer
                                              );
                                            }}
                                          >
                                            Close
                                          </Button>
                                        </div>
                                        <div className="col-md-6 col-lg-6">
                                          <Button
                                            onClick={() => {
                                              item.title =
                                                currentCertificate.title;
                                              item.time =
                                                currentCertificate.time;
                                            }}
                                          >
                                            Submit
                                          </Button>
                                        </div>
                                      </div>
                                    }
                                    title="Nh???p n???i dung c???n thay ?????i"
                                    trigger="click"
                                    visible={clickedCer}
                                    onVisibleChange={() => {
                                      handleClickChange(
                                        setClickedCer,
                                        setHoveredCer
                                      );
                                    }}
                                  >
                                    <h5
                                      contenteditable="true"
                                      onInput={(e) => {
                                        // setCurrentCertificate({
                                        //   ...currentCertificate,
                                        //   title: e.currentTarget.textContent,
                                        // });
                                        item.title =
                                          e.currentTarget.textContent;
                                      }}
                                      key={index}
                                      style={{
                                        color: "black",
                                        width: "90%",
                                        position: "relative",
                                        bottom: 2,
                                      }}
                                      className=" m-b0"
                                    >
                                      {" "}
                                      {item.title}
                                    </h5>
                                    <p
                                      onInput={(e) => {
                                        // setCurrentCertificate({
                                        //   ...currentCertificate,
                                        //   time: e.currentTarget.textContent,
                                        // });
                                        item.time = e.currentTarget.textContent;
                                      }}
                                      contenteditable="true"
                                      style={{
                                        color: "black",
                                        width: "90%",
                                        position: "relative",
                                        bottom: 2,
                                      }}
                                      className="font-14 "
                                    >
                                      {item.time}
                                    </p>
                                  </Popover>
                                </Popover>
                              </div>
                              <Link
                                to={"#"}
                                data-toggle="modal"
                                data-target="#keyskills"
                                onClick={() => {
                                  formik.values.certificate.splice(item, 1);
                                }}
                                className="site-button add-btn button-sm mt-2"
                                style={{ backgroundColor: "red" }}
                              >
                                <i className="fa fa-trash m-r5"></i> X??a
                              </Link>
                            </div>
                          ))}


                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    id="desired_career_profile_bx"
                    className="job-bx bg-white m-b30"
                  >
                    <div className="d-flex">
                      <h5 className="m-b30">H??? s?? ngh??? nghi???p mong mu???n</h5>
                    </div>

                    <div className="row">
                      <div className="col-lg-6 col-md-6 col-sm-6">
                        {/* <div className="clearfix m-b20">
													<label className="m-b0">C??ng ty</label>
													<span className="clearfix font-13">IT-Software/Software Services</span>
												</div> */}
                        <div className="clearfix m-b20">
                          <label className="m-b0">V??? tr??</label>
                          <Input
                            name="desiredCareer.position"
                            onChange={formik.handleChange}
                            value={formik.values.desiredCareer.position}
                            placeholder="
                        Nh??n vi??n Marketing
                        "
                            className="w-100 border-0 clearfix font-13"
                            prefix={<InfoOutlined />}
                          />
                        </div>
                        <div className="clearfix m-b20">
                          <label className="m-b0">Lo???i c??ng vi???c</label>
                          <Form.Control
                            name="desiredCareer.jobType"
                            onChange={formik.handleChange}
                            value={formik.values.desiredCareer.jobType}
                            as="select"
                          >
                            <option value="FullTime">Full Time</option>
                            <option value="passTime">Part Time</option>
                            <option value="remote">Remote</option>
                          </Form.Control>
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-6">
                        {/* <div className="clearfix m-b20">
													<label className="m-b0">Th???i ??i???m s???n s??ng tham gia</label>
													<span className="clearfix font-13">12 july</span>
												</div> */}
                        <div className="clearfix m-b20">
                          <label className="m-b0">
                            M???c l????ng mong mu???n (VN??)
                          </label>
                          {/* <InputNumber
                            name="desiredCareer.expectedSalary"
                            formatter={(value) =>
                              ` ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ".")
                            }
                            parser={(value) =>
                              value.replace(/[A-Z]|[a-z]|[$ ]|\.+/g, "")
                            }
                            onChange={(value) => {
                              setSalary(value);
                            }}
                            value={salary}
                            // value={`${salary}`?.replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                            className="w-100 border-0 clearfix font-13 createCv__salary"
                            placeholder="10 000 000 VN??"
                          /> */}
                          <Input
                            name="desiredCareer.expectedSalary"
                            onChange={(e) => {
                              setSalary(e.target.value);
                            }}
                            value={salary}
                            type="number"
                            // value={`${salary}`?.replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                            className="w-100 border-0 clearfix font-13 createCv__salary"
                            placeholder="10 000 000 VN??"
                          />
                          {error.expectedSalary && (
                            <span className="text-danger">
                              {error.expectedSalary}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    id="personal_details_bx"
                    className="job-bx bg-white m-b30"
                  >
                    <div className="d-flex">
                      <h5 className="m-b30">Th??ng tin chi ti???t c?? nh??n</h5>
                    </div>

                    <div className="row">
                      <div className="col-lg-6 col-md-6 col-sm-6">
                        <div className="clearfix m-b20">
                          <label className="m-b0">Ng??y sinh</label>
                          <input
                            type="date"
                            name="birthday"
                            onChange={(event) => {
                              if (event.target.value.length >= 11) {
                                event.target.value = 0;
                                return;
                              } else {
                                formik.handleChange(event);
                              }
                            }}
                            value={formik.values.birthday}
                            className="w-100 border-0 clearfix font-13"
                            placeholder="
                            31/07/1998"
                          />
                        </div>
                        {error.birthday && (
                          <span className="text-danger">{error.birthday}</span>
                        )}
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-6">
                        <div className="clearfix m-b20">
                          <label className="m-b0">?????a ch??? th?????ng tr??</label>
                          <Input
                            name="address.detailAddress"
                            onChange={formik.handleChange}
                            value={formik.values.address.detailAddress}
                            className=" font-13"
                            placeholder="
                          Hanoi - VN"
                            prefix={<EnvironmentOutlined />}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div id="it_skills_bx" className="job-bx bg-white m-b30">
                    <div className="d-flex">
                      <h5 className="m-b30">M???c ti??u ngh??? nghi???p</h5>
                    </div>
                    {error.objective && (
                      <span className="text-danger">{error.objective}</span>
                    )}
                    <textarea
                      name="objective"
                      allowClear
                      onChange={formik.handleChange}
                      value={formik.values.objective}
                      className="w-100 clearfix  font-13"
                      placeholder="
                     M???c ti??u trong c??ng vi???c c???a b???n l?? g???"
                    />
                  </div>

                  <div
                    id="personal_details_bx"
                    className="job-bx bg-white m-b30"
                    style={{ display: "none" }}
                  >
                    <div className="d-flex">
                      <h5 className="m-b15">Xem tr?????c CV c???a b???n</h5>
                      <Link
                        to={"#"}
                        onClick={() => setCVPreview(true)}
                        className="site-button add-btn button-sm"
                      >
                        <i className="fa fa-pencil m-r5"></i> Th??m th??ng tin
                      </Link>
                    </div>


                  </div>
                  {disabled ? (
                    <div class="alert alert-warning" role="alert">
                      H??y ??i???n ?????y ????? th??ng tin !
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>
              <div className="saveInfoCV-btn">
                <Button
                  className="site-button"
                  type="button"
                  onClick={handleCreateCv}
                >
                  <i className="fa fa-check-square" aria-hidden="true"></i>
                  &nbsp;Xem tr?????c CV
                </Button>
              </div>
            </div>
          </div>
        </form>
      </div>

      {/* modal */}
      <ModalDesc socialLink={socialLink} setSocialLink={setSocialLink} currentSocialLink={currentSocialLink} setCurrentSocialLink={setCurrentSocialLink} push={formik.values.socialLink.push}></ModalDesc>

      <Modal
        className="modal fade modal-bx-info editor w-100"
        show={onlineprofile}
        onHide={setOnlineProfile}
      >
        <div className="modal-dialog my-0" role="document">
          <form onSubmit={(e) => {
            e.preventDefault()
            e.stopPropagation()
            formik.values.hobby.push(currentHobby);
            setOnlineProfile(false);
          }}>
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">S??? th??ch</h5>
                <button
                  type="button"
                  className="close"
                  onClick={() => setOnlineProfile(false)}
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <p>
                  ????y l?? ??i???u ?????u ti??n g??y ???n t?????ng v???i nh??
                  tuy???n d???ng trong h??? s?? c???a b???n. Vi???t ng???n g???n
                  nh???ng g?? khi???n b???n tr??? n??n ?????c ????o v?? l?? ng?????i
                  ph?? h???p v???i c??ng vi???c m?? b???n ??ang t??m ki???m.
                </p>
                <div className="row">
                  <div className="col-lg-12 col-md-12">
                    <div className="form-group">
                      <label>M?? t??? c??c s??? th??ch: </label>
                      <textarea
                        onChange={(e) =>
                          setCurrentHobby(e.target.value)
                        }
                        style={{ whiteSpace: "pre-wrap" }}
                        className="form-control"
                        placeholder="Vd: ?????c s??ch, du l???ch ..."
                        required
                      ></textarea>
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="site-button"
                  onClick={() => setOnlineProfile(false)}
                >
                  H???y
                </button>
                <button
                  className="site-button"
                >
                  {" "}
                  L??u
                </button>
              </div>
            </div>
          </form>
        </div>
      </Modal>

      <Modal
        className="modal fade modal-bx-info editor w-100"
        show={worksample}
        onHide={setWorkSample}
      >
        <div className="modal-dialog my-0" role="document">
          <form onSubmit={(e) => {
            e.stopPropagation()
            e.preventDefault()
            formik.values.activity.push(
              currentActivity
            );
            setWorkSample(false);
          }}>
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Ho???t ?????ng</h5>
                <button
                  type="button"
                  className="close"
                  onClick={() => setWorkSample(false)}
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="row">
                  <div className="col-lg-12 col-md-12">
                    <div className="form-group">
                      <label>T??n ho???t ?????ng: </label>
                      <input
                        required
                        onChange={(e) =>
                          setCurrentActivity({
                            ...currentActivity,
                            title: e.target.value,
                          })
                        }
                        className="form-control"
                        placeholder="Vd: T??nh nguy???n vi??n"
                      />
                    </div>
                  </div>
                  <div className="col-lg-12 col-md-12 col-xs-12">
                    <div className="form-group">
                      <label>Th???i gian tham gia</label>
                      <RangePicker
                        className="form-control d-flex"
                        onChange={(e, date) => {
                          setCurrentActivity({
                            ...currentActivity,
                            duration: `${moment(date[0])
                              .add(10, "days")
                              .calendar()} - ${moment(
                                date[1]
                              ).calendar()}`,
                          });
                        }}
                      />
                    </div>
                  </div>
                  <div className="col-lg-12 col-md-12">
                    <div className="form-group">
                      <label>????n v??? t??? ch???c</label>
                      <input
                        required
                        onChange={(e) =>
                          setCurrentActivity({
                            ...currentActivity,
                            organization: e.target.value,
                          })
                        }
                        className="form-control"
                        placeholder="Nh??m t??nh nguy???n TSC"
                      />
                    </div>
                  </div>

                  <div className="col-lg-12 col-md-12">
                    <div className="form-group">
                      <label>M?? t???: </label>
                      <textarea
                        required
                        onChange={(e) =>
                          setCurrentActivity({
                            ...currentActivity,
                            description: e.target.value,
                          })
                        }
                        className="form-control"
                        placeholder="Gi??p ????? s??ch v???, qu???n ??o cho tr??? em v??ng cao"
                      ></textarea>
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="site-button"
                  onClick={() => setWorkSample(false)}
                >
                  H???y
                </button>
                <button
                  className="site-button"
                >
                  L??u
                </button>
              </div>
            </div>
          </form>
        </div>
      </Modal>

      <Modal
        className="modal fade modal-bx-info editor w-100"
        show={certification}
        onHide={setCertification}
      >
        <div className="modal-dialog my-0" role="document">
          <form onSubmit={(e) => {
            e.preventDefault()
            e.stopPropagation()
            formik.values.certificate.push(
              currentCertificate
            );
            setCertification(false);
          }}>
            <div className="modal-content">
              <div className="modal-header">
                <h5
                  className="modal-title"
                  id="CertificationModalLongTitle"
                >
                  Ch???ng ch???
                </h5>
                <button
                  type="button"
                  className="close"
                  onClick={() => setCertification(false)}
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <p>
                  ????y l?? ??i???u ?????u ti??n g??y ???n t?????ng v???i nh??
                  tuy???n d???ng trong h??? s?? c???a b???n. Th??m v??o
                  ch???ng ch???, gi???i th?????ng khi???n b???n tr??? n??n ?????c
                  ????o v?? l?? ng?????i ph?? h???p v???i c??ng vi???c m?? b???n
                  ??ang t??m ki???m.
                </p>
                <div className="row">
                  <div className="col-lg-12 col-md-12">
                    <div className="form-group">
                      <label>T??n ch???ng ch???</label>
                      <input
                        required
                        onChange={(e) =>
                          setCurrentCertificate({
                            ...currentCertificate,
                            title: e.target.value,
                          })
                        }
                        type="text"
                        className="form-control"
                        placeholder="Nh???p v??o ti??u ?????"
                      />
                    </div>
                  </div>
                  <div className="col-lg-12 col-md-12">
                    <div className="form-group">
                      <label>T???i th???i ??i???m</label>
                      <input
                        required
                        onChange={(e) =>
                          setCurrentCertificate({
                            ...currentCertificate,
                            time: e.target.value,
                          })
                        }
                        className="form-control"
                        placeholder="Nh???p th???i ??i???m"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="site-button"
                  onClick={() => setCertification(false)}
                >
                  H???y
                </button>
                <button
                  className="site-button"
                >
                  L??u
                </button>
              </div>
            </div>
          </form>
        </div>
      </Modal>

      <Modal
        className="modal fade modal-bx-info editor w-100"
        show={education}
        onHide={setEducation}
      >
        <div className="modal-dialog my-0" role="document">
          <form onSubmit={(e) => {
            e.stopPropagation()
            e.preventDefault()
            formik.values.education.push(currentEducation);
            setEducation(false);
          }}>
            <div className="modal-content">
              <div className="modal-header">
                <h5
                  className="modal-title"
                  id="EducationModalLongTitle"
                >
                  H???c v???n
                </h5>
                <button
                  type="button"
                  className="close"
                  onClick={() => setEducation(false)}
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="row">
                  <div className="col-lg-12 col-md-12">
                    <div className="form-group">
                      <label>Chuy??n ng??nh: </label>
                      <input
                        required
                        onChange={(e) =>
                          setCurrentEducation({
                            ...currentEducation,
                            major: e.target.value,
                          })
                        }
                        className="form-control"
                        placeholder="Vd: C??ng ngh??? th??ng tin"
                      />
                    </div>
                  </div>
                  <div className="col-lg-12 col-md-12 col-xs-12">
                    <div className="form-group">
                      <label>Th???i gian h???c:</label>
                      <RangePicker
                        required
                        className="form-control d-flex"
                        onChange={(e, date) => {
                          setCurrentEducation({
                            ...currentEducation,
                            duration: `${moment(date[0]).format(
                              "DD-MM-YYYY"
                            )} - ${moment(date[1]).format(
                              "DD-MM-YYYY"
                            )}`,
                          });
                        }}
                      />
                    </div>
                  </div>
                  <div className="col-lg-12 col-md-12">
                    <div className="form-group">
                      <label>Theo h???c t???i: </label>
                      <input required
                        onChange={(e) =>
                          setCurrentEducation({
                            ...currentEducation,
                            school: e.target.value,
                          })
                        }
                        className="form-control"
                        placeholder="Vd: HUTECH"
                      />
                    </div>
                  </div>
                  <div className="col-lg-12 col-md-12">
                    <div className="form-group">
                      <label>X???p lo???i: </label>
                      <input required
                        onChange={(e) =>
                          setCurrentEducation({
                            ...currentEducation,
                            level: e.target.value,
                          })
                        }
                        className="form-control"
                        placeholder="Vd: Gi???i"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="site-button"
                  onClick={() => setEducation(false)}
                >
                  H???y
                </button>
                <button
                  className="site-button"
                >
                  L??u
                </button>
              </div>
            </div>
          </form>
        </div>
      </Modal>

      <Modal
        className="modal fade modal-bx-info editor w-100"
        show={projects}
        onHide={setProjects}
      >
        <div className="modal-dialog my-0" role="document">
          <form
            onSubmit={(e) => {
              e.preventDefault()
              e.stopPropagation()
              formik.values.workExperience.push(
                currentWorkExperience
              );

              setProjects(false);
            }}>
            <div className="modal-content">
              <div className="modal-header">
                <h5
                  className="modal-title"
                  id="ProjectsModalLongTitle"
                >
                  Kinh nghi???m l??m vi???c
                </h5>
                <button
                  type="button"
                  className="close"
                  onClick={() => setProjects(false)}
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="row">
                  <div className="col-lg-12 col-md-12">
                    <div className="form-group">
                      <label>V??? tr?? c??ng vi???c</label>
                      <input
                        required
                        onChange={(e) =>
                          setCurrentWorkExperience({
                            ...currentWorkExperience,
                            position: e.target.value,
                          })
                        }
                        className="form-control"
                        placeholder="Vd: Nh??n vi??n Marketing"
                        name="name"
                      />
                    </div>
                  </div>
                  <div className="col-lg-12 col-md-12 col-xs-12">
                    <div className="form-group">
                      <label>Th???i gian l??m vi???c</label>

                      <RangePicker
                        required
                        className="form-control d-flex"
                        onChange={(e, date) => {
                          setCurrentWorkExperience({
                            ...currentWorkExperience,
                            duration: `${moment(date[0]).format(
                              "DD-MM-YYYY"
                            )} - ${moment(date[1]).format(
                              "DD-MM-YYYY"
                            )}`,
                          });
                        }}
                      />
                    </div>
                  </div>
                  <div className="col-lg-12 col-md-6">
                    <div className="form-group">
                      <label>L??m vi???c t???i: </label>
                      <input
                        required
                        onChange={(e) =>
                          setCurrentWorkExperience({
                            ...currentWorkExperience,
                            companyName: e.target.value,
                          })
                        }
                        className="form-control"
                        placeholder="Vd: VinGroup"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="site-button"
                  onClick={() => setProjects(false)}
                >
                  H???y
                </button>
                <button
                  className="site-button"
                >
                  L??u
                </button>
              </div>
            </div>
          </form>
        </div>
      </Modal>


      <Modal
        show={cvPreview}
        onHide={setCVPreview}
        className="modal fade modal-bx-info editor"
      >
        <div className="modal-dialog my-0 " role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5
                className="modal-title"
                id="EmploymentModalLongTitle"
              >
                Xem tr?????c CV c???a b???n
              </h5>
              <button
                type="button"
                className="close"
                onClick={() => setCVPreview(false)}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="CV-content__preview">
                <div id="CV-content">
                  <CVTemplate value={formik.values} />
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <Button
                variant="danger"
                type="button"
                className="cancel-cv__btn"
                onClick={() => setCVPreview(false)}
              >
                H???y
              </Button>
              <button
                type="button"
                className="site-button download-cv__btn"
                onClick={() => {
                  pdfGenerate(formik.values.lastName);
                }}
              >
                <i class="fa fa-download" aria-hidden="true"></i>
                &nbsp; &nbsp;T???i xu???ng CV
              </button>
              <button
                type="submit"
                className="site-button"
                onClick={() => {
                  formik.handleSubmit();
                }}
              >
                <i class="fa fa-floppy-o" aria-hidden="true"></i>
                &nbsp; &nbsp;L??u l???i CV
              </button>
            </div>
          </div>
        </div>
      </Modal>

      <Modal
        show={socialLink}
        onHide={setSocialLink}
        className="modal fade modal-bx-info editor w-100"
      >
        <div className="modal-dialog my-0" role="document">
          <form
            onSubmit={(e) => {
              e.preventDefault()
              e.stopPropagation()
              formik.values.socialLink.push(
                currentSocialLink
              );
              setSocialLink(false);
            }}>
            <div className="modal-content">
              <div className="modal-header">
                <h5
                  className="modal-title"
                  id="KeyskillsModalLongTitle"
                >
                  Social Link
                </h5>
                <button
                  type="button"
                  className="close"
                  onClick={() => setSocialLink(false)}
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <p>
                  ????y l?? ??i???u ?????u ti??n g??y ???n t?????ng v???i nh?? tuy???n
                  d???ng trong h??? s?? c???a b???n. Th??m v??o k??? n??ng v??n
                  ph??ng, ng??n ng??? khi???n b???n tr??? n??n ?????c ????o v?? l??
                  ng?????i ph?? h???p v???i c??ng vi???c m?? b???n ??ang t??m ki???m.
                </p>
                <div className="row">
                  <div className="col-lg-12 col-md-12">
                    <div className="form-group">
                      <label>Ti??u ?????: </label>
                      <input
                        required
                        onChange={(e) =>
                          setCurrentSocialLink({
                            ...currentSocialLink,
                            title: e.target.value,
                          })
                        }
                        className="form-control"
                        placeholder="Vd: Facebook"
                      />
                    </div>
                  </div>
                  <div className="col-lg-12 col-md-12">
                    <div className="form-group">
                      <label>Link li??n k???t: </label>
                      <textarea
                        required
                        onChange={(e) =>
                          setCurrentSocialLink({
                            ...currentSocialLink,
                            link: e.target.value,
                          })
                        }
                        className="form-control"
                        placeholder="https://www.facebook.com/"
                      ></textarea>
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="site-button"
                  onClick={() => setSocialLink(false)}
                >
                  Cancel
                </button>
                <button
                  className="site-button"
                >
                  Save
                </button>
              </div>
            </div>
          </form>
        </div>
      </Modal>
      <Footer />
    </>
  );
}
export default Jobmyresume;
