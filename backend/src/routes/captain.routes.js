const express = require("express")
const router = express.Router();
const { body } = require("express-validator");
const { registerCaptain, loginCaptain, captainProfile, logoutCaptain } = require("../controllers/captain.controller");
const { authCaptain } = require("../middlewares/auth");

router.get("/test", (req, res)=>{
    res.send("Hello captain routes");
})
router.post("/register", [
    body('fullname.firstname').isLength({ min: 3 }).withMessage("First name must contain at least 3 characters"),
    body('email').isEmail().withMessage("Enter a valid email address"),
    body('password').isLength({ min: 3 }).withMessage("Password must be least 3 characters long"),
    body('vehicle.color').isLength({min: 3}).withMessage("Color must be at least 3 character long"),
    body('vehicle.plate').isLength({min: 3}).withMessage("Plate must be at least 3 character long"),
    body('vehicle.capacity').isLength({ min: 1 }).withMessage("At least 1 capacity is required"),
    body('vehicle.type').isIn(['car', 'bike', 'auto']).withMessage("Invalid vehicle type"),
], registerCaptain)

router.post('/login',[
    body('email').isEmail().withMessage("Enter a valid email address"),
    body('password').isLength({ min: 3 }).withMessage("Password must be least 3 characters long"),
], loginCaptain)

router.get('/profile', authCaptain, captainProfile);

router.get('/logout', authCaptain, logoutCaptain);

module.exports = router;