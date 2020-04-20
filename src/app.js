const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Jools Barnett'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Cats',
        name: 'Jools Barnett'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Jools Barnett',
        helpMsg: 'This is a help message. Scary, huh?'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }
    geocode(req.query.address)
        .then(({ error, location, latitude, longitude } = {}) => forecast(error, location, latitude, longitude))
        .then(({ error, location, description, temp, feelsLike }) => {
            if (!error) {
                res.send({
                    location,
                    description,
                    temp,
                    feelsLike,
                    address: req.query.address
                })
            } else {
                res.send({
                    error
                })
            }
        })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Help',
        name: 'Jools Barnett',
        error: 'Help article not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Jools Barnett',
        error: 'Page not found.'
    })
})

app.listen(port, () => {
    console.log(`Server is up on port ${port}.`)
})