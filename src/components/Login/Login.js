import Form from '../Form/Form';

function Register() {
  return (
    <Form 
        header="Рады видеть!" 
        submit="Войти" 
        question="Еще не зарегистрированы?" 
        link="Регистрация" 
        path="/signup"
        children={(
            <>
                <label className="form__input">
                    <p className="form__input-text">E-mail</p>
                    <input type="email" className="form__field" defaultValue="pochta@yandex.ru" required />
                    <p className="form__error-text">Что-то пошло не так...</p>
                </label>
                <label className="form__input">
                    <p className="form__input-text">Пароль</p>
                    <input type="password" className="form__field form__field_color-error" defaultValue="••••••••••••••" required />
                    <p className="form__error-text form__error-text_display">Что-то пошло не так...</p>
                </label>
            </>
        )}
    />
  );
}

export default Register;