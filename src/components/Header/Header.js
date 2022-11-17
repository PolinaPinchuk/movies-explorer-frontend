import "./Header.css";
import { Link } from "react-router-dom";
import logo from "../../images/2.svg";
import Navigation from "../Navigation/Navigation";

const Header = ({ loggedIn }) => {

    return (
        <header className={`header ${!loggedIn ? 'header_type_auth' : ''}`}>
            <Link className="header__link" to="/">
                <img src={logo} className="header__logo" alt="Логотип"></img>
            </Link>
            {loggedIn ? (
                <Navigation />
            ) : (
                <>
                    <div className="header__links">
                        <Link className="header__link" to="/signup">
                            <p className="headers__link-text">Регистрация</p>
                        </Link>
                        <Link className="header__link" to="/signin">
                            <button className="headers__link-button">Войти</button>
                        </Link>
                    </div>
                </>
            )}
        </header>
    );
}

export default Header;