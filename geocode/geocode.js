const request = require('request')
const util = require('util')
const eventEmitter = require('events').EventEmitter
const _ = require('lodash')

var Geocode = function () {
  this.geocodeAddress = function (address) {
    if (!_.isEmpty(address)) {
      var geocodeObject = this
      address = encodeURIComponent(address)

      request({
        url: 'https://maps.google.com/maps/api/geocode/json?key=AIzaSyBqnNJVWMkZH1svCO9fOK-iY7go77efUiw&address=' + address,
        json: true
      }, (error, response, body) => {
        var result = {}

        if (error) {
          result = {status: 'failed', 'reason': error}
        } else if (body.status === 'ZERO_RESULTS') {
          result = {status: 'failed', 'reason': 'unable to find address'}
        } else if (body.status === 'OK') {
          result = {
            status: 'success',
            data: {
              lat: body.results[0].geometry.location.lat,
              lng: body.results[0].geometry.location.lng
            }
          }
        }

        geocodeObject.emit('onGeocodeAddressComplete', result)
      })
    }
  }
}

util.inherits(Geocode, eventEmitter)

module.exports = Geocode
