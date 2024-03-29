import './App.css';
import React, { useEffect, useState } from 'react';
import { getMovieList, searchMovie, getTrendingMovies, getPopularMoviesThisWeek } from './api'; // Assuming you have these API functions
import MovieModal from './MovieModal';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const App = () => {
  const [activeTab, setActiveTab] = useState('popular'); // Default to 'popular'
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let result;
        if (searchQuery) {
          result = await searchMovie(searchQuery);
        } else {
          switch (activeTab) {
            case 'trending':
              result = await getTrendingMovies();
              break;
            case 'popular':
              result = await getMovieList();
              break;
            case 'popularThisWeek':
              result = await getPopularMoviesThisWeek();
              break;
            default:
              result = [];
          }
        }
        setMovies(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [activeTab, searchQuery]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
  };

  const handleCloseModal = () => {
    setSelectedMovie(null);
  };

  return (
    <div className="App">
      <header className="App-header">
        <input
          placeholder="Search a Movie"
          className="Movie-search"
          onChange={({ target }) => setSearchQuery(target.value)}
        />
        <div className="Tabs">
          <button
            className={activeTab === 'trending' ? 'active' : ''}
            onClick={() => handleTabChange('trending')}
          >
            Trending
          </button>
          <button
            className={activeTab === 'popular' ? 'active' : ''}
            onClick={() => handleTabChange('popular')}
          >
            Popular
          </button>
          <button
            className={activeTab === 'popularThisWeek' ? 'active' : ''}
            onClick={() => handleTabChange('popularThisWeek')}
          >
            Popular This Week
          </button>
        </div>
      </header>

      <main className="Movie-container">
        {movies.map((movie, i) => (
          <div
            className="Movie-wrapper"
            key={i}
            onClick={() => handleMovieClick(movie)}
          >
            <img
              className="Movie-image"
              src={`${process.env.REACT_APP_BASEIMGURL}/${movie.poster_path}`}
              alt={movie.title}
            />
            <div className="Movie-title">{movie.title}</div>
          </div>
        ))}
      </main>

      {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default App;
