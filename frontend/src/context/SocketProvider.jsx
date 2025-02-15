import { createContext, useEffect } from "react";
import { io } from "socket.io-client";

const socket = io(`${import.meta.env.VITE_HOST_URL}`)
export const SocketContext = createContext();

const SocketProvider = ({ children }) => {

    useEffect(() => {
        socket.on("connect", () => {
            console.log("Connected to the server");
        })
        socket.on("disconnect", () => {
            console.log("Disconnected from the server");
        });
    }, [])

    const sendMessage = (eventName, messageObj) => {
        socket.emit(eventName, messageObj);
    }
    const receiveMessage = (eventName, cb) => {
        socket.on(eventName, cb);
    }

    return (
        <SocketContext.Provider value={{ sendMessage, receiveMessage, socket }}>
            {children}
        </SocketContext.Provider>
    )
}

export default SocketProvider;