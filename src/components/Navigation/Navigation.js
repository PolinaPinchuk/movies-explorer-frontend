import menu from "../../images/6.svg";
import close from "../../images/7.svg";
import "./Navigation.css";
import { useState } from "react";
import { NavLink } from "react-router-dom";

function Navigation() {
    const [isNavigationClosed, setNavigationClosed] = useState(false);

    function openNavigation() {
        setNavigationClosed(false);
    }

    function closeNavigation() {
        setNavigationClosed(true);
    }

    return (
        <div className={`header-menu ${isNavigationClosed ? "header-menu_closed" : ""}`}>
            <button className="header-menu__toggle" aria-label="навигация" type="button" onClick={openNavigation}>
                <img src={menu} alt="Меню" className="header-menu__open" />
            </button>
            <div className="header-menu__container">
                <button className="header-menu__close" aria-label="закрыть" type="button" onClick={closeNavigation}>
                    <img src={close} alt="Закрытие" className="header-menu__exit" />
                </button>

                <ul className="header-menu__links">
                    <li className="header-menu__link-container header-menu__link-container_display">
                        <NavLink className="navigation__link" to="/">
                            Главная
                        </NavLink>
                    </li>
                    <li className="header-menu__link-container">
                        <NavLink className="navigation__link" to="/movies">
                            Фильмы
                        </NavLink>
                    </li>
                    <li className="header-menu__link-container">
                        <NavLink className="navigation__link" to="/saved-movies">
                            Сохраненные фильмы
                        </NavLink>
                    </li>
                </ul>

                <NavLink to="/profile" className="navigation__link navigation__link_type_profile"></NavLink>
            </div>
        </div>
    );
}

export default Navigation;