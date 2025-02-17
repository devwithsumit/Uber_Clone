
const express = require('express');
const { authUser } = require('../middlewares/auth');
const { getCoordinates, getDistanceTime, getAutoCompleteSuggestions } = require('../controllers/map.controller');
const { query } = require('express-validator');
const router = express.Router();


router.get(`/get-coordinates`,
    query('address').isLength({ min: 3 }),
    authUser, getCoordinates);

router.get(`/get-distance-time`,
    query('origin').isString().isLength({ min: 3 }),
    query('destination').isString().isLength({ min: 3 }),
    authUser, getDistanceTime);

router.get(`/get-suggestions`,
    authUser,
    getAutoCompleteSuggestions);


module.exports = router;