import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './MovieDetails.css';
import Loading from './Loading';
import { useNavigate } from 'react-router-dom';

const MovieDetails = () => {
  const { imdbID } = useParams();
  const navigate = useNavigate(); 
  const [movieDetails, setMovieDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const API_URL = 'https://www.omdbapi.com/?apikey=d3919209';

  useEffect(() => {
    const fetchMovieDetails = async () => {
      const response = await fetch(`${API_URL}&i=${imdbID}`);
      const data = await response.json();
      setMovieDetails(data);
      setLoading(false);
    };

    fetchMovieDetails();
  }, [imdbID]);

  if (loading) {
    const loadingStyle = {
      position: 'fixed',
      top: '0',
      left: '0',
      width: '100%',
      height: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      zIndex: 999,
    };

    return <Loading style={loadingStyle} />; 
  }

  if (!movieDetails) {
    return <div>No Movie Details Found</div>; 
  }

  return (
    <>
      <button className="back-button" onClick={() => navigate(-1)}>Back</button>
      <div className="movie-details">
        <div className="details-container">
          <img className="movie-poster" src={movieDetails.Poster !== 'N/A' ? movieDetails.Poster : 'https://via.placeholder.com/400'} alt={`${movieDetails.Title} Poster`} />
          <div className="movie-info">
            <h1>{movieDetails.Title}</h1>
            <p><strong>Year:</strong> {movieDetails.Year}</p>
            <p><strong>Released:</strong> {movieDetails.Released}</p>
            <p><strong>Runtime:</strong> {movieDetails.Runtime}</p>
            <p><strong>Genre:</strong> {movieDetails.Genre}</p>
            <p><strong>Director:</strong> {movieDetails.Director}</p>
            <p><strong>Writer:</strong> {movieDetails.Writer}</p>
            <p><strong>Actors:</strong> {movieDetails.Actors}</p>
            <p><strong>Language:</strong> {movieDetails.Language}</p>
            <p><strong>Country:</strong> {movieDetails.Country}</p>
            <p><strong>Awards:</strong> {movieDetails.Awards}</p>
            <p><strong>IMDb Rating:</strong> {movieDetails.imdbRating}</p>
          </div>
        </div>
        <p className="movie-plot"><strong>Plot:</strong> {movieDetails.Plot}</p>
      </div>
    </>
  );
};

export default MovieDetails;
