import React, { useState } from "react";
import { Link } from "react-router-dom";
import { axiosWithAuth } from "../utils/axiosWithAuth";

import "../styles/LoginAndRegister.css";

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const changeHandler = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    axiosWithAuth()
      .post("/login", credentials)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="register-container">
      <h2 className="title">Log in</h2>
      <div className="main-container">
        <form onSubmit={submitHandler} className="form-container">
          <div className="input-container">
            <div className="username-container">
              <label htmlFor="username">Username</label>
              <input
                id="username"
                name="username"
                placeholder="username123"
                value={credentials.username}
                onChange={changeHandler}
              />
            </div>
            <div className="password-container">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={credentials.password}
                onChange={changeHandler}
              />
            </div>
            <button className="submit-button">Log In</button>
          </div>
        </form>
      </div>
      <section className="bottom-container">
        <h2 className="new-here">
          Don't have an account? <Link to="/register">Register</Link>
        </h2>
      </section>
    </div>
  );
};

export default Login;
