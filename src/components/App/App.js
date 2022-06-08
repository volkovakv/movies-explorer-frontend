import { Route, Switch, useHistory, Redirect, useLocation} from 'react-router-dom';
import React from 'react';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import './App.css';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Profile from '../Profile/Profile';
import NotFound from '../NotFound/NotFound';
import mainApi from '../../utils/MainApi';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import InfoTooltip from '../InfoTooltip/InfoTooltip';
import picFail from '../../images/fail.png';

function App() {
  const history = useHistory();
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({});
  const [isLoading, setIsLoading] = React.useState(true);
  const [isTooltipOpened, setIsTooltipOpened] = React.useState(false);
  const [MessageImage, setMessageImage] = React.useState('');
  const [MessageText, setMessageText] = React.useState('');
  const [savedMoviesList, setSavedMoviesList] = React.useState([]);
  const { pathname } = useLocation();

  //регистрация пользователя
  function handleRegister(data) {
    mainApi.register(data)
      .then((res) => {
        if (res._id) {
          handleLogin(data);
        }
      })
      .catch(() => {
        setMessageImage(picFail);
        setMessageText('Пользователь с таким email существует');
        handleInfoTooltip();
      });
  }

  //авторизация пользователя
  function handleLogin(data) {
    mainApi.login(data)
      .then(res => {
        if (res.token) {
          localStorage.setItem('jwt', res.token);
          setIsLoggedIn(true);
          history.push('/movies');
        }
      })
      .catch(() => {
        setMessageImage(picFail);
        setMessageText('Неправильная почта или пароль');
        handleInfoTooltip();
      });
  }

  //выход пользователя из аккаунта
  const handleSignOut = () => {
    setCurrentUser({});
    setIsLoggedIn(false);
    localStorage.clear();
    history.push('/');
  }
  
  //проверка авторизации пользователя
  React.useEffect(() => {
    const jwt = localStorage.getItem('jwt')
    if (jwt) {
      mainApi.getUserInfo()
        .then(data => {
          if (data) {
            setIsLoggedIn(true)
          }
        })
        .catch(err => { console.log(err); })
    }
  }, [history]);

  //получение информации о пользователе
  React.useEffect(() => {
    if (isLoggedIn) {
      mainApi.getUserInfo()
        .then(res => { setCurrentUser(res); })
        .catch(err => { console.log(err); })
        .finally(() => { setIsLoading(false) })
    }
  }, [isLoggedIn]);

 //редактирование информации о пользователе
  function handleUpdateUser(newUserData) {
    mainApi.updateUserInfo(newUserData)
      .then(res => { setCurrentUser(res) })
      .catch(err => { console.log(err) })
  }

  //получение сохраненных пользователем фильмов
  React.useEffect(() => {
    if (isLoggedIn) {
      mainApi.getMovies()
        .then((data) => {
          setSavedMoviesList(data);
        })
        .catch(err => {
          console.log(err);
        })
    }
  }, [isLoggedIn]);

  //сохранение фильма
  function handleSaveMovie(movie) {
    mainApi.addMovies(movie)
      .then(newMovie => {
        setSavedMoviesList([newMovie, ...savedMoviesList]);
      })
      .catch(() => {
        setMessageImage(picFail);
        setMessageText('Ошибка сервера');
        handleInfoTooltip();
      });
  };

  //удаление фильма
  function handleDeleteMovie(movie) {
    const savedMovie = savedMoviesList.find((item) => {
      if (item.movieId === movie.id || item.movieId === movie.movieId) {
        return item
      } else {
        return savedMoviesList
      }
    })
    mainApi.deleteMovies(savedMovie._id)
      .then(() => {
        const newMoviesList = savedMoviesList.filter((m) => {
          if (movie.id === m.movieId || movie.movieId === m.movieId) {
            return false
          } else {
            return true
          }
        })
        setSavedMoviesList(newMoviesList);
      })
      .catch(() => {
        setMessageImage(picFail);
        setMessageText('Ошибка сервера');
        handleInfoTooltip();
      });
  };

  //открытие попапа с информацией
  function handleInfoTooltip() {
    setIsTooltipOpened(true);
  }

  //закрытие попапа с информацией
  function closeInfoTooltip() {
    setIsTooltipOpened(false);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
      <Header isLoggedIn={isLoggedIn} isLoading={isLoading}/>
        <Switch>
          <Route exact path="/">
            <Main />
          </Route>

          <ProtectedRoute
            isLoggedIn={isLoggedIn}
            path="/movies"
            component={Movies}
            user={currentUser}
            savedMoviesList={savedMoviesList}
            onSaveClick={handleSaveMovie}
            onDeleteClick={handleDeleteMovie}
          />

          <ProtectedRoute
            path="/saved-movies"
            isLoggedIn={isLoggedIn}
            component={SavedMovies}
            user={currentUser}
            savedMoviesList={savedMoviesList}
            onDeleteClick={handleDeleteMovie}
          />

          <ProtectedRoute
            path="/profile"
            isLoggedIn={isLoggedIn}
            component={Profile}
            isLoading={isLoading}
            onEditProfile={handleUpdateUser}
            onSignOut={handleSignOut}
          />

          <Route path="/signin">
            {() =>
              !isLoggedIn ? <Login onLogin={handleLogin} /> : <Redirect to="/movies" />
            }
          </Route>

          <Route path="/signup">
            {() =>
              !isLoggedIn ? (
                <Register onRegister={handleRegister} />
              ) : (
                <Redirect to="/movies" />
              )
            }
          </Route>

          <Route path="*">
            <NotFound />
          </Route>
        </Switch>

        {pathname === '/' || pathname === '/movies' || pathname === '/saved-movies' ? <Footer /> : ''}
        <InfoTooltip 
          image={MessageImage} 
          text={MessageText} 
          isOpen={isTooltipOpened}  
          onClose={closeInfoTooltip}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
