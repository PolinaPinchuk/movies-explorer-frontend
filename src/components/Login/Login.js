import { Link } from "react-router-dom";
import "./Login.css";
import logo from "../../images/2.svg";
import Preloader from "../Preloader/Preloader";
import { Validation } from "../../utils/Validation";

function Login(props) {
    const { errorMessage, handleSubmit, blockInput, showPreloader } = props;
    const { values, handleChange, errors, isValid } = Validation();
  
    function Submite(evt) {
      evt.preventDefault();
      handleSubmit(values.email, values.password);
    }
    return (
        <section className="login">
            {showPreloader && <Preloader />}
            <Link className="register__link" to="/">
                <img className="login__logo" src={logo} alt="Логотип" />
            </Link>
            <h2 className="login__title">Рады видеть!</h2>
            <form action="" className="login__form"  noValidate onSubmit={Submite}>
                <p className="login__text">E-mail</p>
                {/* <input className="login__input" type="email" />
                <p className="login__error"></p> */}
                <input
                    className={`login__input ${errors.email && `login__input_type_error`}`}
                    type="email"
                    name="email"
                    onChange={handleChange}
                    minLength="2"
                    maxLength="30"
                    pattern="[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,63}$"
                    required
                    autoComplete="off"
                    disabled={blockInput && "disabled"}
                />
                <p className={`login__error ${!errors.email && `login__error_type_disabled`}`}>
                {errors.email ? errors.email : ""}
                </p>
                <p className="login__text">Пароль</p>
                {/* <input className="login__input" type="password" />
                <p className="login__error"></p> */}
                 <input
                    className={`login__input ${errors.password && `login__input_type_error`}`}
                    type="password"
                    name="password"
                    onChange={handleChange}
                    minLength="8"
                    maxLength="30"
                    required
                    disabled={blockInput && "disabled"}
                />
                <p className={`login__error ${!errors.password && `login__error_type_disabled`}`}>
                {errors.password ? errors.password : "⁣"}
                </p>
            </form>
            {errorMessage && <p className="login__submitError">{errorMessage}</p>}
            <button
            type="submit"
            className={`login__button ${!isValid ? "login__button_type_disable" : "link-opacity"}`}
          >
            Войти
          </button>
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