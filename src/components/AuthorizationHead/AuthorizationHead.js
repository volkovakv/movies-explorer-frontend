import './AuthorizationHead.css';
import { Link } from 'react-router-dom';

function Authorization () {
  return (
    <nav>
      <ul className="authorization-head__buttons">
        <li>
          <Link to="/signup" className="authorization-head__button authorization-head_signup">Регистрация</Link>
        </li>
        <li >
          <Link to="/signin" className="authorization-head__button authorization-head_signin">Войти</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Authorization;