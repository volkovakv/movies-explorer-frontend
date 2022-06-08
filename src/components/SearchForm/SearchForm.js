import './SearchForm.css';
import React from 'react';
import find from '../../images/find.svg';

function SearchForm({handleSearchSubmit = false, shortMovies = false, checkBoxClick = false, inputValue}) {
  const [inputSearch, setInputSearch] = React.useState('');
 
  //изменение текста инпута
  function handleChange(evt) {
    setInputSearch(evt.target.value);
  }

  //состояние инпута
  React.useEffect(() => {
    setInputSearch(inputValue);
  }, [inputValue]);


  //поиск по ключевому слову
  function handleSubmit(e) { 
    e.preventDefault();
    handleSearchSubmit(inputSearch);
  };
  
  return (
    <form className="search" onSubmit={handleSubmit}>
      <div className="search__container">
        <div className="search__line">
          <input className="search__input" name='film' value={inputSearch || ''} onChange={handleChange} minLength="1" maxLength="100" required placeholder="Фильм" type="text" />
          <button type="submit" className="search__button"><img src={find} alt="К сожалению, изображение не доступно"></img></button>
        </div>
        <div className="search__toggle">
          <label className="search__check">
            <input type="checkbox" className="search__checkbox" checked={shortMovies ? true : false} onChange={checkBoxClick}  />
            <span className="search__slider" />
          </label>
          <p className="search__films">Короткометражки</p>
        </div>
      </div>
    </form>
  );
};

export default SearchForm;