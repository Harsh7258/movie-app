import React, {useState, useEffect} from 'react';
import './App.css';
import MovieCard from './movieCard';

import searchSVG from './search.svg';

const API_URL = 'http://www.omdbapi.com/?apikey=[yourAPI_KEY]&';

const App = () => {

  const [movies, setMovies] = useState([]);
  const [searchMov, setSearchMov] = useState('');

  const searchMovies = async (title) => {
    const res = await fetch(`${API_URL}s=${title}`);
    const data = await res.json();
    setMovies(data.Search);
  };

  useEffect(() => {
    searchMovies('superman');
  }, []);

  return (
    <div className="app">
      <h1>Movie App</h1>
      <div className='search'>
        <input placeholder="Search for movies"
        value={searchMov}
        onChange={(input) => setSearchMov(input.target.value)}/>

        <img src={searchSVG}
        alt='search'
        onClick={() => searchMovies(searchMov)}/>
      </div>

      {
         movies?.length > 0 
         ? 
           (<div className="container">
             {movies.map((mov) => (
              <MovieCard mov={mov} />
             ))}
           </div>) 
         :
           (<div className="empty">
             <h2>No  movies Found</h2>
           </div>)
      };
    </div>
  );
}

export default App;
