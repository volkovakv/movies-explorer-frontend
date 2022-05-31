import './SavedMovies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import savedMovies from '../../utils/SavedMovies';

function SavedMovies() {
  return (
    <div className="saved-movies">
      <SearchForm />
      <MoviesCardList 
        movies={savedMovies} 
        buttonMore={false} 
      />
    </div>
  );
};

export default SavedMovies;