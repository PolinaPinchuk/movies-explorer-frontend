import { useNavigate } from "react-router";
import "./PageNotFound.css";

function PageNotFound() {
    const navigate = useNavigate();

    const goBack = () => navigate(-1);

    return (
        <section className="pageNotFound">
            <div className="pageNotFound__container">
                <h1 className="pageNotFound__title">404</h1>
                <p className="pageNotFound__text">Страница не найдена</p>
                <button className="pageNotFound__link" onClick={goBack}>
                    Назад
                </button>
            </div>
        </section>
    );
}

export default PageNotFound;