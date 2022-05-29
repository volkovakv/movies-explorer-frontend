import './Form.css';
import { Link } from 'react-router-dom';
import formLogo from '../../images/form-logo.png';

function Form({ header, submit, question, path, link, children }) {
  return (
    <section className="form">
      <div className="form__container">
        <Link to="/" className="form__logo"><img src={formLogo} alt="К сожалению, изображение не доступно"></img></Link>
        <h2 className="form__title">{header}</h2>
        <form className="form__area">
          <div className="form__inputs">{children}</div>
          <button type="submit" className="form__button" disabled>{submit}</button>
        </form>
        <p className="form__text">
          {question} <Link to={path} className="form__link">{link}</Link>
        </p>
      </div>
    </section>
  );
}

export default Form;
