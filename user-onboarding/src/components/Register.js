import React, { useState } from "react";
import { Link } from "react-router-dom";
import { axiosWithAuth } from "../utils/axiosWithAuth";

const Register = () => {
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
      .post("/register", credentials)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={submitHandler}>
        <label htmlFor="username">Username</label>
        <input
          id="username"
          name="username"
          placeholder="username123"
          value={credentials.username}
          onChange={changeHandler}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          value={credentials.password}
          onChange={changeHandler}
        />
        <button>Log In</button>
      </form>

      <div>
        Already have an account? Log in <Link to="/login">here</Link>
      </div>
    </div>
  );
};

export default Register;
