require("dotenv").config();
const { default: Axios } = require("axios");
const express = require('express');
const app = express();
const path = require("path");
const axios = require('axios');

const PORT = process.env.PORT || 9000;
const MAP_KEY = process.env.MAPS_API_KEY;
const WEATHER_KEY = process.env.WEATHER_API_KEY;

app.use(express.static(path.resolve(__dirname, "..", "build")));
app.use(express.json());

(async () => {
    try {
        console.log("Starting express...");
        app.listen(PORT, () => {
            console.log(`App listening on port ${PORT}`);
        });
    } catch (err) {
        console.error("Error starting app!", err);
        process.exit(-1);
    }
})();

app.get('/restaurants/:lat/:lng', async (req, res) => {
    try {
        const data = await axios.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${req.params.lat},${req.params.lng}&radius=1000&type=restaurantS&key=${MAP_KEY}`);
        res.json(data.data.results);
    } catch (err) {
        console.log("Error loading restaurants!", err);
        res.sendStatus(500);
    }
});

// app.get('/weather/:lat/:lng', async (req, res) => {
//     try {
//         const data = await axios.get(`https://api.weatherbit.io/v2.0/forecast/daily?&lat=${req.params.lat}&lon=${req.params.lng}&days=3&key=${WEATHER_KEY}`);
//         res.json(data.data.data);
//     } catch (err) {
//         console.log("Error loading restaurants!", err);
//         res.sendStatus(500);
//     }
// });