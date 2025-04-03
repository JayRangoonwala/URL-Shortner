import React, { useEffect, useState } from "react";
import "../App.css";
import Navbar from "../components/Navbar";
import { useLogginContext } from "../context/userlogin";
import { useNavigate } from "react-router-dom";

const Analytics = () => {
  const [data, setData] = useState([]);
  const LogginDetails = useLogginContext();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {

        if(LogginDetails.isLoggedin === false){
          alert("Please Login First !!!");
          return navigate('/user/login');
        }

        const response = await fetch("https://url-shortner-2-eqx2.onrender.com/analysis", {
          method: "get",
          credentials: "include",
        });
        const data1 = await response.json();
        setData(data1.data);
      } catch (error) {
        console.log("error:", error);
      }
    };
    fetchData();
  });

  return (
    <div className="max-lg:text-sm sm:px-4">
      <Navbar Page="Analytics"/>
      <h2 className="mt-14 text-2xl text-center">Analytics</h2>
      <div className="analytics-Container mt-5 pb-10 overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border-2 border-blue-400 p-2">URL</th>
              <th className="border-2 border-blue-400 p-2">Short URL</th>
              <th className="border-2 border-blue-400 p-2">Created At</th>
              <th className="border-2 border-blue-400 p-2">Visited</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((e) => (
              <tr key={e._id} className="even:bg-yellow-100 odd:bg-blue-200">
                <td className="border-2 border-blue-400 p-2 text-sm truncate max-w-[150px] overflow-hidden">{e.redirecturl}</td>
                <td className="border-2 border-blue-400 p-2">{e.shortid}</td>
                <td className="border-2 border-blue-400 p-2">{new Date(e.createdAt).toLocaleDateString()}</td>
                <td className="border-2 border-blue-400 p-2">{e.visited.length}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Analytics;
