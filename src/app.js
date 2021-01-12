const path = require('path')
const express = require('express')
const hbs = require('hbs') 
const request = require('http')
const getGeocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const name = 'Eduardo Peixoto de Almeida'

// Start Server
const serverPort = 3000
const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather app',
        name
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        message: 'This is the help page.',
        name
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'You must specify a search term.'
        })
    }
  
    getGeocode(req.query.address, (error, {local, lon, lat} = {}) => {
        if(error) {
            return res.send({error})
        }
        forecast(lon, lat, (error, {estado, temp, precip} = {}) => {
            if(error) {
                return res.send({error})
            }
            const forecast = 'Em ' + local + ' neste momento está '+ estado + ', com temperaturas de ' + 
                        temp + 'º Celcius e há ' + precip + '% de probabilidade de chuva.'

            res.send({
                location: local,
                state: estado,
                temperature: temp,
                precipitation: precip,
                forecast
            })
        })
    })
})

app.get('/products', (req, res) => {
    if(!req.query.search){
        return res.send({
            error: "You must provide a search term"
        })
    }
    console.log(req.query.search)
        
    res.send({
        products : [] 
    })

})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name,
        errorMessage : 'Help article not found!'
    })
})

app.get('*', (req,res) => {
    res.render('404', {
        title: '404',
        name,
        errorMessage : 'Page not found!'
    })
})

app.listen(serverPort, () => {
    console.log("Server running on port: " + serverPort)
})

