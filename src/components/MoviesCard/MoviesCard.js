import './MoviesCard.css';
import React from 'react';
import { useLocation } from 'react-router-dom';

function MoviesCard({ movie }) {
  const [saved, setSaved] = React.useState(false);

  function handleSavedToogle() {
    setSaved(!saved);
  }

  const { pathname } = useLocation();

  return (
    <li className="movie">
      <div className="movie__description">
        <p className="movie__title">{movie.title}</p>
        {pathname === '/saved-movies' ? (
            <button type="button" className="movie__button movie__button_delete" />
        ) : (
            <button
              type="button"
              className={`movie__button movie__button${saved ? '_active' : '_inactive'}`}
              onClick={handleSavedToogle}
            />
          )}
        <p className="movie__duration">{movie.duration}</p>
      </div>
      <img className="movie__image" src={movie.image} alt={movie.title}></img>
    </li>
  );
};

export default MoviesCard;
