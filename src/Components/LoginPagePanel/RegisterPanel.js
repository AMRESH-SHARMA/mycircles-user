import React from 'react'
import { Formik } from "formik";
import * as Yup from "yup";
// import axios from "axios";

const RegisterPanel = () => {
  return (<>
    <div className="panel" id="register-form">
      <div className="panel-heading"><div className='bold'>Sign</div> up</div>
      <div className="panel-body">
        <p>Don't have an account? Join the network by entering your e-mail address.</p>
        <Formik
          initialValues={{ email: "" }}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(async () => {
              try {
                console.log(values)
                // const res = await axios.post("auth/login", values)
                // console.log(res.data)
                // if (res.data.code === 200) {
                //   console.log(res.data.auth_token)
                //   localStorage.setItem("authToken", res.data.auth_token)
                //   window.location.reload()
                // }
                alert("done")
              }
              catch {
                alert("Invalid credentials")
              }
              setSubmitting(false);
            }, 1500);
          }}

          validationSchema={Yup.object().shape({
            email: Yup.string()
              .required("Required"),
          })}
        >

          {props => {
            const {
              values, touched, errors, isSubmitting, handleChange, handleBlur, handleSubmit
            } = props;


            return (
              <div>
                <form onSubmit={handleSubmit}>
                  <input
                    id="email"
                    name="email"
                    type="text"
                    placeholder="email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={errors.email && touched.email && "error"}
                  />
                  {errors.email && touched.email && (
                    <div className="input-feedback">{errors.email}</div>
                  )}

                  <div className="loginfooter">
                    <button className="btnlogin" type="submit" disabled={isSubmitting}>{isSubmitting ? "Wait" : "Register"}</button>
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

export default RegisterPanel