import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import loader from '../images/loadings.gif'

export const RedirectUrl = () => {
    const {shorturl} = useParams();

    useEffect(() => {
        const fetchData = async() => {
            const response = await fetch(`http://localhost:8000/url/${shorturl}`,{
                method:"get",
                headers:{
                    "Content-Type":"application/json"
                },
                credentials:"include"
            })

            if(!response.ok){
                const data = await response.json();
                alert(data.error)
            }
            const data = await response.json();
            if(data.redirectUrl){
                window.location.href = data.redirectUrl
            }
        }
        
        fetchData();

    },[shorturl])
    return <div className="loader"><img src={loader} alt="Loading" /></div>
}