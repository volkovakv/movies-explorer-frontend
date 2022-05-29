import './MoviesCardList.css';
import React from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList({ movies }) {
    return (
    <section className="movies__section">
      <ul className="movies__list">
        {movies.map((movie) => (
          <MoviesCard key={movie.id} movie={movie} saved={false} />
        ))}
      </ul>
      <div className="movies__button-more">
        <button className="movies__button" type="button" name="more">Ещё</button>
      </div>
    </section>
  );
};

export default MoviesCardList;