import React,{useState} from "react";
import { Link, useNavigate } from "react-router-dom";
// import { useLogginContext } from "../context/userlogin";

const Home = () => {

  const [url,seturl] = useState({url:""})
  const [isshorturl,setIsShorturl] = useState(false);
  const [shortUrl,setShortUrl] = useState("");

  const navigate = useNavigate();

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

  return (
      <div className="home">
        <nav>
        <h1>URL-SHORTNER</h1>
        <ul>
          <Link to={'/'} className="link">Home</Link>
          <Link to={'/user/signup'} className="link">Sign Up</Link>
          <Link to={'/user/login'} className="link">Login</Link>
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
          
        <h2>Analytics</h2>
        <div className="analytics-Container">
          <table>
            <thead>
            <tr>
              <th>Index No.</th>
              <th>Short URL</th>
              <th>Created At</th>
              <th>Visited</th>
            </tr>
            </thead>
            <tbody>
              <tr>
              <td>Index No.</td>
              <td>Short URL</td>
              <td>Created At</td>
              <td>Visited</td>
            </tr>
            <tr>
              <td>Index No.</td>
              <td>Short URL</td>
              <td>Created At</td>
              <td>Visited</td>
            </tr>
            <tr>
              <td>Index No.</td>
              <td>Short URL</td>
              <td>Created At</td>
              <td>Visited</td>
            </tr>
            <tr>
              <td>Index No.</td>
              <td>Short URL</td>
              <td>Created At</td>
              <td>Visited</td>
            </tr>
            <tr>
              <td>Index No.</td>
              <td>Short URL</td>
              <td>Created At</td>
              <td>Visited</td>
            </tr>
            <tr>
              <td>Index No.</td>
              <td>Short URL</td>
              <td>Created At</td>
              <td>Visited</td>
            </tr>
            </tbody>
          </table>
        </div>
        </div>
      </div> 
    );
};

export default Home;
