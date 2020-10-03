import React, { useState, useEffect } from 'react';
import axios from 'axios';

const WEATHER_KEY = process.env.REACT_APP_WEATHER_API_KEY;

export default function Weather({ lat, lng }) {

    const [weatherData, setWeatherData] = useState([]);

    // const weekday = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    // let date = new Date();


    async function getWeather() {
		const res = await axios.get(`https://api.weatherbit.io/v2.0/forecast/daily?&lat=${lat}&lon=${lng}&days=3&key=${WEATHER_KEY}`);

		const data = res.data.data;
        setWeatherData(data);
        console.log(res.data);
	};


    function displayWeather() {
        return weatherData.map((e, i) => {
            return (
                <div key={i}>
                    <img src={`https://www.weatherbit.io/static/img/icons/${e.weather.icon}.png`} alt="weather_status"/>
                    <p>{e.datetime}</p>
                    <p>{e.weather.description}</p>
                    <p>{e.app_max_temp}</p>
                    <p>{e.app_min_temp}</p>
                </div>
            )
        });
    };

    useEffect(() => {
        getWeather();
    }, [lat])

    return (
        <>
        {displayWeather()}
        </>
    )
}