import React, { useState, useEffect } from 'react';
import axios from 'axios';

const WEATHER_KEY = process.env.REACT_APP_WEATHER_API_KEY;

export default function CurrentWeather({ latlng }) {

    const [currWeatherData, setCurrWeatherData] = useState({});
    const [currDescription, setcurrDescription] = useState('');
    const [currIconWeather, setcurrIconWeather] = useState('');

    async function getCurrentWeather(inputLat, inputLng) {
        try {
            const res = await axios.get(`https://api.weatherbit.io/v2.0/current?&lat=${inputLat}&lon=${inputLng}&key=${WEATHER_KEY}`);
            const data = await res.data;
            setCurrWeatherData(data.data[0]);
            setcurrDescription(data.data[0].weather.description);
            setcurrIconWeather(data.data[0].weather.icon);
        } catch (err) {
            console.log('No weather data found.');
        };
    };

    function displayWeather() {
        return (
            <div className="current-weather">
                <img src={`https://www.weatherbit.io/static/img/icons/${currIconWeather}.png`} alt="weather_status"/>
                <div className="temp-details">
                    <p>Current weather:</p>
                    <p className="curr-temp">{currWeatherData.app_temp}&#176;</p>
                    <p>{currDescription}</p>
                </div>
            </div>
        )
    };

    useEffect(() => {
        getCurrentWeather(latlng.lat, latlng.lng);
    }, [latlng]);

    return (
        <>
        {displayWeather()}
        </>
    );
};