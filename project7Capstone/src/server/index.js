var path = require('path');
const express = require('express');
const cors = require('cors');

const allWeatherData = {};

// Creating an instance of the app
const app = express();

// Configuring express to use body-parser as middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Cors for cross-origin
app.use(cors());
app.use(express.static('dist'));

// Set up the server

app.get('/getData', (req, res) => { res.send(allWeatherData["weatherData"]) });

app.post('/postData', (req, res) => {
    allWeatherData["weatherData"] = req.body.data;
    res.send({ success: true });
})

app.get('/geonames', function(req, res) {
    res.sendFile(path.resolve('src/client/views/index.html'))
})


app.post('/geonames', function(req, res) {
    console.log(req.body)
    const city = reg.body.city
        // const apiURL = 'http://api.geonames.org/searchJSON?q=Berlin&maxRows=10&fuzzy=0&username=nt_muhammedy';
    const apiURL = `http://api.geonames.org/searchJSON?q=${city}&maxRows=1&fuzzy=0&username=${geoUsername}`;
    fetch(apiURL)
        .then(response => response.json())
        .then(function(data) {
            console.log(data)
        })
})

module.exports = app;