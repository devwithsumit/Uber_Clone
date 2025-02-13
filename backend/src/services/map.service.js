import axios from 'axios';
module.exports.getAddressCoordinates = async (address) => {
    const apiKey = process.env.GOOGLE_MAP_API_KEY;
    const url = ``;

    try {
        const response = await axios.get(url);
        if (response.data.status === 'OK') {
            const location = response.data.results[0].geometry.location;
            return {
                latitude: location.lat,
                longitude: location.lng,
            }
        } else {
            throw new Error("Unable to fetch coordinates");
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
}