import React, { useState } from 'react';

export default function SearchBar({ getPostcode, getCity }) {
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
                }}
            >
                Submit
            </button>
        </div>
    );
};