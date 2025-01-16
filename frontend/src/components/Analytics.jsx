import React, { useEffect, useState } from "react";

const Analytics = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8000/analysis", {
          method: "get",
          credentials: "include",
        });
        const data1 = await response.json();
        setData(data1.data);
      } catch (error) {
        console.log("error:",error);
      }
    };
    fetchData();
    
  }, []);

  return (
    <div>
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
            {data
              ? data.map((e) => {
                  return (
                    <tr key={e._id}>
                      <td>{e._id}</td>
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
