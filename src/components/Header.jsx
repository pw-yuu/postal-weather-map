import React from 'react';

//img
import logo from '../img/weatherlogo.png';


export default function Header() {

    return (
        <header>
            <img src={logo} alt="weather_logo"/>
        </header>
    );
};