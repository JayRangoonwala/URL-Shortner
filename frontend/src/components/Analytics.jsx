import React, { useEffect, useState } from "react";
import "../App.css"
import Navbar from "./Navbar";
import { useLogginContext } from "../context/userlogin";
import { useNavigate, redirect } from "react-router-dom";

const Analytics = () => {
  const [data, setData] = useState([]);
  const LogginDetails = useLogginContext(); 
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {

        if(LogginDetails.isLoggedin == false){
          alert("Please Login First !!!");
          return navigate('/user/login');
        }

        const response = await fetch("http://localhost:8000/analysis", {
          method: "get",
          credentials: "include",
        });
        const data1 = await response.json();
        console.log(data1);
        setData(data1.data);
      } catch (error) {
        console.log("error:",error);
      }
    };
    fetchData();
    
  }, []);

  return (
    <div>
      <Navbar/>
      <h2 className="mt-14 text-2xl ">Analytics</h2>
      <div className="analytics-Container mt-5 pb-10">
        <table>
          <thead>
            <tr>
              <th>URL</th>
              <th>Short URL</th>
              <th>Created At</th>
              <th>Visited</th>
            </tr>
          </thead>
          <tbody>
            {data
              ? data.map((e) => {
                  return (
                    <tr key={e._id}>

                      <td className="text-sm w-52">{e.redirecturl}</td>
                      <td>{e.shortid}</td>
                      <td>{e.createdAt}</td>
                      <td>{e.visited.length}</td>
                    </tr>
                  );
                })
              : null}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Analytics;
