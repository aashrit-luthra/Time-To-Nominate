import React, { useState, useEffect } from "react";
import SearchBar from "material-ui-search-bar"
import { MovieCard } from "./MovieCard"

function SearchPage(props) {
    const [searchQuery, setSearchQuery] = useState("");
    const [movieList, setMovieList] = useState([]);

    const fetchData = () => {
        let inp = searchQuery.split(" ").join("+");
        const APICall = `http://www.omdbapi.com/?apikey=${process.env.REACT_APP_API_KEY}&s=${inp}&type=movie`
        console.log(APICall)
        fetch(APICall)
            .then(response => response.json())
            .then(data => {
                setMovieList(data.Search)
            });
    }

    const [nominations, setNominations] = useState([]);


    function isNominated(id) {
        for (let i = 0; i < nominations.length; i++) {
            if (nominations[i].imdbID === id) {
                return true;
            }
        }
        return false;
    }


    return (
        <>
            <h1>Search The Movie Library</h1>
            <SearchBar
                value={searchQuery}
                onChange={(newQuery) => setSearchQuery(newQuery)}
                onRequestSearch={fetchData}
            />
            {movieList && movieList.map((movie) => {
                return (
                    <>
                        <MovieCard {...movie} />
                        <button
                            onClick={() => { nominations.length < 5 && setNominations([...nominations, movie]) }}

                            disabled={nominations.length === 5 || isNominated(movie.imdbID)}
                        >Nominate
                        </button>
                    </>
                );
            })
            }
            {movieList.length === 0 && <h1>No Results</h1>}

            <h1>Your Nominations</h1>
            {nominations && nominations.map((movie) => {
                return (
                    <>
                        <MovieCard {...movie} />
                        <button
                            onClick={() => setNominations(
                                nominations.filter((m) => m.imdbID !== movie.imdbID)
                            )} ></button>
                    </>
                );
            })}

        </>
    );
}

export default SearchPage