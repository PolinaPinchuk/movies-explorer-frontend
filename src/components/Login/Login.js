import { Link } from "react-router-dom";
import "./Login.css";
import logo from "../../images/2.svg";
import { Validation } from "../../utils/Validation";
import Preloader from "../Preloader/Preloader";

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
            <form className="login__form" noValidate onSubmit={Submite}>
                <Link className="login__link" to="/">
                    <img src={logo} className="login__logo link-opacity" alt="Логотип"></img>
                </Link>
                <h2 className="login__title">Рады видеть!</h2>
                <p className="login__text">E-mail</p>
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
                <p className={`login__error ${!errors.email && `login__error_type_disabled`}`}>{errors.email ? errors.email : "⁣"}</p>
                <p className="login__text">Пароль</p>
                <input className={`login__input ${errors.password && `login__input_type_error`}`} type="password" name="password" onChange={handleChange} minLength="8" maxLength="30" required disabled={blockInput && "disabled"} />
                <p className={`login__error ${!errors.password && `login__error_type_disabled`}`}>{errors.password ? errors.password : "⁣"}</p>
                <div className="login__submit">
                    {errorMessage && <p className="login__submitError">{errorMessage}</p>}
                    <button type="submit" className={`login__button ${!isValid ? "login__button_type_disable" : "link-opacity"}`}>
                        Войти
                    </button>
                    <h2 className="login__bottom-box_question">
                        Ещё не зарегистрированы?
                        <Link to="/signup" className="login__bottom-box_link">
                            Регистрация
                        </Link>
                    </h2>
                </div>
            </form>
        </section>
    );
}

export default Login;