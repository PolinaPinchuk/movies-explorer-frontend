import "./Footer.css";

function Footer() {
    return (
        <footer className="footer">
            <h2 className="footer__title">Учебный проект Яндекс.Практикум х BeatFilm.</h2>
            <div className="footer__container">
                <div className="footer__info">
                    <h2 className="footer__year">&#169; 2022</h2>
                    <div className="footer__links">
                        <a href="https://practicum.yandex.ru/web/" target="_blank" rel="noreferrer" className="footer__link">
                            Яндекс.Практикум
                        </a>
                        <a href="https://practicum.yandex.ru/web/" target="_blank" rel="noreferrer" className="footer__link">
                            Github
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;