import React,{ useState} from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import "../App.css"

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
    navigator.clipboard.writeText(copytext.value)
    
    document.getElementById('button').innerHTML = "Copied....";
  }
    
  return (
      <div className="home">
        <header className="absolute top-0 w-full">
          <Navbar/>
        </header>
        <div className="main-container">
          <h1 className="mb-2 text-lg">Paste the URL to be shortened</h1>
          <div className="form-container">
            <form>
          <input type="text" name="url" placeholder="Enter Your Link Here" className="url-input" autoComplete="off" onChange={handlechange}/>
          <button onClick={handleUrl} className="button max-md:p-3">Shorten URL</button>
          </form>
          </div>
          {
            isshorturl ?
            <div className="flex mt-16 justify-center items-center w-full"> 
              <h3 className="mr-2">Short URL :</h3>
                <input type="text" value={`http://localhost:3000/${shortUrl}`} id="url" className="bg-gradient-to-r from-slate-400 to-slate-300 border-2 border-t-blue-600 border-b-yellow-400 border-l-yellow-400 rounded-l-full p-4 outline-none w-[300px] text-red-600" disabled/>
                <button onClick={copyText} id="button" className="p-4 bg-gradient-to-r from-blue-600 to-blue-400 rounded-r-full text-white border-2 border-blue-500">Copy URL</button>
            </div>
            : null
          }
        </div>
      </div> 
    );
};

export default Home;
