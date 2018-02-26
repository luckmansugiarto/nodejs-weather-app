const request = require('request')
const _ = require('lodash')

var geocodeAddress = (address) => {
  if (!_.isEmpty(address)) {
    address = encodeURIComponent(address)

    return new Promise((resolve, reject) => {
      request({
        url: 'https://maps.google.com/maps/api/geocode/json?key=AIzaSyBqnNJVWMkZH1svCO9fOK-iY7go77efUiw&address=' + address,
        json: true
      }, (error, response, body) => {
        if (error) {
          reject(error)
        } else if (body.status === 'ZERO_RESULTS') {
          reject(new Error('unable to find address'))
        } else if (body.status === 'OK') {
          resolve({
            lat: body.results[0].geometry.location.lat,
            lng: body.results[0].geometry.location.lng
          })
        }
      })
    })
  }
}

var getWeatherForecast = (location) => {
  var forecastAPI = '6139ec8bfad1a857185a22e45d339bc8'
  var forecastUrl = 'https://api.darksky.net/forecast/'

  return new Promise((resolve, reject) => {
    request({
      url: forecastUrl + forecastAPI + '/' + location.lat + ',' + location.lng,
      json: true
    }, (error, response, body) => {
      if (error) {
        reject(error)
      } else if (response.statusCode === 400) {
        reject(new Error('Unable to fetch weather'))
      } else if (response.statusCode === 200) {
        resolve({
          'humidity': body.currently.humidity,
          'summary': body.currently.summary,
          'temperature': _.round((parseFloat(body.currently.temperature) - 32) / 1.8, 2)
        })
      }
    })
  })
}

module.exports = {
  geocodeAddress,
  getWeatherForecast
}
