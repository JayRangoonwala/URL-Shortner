import React,{ useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLogginContext } from "../context/userlogin";

const Home = () => {

  const [url,seturl] = useState({url:""})
  const [isshorturl,setIsShorturl] = useState(false);
  const [shortUrl,setShortUrl] = useState("");
  const LogginDetails = useLogginContext();
  

  const navigate = useNavigate();
  console.log(LogginDetails.isLoggedin);
  const handlechange = (e) => {
    seturl({...url,[e.target.name] : e.target.value})
  }

  const UrlValidation = (url) => {

    if(url === ""){
      alert("Please Enter URL !!")
      return false
    }

    if(!url.startsWith("http://") && !url.startsWith("https://")){
      alert("URL must Starts With http:// or https://")
      return false
    }
    return true
  }

  const handleUrl = async (e) => {
    e.preventDefault();

    if(UrlValidation(url.url)){
      try{
        const response = await fetch("http://localhost:8000/url",{
          method:"post",
          headers:{
            "Content-Type" : "application/json"
          },
          body: JSON.stringify(url),
          credentials : "include"
        });
        if(response.ok){
          const data = await response.json();
          setShortUrl(data.shorturl)
          setIsShorturl(true)
        }else{
          const data = await response.json();
          if(data.LoginError){
            alert(data.LoginError);
            navigate("/user/login")
          }
          else{
            alert(data.error);
          }
        }
      }catch(error){
        alert(error)
      }
    }
  } 

  const copyText = (e) => {
    var copytext = document.getElementById("url");
    navigator.clipboard.writeText(copytext.textContent)
  }

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
      <div className="home">
        <nav>
        <h1>URL-SHORTNER</h1>
        <ul>
          <Link to={'/'} className="link">Home</Link>
          {
            LogginDetails.isLoggedin ?
            <button onClick={loggout}>Log Out</button>
            :
            <>
            <Link to={'/user/signup'} className="link">Sign Up</Link>
            <Link to={'/user/login'} className="link">Login</Link>
            </>
          }
          
        </ul>
        </nav>
  
        <div className="main-container">
          <h1>Paste the URL to be shortened</h1>
          <div className="form-container">
            <form>
          <input type="text" name="url" placeholder="Enter Your Link Here" className="url-input" autoComplete="off" onChange={handlechange}/>
          <button onClick={handleUrl}>Shorten URL</button>
          </form>
          </div>
          {
            isshorturl ?
            <div className="out-shorturl"> 
              <h3>Short URL :</h3>
              <div className="shorturl"><h3 id="url"> http://localhost:3000/{shortUrl}</h3>
              <button onClick={copyText}>Copy URL</button></div>
            </div>
            : null
          }
        </div>
      </div> 
    );
};

export default Home;
