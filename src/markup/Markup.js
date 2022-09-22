import React from "react";
import { Route, Switch } from "react-router-dom";

import Homepage from "./Pages/Homepage1";
import Homepage2 from "./Pages/Homepage2";

import Jobprofile from "./Pages/Jobprofile";
import Jobmyresume from "./Pages/Jobmyresume";
import Jobsappliedjob from "./Pages/Jobsappliedjob";
import Jobsalert from "./Pages/Jobsalert";
import Jobsavedjobs from "./Pages/Jobsavedjobs";
import Jobcvmanager from "./Pages/Jobcvmanager";
import Changepasswordpage from "./Pages/Changepasswordpage";

import Companyprofile from "./Pages/Companyprofile";
import Companyresume from "./Pages/Companyresume";
import Companysurvey from "./Pages/Companysurvey";
import Componypostjobs from "./Pages/Componypostjobs";
import Companymanage from "./Pages/Companymanage";
import Companytransactions from "./Pages/Companytransactions";
import Browsecandidates from "./Pages/Browsecandidates";

import Aboutus from "./Pages/Aboutus";
import Jobdetail from "./Pages/Jobdetail";
import Companies from "./Pages/Companies";
import Freejobalerts from "./Pages/Freejobalerts";
import Browsejoblist from "./Pages/Browsejoblist";
import Browsejobgrid from "./Pages/Browsejobgrid";
import Browsejobfilterlist from "./Pages/Browsejobfilterlist";
import Browsejobfiltergrid from "./Pages/Browsejobfiltergrid";

import Categoryalljob from "./Pages/Categoryalljob";
import Categorycompanyjob from "./Pages/Categorycompanyjob";
import Categorydesignationsjob from "./Pages/Categorydesignationsjob";
import Categoryjobs from "./Pages/Categoryjobs";
import Categorylocationjobs from "./Pages/Categorylocationjobs";
import Categoryskilljobs from "./Pages/Categoryskilljobs";

import Portfoliogrid2 from "./Pages/Portfoliogrid2";

//import Loginpage1 from './Pages/Loginpage1';
//import Loginpage2 from './Pages/Loginpage2';
//import Loginpage3 from './Pages/Loginpage3';

import Register1 from "./Pages/Register1";
import Register2 from "./Pages/Register2";
import Error404 from "./Pages/Error404";

import Contact from "./Pages/Contact";

import Blogclassic from "./Pages/Blogclassic";
import Blogclassicsidebar from "./Pages/Blogclassicsidebar";
import Blogdetailgrid from "./Pages/Blogdetailgrid";
import Blogdetailgridsidebar from "./Pages/Blogdetailgridsidebar";
import Blogleftimg from "./Pages/Blogleftimg";
import Blogdetail from "./Pages/Blogdetail";
import ScrollToTop from "./Element/ScrollToTop";

import Courses from "./Pages/Couses";
import CourseRegistered from "./Pages/CourseRegistered";
import CourseCreate from "./Pages/CourseCreate";
import Coursedetail from "./Pages/Coursedetail";
import Coursemanage from "./Pages/Coursemanage";
import Coursefree from "./Pages/CourseFree";
import CourseLanguage from "./Pages/CourseLanguage";
import CourseStudentList from "./Pages/CourseStudentList";
import CourseSocialSkill from "./Pages/CourseSocialSkill";
import CreateCV from "./Pages/CreateCV";
import CoursesSoftSkill from "./Pages/CourseSoftSkill";
import CoursesCareerSkill from "./Pages/CourseCareerSkill";
import Avatar from "./Pages/Avatar";
import Image from "./Pages/Image";
import CreateServey from "./Pages/CreateSurvey";
import DetailSurvey from "./Pages/DetailSurvey";
import Survey from "./Pages/Survey";
import ResponseSurvey from "./Pages/ResponseSurvey";

