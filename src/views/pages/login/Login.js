import "./Login.css";
import { React } from 'react';
import { Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { isAutheticated } from '../../../auth/Auth';

if (isAutheticated()) {
  console.log("Login Status:", isAutheticated())
  window.location.replace("/");
}

const handleForgot = () => {
  window.location.href = '/forgot'
}

const Login = () => (

  <Formik
    initialValues={{ username: "", password: "" }}
    onSubmit={(values, { setSubmitting }) => {
      setTimeout(async () => {
        try {
          // console.log(values)
          const res = await axios.post("auth/login", values)
          // console.log(res.data)
          if (res.data.code === 200) {
            // console.log(res.data.auth_token)
            localStorage.setItem("authToken", res.data.auth_token)
            window.location.reload()
          }
        }
        catch {
          alert("Invalid credentials")
        }
        setSubmitting(false);
      }, 5000);
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


      return (
        <div className="bg-light min-vh-100 p-5 m-5">
          <h1 className=" mt-5">Please Login</h1>
          <form onSubmit={handleSubmit}>

            <label htmlFor="username">Username or Email</label>
            <input
              id="username"
              name="username"
              type="text"
              placeholder="Enter your username"
              value={values.username}
              onChange={handleChange}
              onBlur={handleBlur}
              className={errors.username && touched.username && "error"}
            />
            {errors.username && touched.username && (
              <div className="input-feedback">{errors.username}</div>
            )}

            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Enter your password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              className={errors.password && touched.password && "error"}
            />
            {errors.password && touched.password && (
              <div className="input-feedback">{errors.password}</div>
            )}
            <div className="d-flex justify-content-between">
              <button className="btnlogin" type="submit" disabled={isSubmitting}>{isSubmitting ? "Wait" : "Login"}</button><div className="px-4"></div>
              <button className="btnlogin" onClick={handleForgot}>Forgot Password</button>
            </div>

          </form>
        </div>
      );
    }}
  </Formik>
);

export default Login;