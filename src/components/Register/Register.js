import '../Form/Form.css';
import React from "react";
import { Link } from 'react-router-dom';
import formLogo from '../../images/form-logo.svg';
import isEmail from 'validator/es/lib/isEmail';

function Register({ onRegister }) {
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
    const handleSubmit = (evt) => {
        evt.preventDefault()
        onRegister(values)
    }
    
    return (
        <>
            <section className="form">
            <div className="form__container">
            <Link to="/" className="form__logo"><img src={formLogo} alt="К сожалению, изображение не доступно"></img></Link>
            <h2 className="form__title">Добро пожаловать!</h2>
            <form className="form__area" onSubmit={handleSubmit}>
                <div className="form__inputs">
                <label className="form__input">
                    <p className="form__input-text">Имя</p>
                    <input 
                        type="text" 
                        id="name"
                        className="form__field" 
                        required
                        pattern='^[A-Za-zА-Яа-яЁё /s -]+$'
                        autoComplete="on"
                        placeholder="Имя"
                        name="name"
                        value={values.name || ''}
                        onChange={handleChange}
                        minLength="2"
                        maxLength="40"
                    />
                    <p className={`form__error-text ${errors.name ? 'form__error-text_display' : ''}`}>{errors.name}</p>
                </label>
                <label className="form__input">
                    <p className="form__input-text">E-mail</p>
                    <input 
                        type="email" 
                        className="form__field"
                        id="email" 
                        required
                        autoComplete="on"
                        placeholder="Email"
                        name="email"
                        value={values.email || ''}
                        onChange={handleChange}
                        minLength="2"
                        maxLength="40"
                    />
                    <p className={`form__error-text ${errors.email ? 'form__error-text_display' : ''}`}>{errors.email}</p>
                </label>
                <label className="form__input">
                    <p className="form__input-text">Пароль</p>
                    <input 
                        type="password" 
                        className={`form__field ${errors.password ? 'form__field_color-error' : ''}`}
                        required 
                        autoComplete="on"
                        id="password"
                        placeholder="Пароль"
                        name="password"
                        value={values.password || ''}
                        onChange={handleChange}
                        minLength="8"
                        maxLength="40"
                    />
                    <p className={`form__error-text ${errors.password ? 'form__error-text_display' : ''}`}>{errors.password}</p>
                </label>        
                </div>
                <button className={`form__button ${isValid ? "" : "form__button_disabled"}`} type="submit" disabled={!isValid ? true : ''}>Зарегистрироваться</button>
            </form>
            <p className="form__text">
            Уже зарегистрированы? <Link to="/signin" className="form__link">Войти</Link>
            </p>
            </div>
            </section>
    </>
    );
}

export default Register;