const yargs = require('yargs')
const geocode = require('./geocode/geocode-axios')

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
  geocode.geocodeAddress(argv.address)
    .then((location) => {
      return geocode.getWeatherForecast(location)
    })
    .then((weatherInfo) => {
      console.log('Current temperature: ' + weatherInfo.temperature + ' Celcius with ' +
        weatherInfo.humidity + ' humidity')
    })
    .catch((error) => {
      console.log(error)
    })
}

console.log('program ended')
