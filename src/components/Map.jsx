import React from 'react'
import { GoogleMap, useLoadScript } from '@react-google-maps/api';

const librairies = ['places'];
const mapContainerStyle = {
    width: '100vw',
    height: '300px',
};

export default function Map({ lat, lng, zoom }) {

    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        librairies,
    });

    if (loadError) return 'Error loading maps';
    if (!isLoaded) return 'Loading Maps';

    return (
        <div>
            <GoogleMap
                mapContainerStyle={mapContainerStyle} 
                zoom={zoom}
                center={{lat, lng}}
                onClick={(e) => console.log(e)}
            ></GoogleMap>
        </div>
    );
};