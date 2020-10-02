import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

//components
import SearchBar from './components/SearchBar';
import Map from './components/Map';
import Weather from './components/Weather';

const MAP_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
const WEATHER_KEY = process.env.REACT_APP_WEATHER_API_KEY;

export default function App() {
	const [location, setLocation] = useState('');
	const [postcode, setPostcode] = useState(null);
	const [lat, setLat] = useState(35.683886);
	const [lng, setLng] = useState(139.730215);
	const [zoom, setZoom] = useState(10);
	const [weatherData, setWeatherData] = useState([]);

	async function getWeather() {
		const res = await axios.get(`https://api.weatherbit.io/v2.0/forecast/daily?	&lat=${lat}&lon=${lng}&days=3&key=${WEATHER_KEY}`);

		const data = res.data.data;
		setWeatherData(data);
		console.log(res.data);
		console.log('wea data', weatherData);
	};

	async function getCity(postcodeInput) {
		const res = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?components=postal_code:${postcodeInput}|country:JP&key=${MAP_KEY}`);

		const data = res.data.results[0];
		const prefecture = data.address_components[3].long_name;
		const ward = data.address_components[2].long_name;
		const city = data.address_components[1].long_name;

		setLocation(`${city}, ${ward}, ${prefecture}`);
		setLat(data.geometry.location.lat)
		setLng(data.geometry.location.lng);
		setZoom(14);
	};

	useEffect(() => {

	}, []);

	return (
		<div className="App">
			<SearchBar getPostcode={postcode => setPostcode(postcode)} getCity={getCity} getWeather={getWeather}/>
			<p>{postcode}</p>
			<p>{location}</p>
			<Weather weatherData={weatherData} />
			<Map lat={lat} lng={lng} zoom={zoom}/>
		</div>
	);
};