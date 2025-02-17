const { validationResult } = require("express-validator");
const { errorResponse, successResponse } = require("../utils/responseHandler");
const mapService = require("../services/map.service");

module.exports.getCoordinates = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return errorResponse(res, 400, "Validation failed", errors.array());
    }

    const { address } = req.query;
    try {
        const coordinates = await mapService.getAddressCoordinates(address);

        res.status(200).json(coordinates);
    } catch (error) {
        console.error(error);
        errorResponse(res, 400, "Coordinates not found");
    }
}

module.exports.getDistanceTime = async (req, res, next) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        errorResponse(res, 400, "Validation failed", errors.array())
    }

    const { origin, destination } = req.query;
    try {
        const distanceTime = await mapService.getDistanceTime(origin, destination);
        res.status(200).json(distanceTime);

    } catch (error) {
        console.error(error);
        errorResponse(res, 400, "Internal server error");
    }

}

module.exports.getAutoCompleteSuggestions = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            errorResponse(res, 400, "Validation failed", errors.array());
        }
        const { input } = req.query;
        const suggestions = await mapService.getAutoCompleteSuggestions(input);
        res.status(200).json(suggestions);
    } catch (error) {
        console.error(error);
        errorResponse(res, 500, 'Internal Server error')
    }
}