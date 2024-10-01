import { useState, useEffect } from 'react'
import SearchIcon from "./assets/search.svg"
import MovieCard from './MovieCard'
import './App.css'

function App() {
  const [search, setSearch] = useState("")
  const [movies, setMovies] = useState([])

  // d3919209
  const API_URL = "https://www.omdbapi.com/?apikey=d3919209";
  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();
    setMovies(data.Search);
  }
  useEffect(()=>{
    searchMovies(search);
  }, [search]);

  return (
    <div className={`app ${search === "" ? "no-search" : ""} ${search === "" ? "bg-image" : ""}`}>
      <h1>SearchMovies</h1>
      <h4>Discover Your Next Favorite</h4>
      <div className="search">
        <input 
          type="text" 
          placeholder='Search Movies'
          value={search}
          onChange={(e) => {setSearch(e.target.value)}}
        />
        <img 
          src={SearchIcon} 
          alt="search" 
          onClick={() => {searchMovies(search)}}
        />
      </div>

      {
        movies?.length > 0
        ? (
          <div className="container">
            {movies.map((movie) => {
              return <MovieCard movie = {movie}/>
            })}
          </div>
        ) : (
          <div className="empty">
            <h2></h2>
          </div>
        ) 
      }
    </div>
  )
}

export default App;