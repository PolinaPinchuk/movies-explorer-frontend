import React from "react";
import logo from "../../images/2.svg";
import "./Register.css";
import { Link } from "react-router-dom";

const Register = () => {
    return (
        <section className="register">
            <img className="register__logo" src={logo} alt="Круг" />
            <h2 className="register__title">Добро пожаловать!</h2>
            <form className="register__form">
                <label className="register__form_label">
                    Имя
                </label>
                <input className="register__form_input" type="text" />
                <p className="register__form_error register__form_error-none"></p>
                <label className="register__form_label">
                    E-mail
                </label>
                <input className="register__form_input" type="email" />
                <p className="register__form_error register__form_error-none">error</p>
                <label className="register__form_label">
                    Пароль
                </label>
                <input className="register__form_input" type="password" />
                <p className="register__form_error register__form_error-none">error</p>
            </form>
            <button className="register__button">Зарегистрироваться</button>
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