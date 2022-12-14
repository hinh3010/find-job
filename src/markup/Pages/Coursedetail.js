import React, { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import Header from "./../Layout/Header";
import Footer from "./../Layout/Footer";
import { Modal, Form } from "react-bootstrap";
import PageTitle from "./../Layout/PageTitle";
import "./../../css/custom.css";
import { useDispatch, useSelector } from "react-redux";
import { getDetailCoursesAction } from "../../store/actions/Course/CourseActions";
import moment from "moment";
import { useFormik } from "formik";
import { getProviceById } from "../../services/ProvinceService/ProvinceService";
import { confirmedSignupAction } from "../../store/actions/AuthActions";
import { registerCourseApplication } from "../../services/CourseApplicationServices/CourseApplicationServices";
import { getCheckRegister } from "../../services/CourseApplicationServices/CourseApplicationServices";
import swal from "sweetalert";
import { message, Button } from "antd";
import { getAllBank } from "../../services/BankService/BankService";

const { warning } = message;
const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
const regexPhone =
  /^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/;
const regexp = /^\d{12,13}$/;
const regexp2 = /^\d{10,11}$/;

var bnr = require("./../../images/banner/bnr1.jpg");

const blogGrid = [
  {
    image: require("./../../images/blog/grid/pic1.jpg"),
  },
  {
    image: require("./../../images/blog/grid/pic2.jpg"),
  },
  {
    image: require("./../../images/blog/grid/pic3.jpg"),
  },
  {
    image: require("./../../images/blog/grid/pic4.jpg"),
  },
];

function Coursedetail() {
  const { user, accessToken } = useSelector((state) => state.auth.auth);
  const [error, setError] = useState({});
  const [allBank, setAllBank] = useState([]);
  const history = useHistory();
  const [basicdetails, setBasicDetails] = useState(false);
  // const [isFree, setIsFree] = useState(false);
  const [showCreditInfo, setShowCreditInfo] = useState(false);
  const [currentAddress, setCurrentAddress] = useState({});
  const [checkRegister, setCheckRegister] = useState();
  const { id } = useParams();
  const dispatch = useDispatch();
  const getDetailCourse = (id) => {
    const action = getDetailCoursesAction(id);
    dispatch(action);
  };
  const { currentCourse, courses } = useSelector(
    (state) => state.CourseReducer
  );

  const isFree = currentCourse?.cost === 0 ? true : false;

  let provinceId = currentCourse?.address?.provinceId;

  const validate = (values) => {
    let errors = {};
    let error = false;

    if (!values.email) {
      errors.email = "Kh??ng ???????c ????? tr???ng";
      error = true;
    } else if (!regex.test(values.email)) {
      errors.email = "Email kh??ng h???p l???";
      error = true;
    }
    if (!values.bankAccount) {
      errors.bankAccount = "Kh??ng ???????c ????? tr???ng";
      error = true;
    }
    if (!values.phone) {
      errors.phone = "Kh??ng ???????c ????? tr???ng";
      error = true;
    } else if (!regexPhone.test(values.phone)) {
      errors.phone = "S??? ??i???n tho???i kh??ng h???p l???.";
      error = true;
    }
    // if (!values.tranferMessage) {
    //   errors.tranferMessage = "Kh??ng ???????c ????? tr???ng";
    //   error = true;
    // }
    if (!values.fullname) {
      errors.fullname = "Kh??ng ???????c ????? tr???ng";
      error = true;
    }
    return errors;
  };
  const formik = useFormik({
    initialValues: {
      courseId: currentCourse?.id,
      fullname: user.fullName || "",
      phone: "",
      email: user?.email || "",
      bankName: "MBBank",
      bankAccount: "",
      tranferMessage: "",
      cost: currentCourse?.cost,
    },
    onSubmit: async (values) => {
      setError(validate(values));
      values.courseId = currentCourse.id;
      values.tranferMessage = currentCourse?.transferSyntax;
      let errors = {};
      let error = false;

      if (!values.email) {
        errors.email = "Kh??ng ???????c ????? tr???ng";
        error = true;
      } else if (!regex.test(values.email)) {
        errors.email = "Email kh??ng h???p l???";
        error = true;
      }
      if (!isFree) {
        if (!values.bankAccount) {
          errors.bankAccount = "Kh??ng ???????c ????? tr???ng";
          error = true;
        }
      }
      if (!values.phone) {
        errors.phone = "Kh??ng ???????c ????? tr???ng";
        error = true;
      } else if (!regexPhone.test(values.phone)) {
        errors.phone = "S??? ??i???n tho???i kh??ng h???p l???.";
        error = true;
      }
      // if (!values.tranferMessage) {
      //   errors.tranferMessage = "Kh??ng ???????c ????? tr???ng";
      //   error = true;
      // }
      if (!values.fullname) {
        errors.fullname = "Kh??ng ???????c ????? tr???ng";
        error = true;
      }

      setError(errors);

      if (error) {
        return;
      }

      try {
        const result = await registerCourseApplication(
          values,
          accessToken.token
        );
        swal(
          "Th??nh C??ng!",
          "????ng k?? kh??a h???c th??nh c??ng, vui l??ng ch??? ki???m tra thanh to??n!",
          "success"
        ).then((value) => {
          history.push("/course-registered");
        });
      } catch (e) {
        swal("Th???t b???i!", "Vui l??ng ki???m tra l???i th??ng tin", "error");
      }
    },
  });

  formik.values.cost = currentCourse.cost;

  useEffect(() => {
    getDetailCourse(id);
  }, []);

  useEffect(() => {
    getProviceById(provinceId)
      .then((res) => {
        setCurrentAddress(res.data);
      })
      .catch((error) => {
        console.error(error);
      });

    getAllBank()
      .then((res) => {
        setAllBank(res.data.docs);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [provinceId]);

  useEffect(() => {
    const fetch = getCheckRegister({ createdById: user.id, courseId: id });
    fetch
      .then((response) => {
        setCheckRegister(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <Header />
      <div className="page-content bg-white">
        <div
          className="dez-bnr-inr overlay-black-middle"
          style={{ backgroundImage: "url(" + bnr + ")" }}
        >
          <PageTitle activeName="Chi ti???t kh??a h???c" motherName="Trang ch???" />
        </div>
        <form onSubmit={formik.handleSubmit} className="content-block">
          <div className="section-full content-inner-1">
            <div className="container">
              <div className="row">
                <div className="col-lg-4">
                  <div className="sticky-top">
                    <div className="row">
                      <div className="col-lg-12 col-md-6">
                        <div className="m-b30">
                          <img
                            src={require("./../../images/blog/grid/pic1.jpg")}
                            alt=""
                          />
                        </div>
                      </div>
                      <div className="col-lg-12 col-md-6">
                        <div className="widget bg-white p-lr20 p-t20  widget_getintuch radius-sm">
                          <h4 className="text-black font-weight-700 p-t10 m-b15">
                            Chi ti???t kh??a h???c
                          </h4>
                          <ul>
                            <li>
                              <i className="ti-location-pin"></i>
                              <strong className="font-weight-700 text-black">
                                ?????a ch???
                              </strong>
                              <span className="text-black-light">
                                {" "}
                                {currentAddress.name} , Vi???t Nam{" "}
                              </span>
                            </li>
                            <li>
                              <i className="ti-money"></i>
                              <strong className="font-weight-700 text-black">
                                H???c ph??
                              </strong>{" "}
                              {currentCourse.cost}
                            </li>
                            <li>
                              <i className="ti-shield"></i>
                              <strong className="font-weight-700 text-black">
                                Th??? lo???i
                              </strong>
                              {currentCourse?.type?.toUpperCase()}
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-8">
                  <div className="job-info-box">
                    <h3 className="m-t0 m-b10 font-weight-700 title-head">
                      <Link to={"#"} className="text-secondry m-r30">
                        {currentCourse.title}
                      </Link>
                    </h3>
                    <ul className="job-info">
                      {/* <li><strong>Education</strong> Web Designer</li> */}
                      <li>
                        <strong>Th???i gian:</strong>{" "}
                        {moment(currentCourse?.createdAt).format("Do/MM/YYYY")}
                      </li>
                      <li>
                        <i className="ti-location-pin text-black m-r5"></i> H??
                        N???i{" "}
                      </li>
                    </ul>
                    <p className="p-t20" style={{ whiteSpace: "pre-wrap" }}>
                      {currentCourse.description}
                    </p>
                    <h5 className="font-weight-600">T???ng quan kh??a h???c</h5>
                    <div className="dez-divider divider-2px bg-gray-dark mb-4 mt-0"></div>
                    <p style={{ whiteSpace: "pre-wrap" }}>
                      {currentCourse.introduction}
                    </p>
                    <h5 className="font-weight-600">Y??u c???u</h5>
                    <div className="dez-divider divider-2px bg-gray-dark mb-4 mt-0"></div>
                    <ul className="list-num-count no-round">
                      {currentCourse.requirement?.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                    {/* <Link to={"/jobs-applied-job"} className="site-button">????ng k??</Link> */}
                    <Button
                      className="site-button"
                      disabled={checkRegister?.docs.length !== 0 || Date.parse(currentCourse?.createdAt) < Date.now() ? true : false}
                      variant="danger"
                      onClick={() => setBasicDetails(true)}
                    >
                      <i
                        className="fa fa-check-square-o"
                        aria-hidden="true"
                      ></i>
                      &nbsp; &nbsp;{" "}
                      {checkRegister?.docs.length !== 0
                        ? "B???n ???? ????ng k?? kh??a h???c"
                        : Date.parse(currentCourse?.createdAt) < Date.now()  ? 'H???t th???i gian ????ng k??'
                        : "????ng k?? tham gia kh??a h???c"}
                    </Button>
                    <Modal
                      className="modal fade browse-job modal-bx-info editor"
                      show={basicdetails}
                      onHide={setBasicDetails}
                    >
                      <form
                        onSubmit={formik.handleSubmit}
                        className="modal-dialog my-0"
                        role="document"
                      >
                        <div className="modal-content">
                          <div className="modal-header">
                            <h5
                              className="modal-title"
                              id="ProfilenameModalLongTitle"
                            >
                              Th??ng tin b??n cung c???p kh??a h???c
                            </h5>
                            <button
                              type="button"
                              className="close"
                              onClick={() => setBasicDetails(false)}
                            >
                              <span aria-hidden="true">&times;</span>
                            </button>
                          </div>
                          <div className="modal-body">
                            <form>
                              <div className="row">
                                {currentCourse?.cost !== 0 ? (
                                  <>
                                    <div className="col-lg-12 col-md-12 h5-justify-space">
                                      <h5 className="modal-title">
                                        Th??ng tin b??n cung c???p kh??a h???c
                                      </h5>
                                    </div>

                                    <div className="col-lg-6 col-md-6">
                                      <div className="form-group">
                                        <label>T??n ng??n h??ng</label>
                                        <Form.Control as="select">
                                          <option>
                                            {currentCourse?.bankName}
                                          </option>
                                        </Form.Control>
                                      </div>
                                    </div>

                                    <div className="col-lg-6 col-md-6">
                                      <div className="form-group">
                                        <label>
                                          S??? t??i kho???n b??n cung c???p kh??a h???c
                                        </label>
                                        <input
                                          type="text"
                                          readOnly
                                          name="currentCourse.bankAccount"
                                          value={`${currentCourse.bankAccount}`}
                                          className="form-control"
                                          placeholder={`${currentCourse.bankAccount}`}
                                        />
                                      </div>
                                    </div>
                                    <div className="col-lg-12 col-md-12">
                                      <div className="form-group">
                                        <label>Chi nh??nh</label>
                                        <input
                                          type="text"
                                          readOnly
                                          name="currentCourse.bankDivision"
                                          value={`${currentCourse.bankDivision}`}
                                          className="form-control"
                                          placeholder={`${currentCourse.bankDivision}`}
                                        />
                                      </div>
                                    </div>
                                    <div className="col-lg-6 col-md-6">
                                      <div className="form-group">
                                        <label>Gi?? kh??a h???c</label>
                                        <input
                                          type="text"
                                          readOnly
                                          name="currentCourse.cost"
                                          value={`${currentCourse.cost}`}
                                          className="form-control"
                                          placeholder={`${currentCourse.cost}`}
                                        />
                                      </div>
                                    </div>
                                    <div className="col-lg-6 col-md-6">
                                      <div className="form-group">
                                        <label>T??n ch??? t??i kho???n</label>
                                        <input
                                          type="text"
                                          readOnly
                                          name="currentCourse.bankAccountName"
                                          value={`${currentCourse.bankAccountName}`}
                                          className="form-control"
                                          placeholder={`${currentCourse.bankAccountName}`}
                                        />
                                      </div>
                                    </div>
                                    <div className="col-lg-12 col-md-12">
                                      <div className="form-group">
                                        <label>N???i dung chuy???n kho???n</label>
                                        <textarea
                                          name="tranferMessage"
                                          readOnly
                                          placeholder={
                                            currentCourse?.transferSyntax
                                          }
                                          onChange={formik.handleChange}
                                          value={formik.values.tranferMessage}
                                          className="form-control"
                                        ></textarea>
                                      </div>
                                      {error.tranferMessage && (
                                        <span className="text-danger">
                                          {error.tranferMessage}
                                        </span>
                                      )}
                                    </div>
                                  </>
                                ) : null}

                                <div
                                  style={
                                    currentCourse?.cost === 0 || showCreditInfo
                                      ? { display: "block" }
                                      : { display: "none" }
                                  }
                                  className="col-lg-12 col-md-12"
                                >
                                  <div className="form-group">
                                    <label>H??? t??n</label>
                                    <input
                                      onChange={formik.handleChange}
                                      name="fullname"
                                      type="text"
                                      className="form-control"
                                      value={formik.values.fullname}
                                      placeholder="Vd: Nguy???n V??n A"
                                    />
                                  </div>
                                </div>
                                <div
                                  style={
                                    currentCourse?.cost === 0 || showCreditInfo
                                      ? { display: "block" }
                                      : { display: "none" }
                                  }
                                  className="col-lg-6 col-md-6"
                                >
                                  <div className="form-group">
                                    <label>S??? ??i???n tho???i</label>
                                    <input
                                      type="tel"
                                      name="phone"
                                      className="form-control"
                                      onChange={formik.handleChange}
                                      value={formik.values.phone}
                                      placeholder=""
                                    />
                                  </div>
                                  {error.phone && (
                                    <span className="text-danger">
                                      {error.phone}
                                    </span>
                                  )}
                                </div>
                                <div
                                  style={
                                    currentCourse?.cost === 0 || showCreditInfo
                                      ? { display: "block" }
                                      : { display: "none" }
                                  }
                                  className="col-lg-6 col-md-6"
                                >
                                  <div className="form-group">
                                    <label>Email</label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      name="email"
                                      placeholder="abc@example.com"
                                      onChange={formik.handleChange}
                                      value={formik.values.email}
                                    />
                                  </div>
                                </div>

                                {isFree ? (
                                  ""
                                ) : (
                                  <div
                                    style={
                                      currentCourse?.cost === 0 ||
                                      showCreditInfo
                                        ? { display: "block" }
                                        : { display: "none" }
                                    }
                                    className="col-lg-6 col-md-6"
                                  >
                                    <div className="form-group">
                                      <label>T??n ng??n h??ng</label>
                                      <Form.Control
                                        onChange={formik.handleChange}
                                        value={formik.values.bankName}
                                        as="select"
                                        name="bankName"
                                      >
                                        {allBank?.map((item, index) => {
                                          return (
                                            <option key={index} value={item.id}>
                                              {item.bankShortName}
                                            </option>
                                          );
                                        })}
                                      </Form.Control>
                                    </div>
                                  </div>
                                )}

                                {isFree ? (
                                  ""
                                ) : (
                                  <div
                                    style={
                                      currentCourse?.cost === 0 ||
                                      showCreditInfo
                                        ? { display: "block" }
                                        : { display: "none" }
                                    }
                                    className="col-lg-6 col-md-6"
                                  >
                                    <div className="form-group">
                                      <label>S??? t??i kho???n</label>
                                      <input
                                        name="bankAccount"
                                        onChange={formik.handleChange}
                                        value={formik.values.bankAccount}
                                        type="text"
                                        className="form-control"
                                        placeholder=""
                                      />
                                    </div>
                                    {error.bankAccount && (
                                      <span className="text-danger">
                                        {error.bankAccount}
                                      </span>
                                    )}
                                  </div>
                                )}
                              </div>
                            </form>
                          </div>
                          <div className="modal-footer">
                            <button
                              type="button"
                              className="site-button"
                              onClick={() => setBasicDetails(false)}
                            >
                              Tho??t
                            </button>
                            <button
                              type="button"
                              className="site-button"
                              style={
                                currentCourse?.cost === 0 || showCreditInfo
                                  ? { display: "none" }
                                  : { display: "block" }
                              }
                              onClick={() => setShowCreditInfo(true)}
                            >
                              ????ng k??
                            </button>
                            <button
                              type="submit"
                              className="site-button"
                              style={
                                currentCourse?.cost === 0 || showCreditInfo
                                  ? { display: "block" }
                                  : { display: "none" }
                              }
                            >
                              X??c nh???n v?? ????ng k??
                            </button>
                          </div>
                        </div>
                      </form>
                    </Modal>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <div className="section-full content-inner">
            <div className="container">
              <div className="row">
                {blogGrid.map((item, index) => (
                  <div className="col-xl-3 col-lg-6 col-md-6" key={index}>
                    <div className="m-b30 blog-grid">
                      <div className="dez-post-media dez-img-effect ">
                        {" "}
                        <Link to={"/blog-details"}>
                          <img src={item.image} alt="" />
                        </Link>{" "}
                      </div>
                      <div className="dez-info p-a20 border-1">
                        <div className="dez-post-title ">
                          <h5 className="post-title">
                            <Link to={"/blog-details"}>Title of blog post</Link>
                          </h5>
                        </div>
                        <div className="dez-post-meta ">
                          <ul>
                            <li className="post-date">
                              {" "}
                              <i className="ti-location-pin"></i> London{" "}
                            </li>
                            <li className="post-author">
                              <i className="ti-user"></i>By{" "}
                              <Link to={"#"}>Jone</Link>{" "}
                            </li>
                          </ul>
                        </div>
                        <div className="dez-post-text">
                          <p>
                            All the Lorem Ipsum generators on the Internet tend
                            to repeat predefined chunks.
                          </p>
                        </div>
                        <div className="dez-post-readmore">
                          <Link
                            to={"/blog-details"}
                            title="READ MORE"
                            rel="bookmark"
                            className="site-button-link"
                          >
                            <span className="fw6">READ MORE</span>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div> */}
        </form>
      </div>
      <Footer />
    </>
  );
}
export default Coursedetail;
