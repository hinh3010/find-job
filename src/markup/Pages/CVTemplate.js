import moment from "moment";
import React from "react";
import { BASE_URL } from "../../config/BASE_URL";
import "../../css/CVTemplate.css";
CVTemplate.propTypes = {};

function CVTemplate(props) {
  const { value } = props;

  return (
    <div className="container-CV">
      <div className="content-CV">
        <div className="content__left">
          <div className="job-exp job-justify">
            <div className="job-title">
              <h3 className="job-title__heading ">Kinh nghiệm làm việc</h3>
            </div>
            {value?.workExperience?.map((item, i) => (
              <div key={i} className="job-content">
                <div className="job-content__wrap">
                  <span className="job-content__name">{item?.position}</span>
                  <span className="job-content__time">{item?.duration}</span>
                </div>
                <span className="job-content__unit">{item?.companyName}</span>
              </div>
            ))}
          </div>
          {value.education.length !== 0 ? (
            <div className="job-educate job-justify">
              <div className="job-title ">
                <h3 className="job-title__heading">Học vấn</h3>
              </div>
              {value?.education?.map((item, index) => (
                <div className="job-content">
                  <div className="job-content__wrap">
                    <span className="job-content__name">{item?.major}</span>
                    <span className="job-content__time">{item?.duration}</span>
                  </div>
                  <span className="job-content__unit">{item?.school}</span>
                </div>
              ))}
            </div>
          ) : null}
          {value?.activity.length !== 0 ? (
            <div className="job-activity job-justify">
              <div className="job-title">
                <h3 className="job-title__heading">Hoạt động</h3>
              </div>
              {value &&
                value?.activity?.map((item, index) => (
                  <div className="job-content">
                    <div className="job-content__wrap">
                      <span className="job-content__name">{item?.title}</span>
                      <span>|</span>
                      <span className="job-content__time">
                        {item?.duration}
                      </span>
                    </div>
                    <span className="job-content__unit">
                      {item?.organization}
                    </span>
                    <span className="job-content__desc">
                      {item?.description}
                    </span>
                  </div>
                ))}
            </div>
          ) : null}

          {value?.certificate?.length !== 0 ? (
            <div className="job-certificate job-justify">
              <div className="job-title">
                <h3 className="job-title__heading">Chứng chỉ</h3>
              </div>
              {value?.certificate?.map((item, index) => (
                <div key={index} className="job-content">
                  <div className="job-content__wrap">
                    <span className="job-content__time">{item?.time}</span>
                    <span className="job-content__desc">{item?.title}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : null}
        </div>
        <div className="content__right">
          <div className="job-avt">
            {value?.avatarUrl?.indexOf("https://") === -1 ? (
              <img
                style={{ objectFit: "cover" }}
                className="job-avt__img"
                alt=""
                src={`${BASE_URL}/${value?.avatarUrl}`}
              />
            ) : (
              <img
                style={{ objectFit: "cover" }}
                className="job-avt__img"
                alt=""
                src={value?.avatarUrl}
              />
            )}
          </div>
          <div className="job-info__wrap">
            <div className="job-info__title">
              <h1 className="job-info__fullname">{value?.fullName}</h1>
              <span className="job-info__career-position">{value?.title}</span>
            </div>
            <div className="job-info__details">
              <h3 className="job-info__details-title">Thông tin</h3>
              <ul className="job-info__details-list">
                <li className="job-info__details-list--item">
                  <i
                    className="fa fa-mars icon-info__justify"
                    aria-hidden="true"
                  ></i>
                  {value?.gender}
                </li>
                <li className="job-info__details-list--item">
                  <i
                    className="fa fa-calendar icon-info__justify"
                    aria-hidden="true"
                  ></i>
                  {moment(value?.birthday).format("DD/MM/YYYY")}
                </li>
                <li className="job-info__details-list--item">
                  <i
                    className="fa fa-phone icon-info__justify"
                    aria-hidden="true"
                  ></i>
                  {value?.phone}
                </li>
                <li className="job-info__details-list--item">
                  <i
                    className="fa fa-envelope-open icon-info__justify"
                    aria-hidden="true"
                  ></i>
                  {value?.email}
                </li>
                <li className="job-info__details-list--item">
                  {value?.socialLink
                    ? value?.socialLink.map((item) => (
                      <div className="job-info__details-list--item">
                        <i
                          className="fa fa-tag icon-info__justify"
                          aria-hidden="true"
                        ></i>
                        <p>{item?.link} </p>
                      </div>
                    ))
                    : ""}
                </li>
                <li className="job-info__details-list--item">
                  <div className="job-info__details-list--item">
                    <i
                      class="fa fa-location-arrow icon-info__justify"
                      aria-hidden="true"
                    ></i>
                    <p>{value?.address.detailAddress}</p>
                  </div>
                </li>
                <li className="job-info__details-list--item d-flex algin-center">
                  <i
                    className="fa fa-heart icon-info__justify"
                    aria-hidden="true"
                  ></i>
                  <p>
                    {value?.married?.toString() === "true"
                      ? "Đã kết hôn"
                      : "Độc thân"}
                    {/* {console.log("value1",value.married.toString())} */}
                  </p>
                </li>
                {/* // <li className='job-info__details-list--item'>
                //   <i
                //     className='fa fa-language icon-info__justify'
                //     aria-hidden='true'></i>
                //   Tiếng Việt, Tiếng Nhật Bản
                // </li> */}
              </ul>
            </div>
          </div>
          <div className="job-goal">
            <div className="job-title">
              <h3 className="job-title__heading">Mục tiêu nghề nghiệp</h3>
            </div>
            <div className="job-content__desc">{value?.objective}</div>
          </div>
          <div className="job-skill">
            <div className="job-title">
              <h3 className="job-title__heading">Các kỹ năng</h3>
            </div>
            {value?.skill?.map((item) => (
              <div className="job-content">
                <div className="job-content__wrap">
                  <span className="job-content__time">{item?.skillName}</span>
                  <span className="job-content__desc">{item?.description}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CVTemplate;
