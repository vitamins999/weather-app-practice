const axios = require('axios')

const geocode = address => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1Ijoidml0YW1pbnM5OTkiLCJhIjoiY2s5MnVpdmt5MDdodDNnb3RiNjI3aHdkbiJ9.wcyRTgjQvUB84K46l2Cydw&limit=1`

    return data = axios.get(url)
        .then(({ data }) => {
            if (data.features.length === 0) {
                return {
                    error: 'Unable to find location.  Try another search.',
                    location: 'No location',
                    latitude: 0,
                    longitude: 0
                }
            } else {
                return {
                    error: false,
                    location: data.features[0].place_name,
                    latitude: data.features[0].center[1],
                    longitude: data.features[0].center[0]
                }
            }
        })
        .catch((error) => {
            if (error.response) {
                return error.response.data
            } else if (error.request) {
                return error.request
            } else {
                return error.message
            }
        })
}

module.exports = geocode