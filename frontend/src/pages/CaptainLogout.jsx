import axios from 'axios';
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const CaptainLogout = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            navigate("/captain-login");
        }

        axios.get(`${import.meta.env.VITE_HOST_URL}/users/logout`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((response) => {
            // console.log("Logout Response:", response.data);
            localStorage.removeItem("token");
            navigate("/captain-login");
        }).catch(error => {
            console.error("Logout Error:", error.response ? error.response.data : error.message);
        })

    }, [token]);

    return (
        <div>
            Captain Logout
        </div>
    )
}



export default CaptainLogout
