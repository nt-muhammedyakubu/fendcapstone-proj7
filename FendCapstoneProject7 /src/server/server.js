// Setup empty JS object to act as endpoint for all route
projectData = {};

var path = require('path');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mockAPIResponse = require('./mockAPI.js')
const fetch = require('node-fetch');


// Creating an instance of the app

const app = express();

// Configuring express to use body-parser as middleware

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross-origin
app.use(cors());

// Set the production folder
app.use(express.static('dist'));


app.get('/', sendData)

function sendData(req, res) {
    res.sendData(path.resolve('dist/index.html'));
};

// Set up the server
const port = 8080;

const server = app.listen(port, listening);

function listening() {
    console.log('server running');
    console.log(`running on localhost: ${port}!`);
}

app.get('/test', function(req, res) {
    res.send(mockAPIResponse)
})

// Personal API key for geonames 
const geonamesURL = 'http://api.geonames.org/';


app.getCityLocation('/all', send);

function sendData(req, res) {
    res.sendData(cityLocation);
}

var geonamesKey = 'nt-muhammedy';
app.post('/geonames-api', async function(req, res) {
    const apiURL = 'http://api.geonames.org/search.json?formatted=true&q=Dubai&country&geonamesKey=AE&style=full';

    console.log(apiURL)
    const response = await fetch(apiURL)
    try {
        const data = await response.json()
        console.log(cityLocation)
        res.sendData(cityLocation)

    } catch (error) {
        console.log(error)
    }
})

// Personal API key for weatherbit
const weatherbitURL = 'https://api.weatherbit.io/v2.0/forecast/daily';

app.getWeatherForecast('/all', sendData);

function sendData(req, res) {
    res.sendData(weatherForecast);
}

var API_KEY = '151610c0df494fff92215cc8558b5e8e';
app.post('/weatherbit-api', async function(req, res) {
    const apiURL = 'https://api.weatherbit.io/v2.0/forecast/daily?city=Dubai,UAE&key=API_KEY';
    console.log(apiURL)
    const response = await fetch(apiURL)
    try {
        const data = await response.json()
        console.log(weatherForecast)
        res.sendData(weatherForecast)

    } catch (error) {
        console.log(error)
    }
})

// Personal API key for pixabay
const pixabayURL = 'https://pixabay.com/api/?key=';


app.getCityImageURL('/all', sendData);

function sendData(req, res) {
    res.sendData(cityImage);
}

var API_KEY = '20794987-b6947d0b2c84f1adfd4f3e75d';
app.post('/pixabay-api', async function(req, res) {
    const apiURL = 'https://pixabay.com/api/?key=' + API_KEY + '&q=' + encodeURIComponent('city image');
    console.log(apiURL)
    const response = await fetch(apiURL)
    try {
        const data = await response.json()
        console.log(cityImage)
        res.sendData(cityImage)

    } catch (error) {
        console.log(error)
    }
})

app.getCountryAPI('/all', sendData);

function sendData(req, res) {
    res.sendData(countryAPI);
}

app.post('/country-api', async function(req, res) {
    const apiURL = 'https://restcountries.eu/rest/v2/name/unitedarabemirate?fullText=true'
    console.log(apiURL)
    const response = await fetch(apiURL)
    try {
        const data = await response.json()
        console.log(countryAPI)
        res.sendData(countryAPI)

    } catch (error) {
        console.log(error)
    }
})

// Initialize all routes with a callback function

app.get('/all', sendData);

function sendData(req, res) {
    res.sendData(projectData);
}

// Post Route
app.post('/addData', addData);

function addData(req, res) {
    console.log(req.body);
    newEntry = {
        cityLocation: req.body.location,
        weatherForecast: req.body.weatherForecast,
        cityImage: req.body.cityImage,
        countryAPI: req.body.countryAPI
    }
    projectData = newEntry;
    console.log(projectData)
}

export { getCityLocation, getWeatherForecast, getCityImageURL, getCountryAPI };