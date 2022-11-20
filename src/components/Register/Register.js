import React from "react";
import { Link } from "react-router-dom";
import { Validation } from "../../utils/Validation";
import Preloader from "../Preloader/Preloader";
import "./Register.css";
import logo from "../../images/2.svg";

function Register(props) {
    const { errorMessage, handleSubmit, blockInput, showPreloader } = props;
    const { values, handleChange, errors, isValid } = Validation();
  
  
    function submit(evt) {
      evt.preventDefault();
      handleSubmit(values.name, values.email, values.password);
    }

    return (
        <section className="register">
            {showPreloader && <Preloader />}
            <Link className="register__link" to="/">
                <img className="register__logo" src={logo} alt="Круг" />
            </Link>
            <h2 className="register__title">Добро пожаловать!</h2>
            <form className="register__form" noValidate onSubmit={submit}>
                <label className="register__form_label">
                    Имя
                </label>
                <input className={`register__form_input ${errors.name && `register__form_input_type_error`}`}
                    type="text"
                    name="name"
                    onChange={handleChange}
                    minLength="2"
                    maxLength="30"
                    pattern="^[A-Za-zА-Яа-я\s]{1,}$"
                    required
                    autoComplete="off"
                    disabled={blockInput && "disabled"}
                />
                <p className={`register__form_error ${!errors.name && `register__form_error-none`}`}>
                {errors.name ? errors.name : ""}
                </p>
                <label className="register__form_label">
                    E-mail
                </label>
                <input className={`register__form_input ${errors.email && `register__form_input_type_error`}`}
                    type="email"
                    name="email"
                    onChange={handleChange}
                    minLength="2"
                    maxLength="30"
                    pattern="[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,63}$"
                    required
                    disabled={blockInput && "disabled"}
                />
                <p className={`register__form_error ${!errors.email && `register__form_error-none`}`}>
                {errors.email ? errors.email : ""}
                </p>
                <label className="register__form_label">
                    Пароль
                </label>
                <input className={`register__form_input ${errors.password && `register__form_input_type_error`}`}
                    type="password"
                    name="password"
                    onChange={handleChange}
                    minLength="8"
                    maxLength="30"
                    required
                    disabled={blockInput && "disabled"}
                />
                <p className={`register__form_error ${!errors.password && `register__form_error-none`}`}>
                {errors.password ? errors.password : ""}
                </p>
            </form>
            {errorMessage && <p className="register__submitError">{errorMessage}</p>}
            <button className={`register__button ${!isValid ? "register__button_type_disable" : "link-opacity"}`} type="submit">
            Зарегистрироваться
            </button>
            {/* <button className={`register__button ${isValid ? "" : "register__button_type_disable"}`} type="submit" disabled={!isValid ? true : ''}>Зарегистрироваться</button> */}
            <div className="register__box">
                <p className="register__box_question">Уже зарегистрированы?</p>
                <Link className="register__box_enter" aria-label="войти" to="/signin">
                    Войти
                </Link>
            </div>
        </section>
    );
};

export default Register;