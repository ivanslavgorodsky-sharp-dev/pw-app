import React from "react";
import { useHistory } from "react-router-dom";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import AppProps from './types';

const Register = (props: AppProps) => {
  let history = useHistory();
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password1: '',
      password2: '',
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .required('Name is required') 
        .min(3, 'Name is too short - 3 letter min')
        .matches(/[a-zA-Z]/, 'Name can only contain Latin letters.'),
      email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
      password1: Yup.string()
        .required('No password provided.') 
        .min(3, 'Password is too short - should be 3 chars minimum.')
        .matches(/[a-zA-Z0-9]/, 'Password can only contain Latin letters and numbers.'),
      password2: Yup.string()
        .oneOf([Yup.ref('password1'), null], 'Passwords must match'),
    }),
    onSubmit: values => {
      props.registerUser (formik.values.name, formik.values.email, formik.values.password1)
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
        <h3>Sign Up</h3>
        <div className="form-group m-3">
            <label>Your name</label>
            <input
              type="text" className="form-control" placeholder="Enter your name" name="name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name} />
              {formik.touched.name && formik.errors.name ?
                (<div className="alert-warning">{formik.errors.name}</div>) : null}
        </div>
        <div className="form-group m-3">
            <label>Email address</label>
            <input
              type="email" className="form-control" placeholder="Enter email" name="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email} />
              {formik.touched.email && formik.errors.email ?
                (<div className="alert-warning">{formik.errors.email}</div>) : null}
        </div>

        <div className="form-group m-3">
            <label>Password</label>
            <input
              type="password" className="form-control" placeholder="Enter password" name="password1"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password1} />
              {formik.touched.password1 && formik.errors.password1 ?
                (<div className="alert-warning">{formik.errors.password1}</div>) : null}
        </div>

        <div className="form-group m-3">
            <label>Password Match</label>
            <input
              type="password" className="form-control" placeholder="Enter password again" name="password2"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password2} />
              {formik.touched.password2 && formik.errors.password2 ?
                (<div className="alert-warning">{formik.errors.password2}</div>) : null}
        </div>
        <div className="form-group m-3 d-flex justify-content-center align-items-center flex-column">
          <button type="submit" className="btn btn-primary w-100" disabled={props.isLoading ? true : false}>Sign Up</button>
          <div className="pt-4">
            Already registered? <a href="login">Sign in</a>
          </div>
        </div>
        <div className="form-group d-flex justify-content-center align-items-center flex-column">
              { props.isLoading ? <span className="spinner-border"></span> : "" }
              { props.lastError ? <span className="alert-warning">{props.lastError}</span> : "" }
        </div>
    </form>
  )
}

export default Register;