const Markup = () => {
  const { user } = JSON.parse(localStorage.getItem("userDetail"));
  const accountType = user.accountType;
  return (
    <>
      <div className='page-wraper'>
        <Switch>
          <Route path='/' exact component={Homepage} />
          <Route path='/home' exact component={Homepage} />
          <Route path='/index-2' exact component={Homepage2} />

          {/* {accountType === 'APPLICANT' && <>
          </>} */}
          <Route path="/avatar/:id" exact component={Avatar} />
          <Route path="/imgPaperUrl" exact component={Image} />
          {accountType === "APPLICANT" && (
            <Route path='/jobs-profile' exact component={Jobprofile} />
          )}
          {accountType === "APPLICANT" && (
            <Route path='/jobs-my-resume' exact component={Jobmyresume} />
          )}
          {accountType === "APPLICANT" && (
            <Route path='/jobs-applied-job' exact component={Jobsappliedjob} />
          )}
          {accountType === "APPLICANT" && (
            <Route path='/jobs-alerts' exact component={Jobsalert} />
          )}
          {accountType === "APPLICANT" && (
            <Route path='/jobs-cv-manager' exact component={Jobcvmanager} />
          )}
          {accountType === "APPLICANT" && (
            <Route path='/jobs-create-cv' exact component={CreateCV} />
          )}
          {accountType === "APPLICANT" && (
            <Route path='/survey/:id' exact component={Survey} />
          )}
          {/* ứng viên */}
          <Route path='/about-us' exact component={Aboutus} />
          <Route
            path='/jobs-change-password'
            exact
            component={Changepasswordpage}
          />

          {/* {accountType === 'COMPANY' && <></>} */}
          {accountType === "COMPANY" && (
            <Route path='/company-profile' exact component={Companyprofile} />
          )}
          {accountType === "COMPANY" && (
            <Route path='/company-resume' exact component={Companyresume} />
          )}
          {accountType === "COMPANY" && (
            <Route path='/company-survey' exact component={Companysurvey} />
          )}

          {accountType === "COMPANY" && (
            <Route path='/company-survey/create' exact component={CreateServey} />
          )}
          {accountType === "COMPANY" && (
            <Route path='/company-survey/detail/:id' exact component={DetailSurvey} />
          )}

          {accountType === "COMPANY" && (
            <Route path='/company-survey/response/:id' exact component={ResponseSurvey} />
          )}

          {accountType === "COMPANY" && (
            <Route
              path='/company-post-jobs'
              exact
              component={Componypostjobs}
            />
          )}
          {accountType === "COMPANY" && (
            <Route path='/company-manage-job' exact component={Companymanage} />
          )}
          {accountType === "COMPANY" && (
            <Route
              path='/company-transactions'
              exact
              component={Companytransactions}
            />
          )}

          {/* công ty */}

          <Route path='/browse-candidates' exact component={Browsecandidates} />

          <Route path='/job-detail/:id' exact component={Jobdetail} />
          <Route path='/companies' exact component={Companies} />
          <Route path='/free-job-alerts' exact component={Freejobalerts} />
          <Route path='/browse-job-list' exact component={Browsejoblist} />
          <Route path='/browse-job-grid' exact component={Browsejobgrid} />
          <Route
            path='/browse-job-filter-list'
            exact
            component={Browsejobfilterlist}
          />
          <Route
            path='/browse-job-filter-grid'
            exact
            component={Browsejobfiltergrid}
          />

          <Route path='/category-all-jobs' exact component={Categoryalljob} />
          <Route
            path='/category-company-jobs'
            exact
            component={Categorycompanyjob}
          />
          <Route
            path='/category-designations-jobs'
            exact
            component={Categorydesignationsjob}
          />
          <Route path='/category-jobs' exact component={Categoryjobs} />
          <Route
            path='/category-location-jobs'
            exact
            component={Categorylocationjobs}
          />
          <Route
            path='/category-skill-jobs'
            exact
            component={Categoryskilljobs}
          />

          <Route path='/portfolio-grid-2' exact component={Portfoliogrid2} />

          {/* <Route path='/login' exact component={Loginpage2 } />
					<Route path='/login-2' exact component={Loginpage1} />
					<Route path='/login-3' exact component={Loginpage3} /> */}

          {/* <Route path='/register' exact component={Register1} /> */}
          <Route path='/register-2' exact component={Register2} />
          <Route path='/error-404' exact component={Error404} />

          <Route path='/contact' exact component={Contact} />

          <Route path='/blog-classic' exact component={Blogclassic} />
          <Route
            path='/blog-classic-sidebar'
            exact
            component={Blogclassicsidebar}
          />
          <Route path='/blog-detailed-grid' exact component={Blogdetailgrid} />
          <Route
            path='/blog-detailed-grid-sidebar'
            exact
            component={Blogdetailgridsidebar}
          />
          <Route path='/blog-left-img' exact component={Blogleftimg} />
          <Route path='/blog-details' exact component={Blogdetail} />

          {/* Route education */}
          <Route path='/courses' exact component={Courses} />
          {accountType === "APPLICANT" && (
            <Route
              path='/course-registered'
              exact
              component={CourseRegistered}
            />
          )}
          {accountType === "COMPANY" && <Route path='/course-create' exact component={CourseCreate} />}

          <Route path='/course-detail/:id' exact component={Coursedetail} />

          <Route path='/course-manage' exact component={Coursemanage} />
          <Route path='/course-free' exact component={Coursefree} />
          <Route
            path='/course-student-list/:courseID'
            exact
            component={CourseStudentList}
          />

          {/* Route customize education */}
          <Route
            path='/courses/foreign-language'
            exact
            component={CourseLanguage}
          />
          <Route
            path='/courses/social-skill'
            exact
            component={CourseSocialSkill}
          />
          <Route
            path='/courses/soft-skill'
            exact
            component={CoursesSoftSkill}
          />
          <Route
            path='/courses/career-skill'
            exact
            component={CoursesCareerSkill}
          />
          <Route path='*' component={Homepage} />
        </Switch>
      </div>
      <ScrollToTop />
    </>
  );
};

export default Markup;
