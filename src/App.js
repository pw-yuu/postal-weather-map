import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

//components
import SearchBar from './components/SearchBar';
import Map from './components/Map';

function App() {
  const [location, setLocation] = useState('');
  const [postcode, setPostcode] = useState(null);
  const [lat, setLat] = useState(35.689487);
  const [lng, setLng] = useState(139.691711);
  const [zoom, setZoom] = useState(10);

  async function getCity(postcodeInput) {
    const res = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?components=postal_code:${postcodeInput}|country:JP&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`);

    const data = res.data.results[0];
    const prefecture = data.address_components[3].long_name;
    const ward = data.address_components[2].long_name;
    const city = data.address_components[1].long_name;
    
    setLocation(`${city}, ${ward}, ${prefecture}`);
    setLat(data.geometry.location.lat)
    setLng(data.geometry.location.lng);
    setZoom(15);
  };

  return (
    <div className="App">
      <SearchBar getPostcode={postcode => setPostcode(postcode)} getCity={getCity} />
      <p>{postcode}</p>
      <p>{location}</p>
      <Map lat={lat} lng={lng} zoom={zoom}/>
    </div>
  );
}

export default App;
