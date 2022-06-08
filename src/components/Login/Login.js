import '../Form/Form.css';
import React from "react";
import { Link } from 'react-router-dom';
import formLogo from '../../images/form-logo.svg';
import isEmail from 'validator/es/lib/isEmail';


function Login({ onLogin }) {
    const [values, setValues] = React.useState({});
    const [errors, setErrors] = React.useState({});
    const [isValid, setIsValid] = React.useState(false);
  
    //проверка вводимых данных
    const handleChange = (evt) => {
      const name = evt.target.name;
      const value = evt.target.value;

      if (name === 'email') {
        if (!isEmail(value)) {
            evt.target.setCustomValidity('Некорректый адрес почты');
        } else {
            evt.target.setCustomValidity('');
        }
      }
  
      setValues({ ...values, [name]: value });
      setErrors({ ...errors, [name]: evt.target.validationMessage });
      setIsValid(evt.target.closest('form').checkValidity());
    };
    
    //сабмит формы
    const handleSubmit = (e) => {
        e.preventDefault()
        onLogin(values)
      }
  
    return (
    <section className="form">
      <div className="form__container">
        <Link to="/" className="form__logo"><img src={formLogo} alt="К сожалению, изображение не доступно"></img></Link>
        <h2 className="form__title">Рады видеть!</h2>
        <form className="form__area" onSubmit={handleSubmit}>
          <div className="form__inputs">
            <label className="form__input">
                <p className="form__input-text">E-mail</p>
                <input 
                    autoComplete="on"
                    type="email" 
                    className={`form__field ${errors.email ? 'form__field_color-error' : ''}`} 
                    placeholder="Email"
                    id="email"
                    name="email"
                    value={values.email || ''}
                    onChange={handleChange}
                    minLength="2"
                    maxLength="40"
                    required 
                />
                <p className={`form__error-text ${errors.email ? 'form__error-text_display' : ''}`}>{errors.email}</p>
            </label>
            <label className="form__input">
                <p className="form__input-text">Пароль</p>
                <input 
                    autoComplete="on"
                    type="password" 
                    className={`form__field ${errors.password ? 'form__field_color-error' : ''}`} 
                    placeholder="Пароль"
                    id="password"
                    name="password"
                    value={values.password || ''}
                    onChange={handleChange}
                    minLength="8"
                    maxLength="40"
                    required 
                />
                <p className={`form__error-text ${errors.password ? 'form__error-text_display' : ''}`}>{errors.password}</p>
            </label>
          </div>
          <button className={`form__button ${isValid ? "" : "form__button_disabled"}`} type="submit" disabled={!isValid ? true : ''}>Войти</button>
        </form>
        <p className="form__text">
            Еще не зарегистрированы? <Link to="/signup" className="form__link">Ругистрация</Link>
        </p>
      </div>
    </section>
  );
}

export default Login;