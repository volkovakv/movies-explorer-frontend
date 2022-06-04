import './Movies.css';
import React from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import moviesApi from '../../utils/MoviesApi';
import Preloader from '../Preloader/Preloader';


const Movies = ({ user = {}, onSaveClick = false, onDeleteClick = false, savedMoviesList = [] }) => {
  const [shortMovies, setShortMovies] = React.useState(false);
  const [inputValue, setInputValue] = React.useState(false);
  const [filteredMovies, setFilteredMovies] = React.useState([]);
  const [initialMovies, setInitialMovies] = React.useState([])
  const [nothingFound, setNothingFound] = React.useState(true);
  const [isDataLoading, setIsDataLoading] = React.useState(false);
  const [isError, setIsError] = React.useState(false);

  //фильтр по ключевому слову
  function filterMovies(movies, request, shortMoviesCheckbox) {
    const moviesByRequest = movies.filter((movie) => {
      return movie.nameRU.toLowerCase().includes(request.toLowerCase())
    });

    if (shortMoviesCheckbox) {
      return filterShortMovies(moviesByRequest);
    } else {
      return moviesByRequest;
    }
  };

  //фильтр по длительности
  function filterShortMovies(movies) {
    return movies.filter((movie) => movie.duration <= 40);
  };  

  //поиск фильмов по ключевому слову и длительности
  function handleSetFilteredMovies(movies, request, shortMoviesCheckbox) {
    const moviesList = filterMovies(movies, request, shortMoviesCheckbox);
    moviesList.length === 0 ? setNothingFound(true) : setNothingFound(false);
    setInitialMovies(moviesList);
    setFilteredMovies(shortMoviesCheckbox ? filterShortMovies(moviesList) : moviesList);
    localStorage.setItem('movies', JSON.stringify(moviesList));
  }

  //поиск фильмов в базе по запросу
  function handleSearchSubmit(inputValue) {
    setIsDataLoading(true);
    localStorage.setItem('movieSearch', inputValue);
    localStorage.setItem('shortMovies', shortMovies);
    moviesApi
      .getMovies()
      .then((data) => {
        handleSetFilteredMovies(data, inputValue, shortMovies);
      })
      .catch((err) => {
        setIsError(true);
        console.log(err);
      })
      .finally(() => setIsDataLoading(false));
  }

  // установка тумблера
  function handleShortFilms() {
    setShortMovies(!shortMovies);
    if (!shortMovies) {
      if (filterShortMovies(initialMovies).length === 0) {
        setFilteredMovies(filterShortMovies(initialMovies));
        setNothingFound(true);
      } else {
        setFilteredMovies(filterShortMovies(initialMovies));
        setNothingFound(false);
      }
    } else {
      initialMovies.length === 0 ? setNothingFound(true) : setNothingFound(false);
      setFilteredMovies(initialMovies);
    }
    localStorage.setItem('shortMovies', !shortMovies);
  }

  //состояние инпута в локальном хранилище
  React.useEffect(() => {
    if (localStorage.getItem('movieSearch')) {
      setInputValue(localStorage.getItem('movieSearch'));
    }
  }, []);
  
  //состояние тумблера в локальном хранилище
  React.useEffect(() => {
    if (localStorage.getItem('shortMovies') === "true") {
      setShortMovies(true);
    } else {
      setShortMovies(false);
    }
  }, [user]);

  //отображение карточек из локального хранилища
  React.useEffect(() => {
    if (localStorage.getItem('movies')) {
      const movies = JSON.parse(localStorage.getItem('movies'));
      movies.length === 0 ? setNothingFound(true) : setNothingFound(false)
      setInitialMovies(movies);
      if (localStorage.getItem('shortMovies') === "true") {
        setFilteredMovies(filterShortMovies(movies));
      } else {
        setFilteredMovies(movies);
      }
    } else {
      setNothingFound(true)
    }
  }, [user]);

  return (
    <>
      <SearchForm
        handleSearchSubmit={handleSearchSubmit}
        checkBoxClick={handleShortFilms}
        inputValue={inputValue}
        shortMovies={shortMovies} 
      />
      <div className="movies">
          {
            isDataLoading ? <Preloader /> :
              <>
                {
                  isError ? 
                  <span id="movies__error" className="movies__text-error">Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз</span> :
                    <MoviesCardList
                      nothingFound={nothingFound}
                      moviesList={filteredMovies}
                      onSaveClick={onSaveClick}
                      onDeleteClick={onDeleteClick}
                      savedMoviesList={savedMoviesList}
                      savedMoviesPage={false}
                    />
                }
              </>
          }
      </div>
    </>
  );
};

export default Movies;