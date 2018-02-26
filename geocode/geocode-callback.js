const request = require('request')
const _ = require('lodash')

var geocodeAddress = (address, callbackFunction) => {
  if (!_.isEmpty(address)) {
    address = encodeURIComponent(address)

    request({
      url: 'https://maps.google.com/maps/api/geocode/json?key=AIzaSyBqnNJVWMkZH1svCO9fOK-iY7go77efUiw&address=' + address,
      json: true
    }, (error, response, body) => {
      if (error) {
        callbackFunction(error)
      } else if (body.status === 'ZERO_RESULTS') {
        callbackFunction('unable to find address')
      } else if (body.status === 'OK') {
        callbackFunction(undefined, {
          lat: body.results[0].geometry.location.lat,
          lng: body.results[0].geometry.location.lng
        })
      }
    })
  }
}

var getWeatherForecast = (address, callbackFunction) => {
  geocodeAddress(address, (error, results) => {
    if (error) {
      callbackFunction(error)
    } else {
      var forecastAPI = '6139ec8bfad1a857185a22e45d339bc8'
      var forecastUrl = 'https://api.darksky.net/forecast/'

      request({
        url: forecastUrl + forecastAPI + '/' + results.lat + ',' + results.lng,
        json: true
      }, (error, response, body) => {
        if (error) {
          callbackFunction(error)
        } else if (response.statusCode === 400) {
          callbackFunction('Unable to fetch weather')
        } else if (response.statusCode === 200) {
          callbackFunction(undefined, {
            'humidity': body.currently.humidity,
            'summary': body.currently.summary,
            'temperature': _.round((parseFloat(body.currently.temperature) - 32) / 1.8, 2)
          })
        }
      })
    }
  })
}

module.exports = {
  geocodeAddress,
  getWeatherForecast
}
