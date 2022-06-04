import { Link } from 'react-router-dom';
import logo from '../../images/header-logo.svg';
import '../Header/Header.css';
import Navigation from '../Navigation/Navigation'
import Authorization from '../AuthorizationHead/AuthorizationHead';

function Header({ isLoggedIn } ) {
  return (
        <header className="header">
          <Link to="/" className="header__link"><img className="header__logo" src={logo} alt="К сожалению, изображение не доступно"></img></Link>
          { isLoggedIn ? <Navigation /> : <Authorization />}
        </header>
  );
}

export default Header;