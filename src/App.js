import './App.css';
import React, {useEffect, useState } from 'react';
import { getMovieList, searchMovie } from './api';
import MovieModal from './MovieModal';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const App = () => {
  const [popularMovies, setPopularMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMovie, setSelectedMovie] = useState(null);


  useEffect(() => {
    const fetchData = async () => {
      try {
        if (searchQuery) {
          const result = await searchMovie(searchQuery);
          setPopularMovies(result);
        } else {
          const result = await getMovieList();
          setPopularMovies(result);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [searchQuery]);

  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
  };

  const handleCloseModal = () => {
    setSelectedMovie(null);
  };

  return (
    <div className="App">
      <header className="App-header">
      {searchQuery === '' && (
        <img src={require('./img/Component 1.png')} alt="cover" />
      )}
        <input
          placeholder="Search a Movie"
          className="Movie-search"
          onChange={({ target }) => setSearchQuery(target.value)}
        />
       

        {searchQuery === '' && ( 
          <Carousel  
          showStatus={false} showArrows={false} infiniteLoop={true} autoPlay={true} interval={2000} stopOnHover={false}>
            {popularMovies.slice(0, 10).map((movie) => (
              <div key={movie.id} className="carousel-item">
                <img
                  className="carousel-image"
                  src={`${process.env.REACT_APP_BASEIMGURL}/${movie.backdrop_path}`}
                  alt={movie.title}
                />
                <div className="carousel-title-overlay">
                  <h2>{movie.title}</h2>
                </div>
              </div>
            ))}
          </Carousel> 
        )} 
      </header>

        <main className="Movie-container">
          {popularMovies.map((movie, i) => (
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
