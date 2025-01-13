import React, { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
// import { useLogginContext } from "../context/userlogin";

const Registration = () => {

  // const LogginDetails = useLogginContext();

  const [signupData, setSignupData] = useState({
    email: "",
    username: "",
    password: "",
    cpassword: "",
  });

  const navigate = useNavigate()

  const validatePassword = (password, cpassword) => {
    if (password !== cpassword) {
      alert("Password And Confirm Password Can't Match...");
      return false;
    }
    return true;
  };

  const handleOnChange = (e) => {
    setSignupData({ ...signupData, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    if (validatePassword(signupData.password, signupData.cpassword)) {
      const response = await fetch("http://localhost:8000/user/signup", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signupData),
      });
      if (response.ok) {
        alert("Account Created SuccessFully !!");
        navigate("/user/login");
      } else {
        const data = await response.json();
        alert(data.errors);
      }
    }
  };

  return (
    <div className="outer-container">
    <div className="signup-container">
      <div className="div-container1">
        <h1>Sign Up</h1>
      </div>

      <div className="div-container2">
        <label htmlFor="email">Email</label>
        <input
          type="text"
          placeholder="Enter Email"
          name="email"
          onChange={handleOnChange}
        />

        <label htmlFor="username">Username</label>
        <input
          type="text"
          placeholder="Enter Username"
          name="username"
          onChange={handleOnChange}
        />

        <label htmlFor="password">Password</label>
        <input type="password" name="password" onChange={handleOnChange} />

        <label htmlFor="cpassword">Confirm Password</label>
        <input type="password" name="cpassword" onChange={handleOnChange} />

        <p>
          Already Have An Account ?
          <Link
            to={"/user/login"}
            style={{ color: "White", fontWeight: "bolder" }}
          >
            {" "}
            Log in
          </Link>
        </p>

        <button onClick={handleSignup}>Sign Up</button>
      </div>
    </div>
  </div>
  );
};

export default Registration;
