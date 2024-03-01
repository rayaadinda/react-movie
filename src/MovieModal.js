import React from 'react';

const MovieModal = ({ movie, onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h2>{movie.title}</h2>
        </div>
        <button className="close-button" onClick={onClose}>
            &times;
          </button>
        <img src={`${process.env.REACT_APP_BASEIMGURL}/${movie.poster_path}`} alt={movie.title} />
        <p>{movie.overview}</p>
      </div>
    </div>
  );
};

export default MovieModal;
