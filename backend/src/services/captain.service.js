const captainModel = require("../models/captain.model");

module.exports.createCaptain  = async ({
    firstname, lastname, email, password, color, type, plate, capacity
})=>{

    if(!firstname || !email || !password || !color || !type || !plate || !capacity){
        throw new Error("All fields are required")
    }
    
    const captain = await captainModel.create({
        fullname:{
            firstname,
            lastname,
        },
        email,
        password,
        vehicle:{
            color,
            type,
            plate,
            capacity,
        }
    })
    return captain;
}