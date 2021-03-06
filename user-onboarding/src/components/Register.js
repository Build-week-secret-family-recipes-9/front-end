import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import SimpleReactValidator from "simple-react-validator";

const Register = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const { push } = useHistory();

  const simpleValidator = new SimpleReactValidator();

  const changeHandler = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (simpleValidator.allValid()) {
      axiosWithAuth()
        .post("http://localhost:5075/api/auth/register", credentials)
        .then((res) => {
          console.log(res.data);
          localStorage.setItem("token", res.data.token);
          push("/login");
        })
        .catch((err) => console.error({ err }));
    } else {
      simpleValidator.showMessages();
    }
  };

  return (
    <div className="register-container">
      <h2 className="title">Register</h2>
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
                onBlur={simpleValidator.showMessageFor("username")}
              />
              {simpleValidator.message(
                "username",
                credentials.username,
                "required|alpha_num|min:4|max:15"
              )}
            </div>
            <div className="password-container">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={credentials.password}
                placeholder="password123"
                onChange={changeHandler}
                onBlur={simpleValidator.showMessageFor("password")}
              />
              {simpleValidator.message(
                "password",
                credentials.password,
                "required|alpha_num|min:4|max:15"
              )}
            </div>
            <button className="submit-button">Register</button>
          </div>
        </form>
      </div>
      <section className="bottom-container">
        <h2 className="new-here">
          Already have an account? <Link to="/login">Log in!</Link>
        </h2>
      </section>
    </div>
  );
};

export default Register;
