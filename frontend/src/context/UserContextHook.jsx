import React, { createContext, useState } from 'react'

export const UserDataContext = createContext();

const UserContext = ({ children }) => {

    const [user, setUser] = useState({
        fullname: {
            firstname: "first",
            lastname: "last",
        },
        email: "email not found",
    })
    // console.log(user);
    return (
        <UserDataContext.Provider value={{ user, setUser }}>
            {children}
        </UserDataContext.Provider>
    )
}

export default UserContext
