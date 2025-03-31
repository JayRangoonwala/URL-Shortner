import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLogginContext } from "../context/userlogin";
import Navbar from "./Navbar";

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
    <section className="w-full h-screen">
      <header className="z-10 absolute top-0 w-full">
        <Navbar />
      </header>
      <main className="flex justify-center items-center h-screen">
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

          <p className="mt-2">
            Don't Have An Account ?
            <Link
              to={"/user/signup"}
              style={{ color: "black", fontWeight: "bolder" }}
              >
              {" "}
              Sign Up
            </Link>
          </p>

          <button onClick={handleLogin}>Log in</button>
        </div>
      </div>
              </main>
      </section>

  );
};

export default Login;
