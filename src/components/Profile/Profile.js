import './Profile.css';
import {Link} from 'react-router-dom';

function Profile() {
  return (
    <section className="profile">
      <form className="profile__form">
        <h3 className="profile__greeting">Привет, Ксюша!</h3>
        <div className="profile__inputs">
          <p className="profile__input">Имя</p>
          <div className="profile__input-text profile__input-text_name">
            <input className="profile__data" defaultValue="Ксюша" required />
          </div>
          <div className="profile__input-text profile__input-text_email">
            <input className="profile__data" defaultValue="pochta@pochta.ru" required />
          </div>
          <p className="profile__input">E-mail</p>
        </div>
        <Link to="/profile" className="profile__button-edit">Редактировать</Link>
        <Link to="/" className="profile__button-exit">Выйти из аккаунта</Link>
      </form>
    </section>
  );
};

export default Profile;