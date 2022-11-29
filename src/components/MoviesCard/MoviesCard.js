import "./MoviesCard.css";
import deleteFavoritedMovieIcon from "../../images/5.svg";

function MoviesCard(props) {
    const { movie, handleSaveFilm, handleDeleteFilm, deleteType } = props;

    return (
        <li className="moviesCard">
            <div className="moviesCard__element">
                <p className="moviesCard__title">{movie.nameRU}</p>
                <p className="moviesCard__duration">{movie.duration} мин</p>
                {movie.saved ? (
                    deleteType === "cross" ? (
                        <button
                            type="button"
                            className="moviesCard__button moviesCard__button_delete"
                            onClick={() => {
                                handleDeleteFilm(movie.id);
                            }}
                        >
                            <img src={deleteFavoritedMovieIcon} alt="Иконка удалить из избранного" className="moviesCard__favorites-icon"></img>
                        </button>
                    ) : (
                        <button
                            type="button"
                            className="moviesCard__button moviesCard__button_active"
                            onClick={() => {
                                handleDeleteFilm(movie.id);
                            }}
                        ></button>
                    )
                ) : (
                    <button type="button" className="moviesCard__button moviesCard__button_inactive" onClick={() => handleSaveFilm(movie.id)}></button>
                )}
            </div>
            <a className="moviesCard__image-link-to-trailer" href={movie.trailerLink} target="_blank">
                <img src={movie.imageUrl} alt="Обложка фильма" className="moviesCard__image"></img>
            </a>
        </li>
    );
}

export default MoviesCard;