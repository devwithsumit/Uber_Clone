import React, { createContext, useState } from 'react'

export const CaptainDataContext = createContext();

const CaptainContextHook = ({ children }) => {
    // const captainProto = {
    //     fullname: {
    //         firstname: '',
    //         lastname: '',
    //     },
    //     email: '',
    //     vehicle: {
    //         color: '',
    //         capacity: '',
    //         plate: '',
    //         type: '',
    //     },
    //     status: 'inactive',
    // }
    const [captain, setCaptain] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const updateCaptain = (captainData)=>{
        setCaptain(captainData);
    }
    const value = {
        captain,
        setCaptain,
        isLoading,
        setIsLoading,
        error,
        setError,
        updateCaptain
    }
    return (
        <CaptainDataContext.Provider value={value}>
            {children}
        </CaptainDataContext.Provider>
    )
}

export default CaptainContextHook
