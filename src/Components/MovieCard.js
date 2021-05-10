import React, { useState } from "react";

export function MovieCard({Title, Year, Poster}) {
    return (
        <>
            <img src={Poster}></img>
            {Title} - {Year}
        </>
    );
}
