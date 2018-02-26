const axios = require('axios')
const _ = require('lodash')

var geocodeAddress = (address) => {
  if (!_.isEmpty(address)) {
    address = encodeURIComponent(address)
    return axios.get('https://maps.google.com/maps/api/geocode/json?key=AIzaSyBqnNJVWMkZH1svCO9fOK-iY7go77efUiw&address=' + address)
      .then((response) => {
        if (response.status === 400) {
          return Promise.reject(new Error('unable to find address'))
        } else if (response.status === 200) {
          if (response.data.status === 'ZERO_RESULTS') {
            return Promise.reject(new Error('unable to find address'))
          } else if (response.data.status === 'OK') {
            return Promise.resolve({
              lat: response.data.results[0].geometry.location.lat,
              lng: response.data.results[0].geometry.location.lng
            })
          } else {
            return Promise.reject(new Error('Unknown error'))
          }
        }
      })
      .catch((error) => {
        return Promise.reject(error)
      })
  }
}

var getWeatherForecast = (location) => {
  var forecastAPI = '6139ec8bfad1a857185a22e45d339bc8'
  var forecastUrl = 'https://api.darksky.net/forecast/'
  return axios.get(forecastUrl + forecastAPI + '/' + location.lat + ',' + location.lng)
    .then((response) => {
      if (response.status === 400) {
        return Promise.reject(new Error('Unable to fetch weather'))
      } else if (response.status === 200) {
        return Promise.resolve({
          'humidity': response.data.currently.humidity,
          'summary': response.data.currently.summary,
          'temperature': _.round((parseFloat(response.data.currently.temperature) - 32) / 1.8, 2)
        })
      }
    })
    .catch((error) => {
      return Promise.reject(error)
    })
}

module.exports = {
  geocodeAddress,
  getWeatherForecast
}
