import './Profile.css';
import React from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function Profile({ onEditProfile, onSignOut }) {
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState(currentUser.name);
  const [previousName, setPreviousName] = React.useState(currentUser.name);
  const [email, setEmail] = React.useState(currentUser.email);
  const [previousEmail, setPreviousEmail] = React.useState(currentUser.email);
  const [isActiveButton, setIsActiveButton] = React.useState(false);

  //обновление данных, сохранение в локальном хранилище
  const handleSubmit = (evt) => {
    evt.preventDefault();
    setIsActiveButton(false);
    onEditProfile({ name, email });
    localStorage.setItem('name', name)
    localStorage.setItem('email', email)
    .catch((err) => {
      console.log(err)
    });
  };

  //ввод данных, сверка со старыми
  function handleUserName(evt) {
    const value = evt.target.value;
    setName(value);
    if (value !== previousName) {
      setIsActiveButton(true);
    } else {
      setIsActiveButton(false);
    }
  }

  //ввод данных, сверка со старыми
  function handleUserEmail(evt) {
    const value = evt.target.value;
    setEmail(value);
    if (value !== previousEmail) {
      setIsActiveButton(true);
    } else {
      setIsActiveButton(false);
    }
  }

  React.useEffect(() =>{
    const localStorageName = localStorage.getItem('name');
    if (localStorageName) {
      setPreviousName(localStorageName);
    }
    const localStorageEmail = localStorage.getItem('email');
    if (localStorageEmail) {
      setPreviousEmail(localStorageEmail);
    }
  }, [])

  return (
    <section className="profile">
      <form className="profile__form" onSubmit={handleSubmit}>
        <h3 className="profile__greeting">Привет, {name}!</h3>
        <div className="profile__inputs">
          <p className="profile__input">Имя</p>
          <div className="profile__input-text profile__input-text_name">
            <input className="profile__data" value={name} onChange={handleUserName} required />
          </div>
          <div className="profile__input-text profile__input-text_email">
            <input className="profile__data" value={email} onChange={handleUserEmail} required />
          </div>
          <p className="profile__input">E-mail</p>
        </div>
        <button className="profile__button-edit" disabled={!isActiveButton}>
          Редактировать
        </button>
        <button className="profile__button-exit" type="button" onClick={onSignOut}>
          Выйти из аккаунта
        </button>
      </form>
    </section>
  );
};

export default Profile;