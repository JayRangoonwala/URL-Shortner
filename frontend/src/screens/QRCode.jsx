import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { useLogginContext } from "../context/userlogin";
import { useNavigate } from "react-router-dom";

const QRCode = () => {
  const [isqrcode, setIsQRCode] = useState(false);
  const [qrcode, setQRCode] = useState("");
  const [url, setUrl] = useState({ url: "" });
  const navigate = useNavigate();
  const LogginDetails = useLogginContext();

  const handleURL = (e) => {
    setUrl({ ...url, [e.target.name]: e.target.value });
  };

  const handleLoggin = () => {
    if (LogginDetails.isLoggedin === false) {
      alert("Please Login First !!!");
      navigate("/user/login");
      return false;
    }
    return true
  };

  const handleValidation = (url) => {

    if (url.url === "") {
      alert("Please Enter URL"); 
      document.getElementById('url').focus();
      return false;
    }
    return true;
  }

  const handleQRCode = async (e) => {
    e.preventDefault();

    if (handleLoggin() && handleValidation(url)) {
      try {
        const response = await fetch("https://url-shortner-exa9.onrender.com/qrcode", {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(url),
          credentials: "include",
        });
        if (response.ok) {
          const data = await response.json();

          const base64String = btoa(
            new Uint8Array(data.img.data).reduce(
              (acc, byte) => acc + String.fromCharCode(byte),
              ""
            )
          );
          setIsQRCode(true);
          setQRCode(base64String);
        } else {
          console.log("Error in Fetching QR");
        }
      } catch (error) {
        console.log("QR error", error);
      }
    }
  };

  const handleDownload = () => {
    const a = document.createElement("a");
    a.href = `data:image/png;base64,${qrcode}`;
    a.download = "qrcode.png";

    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="">
      <header className="absolute top-0 w-full">
        <Navbar Page="QRCode"/>
      </header>
      <main className="flex flex-col justify-center items-center h-screen w-full">
        <h1 className="mb-3 text-lg text-slate-700">
          Paste the URL For QR Generate
        </h1>
        <form className="flex w-full justify-center items-center">
          <input
            type="text"
            name="url"
            id="url"
            placeholder="Enter Your Link Here"
            className="qrinput max-md:w-[60%] max-md:text-sm max-md:p-3"
            onChange={handleURL}
          />
          <button
            className="bg-gradient-to-r from-blue-500 to-blue-600 p-5 rounded-r-full text-white max-md:p-3"
            onClick={handleQRCode}
          >
            Generate QR
          </button>
        </form>
        <div className="flex flex-col justify-center items-center">
          {isqrcode ? (
            <>
              <img
                src={`data:image/png;base64,${qrcode}`}
                alt="QR Code"
                className="mt-5 h-40 w-40"
              />
              <button
                className="bg-gradient-to-t from-blue-600 to-blue-400 p-5 rounded-full text-white m-5 max-md:p-3 max-md:m-3" 
                onClick={handleDownload}
              >
                Download QR Code
              </button>
            </>
          ) : null}
        </div>
      </main>
    </div>
  );
};

export default QRCode;
