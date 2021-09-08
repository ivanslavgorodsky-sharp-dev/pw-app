import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const Login = (props) => {
  let history = useHistory();
  const [formState, setFormState] = useState({email: "", password: ""});

  const handleSubmit = (evt) => {
    props.login(formState.email, formState.password)
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

  const handleChange = (evt) => {
    const prop = evt.target.name;
    const state = {
      ...formState
    }
    state[prop] = evt.target.value;
    setFormState(state);
  };

  return (
      <form onSubmit={handleSubmit}>
          <h1>Sign In</h1>
          <div className="form-group m-3">
              <label>Email address</label>
              <input name="email"
                type="email" className="form-control" placeholder="Enter email"
                value={formState.email} onChange={handleChange} required autoComplete="off" />
          </div>

          <div className="form-group m-3">
              <label>Password</label>
              <input name="password"
                type="password" className="form-control" placeholder="Enter password"
                value={formState.password} onChange={handleChange} required autoComplete="off" />
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
