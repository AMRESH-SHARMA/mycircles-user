import { React, useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Spinner from "../../aspinner/Spinner";
import { useNavigate } from "react-router-dom";

const LoginPanel = () => {

  const navigate = useNavigate()

  const handleForgot = () => {
    navigate('/user/forgot')
  }

  const [passwordShown, setPasswordShown] = useState(false);
  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };
  return (<>
    <div className="panel" id="login-form">
      <div className="panel-heading"><div className='bold'>Please</div> sign in</div>
      <div className="panel-body">
        <p>If you're already a member, please login with your username/email and password.</p>
        <Formik
          initialValues={{ username: "", password: "" }}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(async () => {
              try {
                console.log(values)
                const res = await axios.post("auth/login", values)
                console.log(res)
                if (res.data.auth_token) {
                  console.log(res.data.auth_token);
                  localStorage.setItem("authToken", res.data.auth_token);
                  navigate('/');
                }
              }
              catch (err){
                console.log(err);
                alert("Invalid credentials");
              }
              setSubmitting(false);
            }, 10000);
          }}

          validationSchema={Yup.object().shape({
            username: Yup.string()
              .required("Required"),
            password: Yup.string()
              .required("No password provided.")
              .min(8, "Password is too short - should be 8 chars minimum.")
              .matches(/(?=.*[0-9])/, "Password must contain a number.")
          })}
        >

          {props => {
            const {
              values, touched, errors, isSubmitting, handleChange, handleBlur, handleSubmit
            } = props;

            if (isSubmitting) {
              var disableStyle = { cursor: "not-allowed", }
            }

            return (
              <div>
                <form onSubmit={handleSubmit}>
                  <input
                    id="username"
                    name="username"
                    type="text"
                    placeholder="username or email"
                    value={values.username}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={errors.username && touched.username && "error"}
                  />
                  {errors.username && touched.username && (
                    <div className="input-feedback">{errors.username}</div>
                  )}
                  <div className="d-flex">
                    <input
                      id="password"
                      name="password"
                      type={passwordShown ? "text" : "password"}
                      placeholder="password"
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={errors.password && touched.password && "error"}
                    />
                    <button id="togglepassview" type="button" className={passwordShown ? "bi bi-eye-slash" : "bi bi-eye"} onClick={togglePassword}></button>
                  </div>
                  {errors.password && touched.password && (
                    <div className="input-feedback">{errors.password}</div>
                  )}
                  {/* <label><input type="checkbox" id="login-rememberme" value="1" checked /> Remember me</label> */}

                  <div className="loginfooter">
                    <button className="btnlogin" style={disableStyle} type="submit" disabled={isSubmitting}>{isSubmitting ? <div className="globalbtnspin"><Spinner /></div> : "Sign in"}</button>
                    <a href='/' onClick={handleForgot} className="alogin">Forgot your password?</a>
                  </div>

                </form>
              </div>
            );
          }}
        </Formik>
      </div>
    </div>
  </>

  )
}

export default LoginPanel