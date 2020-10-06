import React, { useState, useEffect } from 'react';
import axios from 'axios';

const WEATHER_KEY = process.env.REACT_APP_WEATHER_API_KEY;

export default function Weather({ latlng }) {

    const [weatherData, setWeatherData] = useState([]);
    const [weatherDay, setWeatherDay] = useState([]);

    const weekday = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    let date = new Date();

    async function getWeather(inputLat, inputLng) {
        try {
            const res = await axios.get(`https://api.weatherbit.io/v2.0/forecast/daily?&lat=${inputLat}&lon=${inputLng}&days=3&key=${WEATHER_KEY}`);
            const data = await res.data;
            setWeatherData(data.data);
        } catch (err) {
            console.log('No weather data found.');
        };
    };
    
    function getWeekday() {
        const days = [];
        for (let i = date.getDay(); days.length < 3; i++) {
            if (i === 7) {
            i = 0;
            };
            days.push(weekday[i]);
        };
        setWeatherDay(days);
    };
    
    function displayWeather() {
        return weatherData.map((e, i) => {
            return (
                <div className="forecast-weather" key={i}>
                    <img src={`https://www.weatherbit.io/static/img/icons/${e.weather.icon}.png`} alt="weather_status"/>
                    <p>{e.datetime} <span>{weatherDay[i]}</span></p>
                    <p className="weather-description">{e.weather.description}</p>
                    <div className="min-max-temp">
                        <p>Min: {e.app_min_temp}&#176;</p>
                        <p>Max: {e.app_max_temp}&#176;</p>
                    </div>
                </div>
            )
        });
    };

    useEffect(() => {
        getWeather(latlng.lat, latlng.lng);
        getWeekday();
    }, [latlng]);

    return (
        <>
        {displayWeather()}
        </>
    );
};