const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken")
const bcrypt = require('bcrypt');
const { errorResponse, succesResponse } = require("../utils/responseHandler");
const blackListModel = require("../models/blackList.model");
const captainModel = require("../models/captain.model");

module.exports.authUser = async (req, res, next) => {

    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: "Unauthorised access" });
    }

    const isBlackListed = await blackListModel.findOne({ token });
    // console.log(isBlackListed);
    if (isBlackListed) {
        return res.status(401).json({ message: "Unauthorised access" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(decoded._id);
        req.user = user;
        return next();

    } catch (error) {
        return errorResponse(res, 400, "Error in access", error);
    }
}

module.exports.authCaptain = async (req, res, next) => {
    try {

        const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
        if (!token) {
            return res.status(400).json({ message: "Unauthorized: No token provided" });
        }

        const isBlackListed = await blackListModel.findOne({ token });
        if (isBlackListed) {
            return res.status(403).json({ message: "Blacklisted Token" });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const captain = await captainModel.findById(decoded._id);
        
        if (!captain) {
            return res.status(404).json({ message: "Captain not found" });
        }
        req.captain = captain;
        return next();
    } catch (error) {
        return errorResponse(res, 400, "Unauthorised", error);
    }
}