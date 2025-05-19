import React, { useState,useEffect } from "react";
import { Link } from "react-router-dom";
import { useLogginContext } from "../context/userlogin";
import {Menu} from 'lucide-react';

const Navbar = (Page) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const LogginDetails = useLogginContext();

  useEffect(() => {
    if (document.cookie.startsWith("uid=")) {
      LogginDetails.setIsLoggedin(true);
    } else {
      LogginDetails.setIsLoggedin(false);
    }
  });

  const loggout = async () => {
    try {
      const response = await fetch("https://url-shortner-2-eqx2.onrender.com/user/loggout", {
        method: "post",
        credentials: "include",
      });
      if (response.ok) {
        const data = await response.json();
        alert(data.message);
        LogginDetails.setIsLoggedin(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleMenu = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <nav className="border-t-blue-600 border-r-blue-600">
      <div className="flex justify-center items-center">
      <img src="image.png" alt="logo" className="h-10 w-10 rounded-full mr-2"/>
      <h1 className="text-white text-xl">TINY-QR</h1>

      </div>
        <ul className="gap-2 transition ease-in-out max-sm:hidden">
        {Page.Page === "Home" ? (
          <Link
            to={"/"}
            className="link bg-blue-600 rounded-full  scale-[1.05]"
          >
            Home
          </Link>
        ) : (
          <Link to={"/"} className="link">
            Home
          </Link>
        )}
        {Page.Page === "Analytics" ? (
          <Link to={"/analysis"} className="link bg-blue-600 rounded-full  scale-[1.05]">
            Analytics
          </Link>
        ) : (
          <Link to={"/analysis"} className="link">
            Analytics
          </Link>
        )}
        {Page.Page === "QRCode" ? (
          <Link to={"/qrcode"} className="link bg-blue-600 rounded-full  scale-[1.05]">
            QR Generator
          </Link>
        ) : (
          <Link to={"/qrcode"} className="link">
            QR Generator
          </Link>
        )}
      </ul>
      <div className="flex gap-2">
        {LogginDetails.isLoggedin ? (
          <button
            onClick={loggout}
            className="bg-blue-600 rounded-full text-white p-2 px-3 hover:scale-[1.02]"
          >
            Log Out
          </button>
        ) : (
          <ul className="gap-2">
            <Link
              to={"/user/signup"}
              className="bg-blue-600 rounded-full text-white p-2 px-3 hover:scale-[1.02]"
            >
              Sign Up
            </Link>
            <Link
              to={"/user/login"}
              className="bg-blue-600 rounded-full text-white p-2 px-4 hover:scale-[1.02]"
            >
              Login
            </Link>
          </ul>
        )}
        <div className="relative">
        <button className="sm:hidden text-white mt-2" onClick={handleMenu}>
          <Menu size={24} />
        </button>
        {dropdownOpen && (
          <ul className="absolute right-0 text-black items-center justify-center flex-col mt-2 w-40 bg-gradient-to-r from-blue-300 to-yellow-200 shadow-md rounded-md p-2">
            <Link
              to="/"
              className="p-2 hover:bg-blue-400 w-full"
            >
              Home
            </Link>
            <Link
              to="/analysis"
              className="p-2 hover:bg-blue-400 w-full"
            >
              Analytics
            </Link>
            <Link
              to="/qrcode"
              className="p-2 hover:bg-blue-400 w-full"
            >
              QR Generator
            </Link>
          </ul>
        )}
      </div>

      </div>
    </nav>
  );
};

export default Navbar; 