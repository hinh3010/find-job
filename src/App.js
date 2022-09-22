import React, { Suspense, useEffect } from "react";
import Index from "./markup/Markup";
import { connect, useDispatch } from "react-redux";
import { Route, Switch, withRouter } from "react-router-dom";
import { checkAutoLogin } from "./services/AuthService";
import { isAuthenticated } from "./store/selectors/AuthSelectors";
import "./css/plugins.css";
import "./css/style.css";
import "./css/templete.css";
import "./css/skin/skin-1.css";
import "./plugins/slick/slick.min.css";
import "./plugins/slick/slick-theme.min.css";
import "antd/dist/antd.css";

import Login from "./markup/Pages/Loginpage2";
import SignUp from "./markup/Pages/Register2";
import Loading from "./markup/Element/Loading";
import Image from "./markup/Pages/Image";
import GoogleLogin from "react-google-login";
import ForgotPassword from "./markup/Pages/ForgotPassword";

//const SignUp = lazy(() => import('./markup/Pages/Register2'));
//const ForgotPassword = lazy(() => import('./markup/pages/ForgotPassword'));
/*  const Login = lazy(() => {
    return new Promise(resolve => {
    setTimeout(() => resolve(import('./markup/Pages/Loginpage2')), 500);
  });
});  */


const clientId = '1056969454407-1f0vmn1ds67obcn486eklhd9li0cm5pq.apps.googleusercontent.com';


function App(props) {
  const dispatch = useDispatch();
  useEffect(() => {
    checkAutoLogin(dispatch, props.history);
  }, [dispatch, props.history]);



  let routes = (
    <Switch>
      <Route path='/login' component={Login} />
      <Route path='/register-2' component={SignUp} />
      <Route path='/forgot-password' component={ForgotPassword} />

      <Route path="/imgPaperUrl" component={Image} />
    </Switch>
  );
  if (props.isAuthenticated) {
    return (
      <>
        <Loading />
        <Suspense
          fallback={
            <div id='preloader'>
              <div className='sk-three-bounce'>
                <div className='sk-child sk-bounce1'></div>
                <div className='sk-child sk-bounce2'></div>
                <div className='sk-child sk-bounce3'></div>
              </div>
            </div>
          }>
          <Index />
        </Suspense>
      </>
    );
  } else {
    return (
      <div className='vh-100'>
        <Loading />
        <Suspense
          fallback={
            <div id='preloader'>
              <div className='sk-three-bounce'>
                <div className='sk-child sk-bounce1'></div>
                <div className='sk-child sk-bounce2'></div>
                <div className='sk-child sk-bounce3'></div>
              </div>
            </div>
          }>
          {routes}
        </Suspense>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: isAuthenticated(state),
  };
};

export default withRouter(connect(mapStateToProps)(App));

//export default App;
