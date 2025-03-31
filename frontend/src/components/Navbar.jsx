import React from 'react'
import { Link } from "react-router-dom";
import { useLogginContext } from "../context/userlogin";

const Navbar = () => {

    
  const LogginDetails = useLogginContext();

    const loggout = async() => {
        try{
          const response = await fetch("http://localhost:8000/user/loggout",{
          method:"post",
          credentials : "include"
        });
        if(response.ok){
          const data = await response.json();
          alert(data.message);
          LogginDetails.setIsLoggedin(false)
        }
      }
        catch(error){
          console.log(error)
        }
      }

  return (
    <nav>
        <h1>URL-SHORTNER</h1>
        <ul className="">
          <Link to={'/'} className="link">Home</Link>
          <Link to={'/'} className="link">Analytics</Link>
          <Link to={'/'} className="link">QR Generator</Link>
        </ul>
        <div className="flex">
          {
            LogginDetails.isLoggedin ?
            <button onClick={loggout} className='bg-blue-600 rounded-full text-white p-2 px-3 hover:scale-[1.02]'>Log Out</button>
            :
            <ul className='gap-2'>
              <Link to={'/user/signup'} className="bg-blue-600 rounded-full text-white p-2 px-3 hover:scale-[1.02]">Sign Up</Link>
              <Link to={'/user/login'} className="bg-blue-600 rounded-full text-white p-2 px-4 hover:scale-[1.02]">Login</Link>
            </ul>
          }
          </div>
        </nav>
  )
}

export default Navbar
