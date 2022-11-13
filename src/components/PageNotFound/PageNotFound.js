import "./PageNotFound.css";
import { Link } from "react-router-dom";

const PageNotFound = () => {
    return (
        <div className="pageNotFound">
            <div className="pageNotFound__container">
                <h1 className="pageNotFound__title">404</h1>
                <p className="pageNotFound__text">Страница не найдена</p>
            </div>
            <Link to="/" className="pageNotFound__link">
                Назад
            </Link>
        </div>
    );
};

export default PageNotFound;