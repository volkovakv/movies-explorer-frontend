import './MoviesCard.css';
import React from 'react';
import { useLocation } from 'react-router-dom';

const MoviesCard = ({ movie = {}, onSaveClick = false, onDeleteClick = false, saved = false, savedMoviesPage = false}) => {
  const { pathname } = useLocation();
  //cохранение фильма
  function handleSaveClick() {
    onSaveClick(movie)
  }

  //удаление фильма из сохраненных
  function handleDeleteClick() {
    onDeleteClick(movie)
  }

  //форматирование длительности фильма
  function getMovieDuration(mins) {
    return `${Math.floor(mins / 60)}ч ${mins % 60}м`;
  }

  return (
    <li className="movie">
      <div className="movie__description">
        <p className="movie__title">{movie.nameRU}</p>
        {
          !savedMoviesPage ?
            <button onClick={saved ? handleDeleteClick : handleSaveClick} className={saved ? "movie__button movie__button_active" : "movie__button movie__button_inactive"}></button>
            :
            <button onClick={handleDeleteClick} className="movie__button movie__button_delete"></button>
        }
        <p className="movie__duration">{getMovieDuration(movie.duration)}</p>
      </div>
      <a className="card__image-content" href={movie.trailerLink} target="blank">
        <img className="movie__image" src={pathname === '/saved-movies' ? `${movie.image}` : `https://api.nomoreparties.co${movie.image.url}`} alt="К сожалению, изображение недоступно"></img>
      </a>
    </li>
  );
};

export default MoviesCard;

