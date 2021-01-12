const request = require('request')

const getGeocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiZWR1YXJkb3BhbG1laWRhIiwiYSI6ImNranBuYWVpejBpa2Myd215MndqYTJzOWEifQ.R2xBef13j5RppafPzGQsiQ&limit=1'

    request( {url, json:true}, (error, {body}) => {
        if(error) {
            callback('Unable to connect to the Geo Service', undefined)
        }
        else if(body.features.length === 0 ) {
            callback('Unable to find location', undefined)
        }
        else {

            console.log("URL ::: " + url)

            const local = body.features[0].text
            const lon = body.features[0].center[0]
            const lat = body.features[0].center[1]

            const dataGeo = {local, lon, lat}
            
            // console.log("Local: " + local + '\n' + 'Longitude:' + lon + '\n' + "Latitude: " + lat )

            callback( undefined, dataGeo )
        }
    } )
}

module.exports = getGeocode