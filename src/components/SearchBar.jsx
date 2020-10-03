import React, { useState } from 'react';

export default function SearchBar({ getCity }) {
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
                    getCity(postcode);
                }}
            >
                Submit
            </button>
            
        </div>
    );
};