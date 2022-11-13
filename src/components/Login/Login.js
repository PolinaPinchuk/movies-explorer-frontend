import { Link } from "react-router-dom";
import "./Login.css";
import logo from "../../images/2.svg";
import Preloader from "../Preloader/Preloader";

function Login() {
    return (
        <section className="login">
            <img className="login__logo" src={logo} alt="Логотип" />
            <h2 className="login__title">Рады видеть!</h2>
            <form action="" className="login__form">
                <p className="login__text">E-mail</p>
                <input className="login__input" type="email" />
                <p className="login__error"></p>
                <p className="login__text">Пароль</p>
                <input className="login__input" type="password" />
                <p className="login__error"></p>
            </form>
            <button className="login__button">Войти</button>
            <div className="login__bottom-box">
                <p className="login__bottom-box_question">Еще не зарегистрированы?</p>
                <Link className="login__bottom-box_link" aria-label="регистрация" to="/signup">
                    Регистрация
                </Link>
            </div>
        </section>
    );
}

export default Login;