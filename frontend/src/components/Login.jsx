import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLogginContext } from "../context/userlogin";

const Login = () => {
  
  const LogginDetails = useLogginContext();

  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleOnChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:8000/user/login", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
      credentials: "include",
    });
    if (response.ok) {
      setTimeout(() => {
        navigate("/");
        LogginDetails.setIsLoggedin(true)
      }, 100);
    } else {
      const data = await response.json();
      alert(data.error);
    }
  };

  return (
    <div className="outer-container">
      <div className="signup-container">
        <div className="div-container1">
          <h1>Login</h1>
        </div>

        <div className="div-container2">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            placeholder="Enter Email"
            name="email"
            onChange={handleOnChange}
          />

          <label htmlFor="password">Password</label>
          <input type="password" name="password" onChange={handleOnChange} />

          <p>
            Don't Have An Account ?
            <Link
              to={"/user/signup"}
              style={{ color: "White", fontWeight: "bolder" }}
            >
              {" "}
              Sign Up
            </Link>
          </p>

          <button onClick={handleLogin}>Log in</button>
        </div>
      </div>
    </div>
  );
};

export default Login;
