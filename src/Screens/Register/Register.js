import React from "react";
import { useState, useEffect } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import "./Register.css";
import axios from "axios";
import registerUrl from "../../API";
import Spinner from "../../aspinner/Spinner";

const Register = () => {
  const [loading, setloading] = useState(true)
  const [error, seterror] = useState(false)

  useEffect(() => {
    (async () => {
      if (!window.location.href.split('=')[1]) {
        return window.location.replace("/user/login");
      }
      try {
        let payload = { token: window.location.href.split('=')[1] }
        let resapi = await axios.post(`${registerUrl}/invite/verifytoken`, payload)
        console.log(resapi)
      } catch (err) {
        console.log(err);
        seterror(true);
      }
      setloading(false)
    })()
  }, [])


  const handleLogin = () => {
    window.location.href = '/user/login'
  }

  return (
    <>
      {loading ?
        <div className="">
          <Spinner />
        </div> :
        error ?
          <div id="invalidtokenpage">
            <div id="invalidtokencard">
              <h1>Invalid Token</h1>
              <div className="d-flex justify-content-between">
                <button className="btnlogin" onClick={handleLogin}>Login</button>
              </div>
            </div>
          </div>
          :
          <Formik
            initialValues={{ username: "", email: "", password: "", confirm_password: "" }}
            onSubmit={(values, { setSubmitting }) => {
              setTimeout(() => {
                let payload = { ...values, ...{ token: window.location.href.split('=')[1] } };
                console.log("Logging in", payload);
                setSubmitting(false);
              }, 500);
            }}

            validationSchema={Yup.object().shape({
              username: Yup.string()
                .required("Required"),
              email: Yup.string()
                .email()
                .required("Required"),
              password: Yup.string()
                .required("No password provided.")
                .min(1, "Password is too short - should be 8 chars minimum.")
                .matches(/(?=.*[0-9])/, "Password must contain a number."),
              confirm_password: Yup.string()
                .required("No password provided.")
                .oneOf([Yup.ref('password'), null], "Password must match.")
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
                <div className="bg-light min-vh-100 p-5 m-5">
                  <h1>Please Register</h1>
                  <form onSubmit={handleSubmit}>

                    <label htmlFor="username">Username</label>
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

                    <label htmlFor="email">Email</label>
                    <input
                      id="email"
                      name="email"
                      type="text"
                      placeholder="Enter your email"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={errors.email && touched.email && "error"}
                    />
                    {errors.email && touched.email && (
                      <div className="input-feedback">{errors.email}</div>
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

                    <label htmlFor="confirm_password">Confirm Password</label>
                    <input
                      id="confirm_password"
                      name="confirm_password"
                      type="confirm_password"
                      placeholder="Enter your Confirm Password"
                      value={values.confirm_password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={errors.confirm_password && touched.confirm_password && "error"}
                    />
                    {errors.confirm_password && touched.confirm_password && (
                      <div className="input-feedback">{errors.confirm_password}</div>
                    )}

                    <div className="d-flex justify-content-between">
                      <button className="btnRegister" style={disableStyle} type="submit" disabled={isSubmitting}>Register</button>
                      <button className="btnRegister" onClick={handleLogin}>Login</button>
                    </div>

                  </form>
                </div>
              );
            }}
          </Formik>}
    </>
  )
}

export default Register;