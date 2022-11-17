import "./AboutMe.css";
import avatar from "../../images/1.svg";

function AboutMe() {
    return (
        <section className="aboutMe">
            <h2 className="aboutMe__title">Студент</h2>
            <div className="aboutMe__container">
                <div className="aboutMe__info">
                    <h2 className="aboutMe__name">Виталий</h2>
                    <h3 className="aboutMe__job">Фронтенд-разработчик, 30 лет</h3>
                    <h4 className="aboutMe__bio">
                        Я&nbsp;родился и&nbsp;живу в&nbsp;Саратове, закончил факультет экономики СГУ. У&nbsp;меня есть жена и&nbsp;дочь. 
                        Я&nbsp;люблю слушать музыку, а&nbsp;ещё увлекаюсь бегом. Недавно начал кодить. С&nbsp;2015 года работал
                        в&nbsp;компании &laquo;СКБ Контур&raquo;. После того, как прошёл курс по веб&#8209;разработке, начал заниматься 
                        фриланс&#8209;заказами и&nbsp;ушёл с&nbsp;постоянной работы.
                    </h4>
                    <div className="aboutMe__links">
                        <a href="https://github.com/PolinaPinchuk" target="_blank" rel="noreferrer" className="aboutMe__link">
                            Github
                        </a>
                    </div>
                </div>
                <img src={avatar} className="aboutMe__foto" alt="Фото"></img>
            </div>
        </section>
    );
}

export default AboutMe;