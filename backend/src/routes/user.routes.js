const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const { registerUser, loginUser, userProfile, logoutUser } = require("../controllers/user.controller")
const { authUser } = require("../middlewares/auth")

router.post('/register', [
    body("fullname.firstname").isLength({ min: 3 }).withMessage("First name must contain at least 3 characters"),
    body('email').isEmail().withMessage("Invalid email"),
    body("password").isLength({ min: 3 }).withMessage("password must be at least 3 characters long"),
], registerUser)

router.post("/login", [
    body('email').isEmail().withMessage("Invalid email"),
    body("password").isLength({ min: 3 }).withMessage("password must be at least 3 characters long"),
], loginUser);

router.get("/profile", authUser, userProfile);

router.get('/logout', authUser, logoutUser);

module.exports = router;
