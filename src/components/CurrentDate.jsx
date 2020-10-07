import React from 'react';

export default function CurrentDate() {

    const weekday = ['Sunday', 'Monday', 'Tueday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    let date = new Date();

    function getWeekday() {
        return weekday[date.getDay()];
    };

    function getCurrentDate(separator='-'){

        let newDate = new Date()
        let date = newDate.getDate();
        let month = newDate.getMonth() + 1;
        let year = newDate.getFullYear();
        
        return `${year}${separator}${month<10?`0${month}`:`${month}`}${separator}${date}`;
    };

    return (
        <p>{getWeekday()}, <span>{getCurrentDate()} </span></p>
    )
}