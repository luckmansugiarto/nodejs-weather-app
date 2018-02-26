const yargs = require('yargs')
// var GeocodeClass = require('./geocode/geocode')
var geocode = require('./geocode/geocode-callback')


const argv = yargs
  .options({
    a: {
      demand: true,
      alias: 'address',
      describe: 'Address to fetch weather for',
      string: true
    }
  })
  .help()
  .alias('help', 'h')
  .argv

if (argv.address) {
  // geocode.geocodeAddress(argv.address, (error, results) => {
  //   if (error) {
  //     console.log(error)
  //   } else {
  //     console.log('lat: ' + results.lat + ', lang: ' + results.lng)
  //   }
  // })

  geocode.getWeatherForecast(argv.address, (error, results) => {
    if (error) {
      console.log(error)
    } else {
      console.log('Current temperature: ' + results.temperature + ' Celcius with ' +
        results.humidity + ' humidity')
    }
  })
  // const geocode = new GeocodeClass()
  // geocode.geocodeAddress(argv.address)
  //
  // geocode.on('onGeocodeAddressComplete', (response) => {
  //   console.log(response)
  // })
}

console.log('program ended')
