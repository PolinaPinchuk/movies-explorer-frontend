import "./Profile.css";
import React from "react";
import { Link } from "react-router-dom";

const Profile = () => {
    return (
        <section className="profile">
            <form className="profile__form">
                <h3 className="profile__greeting">Привет, Виталий!</h3>
                <div className="profile__data">
                    <p className="profile__text">Имя</p>
                    <div className="profile__form-element profile__form-element_type_name">
                        <input className="profile__setting" defaultValue="Виталий" required />
                    </div>
                    <div className="profile__form-element profile__form-element_type_email">
                        <input className="profile__setting" defaultValue="pochta@pochta.ru" required />
                    </div>
                    <p className="profile__text">E-mail</p>
                </div>
                <Link to="/profile" className="profile__button">
                    Редактировать
                </Link>
                <Link to="/" className="profile__exit">
                    Выйти из аккаунта
                </Link>
            </form>
        </section>
    );
};

export default Profile;