const socketIo = require("socket.io");
const userModel = require("./src/models/user.model");
const captainModel = require("./src/models/captain.model");
let io;

const intialiseSocket = (server) => {
    io = socketIo(server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"],
        },
    });

    io.on("connection", (socket) => {
        console.log("A user connected", socket.id);
        socket.on('join', async (data) => {
            const { userId, userType } = data;
            
            if (userType === "user") {
                await userModel.findByIdAndUpdate(userId, { socketId: socket.id });
            } else {
                await captainModel.findByIdAndUpdate(userId, { socketId: socket.id });
            }
        });
        socket.on('update-captain-location', async(data)=>{
            const {captainId, location} = data;
            if(!location || !location.ltd || !location.lng){
                return socket.emit('error', 'Invalid location');
            }
            await captainModel.findByIdAndUpdate(captainId, {location});
        })

        socket.on("disconnect", () => {
            console.log("User disconnected");
        });
    });
}

function sendMessageToSocketId(socketId, messageObj) {
    if (io) {
        io.to(socketId).emit(messageObj.eventName, messageObj.message);
    } else {
        console.log("Socket not initialised");
    }
}

module.exports = { intialiseSocket, sendMessageToSocketId };