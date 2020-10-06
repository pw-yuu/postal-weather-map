import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './style/App.scss';

//components
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import Map from './components/Map';
import CurrentWeather from './components/CurrentWeather';
import Weather from './components/Weather';
import RestaurantList from './components/RestaurantList';
import CurrentDate from './components/CurrentDate';

//img
import positionIcon from './img/location.svg';

const MAP_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

export default function App() {
	const [mount, getMounted] = useState(true);
	const [location, setLocation] = useState('');
	const [error, setError] = useState(null);
	const [zoom, setZoom] = useState(12);
	const [latlng, setLatlng] = useState({
		lat: undefined,
		lng: undefined
	});

	async function getCity(postcodeInput) {
		try {
			setZoom(10);
			const res = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?components=postal_code:${postcodeInput}|country:JP&key=${MAP_KEY}`);
	
			const data = res.data.results[0];
			const prefecture = data.address_components[3].long_name;
			const ward = data.address_components[2].long_name;
			const city = data.address_components[1].long_name;
			setLocation(`${city}, ${ward}, ${prefecture}`);
			const lat = data.geometry.location.lat;
			const lng = data.geometry.location.lng;
			setLatlng({
				lat: lat,
				lng: lng
			});
			setError('');
			getMounted(false);
			setZoom(14);
		} catch (err) {
			setError('Postal code invalid. Please input a code with 7 digits or an existing one.');
		}
	};

	function getLocation() {
		if(navigator.geolocation) {
			console.log('heeee');
			setZoom(10);
			navigator.geolocation.getCurrentPosition(async function(position) {

				const res = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${position.coords.latitude},${position.coords.longitude}&key=${MAP_KEY}`);
				console.log('from get locaio', position.coords.latitude, position.coords.longitude);
				const geoLocation = res.data.plus_code.compound_code;
				setLatlng({
					lat: position.coords.latitude,
					lng: position.coords.longitude
				});
				setLocation(geoLocation);
				getMounted(false);
				setZoom(14);
			});
		};

	}

	useEffect(() => {
		getCity(1600022);
	}, []);	

	return (
		<div className="App">
			{mount ?
				<div>Loading</div>
				:
				<main>
					<Header />
					<article className="main-area">
						<div className="temp-area">
							<section className="search-area">
								<div className="search-position">
									<SearchBar getCity={getCity}/>
									<button id="btn-myposition" onClick={() => {getLocation()}}><img src={positionIcon} alt="position_icon"/></button>
								</div>
								{error ? <p className="text-danger">{error}</p> : null}
							</section>

							<section className="current-area">
								<div className="curr-date-loc">
									<CurrentDate/>
									<p>{location}</p>
								</div>
								<CurrentWeather latlng={latlng}/>
							</section>

							<section className="forecast-area">
								<Weather latlng={latlng}/>
							</section>
						</div>
						<section className="map-area">
							<Map latlng={latlng} zoom={zoom}/>
							<RestaurantList latlng={latlng}/>
						</section>
					</article>

				</main>
			}
		</div>
	);
};