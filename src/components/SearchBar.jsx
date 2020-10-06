import React, { useState } from 'react';

//img
import searchIcon from '../img/search.svg';

export default function SearchBar({ getCity }) {
    const [postcode, setPostcode] = useState();

    return (
        <div className="search-form">
            <input
                type="number"
                onChange={(e) => setPostcode(e.target.value)}
                placeholder="Input postcal code. ex: 1600022"
            />
            <button
                onClick={() => {
                    getCity(postcode);
                }}
            >
                <img src={searchIcon} alt="search_icon"/>
            </button>
        </div>
    );
};