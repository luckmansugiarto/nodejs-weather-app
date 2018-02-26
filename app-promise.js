const yargs = require('yargs')
var geocode = require('./geocode/geocode-promise')

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
  // Call geocode address with Promise
  // geocode.geocodeAddress(argv.address)
  //   .then((location) => {
  //     console.log(location)
  //   })
  //   .catch((error) => {
  //     console.log(error)
  //   })

  // Promise returning functions to execute in sequential order (not parallel)
  var fnlist = [geocode.getWeatherForecast]

  fnlist
    .reduce((promiseChain, currentPromise) => {
      return promiseChain.then(currentPromise)
    }, geocode.geocodeAddress(argv.address))
    .then((weatherInfo) => {
      console.log('Current temperature: ' + weatherInfo.temperature + ' Celcius with ' +
      weatherInfo.humidity + ' humidity')
    })
    .catch((error) => {
      console.log(error)
    })

  // geocode.getWeatherForecast(argv.address)
  //   .then((weatherInfo) => {
  //     console.log('Current temperature: ' + weatherInfo.temperature + ' Celcius with ' +
  //       weatherInfo.humidity + ' humidity')
  //   })
  //   .catch((error) => {
  //     console.log(error)
  //   })
}

console.log('program ended')
