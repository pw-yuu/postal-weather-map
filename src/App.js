import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

//components
import SearchBar from './components/SearchBar';
import Map from './components/Map';
import Weather from './components/Weather';

const MAP_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

export default function App() {
	
	const [location, setLocation] = useState('Shinjuku, Shinjuku City, Tokyo');
	const [lat, setLat] = useState(35.683886);
	const [lng, setLng] = useState(139.730215);
	const [zoom, setZoom] = useState(10);
	const [error, setError] = useState(null);

	async function getCity(postcodeInput) {
		try {
			const res = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?components=postal_code:${postcodeInput}|country:JP&key=${MAP_KEY}`);
	
			const data = res.data.results[0];
			const prefecture = data.address_components[3].long_name;
			const ward = data.address_components[2].long_name;
			const city = data.address_components[1].long_name;
	
			setLocation(`${city}, ${ward}, ${prefecture}`);
			setLat(data.geometry.location.lat)
			setLng(data.geometry.location.lng);
			setZoom(14);
			setError('');
		} catch (err) {
			setError('Postal code invalid. Please input a code with 7 digits or an existing one.');
		}
	};

	useEffect(() => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(async function(position) {
				setLat(position.coords.latitude);
				setLng(position.coords.longitude);
				const res = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${MAP_KEY}`);
				const geoLocation = res.data.plus_code.compound_code;
				setLocation(geoLocation);
				setZoom(14);
			}
		)};
	}, []);

	return (
		<div className="App">
			<SearchBar getCity={getCity}/>
			{error ? <p className="text-danger">{error}</p> : null}
			<p>{location}</p>
			<Weather lat={lat} lng={lng}/>
			<Map lat={lat} lng={lng} zoom={zoom}/>
		</div>
	);
};