const { validationResult } = require('express-validator')
const UserService = require("../services/user.service");
const userModel = require("../models/user.model");
const { succesResponse, errorResponse } = require("../utils/responseHandler");


exports.registerUser = async (req, res, next) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { fullname, email, password } = req.body;

        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return errorResponse(res, 400, "Email Already registered");
        }

        const hashedPassword = await userModel.hashPassword(password);

        const user = await UserService.createUser({
            firstname: fullname.firstname,
            lastname: fullname.lastname,
            email,
            password: hashedPassword,
        })

        const token = user.generateAuthToken();

        // res.status(201).json({ user, token });
        return succesResponse(res, 201, "User registered successfully", {
            user,
            token
        })
    } catch (error) {
        // res.status(400).json("error: " + error);
        return errorResponse(res, 400, "Registration failed", error)
    }

}

exports.loginUser = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return errorResponse(res, 400, errors.array())
    }

    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email }).select("+password");
        if (!user) {
            return errorResponse(res, 401, "Invalid email or password");
        }
        // console.log(user);
        const isMatch = user.comparePassword(password);
        if (!isMatch) {
            return errorResponse(res, 401, "Invalid email or password");
        }
        const token = user.generateAuthToken();

        //set cookie
        res.cookie('token', token);

        return succesResponse(res, 200, "Login Successful", {
            user,
            token
        })
    } catch (error) {
        return errorResponse(res, 401, "Error in login user: " + error);
    }
}

exports.userProfile = async (req, res, next) => {
    try {

        // console.log(req.user);

        return succesResponse(res, 201, "Profile fetched ", req.user);
    } catch (error) {
        return errorResponse(res, 401, "Error fetching profile", error);
    }
}