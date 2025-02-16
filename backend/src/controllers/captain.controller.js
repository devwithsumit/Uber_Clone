const { validationResult } = require("express-validator");
const captainModel = require("../models/captain.model");
const captainService = require("../services/captain.service");
const { errorResponse, successResponse } = require("../utils/responseHandler");
const blackListModel = require("../models/blackList.model");

exports.registerCaptain = async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array() });
    }

    try {
        const { fullname, email, password, vehicle } = req.body;
        const isCaptainExits = await captainModel.findOne({ email });
        if (isCaptainExits) {
            return res.status(401).json({ message: "Email already registered" });
        }
        //always use await
        const hashedPassword = await captainModel.hashPassword(password);

        const captain = await captainService.createCaptain({
            firstname: fullname.firstname,
            lastname: fullname.lastname,
            email,
            password: hashedPassword,
            type: vehicle.type,
            color: vehicle.color,
            plate: vehicle.plate,
            capacity: vehicle.capacity,
        })

        const token = captain.generateAuthToken();

        return successResponse(res, 200, "Captain registered successfully", {
            token,
            captain
        })
    } catch (error) {
        console.log(error);
        return errorResponse(res, 200, "Registeration failed", error);
    }
}

exports.loginCaptain = async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array() });
    }
    try {
        const { email, password } = req.body;
        //await always used
        const captain = await captainModel.findOne({ email }).select("+password");
        if (!captain) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        //do not use await here
        const isMatch = captain.comparePassword(captain.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        const token = captain.generateAuthToken();
        
        res.cookie('token', token);

        return successResponse(res, 200, "Login successful", {
            token,
            captain
        })

    } catch (error) {
        errorResponse(res, 400, "Login failed", error)
    }
}

exports.captainProfile = async (req, res, next) => {
    successResponse(res, 200, "Profile fetched successfully", req.captain);
}

exports.logoutCaptain = async (req, res, next) => {
    try {
        const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

        await blackListModel.create({ token })

        res.clearCookie('token');

        return successResponse(res, 200, "Logout successful");
    } catch (error) {
        return errorResponse(res, 400, "Error logout user", error);
    }
}