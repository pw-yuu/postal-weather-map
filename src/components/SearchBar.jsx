import React, { useState } from 'react';

export default function SearchBar({ getPostcode, getCity, getWeather}) {
    const [postcode, setPostcode] = useState();

    return (
        <div>
            <input
                type="number"
                onChange={(e) => setPostcode(e.target.value)}
                placeholder="Input postcal code"
            />
            <button
                onClick={() => {
                    getPostcode(postcode);
                    getCity(postcode);
                    getWeather();
                }}
            >
                Submit
            </button>
            
        </div>
    );
};