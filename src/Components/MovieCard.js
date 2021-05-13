import React from "react";
import './MovieCard.css'

export function MovieCard({Title, Year, Poster}) {
    return (
        <>
            <img src={Poster}></img>
            <h3 id="title">{Title}</h3>
            <h5 id="year">({Year})</h5>
        </>
    );
}

export default MovieCard;