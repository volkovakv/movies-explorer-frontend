import './MoviesCardList.css';
import React from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';

const MoviesCardList = ({ nothingFound = true, moviesList = [], onSaveClick = false, onDeleteClick = false, savedMoviesList = [], savedMoviesPage = false}) => {
  const [showMovieList, setShowMovieList] = React.useState([]);
  const [cardsShowDetails, setCardsShowDetails] = React.useState({ total: 12, extra: 3 });
  const [isMount, setIsMount] = React.useState(true);
  const getScreenWidth = React.useCallback(() => window.innerWidth, []);
  const [screenWidth, setScreenWidth] = React.useState(getScreenWidth());
  const moviesCount = {
    large: {width: 1280, cards: {total: 12, extra: 3}},
    medium: {width: 768, cards: {total: 8, extra: 2}},
    small: {width: 480, cards: {total: 5, extra: 2}},
  }
  
  //получение текущего разрешения экрана пользователя
  React.useEffect(() => {
    function handleScreenResize() {
      setScreenWidth(getScreenWidth());
    };
    window.addEventListener('resize', resizeController, false);
    let resizeTimer;  
    function resizeController() {
      if (!resizeTimer) {
        resizeTimer = setTimeout(() => {
          resizeTimer = null;
          handleScreenResize();
        }, 1000);
      }
    };
    return () => window.removeEventListener('resize', handleScreenResize);
  }, [getScreenWidth]); 

  //рендер карточек при разных разрешениях
  React.useEffect(() => {
    if (screenWidth >= moviesCount.large.width) {
      setCardsShowDetails(moviesCount.large.cards);
    } else if (screenWidth <= moviesCount.large.width && screenWidth > moviesCount.medium.width) {
      setCardsShowDetails(moviesCount.medium.cards);
    } else {
      setCardsShowDetails(moviesCount.small.cards);
    }
    return () => setIsMount(false);
  }, [screenWidth, isMount, moviesCount.large, moviesCount.medium, moviesCount.small]);

  //рендер карточек при разных разрешениях
  React.useEffect(() => {
    if (moviesList.length) {
      const res = moviesList.filter((item, i) => i < cardsShowDetails.total);
      setShowMovieList(res);
    }
  }, [moviesList, savedMoviesPage, cardsShowDetails.total]);

  //отрисовка дополнительных фильмов по кнопке
  function handleClickMoreMovies() {
    const start = showMovieList.length;
    const end = start + cardsShowDetails.extra;
    const additional = moviesList.length - start;

    if (additional > 0) {
      const newCards = moviesList.slice(start, end);
      setShowMovieList([...showMovieList, ...newCards]);
    }
  };

  //проверка сохранения фильма
  function getSavedMovieCard(savedMoviesList, movie) {
    return savedMoviesList.find(savedMovie => savedMovie.movieId === movie.id)
  };

  return (
    <section className="movies__section">
    <>
      {
        nothingFound ? <p class="movies__text-error">Ничего не найдено</p> :
          <>
            <ul className="movies__list">
              {showMovieList.map((movie) => (
                <MoviesCard
                  saved={getSavedMovieCard(savedMoviesList, movie)}
                  key={movie.id || movie._id}
                  movie={movie}
                  onSaveClick={onSaveClick}
                  onDeleteClick={onDeleteClick}
                  savedMoviesPage={savedMoviesPage}
                />
              ))}
            </ul>
            {showMovieList.length >= 5 && showMovieList.length < moviesList.length ? 
              <div className="movies__button-more">
                <button onClick={handleClickMoreMovies} className="movies__button">Ещё</button> 
              </div>
            : ''}
          </>
      }
    </>
    </section>
  );
};

export default MoviesCardList;