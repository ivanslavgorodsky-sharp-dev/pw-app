import React from "react";
import { useHistory } from "react-router-dom";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import AppProps from './types';

const Login = (props: AppProps) => {
  let history = useHistory();
  const formik = useFormik({
    initialValues: {
      password: '',
      email: '',
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .required('No password provided.') 
        .min(3, 'Password is too short - should be 3 chars minimum.')
        .matches(/[a-zA-Z0-9]/, 'Password can only contain Latin letters and numbers.'),
      email: Yup.string()
        .email('Invalid email address')
        .required('Required field.'),
    }),
    onSubmit: values => {
      props.login(formik.values.email, formik.values.password)
        .then( token => {
          if (token) {
            props.save("token", token);
            props.remove("user");
            props.remove("transactions");
            history.push("/");
          }
        });
    },
  });

  return (
      <form onSubmit={formik.handleSubmit}>
          <h1>Sign In</h1>
          <div className="form-group m-3">
              <label>Email address</label>
              <input
                name="email" type="email" className="form-control" placeholder="Enter email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email} />
                {formik.touched.email && formik.errors.email ?
                  (<div className="alert-warning">{formik.errors.email}</div>) : null}
          </div>

          <div className="form-group m-3">
              <label>Password</label>
              <input
                name="password" type="password" className="form-control" placeholder="Enter password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password} />
                {formik.touched.password && formik.errors.password ?
                  (<div className="alert-warning">{formik.errors.password}</div>) : null}
          </div>

          <div className="form-group m-3 d-flex justify-content-center align-items-center flex-column">
            <button type="submit" className="btn btn-primary w-100" disabled={props.isLoading ? true : false}>Submit</button>
            <div className="pt-4">
              Don't have login? <a href="register">Register</a>
            </div>
          </div>
          <div className="form-group d-flex justify-content-center align-items-center flex-column">
              { props.isLoading ? <span className="spinner-border"></span> : "" }
              { props.lastError ? <span className="alert-warning">{props.lastError}</span> : "" }
          </div>
      </form>
  );
}

export default Login;
