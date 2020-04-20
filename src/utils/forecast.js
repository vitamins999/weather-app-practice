const axios = require('axios')

const forecast = (error, location, latitude, longitude) => {
    const url = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=9f0053d05bc1885463c4a2e43aff5b77&units=metric`

    return data = axios.get(url)
        .then(({ data }) => {
            return {
                error,
                location,
                temp: data.main.temp,
                feelsLike: data.main.feels_like,
                description: data.weather[0].description
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

module.exports = forecast