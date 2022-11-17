import "./AboutProject.css";

function AboutProject() {
    return (
        <section className="aboutProject">
            <p className="aboutProject__title">О проекте</p>

            <ul className="aboutProject__description">
                <li className="aboutProject__card">
                    <p className="aboutProject__card-title">Дипломный проект включал 5 этапов</p>
                    <p className="aboutProject__card-subtitle">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
                </li>
                <li className="aboutProject__card">
                    <p className="aboutProject__card-title">На выполнение диплома ушло 5 недель</p>
                    <p className="aboutProject__card-subtitle">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
                </li>
            </ul>

            <div className="aboutProject__container">
                <div className="aboutProject__short">
                    <div className="short__title">1 неделя</div>
                    <p className="aboutProject__subtitle">Back-end</p>
                </div>
                <div className="aboutProject__long">
                    <div className="long__title">4 недели</div>
                    <p className="aboutProject__subtitle">Front-end</p>
                </div>
            </div>
        </section>
    );
}

export default AboutProject;