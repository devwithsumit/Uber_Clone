const axios = require('axios');
const captainModel = require('../models/captain.model');

module.exports.getAddressCoordinates = async (address) => {
    if (!address) {
        throw new Error("query is requied");
    }
    const apiKey = process.env.GOOGLE_MAP_API_KEY;
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;

    try {
        const response = await axios.get(url);
        if (response.data.status === 'OK') {
            const location = response.data.results[0].geometry.location;
            return {
                ltd: location.lat,
                lng: location.lng,
            }
        } else {
            throw new Error("Unable to fetch coordinates");
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
}

module.exports.getDistanceTime = async (origin, destination) => {
    if (!origin || !destination) {
        throw new Error("Both the query is required");
    }
    const apiKey = process.env.GOOGLE_MAP_API_KEY;
    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(origin)}&destinations=${encodeURIComponent(destination)}&key=${apiKey}`;
    try {
        const response = await axios.get(url);
        if (response.data.status === 'OK') {
            // console.log(response.data.rows[0]);
            if (response.data.rows[0].elements[0].status === 'ZERO_RESULTS') {
                throw new Error('No routes found');
            }
            return response.data.rows[0].elements[0];
        } else {
            throw new Error('Unable to fetch distance and time');
        }
    } catch (error) {
        throw error;
    }
}

module.exports.getAutoCompleteSuggestions = async (input) => {
    // if (!input) {
    //     throw new Error("query is required");
    // }

    const apiKey = process.env.GOOGLE_MAP_API_KEY;
    const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(input)}&key=${apiKey}`;
    try {
        const response = await axios.get(url);
        if (response.data.status === 'OK') {
            return response.data.predictions.map(prediction => prediction.description).filter(value => value);
        } 
        else {
            throw new Error('Unable to fetch suggestions');
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
}

module.exports.getCaptainsInRadius = async (location, radius) => {
    if (!location || !location.ltd || !location.lng) {
        throw new Error("Location is required");
    }
    //radius in km
    const captains = await captainModel.find({
        location: {
            $geoWithin: {
                $centerSphere: [[location.ltd, location.lng], radius / 6378.1]
            }
        },
        // status: 'active'
    });
    return captains;
}