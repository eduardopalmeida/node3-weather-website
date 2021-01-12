const request = require('request')

const getWeather = (lon, lat, callback) => {
    const coordDJIV = "41.150613,-8.602332"
    const tempFahrenheit = 'units=f'
    const tempCelcius = 'units=m'

    const url = 'http://api.weatherstack.com/current?access_key=fe43e05228d9d0704483a7258950a465&query=' + lat + ','+ lon + '&' + tempCelcius
    const urlMeteoDJIV = 'http://api.weatherstack.com/current?access_key=fe43e05228d9d0704483a7258950a465&query=' + coordDJIV + '&' + tempCelcius

    request( {url, json:true}, (error, {body}) => {
        if(error) {
            callback('Unable to connect to the Geo Service', undefined)
        }
        else if(body.success == false ) {
            callback('Unable to find location', undefined)
        }
        else {
            const estado = body.current.weather_descriptions[0]
            const temp   = body.current.temperature
            const precip = body.current.precip
            const humid  = body.current.humidity
        
            // console.log('Neste momento está '+ estado + ', com temperaturas de ' + temp + 
            //             'º Celcius e há ' + precip + '% de probabilidade de chuva.')      
            
            data = {estado, temp, precip, humid}

            callback( undefined, data )
        }
    } )
}

module.exports = getWeather