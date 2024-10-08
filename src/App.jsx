import { useState, useEffect } from 'react'
import SearchIcon from "./assets/search.svg"
import MovieCard from './MovieCard'
import Loading from "./Loading";
import { useNavigate } from 'react-router-dom';

import './App.css'

function App() {
  const [search, setSearch] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  
  
  const API_URL = 'https://www.omdbapi.com/?apikey=d3919209';
  const navigate = useNavigate();

  const searchMovies = async (title) => {
    setLoading(true);

    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();
    setMovies(data.Search);
    setLoading(false);

  }
  useEffect(()=>{
    searchMovies(search);
  }, [search]);
   

  return (
    <div className="app">
      <h1>All time Popular Movies</h1>
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

      {loading ? (
        <Loading />
      ) : movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie) => (
            <MovieCard
              movie={movie}
              key={movie.imdbID}
              onClick={() => navigate(`/movie/${movie.imdbID}`)}
            />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No Movies Found</h2>
        </div>
      )}
    </div>
  )
}

export default App;
