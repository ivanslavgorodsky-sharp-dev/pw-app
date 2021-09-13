import React from "react";
import { useHistory } from "react-router-dom";
import AppProps from './types';

const Register = (props: AppProps) => {
  let history = useHistory();
  const [formState, setFormState] = React.useState({name: "", email: "", password1: "", password2: "", error: ""});

  const handleSubmit = (evt: React.FormEvent) => {
    if (formState.password1 !== formState.password2) {
      setFormState({
        ...formState,
        error: "Passwords don't match" 
      });
      return evt.preventDefault();
    }

    props.registerUser (formState.name, formState.email, formState.password1)
      .then( token => {
        if (token) {
          props.save("token", token);
          props.remove("user");
          props.remove("transactions");
          history.push("/");
        }
      });
    evt.preventDefault();
  }

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const state = {
      ...formState,
      error: "",
      [evt.target.name]: evt.target.value,
    }
    setFormState(state);
  };

  return (
    <form onSubmit={handleSubmit}>
        <h3>Sign Up</h3>
        <div className="form-group m-3">
            <label>Your name</label>
            <input
              type="text" className="form-control" placeholder="Enter your name" name="name"
              value={formState.name} onChange={handleChange} required autoComplete="off" />
        </div>
        <div className="form-group m-3">
            <label>Email address</label>
            <input
              type="email" className="form-control" placeholder="Enter email" name="email"
              value={formState.email} onChange={handleChange} required autoComplete="off" />
        </div>

        <div className="form-group m-3">
            <label>Password</label>
            <input
              type="password" className="form-control" placeholder="Enter password" name="password1"
              value={formState.password1} onChange={handleChange} required autoComplete="off" />
        </div>

        <div className="form-group m-3">
            <label>Password Match</label>
            <input
              type="password" className="form-control" placeholder="Enter password again" name="password2"
              value={formState.password2} onChange={handleChange} required autoComplete="off" />
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
              { formState.error ? <span className="alert-warning">{formState.error}</span> : "" }
          </div>
    </form>
  )
}

export default Register;
