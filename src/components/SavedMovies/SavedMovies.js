import './SavedMovies.css';
import React from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

const SavedMovies = ({ user = {}, onDeleteClick = false, savedMoviesList = []}) => {
  const [inputValue, setInputValue] = React.useState(false); 
  const [shortMovies, setShortMovies] = React.useState(false);
  const [nothingFound, setNothingFound] = React.useState(true);
  const [showedMovies, setShowedMovies] = React.useState(savedMoviesList)
  const [filteredMovies, setFilteredMovies] = React.useState(showedMovies);
  
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
  
  //поиск среди сохраненных фильмов
  function handleSearchSubmit(inputValue) {
    localStorage.setItem('savedMoviesSearch', inputValue);
    if(filterMovies(savedMoviesList, inputValue, shortMovies).length === 0) {
      setNothingFound(true)
    } else {
      setNothingFound(false)
      setFilteredMovies(filterMovies(savedMoviesList, inputValue, shortMovies))
      setShowedMovies(filterMovies(savedMoviesList, inputValue, shortMovies))
      localStorage.setItem('savedMovies', JSON.stringify(savedMoviesList));
    }
  }

  //установка тумблера
  function handleShortFilms() {
    if (!shortMovies) {
      setShortMovies(true)
      localStorage.setItem('shortSavedMovies', true);
      setShowedMovies(filterShortMovies(filteredMovies));
      filterShortMovies(filteredMovies).length === 0 ? setNothingFound(true) : setNothingFound(false)
    } else {
      setShortMovies(false)
      localStorage.setItem('shortSavedMovies', false);
      filteredMovies.length === 0 ? setNothingFound(true) : setNothingFound(false)
      setShowedMovies(filteredMovies)
    }
  }

  //состояние инпута в локальном хранилище
  React.useEffect(() => {
    if (localStorage.getItem('savedMoviesSearch')) {
      setInputValue(localStorage.getItem('savedMoviesSearch'));
    }
  }, []);

 //состояние тумблера в локальном хранилище
  React.useEffect(() => {
    if (localStorage.getItem('shortSavedMovies') === 'true') {
      setShortMovies(true)
      setShowedMovies(filterShortMovies(savedMoviesList))
    } else {
      setShortMovies(false)
      setShowedMovies(savedMoviesList)
    }
  }, [savedMoviesList, user]);

  //отображение сохраненных карточек из локального хранилища
  React.useEffect(() => {
    if(savedMoviesList.length !== 0) {
      setNothingFound(false)
    } else {
      setNothingFound(true)
    }
  }, [savedMoviesList])

  return (
    <>
      <SearchForm
        handleSearchSubmit={handleSearchSubmit}
        checkBoxClick={handleShortFilms}
        shortMovies={shortMovies}
        inputValue={inputValue}
    />
    <div className="saved-movies">
          <MoviesCardList
            nothingFound={nothingFound}
            moviesList={showedMovies}
            onDeleteClick={onDeleteClick}
            onSaveClick={false}
            savedMoviesPage={true}
            savedMovies={savedMoviesList}
          />
      </div>
    </>
  );
};


export default SavedMovies;

