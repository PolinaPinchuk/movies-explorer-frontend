import "./Portfolio.css";
import Arrow from "../../images/8.svg";

function Portfolio() {
    return (
        <section className="portfolio">
            <div className="portfolio__container">
                <h2 className="portfolio__title">Портфолио</h2>
                <ul className="portfolio__list">
                    <li className="portfolio__item">
                        <a href="https://github.com/PolinaPinchuk/how-to-learn" className="portfolio__item-link" target="_blank" rel="noreferrer">
                            Лендинг "Научиться учиться"
                        </a>
                    </li>
                    <li className="portfolio__item">
                        <a href="https://github.com/PolinaPinchuk/russian-travel" className="portfolio__item-link" target="_blank" rel="noreferrer">
                            Адаптивный сайт "Путешествие по России"
                        </a>
                    </li>
                    <li className="portfolio__item">
                        <a href="https://polina.mesto.nomoredomains.icu/" className="portfolio__item-link" target="_blank" rel="noreferrer">
                            Одностраничное приложение на React "Mesto"
                        </a>
                    </li>
                </ul>
            </div>
        </section>
    );
}

export default Portfolio;