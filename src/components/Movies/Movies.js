import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import movies from '../../utils/ArrayMovies';


function Movies() {
    return (
    <div className="movies">    
      <SearchForm />
      <MoviesCardList
        movies={movies} 
        buttonMore={true}
      />
    </div>
  );
}

export default Movies;