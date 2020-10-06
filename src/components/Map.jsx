import React from 'react'
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
import icon2 from '../img/location.svg';

const librairies = ['places'];
const mapContainerStyle = {
    width: '100%',
    height: '40vh',
    borderTopRightRadius: '10px'
};


export default function Map({ latlng, zoom }) {

    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        librairies,
    });

    if (loadError) return 'Error loading maps';
    if (!isLoaded) return 'Loading Maps';

    let lat = latlng.lat;
    let lng = latlng.lng;
    
    return (
        <div>
            <GoogleMap
                mapContainerStyle={mapContainerStyle} 
                zoom={zoom}
                center={{lat, lng}}
                onClick={(e) => console.log(e)}
            >

                <Marker
                    position={{ lat, lng}}
                    icon={{
                        url: {icon2},
                        origin: new window.google.maps.Point(0, 0),
                        anchor: new window.google.maps.Point(15, 15),
                        scaledSize: new window.google.maps.Size(30, 30),
                    }}
                />
            </GoogleMap>
        </div>
    );
};