import './App.css';
import React, { useState, useEffect } from "react"
import SearchBar from "material-ui-search-bar"
import MovieCard from './Components/MovieCard'
require('dotenv').config()

function App() {
  const [nominations, setNominations] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [movieList, setMovieList] = useState({});

  const fetchData = () => {
    let s = searchQuery.split(" ").join("+");
    const APICall = `https://www.omdbapi.com/?apikey=${process.env.REACT_APP_API_KEY}&s=${s}&type=movie`
    fetch(APICall)
      .then(response => response.json())
      .then(data => {
        setMovieList(data)
      });
  }

  const isNominated = (id) => {
    for (let i = 0; i < nominations.length; i++) {
      if (nominations[i].imdbID === id) {
        return true;
      }
    }
    return false;
  }

  return (
    <>
      {/*  NOMINATIONS */}
      <h1 className="textstyle" style={{textAlign: "center"}}>Your Nominations: {nominations.length}</h1>
      {nominations.map((movie) => {
        return (
          <div className="card">
            <MovieCard {...movie}/>
            <button
              id='remove-button' 
              onClick={() => {
                setNominations(nominations.filter((m) => m.imdbID !== movie.imdbID))
              }}
            >Remove</button>
          </div>
        )
      })}

      <hr></hr>

      {/* SEARCH BAR */}
      <h2 style={{textAlign: "center", color: "#0074D9"}}>Search The Movie Library</h2>
      <SearchBar
        value={searchQuery}
        onChange={(newQuery) => setSearchQuery(newQuery)}
        onRequestSearch={fetchData}
      />

      {(Object.keys(movieList).length === 0 || movieList.Response === 'False' || movieList.Search.length === 0) &&
        <h5 style={{textAlign: "center"}}>No Results Found.</h5>}

      {(Object.keys(movieList).length !== 0 && movieList.Response === 'True' && movieList.Search.length > 0) &&
        movieList.Search.map((movie) => {
          return (
            <div className="card">
              <MovieCard {...movie} />
              <button
                id='nominate-button'
                onClick={() => { nominations.length < 5 && setNominations(nominations.concat(movie)) }}
                disabled={nominations.length === 5 || isNominated(movie.imdbID)}
              >Nominate</button>
            </div>
          )

        }
        )}

        {nominations.length === 5 && alert("You have now entered the maximum number of nominations.")}

    </>
  );
}

export default App;
