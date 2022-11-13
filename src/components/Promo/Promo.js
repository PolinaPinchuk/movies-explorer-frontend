import React from "react";
import "./Promo.css";
import logo from "../../images/9.svg";

function Promo() {
    return (
        <section className="promo">
            <div className="promo__info">
                <h1 className="promo__title">Учебный проект студента факультета Веб&#8209;разработки.</h1>
                <p className="promo__subtitle">Листайте ниже, чтобы узнать больше про этот проект и его создателя.</p>
                <a href="https://practicum.yandex.ru/web/" target="_blank" rel="noreferrer" className=" promo__button">
                    Узнать больше
                </a>
            </div>
            <img src={logo} className="promo__image" alt="Логотип"></img>
        </section>
    );
}

export default Promo;