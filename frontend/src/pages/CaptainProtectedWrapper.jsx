import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { CaptainDataContext } from '../context/CaptainContextHook';

const CaptainProtectedWrapper = ({ children }) => {

    const [isLoading, setIsLoading] = useState(true);
    const { captain, setCaptain } = useContext(CaptainDataContext);

    const navigate = useNavigate();
    
    const token = localStorage.getItem('token');

    useEffect(() => {
        if (!token) {
            navigate('/captain-login');
            return;
        }
        axios.get(`${import.meta.env.VITE_HOST_URL}/captains/profile`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((response) => {
            if (response.status === 200) {
                const data = response.data.mainData;
                setCaptain(captain);
                setIsLoading(false);
            }
        }).catch(error => {
            console.log(error);
            localStorage.removeItem('token');
            navigate('/captain-login');
        })
    }, [token])


    if (isLoading) {
        return <div className='w-full h-screen flex items-center justify-center'>
            Loading...</div>
    }

    return (
        <div>
            {children}
        </div>
    )
}

export default CaptainProtectedWrapper

