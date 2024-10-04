import { useState, useEffect } from 'react'
import SearchIcon from "./assets/search.svg"
import MovieCard from './MovieCard'
import './App.css'
import conf from './Config/conf'

function App() {
  const [search, setSearch] = useState("")
  const [movies, setMovies] = useState([])
  const API_URL = conf.API_URL;
  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();
    console.log(data);
    setMovies(data.Search);
  }
  useEffect(()=>{
    searchMovies(search);
  }, [search]);
   

  return (
    // react fragment - <> </> if more than one elements...then u need to wrap them around the react fragment
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
            <h2>No Movies Found</h2>
          </div>
        ) 
      }
    </div>
  )
}

export default App;
