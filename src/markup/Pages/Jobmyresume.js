import React, { useState } from "react";
import { Link } from "react-router-dom";
import Header from "./../Layout/Header";
import Footer from "./../Layout/Footer";
import { Form, Modal } from "react-bootstrap";
import Listingsidebar from "./../Element/Listingsidebar";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { updateUsers } from "../../services/UserServices/UserServices";
import { updateUserAction } from "../../store/actions/AuthActions";
import swal from "sweetalert";
import { BASE_URL } from "../../config/BASE_URL";
import Loading from "../Element/Loading";
import { InputNumber } from "antd";

var bnr = require("./../../images/banner/bnr1.jpg");

function Jobmyresume() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [resume, setResume] = useState(false);
  const [keyskill, setKeyskill] = useState(false);
  const [education, setEducation] = useState(false);
  const [projects, setProjects] = useState(false);
  const [onlineprofile, setOnlineProfile] = useState(false);
  const [worksample, setWorkSample] = useState(false);
  const [certification, setCertification] = useState(false);
  const [careerprofile, setCareerProfile] = useState(false);
  const [personaldetails, setPersonalDetails] = useState(false);
  const [id, setId] = useState(null);

  const { auth } = useSelector((state) => state.auth);
  const user = auth.user;

  const [titleIntroduce, setTitleIntroduce] = useState(user.introduction);

  const [skillName, setSkillName] = useState("");
  const [skillDescription, setSkillDescription] = useState("");

  const skillArray = user.skill?.map((item, index) => {
    return {
      skillName: item.skillName,
      description: item.description,
    };
  });

  const [school, setSchool] = useState("");
  const [major, setMajor] = useState("");
  const [duration, setDuration] = useState("");
  const [level, setLevel] = useState("");

  const educationArray = user.education?.map((item, index) => {
    return {
      school: item?.school,
      major: item?.major,
      duration: item?.duration,
      level: item?.level,
    };
  });

  const [companyName, setCompanyName] = useState("");
  const [position, setPosition] = useState("");
  const [durationWorkExperience, setDurationWorkExperience] = useState("");

  const workExperienceArray = user.workExperience?.map((item, index) => {
    return {
      companyName: item.companyName,
      position: item.position,
      duration: item.duration,
    };
  });

  const [titleHobby, setTitleHobby] = useState("");

  const [titleActivity, setTitleActivity] = useState("");
  const [descriptionActivity, setDescriptionActivity] = useState("");
  const [organization, setOrganization] = useState("");
  const [durationActivity, setDurationActivity] = useState("");

  const activityArray = user.activity?.map((item, index) => {
    return {
      title: item.title,
      description: item.description,
      organization: item.organization,
      duration: item.duration,
    };
  });

  const [titleCertificate, setTitleCertificate] = useState("");
  const [timeCertificate, setTimeCertificate] = useState("");

  const certificateArray = user.certificate?.map((item, index) => {
    return {
      title: item.title,
      time: item.time,
    };
  });

  const [jobType, setJobType] = useState(user.desiredCareer?.jobType);
  const [salary, setSalary] = useState(user.desiredCareer?.expectedSalary);
  const [birthday, setBirthday] = useState(user.birthday);
  const [address, setAddress] = useState(user.address?.detailAddress);
  const [gender, setGender] = useState(user.gender);

  const onUpdate = (data) => {
    setLoading(true);
    updateUsers(user.id, data, auth.accessToken.token).then((response) => {
      dispatch(updateUserAction(response.data));
      const userDetail = { ...auth, user: response.data };
      localStorage.setItem("userDetail", JSON.stringify(userDetail));
      setLoading(false);
    });
  };

  return (
    <>
      {loading === true && <Loading />}
      <Header />
      <div className="page-content">
        <div
          className="overlay-black-dark profile-edit p-t50 p-b20"
          style={{ backgroundImage: "url(" + bnr + ")" }}
        >
          <div className="container">
            <div className="row">
              <div className="col-lg-8 col-md-7 candidate-info">
                <div className="candidate-detail">
                  <div className="canditate-des text-center">
                    <span>
                      {user?.avatarUrl?.indexOf("https://") === -1 ? (
                        <img alt="" src={`${BASE_URL}/${user?.avatarUrl}`} />
                      ) : (
                        <img alt="" src={user?.avatarUrl} />
                      )}
                    </span>
                  </div>
                  <div className="text-white browse-job text-left">
                    <h4 className="m-b0">{user.fullName}</h4>
                    <p className="m-b15">
                      Freelance Senior PHP Developer at various agencies
                    </p>
                    <ul className="clearfix">
                      <li>
                        <i className="ti-location-pin"></i>{" "}
                        {user?.address?.detailAddress}
                      </li>
                      <li>
                        <i className="ti-mobile"></i> {user?.phone}
                      </li>
                      <li>
                        <i className="ti-briefcase"></i>{" "}
                        {user?.desiredCareer?.position}
                      </li>
                      <li>
                        <i className="ti-email"></i> {user?.email}
                      </li>
                    </ul>
                    <div className="progress-box m-t10">
                      <div className="progress-info">
                        Profile Strength (Average)<span>70%</span>
                      </div>
                      <div className="progress">
                        <div
                          className="progress-bar bg-primary"
                          style={{ width: "80%" }}
                          role="progressbar"
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-5">
                <Link to={"#"}>
                  <div className="pending-info text-white p-a25">
                    <h5>H??nh ?????ng ??ang ch???</h5>
                    <ul className="list-check secondry">
                      <li>X??c th???c b???ng s??? ??i???n tho???i</li>
                      <li>Th??m ?????a ??i???m c??ng vi???c ??u ti??n</li>
                      <li>Th??m v??o h??? s??</li>
                    </ul>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="content-block">
          <div className="section-full browse-job content-inner-2">
            <div className="container">
              <div className="row">
                <div className="col-xl-3 col-lg-4 col-md-4 col-sm-12 m-b30">
                  <Listingsidebar />
                </div>
                <div className="col-xl-9 col-lg-8 col-md-8 col-sm-12">
                  <div
                    id="resume_headline_bx"
                    className=" job-bx bg-white m-b30"
                  >
                    <div className="d-flex">
                      <h5 className="m-b15">Gi???i thi???u</h5>
                      <Link
                        to={"#"}
                        className="site-button add-btn button-sm"
                        onClick={() => setResume(true)}
                      >
                        <i className="fa fa-pencil m-r5"></i> Ch???nh s???a
                      </Link>
                    </div>
                    <div className="d-flex align-items-center mt-2">
                      <div className="job-time mr-auto">
                        <p
                          style={{ whiteSpace: "pre-wrap" }}
                          className="m-b0 h-auto"
                        >
                          {user.introduction}
                        </p>
                      </div>
                    </div>

                    <Modal
                      show={resume}
                      onHide={setResume}
                      className="modal fade modal-bx-info editor"
                    >
                      <div className="modal-dialog my-0" role="document">
                        <div className="modal-content">
                          <div className="modal-header">
                            <h5
                              className="modal-title"
                              id="ResumeheadlineModalLongTitle"
                            >
                              Gi???i thi???u
                            </h5>
                            <button
                              type="button"
                              className="close"
                              onClick={() => setResume(false)}
                            >
                              <span aria-hidden="true">&times;</span>
                            </button>
                          </div>
                          <div className="modal-body">
                            <p>
                              ????y l?? ??i???u ?????u ti??n g??y ???n t?????ng v???i nh?? tuy???n
                              d???ng trong h??? s?? c???a b???n. Vi???t ng???n g???n nh???ng g??
                              khi???n b???n tr??? n??n ?????c ????o v?? l?? ng?????i ph?? h???p v???i
                              c??ng vi???c m?? b???n ??ang t??m ki???m.
                            </p>
                            <form>
                              <div className="row">
                                <div className="col-lg-12 col-md-12">
                                  <div className="form-group">
                                    <textarea
                                      onChange={(event) => {
                                        setTitleIntroduce(event.target.value);
                                      }}
                                      value={titleIntroduce}
                                      className="form-control"
                                      placeholder="Vi???t m?? t???"
                                      name="desc"
                                    ></textarea>
                                  </div>
                                </div>
                              </div>
                            </form>
                          </div>
                          <div className="modal-footer">
                            <button
                              type="button"
                              className="site-button"
                              onClick={() => setResume(false)}
                            >
                              H???y
                            </button>
                            <button
                              onClick={() => {
                                onUpdate({
                                  accountType: "APPLICANT",
                                  introduction: titleIntroduce,
                                });
                                setResume(false);
                              }}
                              type="button"
                              className="site-button"
                            >
                              L??u
                            </button>
                          </div>
                        </div>
                      </div>
                    </Modal>
                  </div>
                  <div id="key_skills_bx" className="job-bx bg-white m-b30">
                    <div className="d-flex">
                      <h5 className="m-b15">K??? n??ng</h5>
                      <Link
                        to={"#"}
                        data-toggle="modal"
                        data-target="#keyskills"
                        onClick={() => {
                          setId(null);
                          setKeyskill(true);
                          setSkillName("");
                          setSkillDescription("");
                        }}
                        className="site-button add-btn button-sm"
                      >
                        <i className="fa fa-pencil m-r5"></i> Th??m
                      </Link>
                    </div>
                    {user?.skill?.map((item, index) => {
                      return (
                        <div
                          key={index}
                          className="d-flex align-items-center mt-3"
                        >
                          <div className="job-time mr-auto">
                            <h6 className="font-14 m-b0">{item.skillName}</h6>
                            <p className="job-content__desc m-b0">
                              {item.description}
                            </p>
                          </div>
                          <div
                            className="d-flex align-items-center"
                            style={{ flexDirection: "column" }}
                          >
                            <Link
                              to={"#"}
                              data-toggle="modal"
                              data-target="#keyskills"
                              onClick={() => {
                                setKeyskill(true);
                                setId(item._id);
                                setSkillName(item.skillName);
                                setSkillDescription(item.description);
                              }}
                              className="site-button add-btn button-sm"
                            >
                              <i className="fa fa-pencil m-r5"></i> Ch???nh s???a
                            </Link>
                            <Link
                              to={"#"}
                              data-toggle="modal"
                              data-target="#keyskills"
                              onClick={() => {
                                const skills = [...skillArray];
                                skills.splice(index, 1);
                                onUpdate({
                                  accountType: "APPLICANT",
                                  skill: skills,
                                });
                              }}
                              className="site-button add-btn button-sm mt-2"
                              style={{ backgroundColor: "red" }}
                            >
                              <i className="fa fa-trash m-r5"></i> X??a
                            </Link>
                          </div>
                        </div>
                      );
                    })}

                    <Modal
                      show={keyskill}
                      onHide={setKeyskill}
                      className="modal fade modal-bx-info editor"
                    >
                      <div className="modal-dialog my-0" role="document">
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
                            <form>
                              <div className="row">
                                <div className="col-lg-12 col-md-12">
                                  <div className="form-group">
                                    <label>Ti??u ?????: </label>
                                    <input
                                      value={skillName}
                                      type="email"
                                      className="form-control"
                                      placeholder="Vd: Tin h???c v??n ph??ng"
                                      onChange={(event) => {
                                        setSkillName(event.target.value);
                                      }}
                                    />
                                  </div>
                                </div>
                                <div className="col-lg-12 col-md-12">
                                  <div className="form-group">
                                    <label>M?? t??? v??? k??? n??ng: </label>
                                    <textarea
                                      value={skillDescription}
                                      className="form-control"
                                      placeholder="Vd: S??? d???ng th??nh th???o Word, PowerPoint"
                                      onChange={(event) => {
                                        setSkillDescription(event.target.value);
                                      }}
                                    ></textarea>
                                  </div>
                                </div>
                              </div>
                            </form>
                          </div>
                          <div className="modal-footer">
                            <button
                              type="button"
                              className="site-button"
                              onClick={() => {
                                setKeyskill(false);
                                setId(null);
                              }}
                            >
                              H???y
                            </button>
                            <button
                              onClick={() => {
                                if (id) {
                                  const indexEdit = user.skill.findIndex(
                                    (item) => item._id === id
                                  );
                                  const skills = [...skillArray];
                                  skills[indexEdit] = {
                                    skillName: skillName,
                                    description: skillDescription,
                                  };
                                  onUpdate({
                                    accountType: "APPLICANT",
                                    skill: skills,
                                  });
                                } else {
                                  onUpdate({
                                    accountType: "APPLICANT",
                                    skill: [
                                      ...skillArray,
                                      {
                                        skillName: skillName,
                                        description: skillDescription,
                                      },
                                    ],
                                  });
                                }
                                setId(null);
                                setKeyskill(false);
                              }}
                              type="button"
                              className="site-button"
                            >
                              L??u
                            </button>
                          </div>
                        </div>
                      </div>
                    </Modal>
                  </div>
                  <div id="education_bx" className="job-bx bg-white m-b30">
                    <div className="d-flex">
                      <h5 className="m-b15">H???c v???n</h5>
                      <Link
                        to={"#"}
                        onClick={() => {
                          setId(null);
                          setEducation(true);
                          setSchool("");
                          setMajor("");
                          setDuration("");
                          setLevel("");
                        }}
                        className="site-button add-btn button-sm"
                      >
                        <i className="fa fa-pencil m-r5"></i> Th??m
                      </Link>
                    </div>
                    {user.education?.map((item, index) => {
                      return (
                        <div
                          key={index}
                          className="d-flex align-items-center mt-3"
                        >
                          <div className="job-time mr-auto">
                            <h6 className="font-14 m-b0">
                              Chuy??n ng??nh: {item?.major}
                            </h6>
                            <p className="m-b0">Th???i gian: {item?.duration}</p>
                            <p className="m-b0">T??n tr?????ng: {item?.school}</p>
                            <p className="m-b0">X???p lo???i: {item?.level}</p>
                          </div>
                          <div
                            className="d-flex align-items-center"
                            style={{ flexDirection: "column" }}
                          >
                            <Link
                              to={"#"}
                              onClick={() => {
                                setEducation(true);
                                setId(item._id);
                                setSchool(item.school);
                                setMajor(item.major);
                                setDuration(item.duration);
                                setLevel(item?.level);
                              }}
                              className="site-button add-btn button-sm"
                            >
                              <i className="fa fa-pencil m-r5"></i> Th??m
                            </Link>
                            <Link
                              to={"#"}
                              onClick={() => {
                                const educations = [...educationArray];
                                educations.splice(index, 1);
                                onUpdate({
                                  accountType: "APPLICANT",
                                  education: educations,
                                });
                              }}
                              className="site-button add-btn button-sm mt-2"
                              style={{ backgroundColor: "red" }}
                            >
                              <i className="fa fa-trash m-r5"></i> X??a
                            </Link>
                          </div>
                        </div>
                      );
                    })}
                    <Modal
                      className="modal fade modal-bx-info editor"
                      show={education}
                      onHide={setEducation}
                    >
                      <div className="modal-dialog my-0" role="document">
                        <div className="modal-content">
                          <div className="modal-header">
                            <h5
                              className="modal-title"
                              id="EducationModalLongTitle"
                            >
                              Education
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
                            <form>
                              <div className="row">
                                <div className="col-lg-12 col-md-12">
                                  <div className="form-group">
                                    <label>Chuy??n ng??nh: </label>
                                    <input
                                      onChange={(event) => {
                                        setMajor(event.target.value);
                                      }}
                                      value={major}
                                      type="text"
                                      className="form-control"
                                      placeholder="Vd: C??ng ngh??? th??ng tin"
                                    />
                                  </div>
                                </div>
                                <div className="col-lg-12 col-md-12">
                                  <div className="form-group">
                                    <label>Th???i gian h???c:</label>
                                    <input
                                      onChange={(event) => {
                                        setDuration(event.target.value);
                                      }}
                                      value={duration}
                                      type="text"
                                      className="form-control"
                                      placeholder="Vd: 2018-2023"
                                    />
                                  </div>
                                </div>
                                <div className="col-lg-12 col-md-12">
                                  <div className="form-group">
                                    <label>Theo h???c t???i: </label>
                                    <input
                                      onChange={(event) => {
                                        setSchool(event.target.value);
                                      }}
                                      value={school}
                                      type="text"
                                      className="form-control"
                                      placeholder="Vd: TSC"
                                    />
                                  </div>
                                </div>
                                <div className="col-lg-12 col-md-12">
                                  <div className="form-group">
                                    <label>X???p lo???i: </label>
                                    <input
                                      onChange={(event) => {
                                        setLevel(event.target.value);
                                      }}
                                      value={level}
                                      type="text"
                                      className="form-control"
                                      placeholder="Vd: TSC"
                                    />
                                  </div>
                                </div>
                              </div>
                            </form>
                          </div>
                          <div className="modal-footer">
                            <button
                              type="button"
                              className="site-button"
                              onClick={() => {
                                setId(null);
                                setEducation(false);
                              }}
                            >
                              H???y
                            </button>
                            <button
                              onClick={() => {
                                if (id) {
                                  const indexEdit = user.education.findIndex(
                                    (item) => item._id === id
                                  );
                                  const educations = [...educationArray];
                                  educations[indexEdit] = {
                                    school: school,
                                    major: major,
                                    duration: duration,
                                    level: level,
                                  };
                                  onUpdate({
                                    accountType: "APPLICANT",
                                    education: educations,
                                  });
                                } else {
                                  onUpdate({
                                    accountType: "APPLICANT",
                                    education: [
                                      ...educationArray,
                                      {
                                        school: school,
                                        major: major,
                                        duration: duration,
                                        level: level,
                                      },
                                    ],
                                  });
                                }
                                setId(null);
                                setEducation(false);
                              }}
                              type="button"
                              className="site-button"
                            >
                              L??u
                            </button>
                          </div>
                        </div>
                      </div>
                    </Modal>

                    <div className="row">
                      <div className="col-lg-12 col-md-12 col-sm-12"></div>
                    </div>
                  </div>
                  <div id="projects_bx" className="job-bx bg-white m-b30">
                    <div className="d-flex">
                      <h5 className="m-b15">Kinh nghi???m l??m vi???c</h5>
                      <Link
                        to={"#"}
                        onClick={() => {
                          setId(null);
                          setCompanyName("");
                          setDurationWorkExperience("");
                          setPosition("");
                          setProjects(true);
                        }}
                        className="site-button add-btn button-sm"
                      >
                        <i className="fa fa-pencil m-r5"></i> Th??m
                      </Link>
                    </div>
                    {user.workExperience?.map((item, index) => {
                      return (
                        <div
                          key={index}
                          className="d-flex align-items-center mt-3"
                        >
                          <div className="job-time mr-auto">
                            <h6 className="font-14 m-b0">
                              T??n c??ng ty: {item?.companyName}
                            </h6>
                            <p className="m-b0">
                              Th???i gian l??m vi???c: {item?.duration}
                            </p>
                            <p className="m-b0">V??? tr??: {item?.position}</p>
                          </div>
                          <div
                            className="d-flex align-items-center"
                            style={{ flexDirection: "column" }}
                          >
                            <Link
                              to={"#"}
                              onClick={() => {
                                setProjects(true);
                                setId(item._id);
                                setCompanyName(item.companyName);
                                setDurationWorkExperience(item.duration);
                                setPosition(item.position);
                              }}
                              className="site-button add-btn button-sm"
                            >
                              <i className="fa fa-pencil m-r5"></i> Ch???nh s???a
                            </Link>
                            <Link
                              to={"#"}
                              onClick={() => {
                                const workExperiences = [
                                  ...workExperienceArray,
                                ];
                                workExperiences.splice(index, 1);
                                onUpdate({
                                  accountType: "APPLICANT",
                                  workExperience: workExperiences,
                                });
                              }}
                              className="site-button add-btn button-sm mt-2"
                              style={{ backgroundColor: "red" }}
                            >
                              <i className="fa fa-trash m-r5"></i> X??a
                            </Link>
                          </div>
                        </div>
                      );
                    })}

                    <Modal
                      className="modal fade modal-bx-info editor"
                      show={projects}
                      onHide={setProjects}
                    >
                      <div className="modal-dialog my-0" role="document">
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
                            <form>
                              <div className="row">
                                <div className="col-lg-12 col-md-12">
                                  <div className="form-group">
                                    <label>V??? tr?? c??ng vi???c</label>
                                    <input
                                      onChange={(event) => {
                                        setPosition(event.target.value);
                                      }}
                                      value={position}
                                      type="text"
                                      className="form-control"
                                      placeholder="Vd: Nh??n vi??n Marketing"
                                      name="name"
                                    />
                                  </div>
                                </div>
                                <div className="col-lg-12 col-md-6">
                                  <div className="form-group">
                                    <label>Th???i gian l??m vi???c</label>
                                    <input
                                      onChange={(event) => {
                                        setDurationWorkExperience(
                                          event.target.value
                                        );
                                      }}
                                      value={durationWorkExperience}
                                      type="text"
                                      className="form-control"
                                      placeholder="Vd: 2018-2019"
                                    />
                                  </div>
                                </div>
                                <div className="col-lg-12 col-md-6">
                                  <div className="form-group">
                                    <label>L??m vi???c t???i: </label>
                                    <input
                                      onChange={(event) => {
                                        setCompanyName(event.target.value);
                                      }}
                                      value={companyName}
                                      type="text"
                                      className="form-control"
                                      placeholder="Vd: TSC"
                                    />
                                  </div>
                                </div>
                              </div>
                            </form>
                          </div>
                          <div className="modal-footer">
                            <button
                              type="button"
                              className="site-button"
                              onClick={() => {
                                setProjects(false);
                                setId(null);
                              }}
                            >
                              H???y
                            </button>
                            <button
                              onClick={() => {
                                if (id) {
                                  const indexEdit =
                                    user.workExperience.findIndex(
                                      (item) => item._id === id
                                    );
                                  const workExperiences = [
                                    ...workExperienceArray,
                                  ];
                                  workExperiences[indexEdit] = {
                                    companyName: companyName,
                                    position: position,
                                    duration: durationWorkExperience,
                                  };
                                  onUpdate({
                                    accountType: "APPLICANT",
                                    workExperience: workExperiences,
                                  });
                                } else {
                                  onUpdate({
                                    accountType: "APPLICANT",
                                    workExperience: [
                                      ...workExperienceArray,
                                      {
                                        companyName: companyName,
                                        position: position,
                                        duration: durationWorkExperience,
                                      },
                                    ],
                                  });
                                }
                                setId(null);
                                setProjects(false);
                              }}
                              type="button"
                              className="site-button"
                            >
                              L??u
                            </button>
                          </div>
                        </div>
                      </div>
                    </Modal>
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
                            onClick={() => {
                              setOnlineProfile(true);
                              setTitleHobby("");
                            }}
                            className="site-button add-btn button-sm"
                          >
                            <i className="fa fa-pencil m-r5"></i> Th??m
                          </Link>
                        </div>
                        {user.hobby === [] && (
                          <p className="m-b0">
                            Th??m s??? th??ch c?? nh??n v??o h??? s?? c???a b???n
                          </p>
                        )}
                        {user.hobby?.map((item, index) => {
                          return (
                            <div
                              key={index}
                              className="d-flex align-items-center mt-3 justify-content-between"
                            >
                              <p key={index} className="job-content__desc m-b0">
                                {item}
                              </p>
                              <div
                                className="d-flex align-items-center"
                                style={{ flexDirection: "column" }}
                              >
                                <Link
                                  to={"#"}
                                  onClick={() => {
                                    setOnlineProfile(true);
                                    setId(index);
                                    setTitleHobby(item);
                                  }}
                                  className="site-button add-btn button-sm"
                                >
                                  <i className="fa fa-pencil m-r5"></i> Ch???nh
                                  s???a
                                </Link>
                                <Link
                                  to={"#"}
                                  onClick={() => {
                                    const hobbys = [...user.hobby];
                                    hobbys.splice(index, 1);
                                    onUpdate({
                                      accountType: "APPLICANT",
                                      hobby: hobbys,
                                    });
                                  }}
                                  className="site-button add-btn button-sm mt-2"
                                  style={{ backgroundColor: "red" }}
                                >
                                  <i className="fa fa-trash m-r5"></i> X??a
                                </Link>
                              </div>
                            </div>
                          );
                        })}

                        <Modal
                          className="modal fade modal-bx-info editor"
                          show={onlineprofile}
                          onHide={setOnlineProfile}
                        >
                          <div className="modal-dialog my-0" role="document">
                            <div className="modal-content">
                              <div className="modal-header">
                                <h5 className="modal-title">S??? th??ch</h5>
                                <button
                                  type="button"
                                  className="close"
                                  onClick={() => {
                                    setOnlineProfile(false);
                                  }}
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
                                <form>
                                  <div className="row">
                                    <div className="col-lg-12 col-md-12">
                                      <div className="form-group">
                                        <label>M?? t??? c??c s??? th??ch: </label>
                                        <textarea
                                          value={titleHobby}
                                          onChange={(event) => {
                                            setTitleHobby(event.target.value);
                                          }}
                                          className="form-control"
                                          placeholder="Vd: ?????c s??ch, du l???ch ..."
                                        ></textarea>
                                      </div>
                                    </div>
                                  </div>
                                </form>
                              </div>
                              <div className="modal-footer">
                                <button
                                  type="button"
                                  className="site-button"
                                  onClick={() => {
                                    setOnlineProfile(false);
                                    setId(null);
                                  }}
                                >
                                  H???y
                                </button>
                                <button
                                  onClick={() => {
                                    if (id !== null) {
                                      const hobbys = [...user.hobby];
                                      hobbys[id] = titleHobby;
                                      onUpdate({
                                        accountType: "APPLICANT",
                                        hobby: hobbys,
                                      });
                                    } else {
                                      onUpdate({
                                        accountType: "APPLICANT",
                                        hobby: [...user.hobby, titleHobby],
                                      });
                                    }
                                    setId(null);
                                    setOnlineProfile(false);
                                  }}
                                  type="button"
                                  className="site-button"
                                >
                                  L??u
                                </button>
                              </div>
                            </div>
                          </div>
                        </Modal>

                        <div className="list-line">
                          <div className="d-flex">
                            <h6 className="font-14 m-b5">Ho???t ?????ng</h6>

                            <Link
                              to={"#"}
                              onClick={() => {
                                setId(null);
                                setTitleActivity("");
                                setDescriptionActivity("");
                                setOrganization("");
                                setDurationActivity("");
                                setWorkSample(true);
                              }}
                              className="site-button add-btn button-sm"
                            >
                              <i className="fa fa-pencil m-r5"></i> Th??m
                            </Link>
                          </div>
                          {user.activity?.map((item, index) => {
                            return (
                              <div
                                key={index}
                                className="d-flex align-items-center mt-3"
                              >
                                <div className="job-time mr-auto">
                                  <p key={index} className="m-b0">
                                    Ho???t ?????ng: {item.title}
                                  </p>
                                  <p key={index} className="m-b0">
                                    ????n v??? t??? ch???c: {item.organization}
                                  </p>
                                  <p
                                    key={index}
                                    className="job-content__desc m-b0"
                                  >
                                    M?? t???: {item.description}
                                  </p>
                                  <p key={index} className="m-b0">
                                    Th???i gian ho???t ?????ng: {item.duration}
                                  </p>
                                </div>
                                <div
                                  className="d-flex align-items-center"
                                  style={{ flexDirection: "column" }}
                                >
                                  <Link
                                    to={"#"}
                                    onClick={() => {
                                      setWorkSample(true);
                                      setId(item._id);
                                      setTitleActivity(item.title);
                                      setDescriptionActivity(item.description);
                                      setOrganization(item.organization);
                                      setDurationActivity(item.duration);
                                    }}
                                    className="site-button add-btn button-sm"
                                  >
                                    <i className="fa fa-pencil m-r5"></i> Ch???nh
                                    s???a
                                  </Link>
                                  <Link
                                    to={"#"}
                                    onClick={() => {
                                      const activitys = [...activityArray];
                                      activitys.splice(index, 1);
                                      onUpdate({
                                        accountType: "APPLICANT",
                                        activity: activitys,
                                      });
                                    }}
                                    className="site-button add-btn button-sm mt-2"
                                    style={{ backgroundColor: "red" }}
                                  >
                                    <i className="fa fa-trash m-r5"></i> X??a
                                  </Link>
                                </div>
                              </div>
                            );
                          })}

                          <Modal
                            className="modal fade modal-bx-info editor"
                            show={worksample}
                            onHide={setWorkSample}
                          >
                            <div className="modal-dialog my-0" role="document">
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
                                  <form>
                                    <div className="row">
                                      <div className="col-lg-12 col-md-12">
                                        <div className="form-group">
                                          <label>T??n ho???t ?????ng: </label>
                                          <input
                                            onChange={(event) => {
                                              setTitleActivity(
                                                event.target.value
                                              );
                                            }}
                                            value={titleActivity}
                                            type="email"
                                            className="form-control"
                                            placeholder="Vd: T??nh nguy???n vi??n"
                                          />
                                        </div>
                                      </div>
                                      <div className="col-lg-12 col-md-12">
                                        <div className="form-group">
                                          <label>Th???i gian tham gia</label>
                                          <input
                                            onChange={(event) => {
                                              setDurationActivity(
                                                event.target.value
                                              );
                                            }}
                                            value={durationActivity}
                                            type="email"
                                            className="form-control"
                                            placeholder="Vd: 2013-2014"
                                          />
                                        </div>
                                      </div>
                                      <div className="col-lg-12 col-md-12">
                                        <div className="form-group">
                                          <label>????n v??? t??? ch???c</label>
                                          <input
                                            onChange={(event) => {
                                              setOrganization(
                                                event.target.value
                                              );
                                            }}
                                            value={organization}
                                            type="email"
                                            className="form-control"
                                            placeholder="Nh??m t??nh nguy???n TSC"
                                          />
                                        </div>
                                      </div>
                                      <div className="col-lg-12 col-md-12">
                                        <div className="form-group">
                                          <label>M?? t???: </label>
                                          <textarea
                                            onChange={(event) => {
                                              setDescriptionActivity(
                                                event.target.value
                                              );
                                            }}
                                            value={descriptionActivity}
                                            className="form-control"
                                            placeholder="Gi??p ????? s??ch v???, qu???n ??o cho tr??? em v??ng cao"
                                          ></textarea>
                                        </div>
                                      </div>
                                    </div>
                                  </form>
                                </div>
                                <div className="modal-footer">
                                  <button
                                    type="button"
                                    className="site-button"
                                    onClick={() => {
                                      setId(null);
                                      setWorkSample(false);
                                    }}
                                  >
                                    H???y
                                  </button>
                                  <button
                                    onClick={() => {
                                      if (id) {
                                        const indexEdit =
                                          user.activity.findIndex(
                                            (item) => item._id === id
                                          );
                                        const activitys = [...activityArray];
                                        activitys[indexEdit] = {
                                          title: titleActivity,
                                          description: descriptionActivity,
                                          organization: organization,
                                          duration: durationActivity,
                                        };
                                        onUpdate({
                                          accountType: "APPLICANT",
                                          activity: activitys,
                                        });
                                      } else {
                                        onUpdate({
                                          accountType: "APPLICANT",
                                          activity: [
                                            ...activityArray,
                                            {
                                              title: titleActivity,
                                              description: descriptionActivity,
                                              organization: organization,
                                              duration: durationActivity,
                                            },
                                          ],
                                        });
                                      }
                                      setId(null);
                                      setWorkSample(false);
                                    }}
                                    type="button"
                                    className="site-button"
                                  >
                                    L??u
                                  </button>
                                </div>
                              </div>
                            </div>
                          </Modal>
                        </div>

                        <div className="list-line">
                          <div className="d-flex">
                            <h6 className="font-14 m-b5">Ch???ng ch???</h6>
                            <Link
                              to={"#"}
                              onClick={() => {
                                setCertification(true);
                                setTitleCertificate("");
                                setTimeCertificate("");
                              }}
                              className="site-button add-btn button-sm"
                            >
                              <i className="fa fa-pencil m-r5"></i> Th??m
                            </Link>
                          </div>
                          {user.certificate?.map((item, index) => {
                            return (
                              <div
                                key={index}
                                className="d-flex align-items-center mt-3"
                              >
                                <div className="job-time mr-auto">
                                  <p key={index} className="m-b0">
                                    T??n ch???ng ch???: {item.title}
                                  </p>
                                  <p key={index} className="m-b0">
                                    T???i th???i ??i???m: {item.time}
                                  </p>
                                </div>
                                <div
                                  className="d-flex align-items-center"
                                  style={{ flexDirection: "column" }}
                                >
                                  <Link
                                    to={"#"}
                                    onClick={() => {
                                      setCertification(true);
                                      setId(item._id);
                                      setTitleCertificate(item.title);
                                      setTimeCertificate(item.time);
                                    }}
                                    className="site-button add-btn button-sm"
                                  >
                                    <i className="fa fa-pencil m-r5"></i> Ch???nh
                                    s???a
                                  </Link>
                                  <Link
                                    to={"#"}
                                    onClick={() => {
                                      const certificateArrays = [
                                        ...certificateArray,
                                      ];
                                      certificateArrays.splice(index, 1);
                                      onUpdate({
                                        accountType: "APPLICANT",
                                        certificate: certificateArrays,
                                      });
                                    }}
                                    className="site-button add-btn button-sm mt-2"
                                    style={{ backgroundColor: "red" }}
                                  >
                                    <i className="fa fa-trash m-r5"></i> X??a
                                  </Link>
                                </div>
                              </div>
                            );
                          })}

                          <Modal
                            className="modal fade modal-bx-info editor"
                            show={certification}
                            onHide={setCertification}
                          >
                            <div className="modal-dialog my-0" role="document">
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
                                  <form>
                                    <div className="row">
                                      <div className="col-lg-12 col-md-12">
                                        <div className="form-group">
                                          <label>T??n ch???ng ch???</label>
                                          <input
                                            onChange={(event) => {
                                              setTitleCertificate(
                                                event.target.value
                                              );
                                            }}
                                            value={titleCertificate}
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
                                            onChange={(event) => {
                                              setTimeCertificate(
                                                event.target.value
                                              );
                                            }}
                                            value={timeCertificate}
                                            type="text"
                                            className="form-control"
                                            placeholder="Nh???p v??o th???i ??i???m"
                                          />
                                        </div>
                                      </div>
                                    </div>
                                  </form>
                                </div>
                                <div className="modal-footer">
                                  <button
                                    type="button"
                                    className="site-button"
                                    onClick={() => {
                                      setCertification(false);
                                      setId(null);
                                    }}
                                  >
                                    H???y
                                  </button>
                                  <button
                                    onClick={() => {
                                      if (id) {
                                        const indexEdit =
                                          user.certificate.findIndex(
                                            (item) => item._id === id
                                          );
                                        const certificates = [
                                          ...certificateArray,
                                        ];
                                        certificates[indexEdit] = {
                                          title: titleCertificate,
                                          time: timeCertificate,
                                        };
                                        onUpdate({
                                          accountType: "APPLICANT",
                                          certificate: certificates,
                                        });
                                      } else {
                                        onUpdate({
                                          accountType: "APPLICANT",
                                          certificate: [
                                            ...certificateArray,
                                            {
                                              title: titleCertificate,
                                              time: timeCertificate,
                                            },
                                          ],
                                        });
                                      }
                                      setId(null);
                                      setCertification(false);
                                    }}
                                    type="button"
                                    className="site-button"
                                  >
                                    L??u
                                  </button>
                                </div>
                              </div>
                            </div>
                          </Modal>
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
                      <Link
                        to={"#"}
                        onClick={() => setCareerProfile(true)}
                        className="site-button add-btn button-sm"
                      >
                        <i className="fa fa-pencil m-r5"></i> Ch???nh s???a
                      </Link>
                    </div>
                    <Modal
                      className="modal fade modal-bx-info editor"
                      show={careerprofile}
                      onHide={setCareerProfile}
                    >
                      <div className="modal-dialog my-0" role="document">
                        <div className="modal-content">
                          <div className="modal-header">
                            <h5
                              className="modal-title"
                              id="DesiredprofileModalLongTitle"
                            >
                              H??? s?? ngh??? nghi???p mong mu???n{" "}
                            </h5>
                            <button
                              type="button"
                              className="close"
                              onClick={() => setCareerProfile(false)}
                            >
                              <span aria-hidden="true">&times;</span>
                            </button>
                          </div>
                          <div className="modal-body">
                            <form>
                              <div className="row">
                                <div className="col-lg-12 col-md-12">
                                  <div className="form-group">
                                    <label>V??? tr?? c??ng vi???c</label>
                                    <input
                                      onChange={(event) => {
                                        setJobType(event.target.value);
                                      }}
                                      value={jobType}
                                      type="text"
                                      className="form-control"
                                      placeholder="Vd: Nh??n vi??n Marketing"
                                    />
                                  </div>
                                </div>
                                <div className="col-lg-12 col-md-12">
                                  <div className="form-group">
                                    <label>M???c l????ng mong mu???n</label>
                                  </div>
                                </div>
                                <div className="col-lg-12 col-md-6">
                                  <div className="form-group">
                                    <div className="row">
                                      <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                                        <div className="form-group">
                                          <InputNumber
                                            onChange={(event) => {
                                              setSalary(event);
                                            }}
                                            formatter={(value) =>
                                              ` ${value}`.replace(
                                                /\B(?=(\d{3})+(?!\d))/g,
                                                "."
                                              )
                                            }
                                            parser={(value) =>
                                              value.replace(
                                                /[A-Z]|[a-z]|[$ ]|\.+/g,
                                                ""
                                              )
                                            }
                                            value={salary}
                                            className="form-control w-100"
                                            placeholder="Nh???p m???c l????ng ( VN?? )"
                                          />
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </form>
                          </div>
                          <div className="modal-footer">
                            <button
                              type="button"
                              className="site-button"
                              onClick={() => setCareerProfile(false)}
                            >
                              H???y
                            </button>
                            <button
                              onClick={() => {
                                onUpdate({
                                  accountType: "APPLICANT",
                                  desiredCareer: {
                                    ...user.desiredCareer,
                                    expectedSalary: salary,
                                    jobType: jobType,
                                  },
                                });
                                setCareerProfile(false);
                              }}
                              type="button"
                              className="site-button"
                            >
                              L??u
                            </button>
                          </div>
                        </div>
                      </div>
                    </Modal>

                    <div className="row">
                      <div className="col-lg-6 col-md-6 col-sm-6">
                        <div className="clearfix m-b20">
                          <label className="m-b0">V??? tr??</label>
                          <span className="clearfix font-13">
                            {user.desiredCareer?.jobType}
                          </span>
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-6">
                        <div className="clearfix m-b20">
                          <label className="m-b0">M???c l????ng mong mu???n</label>
                          <span className="clearfix font-13">
                            {user.desiredCareer?.expectedSalary.toLocaleString()}{" "}
                            VN??
                          </span>
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
                      <Link
                        to={"#"}
                        onClick={() => setPersonalDetails(true)}
                        className="site-button add-btn button-sm"
                      >
                        <i className="fa fa-pencil m-r5"></i> Ch???nh s???a
                      </Link>
                    </div>

                    <Modal
                      className="modal fade modal-bx-info editor"
                      show={personaldetails}
                      onHide={setPersonalDetails}
                    >
                      <div className="modal-dialog my-0" role="document">
                        <div className="modal-content">
                          <div className="modal-header">
                            <h5
                              className="modal-title"
                              id="PersonaldetailsModalLongTitle"
                            >
                              Th??ng tin chi ti???t v??? b???n
                            </h5>
                            <button
                              type="button"
                              className="close"
                              onClick={() => setPersonalDetails(false)}
                            >
                              <span aria-hidden="true">&times;</span>
                            </button>
                          </div>
                          <div className="modal-body">
                            <form>
                              <div className="row">
                                <div className="col-lg-12 col-md-12">
                                  <div className="form-group">
                                    <label>Ng??y sinh</label>
                                    <input
                                      onChange={(event) => {
                                        setBirthday(event.target.value);
                                      }}
                                      defaultValue={moment(
                                        user.birthday
                                      ).format("YYYY-MM-DD")}
                                      className="form-control"
                                      placeholder="Nh???p v??o ng??y sinh"
                                      type="date"
                                    />
                                  </div>
                                </div>
                                <div className="col-lg-12 col-md-12">
                                  <div className="form-group">
                                    <label>Gi???i t??nh</label>
                                    <div className="row">
                                      <Form.Control
                                        onChange={(event) => {
                                          setGender(event.target.value);
                                        }}
                                        value={gender}
                                        as="select"
                                        custom
                                        className="custom-select"
                                        name="type"
                                      >
                                        <option value="Nam">Nam</option>
                                        <option value="N???">N???</option>
                                      </Form.Control>
                                    </div>
                                  </div>
                                </div>

                                <div className="col-lg-12 col-md-12">
                                  <div className="form-group">
                                    <label>?????a ch??? th?????ng tr??</label>
                                    <input
                                      onChange={(event) => {
                                        setAddress(event.target.value);
                                      }}
                                      value={address}
                                      type="text"
                                      className="form-control"
                                      placeholder="Nh???p v??o ?????a ch??? th?????ng tr??"
                                    />
                                  </div>
                                </div>
                              </div>
                            </form>
                          </div>
                          <div className="modal-footer">
                            <button
                              type="button"
                              className="site-button"
                              onClick={() => setPersonalDetails(false)}
                            >
                              H???y
                            </button>
                            <button
                              onClick={() => {
                                onUpdate({
                                  accountType: "APPLICANT",
                                  gender: gender,
                                  address: {
                                    ...user.address,
                                    detailAddress: address,
                                  },
                                  birthday: birthday,
                                });
                                setPersonalDetails(false);
                              }}
                              type="button"
                              className="site-button"
                            >
                              L??u
                            </button>
                          </div>
                        </div>
                      </div>
                    </Modal>

                    <div className="row">
                      <div className="col-lg-6 col-md-6 col-sm-6">
                        <div className="clearfix m-b20">
                          <label className="m-b0">Ng??y sinh</label>
                          <span className="clearfix font-13">
                            {moment(user?.birthday).format("Do/MM/YYYY")}
                          </span>
                        </div>
                        <div className="clearfix m-b20">
                          <label className="m-b0">Gi???i t??nh</label>
                          <span className="clearfix font-13">
                            {user?.gender}
                          </span>
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-6">
                        <div className="clearfix m-b20">
                          <label className="m-b0">?????a ch??? th?????ng tr??</label>
                          <span className="clearfix font-13">
                            {user.address?.detailAddress}
                          </span>
                        </div>
                      </div>
                    </div>
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
export default Jobmyresume;
