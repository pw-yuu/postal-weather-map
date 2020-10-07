import React, { useState, useEffect } from 'react';
import axios from 'axios';

//img
import notfound from '../img/notfound.png';

export default function RestaurantList({ latlng }) {
	const [allRestaurants, setAllRestaurants] = useState([]);

	async function getRestaurants(inputLat, inputLng) {
		try {
			const res = await axios.get(`/restaurants/${inputLat}/${inputLng}`);
			const data = await res.data;
			setAllRestaurants(data);
		} catch (err) {
			console.log('Could not find any restaurants', err);
		};
	};

	function showRestaurants() {
		return allRestaurants.map((e, i) => {
			if (e.business_status) {return (
				<div className="restaurant-list" key={i}>
					<img src={e.icon} onError={(e)=>{e.target.onerror = null; e.target.src=notfound}} alt="service_logo"/>

					<div className="restaurant-details">
						<div className="name-price-rating">
							<p><span className="res-name">{e.name}</span> </p>
							{e.rating ? <p className="rating">{e.rating}/5</p> : null}
						</div>
						<p>{pricing(e.price_level)}</p>

						<p>{e.vicinity}</p>
						<p className="types">{e.types.map((type, index) => (index === e.types.length - 1? <span key={index}>{type.replace(/_/g, ' ')}</span> : <span key={index}>{type.replace(/_/g, ' ')}, </span>))}</p>
					</div>
				</div>
			)};
		})
	};

	function pricing(price) {
		if (price === 0) {
			return 'Free';
		} else if (1 <= price && price < 2) {
			return '$';
		} else if (2 <= price && price < 3) {
			return '$$';
		} else if (3 <= price && price < 4) {
			return '$$$';
		} else if (4 <= price) {
			return '$$$$';
		};
	};

	useEffect(() => {
		getRestaurants(latlng.lat, latlng.lng)
	}, [latlng]);

	return (
		<div className="store-area">
			{showRestaurants()}
		</div>
	);
};