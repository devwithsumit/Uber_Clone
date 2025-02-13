import axios from 'axios';
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const UserLogout = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    useEffect(() => {
        //if no token found directly return otherwise null will be sent i header
        // and error will occur
        if (!token) {
            navigate("/user-login");
        }

        axios.get(`${import.meta.env.VITE_HOST_URL}/users/logout`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(res => {
            localStorage.removeItem('token');
            navigate('/user-login');
        }).catch(error => {
            console.error(error.response ? error.response.data : error.message);
        })
    }, [token])

    return (
        <div>
            User logout
        </div>
    )
}

export default UserLogout
