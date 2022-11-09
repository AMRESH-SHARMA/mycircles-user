import React from 'react'
import { Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import registerUrl from "../../API";
import Spinner from "../../aspinner/Spinner";
import { useNavigate } from 'react-router-dom';

const RegisterPanel = () => {
  const navigate = useNavigate();

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
                let resapi = await axios.post(`${registerUrl}/gettoken`, values)
                console.log(resapi)
                if (resapi.data.data.affectedRows === 2) {
                  navigate('/user/tokenstatus')
                }
              }
              catch {
                alert("Invalid credentials")
              }
              setSubmitting(false);
            }, 1000);
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

            if (isSubmitting) {
              var disableStyle = { cursor: "not-allowed", }
            }

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
                    <div className='registerbtn'>
                      <button className="globalbtn" style={disableStyle} type="submit" disabled={isSubmitting}>{isSubmitting ? <div className='globalbtnspin'><Spinner /></div> : "Register"}</button>
                    </div>

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