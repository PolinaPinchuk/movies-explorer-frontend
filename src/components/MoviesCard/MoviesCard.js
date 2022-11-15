import "./MoviesCard.css";
import React from "react";
import { useLocation } from "react-router-dom";

const MoviesCard = ({ card }) => {
    const [favorite, setFavorite] = React.useState(false);

    function handleFavoriteToogle() {
        setFavorite(!favorite);
    }

    const { pathname } = useLocation();

    return (
        <li className="moviesCard">
            <div className="moviesCard__element">
                <p className="moviesCard__title">{card.title}</p>
                <p className="moviesCard__duration">{card.duration}</p>
                <div className="moviesCard__buttons">
                    {pathname === "/saved-movies" ? (
                        <button type="button" className="moviesCard__button moviesCard__button_delete" />
                    ) : (
                        <button type="button" className={`moviesCard__button moviesCard__button${favorite ? "_active" : "_inactive"}`} onClick={handleFavoriteToogle} />
                    )}
                </div>
            </div>
            <img src={card.image} alt={card.title} className="moviesCard__image"></img>
        </li>
    );
};

export default MoviesCard;