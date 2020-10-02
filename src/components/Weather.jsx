import React from 'react';

export default function Weather({ weatherData }) {

    return (
        <div>
            {weatherData.map((e, i) => {
                return (
                    <div key={i}>
                        <img src={`https://www.weatherbit.io/static/img/icons/${e.weather.icon}.png`} alt="weather picture"/>
                        <p>{e.datetime}</p>
                        <p>{e.weather.description}</p>
                        <p>{e.app_max_temp}</p>
                        <p>{e.app_min_temp}</p>
                    </div>
                )
            })}
        </div>
    )
}