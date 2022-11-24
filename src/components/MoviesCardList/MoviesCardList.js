import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList(props) {
    const { handleSaveFilm, handleDeleteFilm, deleteType } = props;
    return (
        <section className="moviesCardList">
            <ul className="moviesCardList__list">
                {props.movies.map((movie) => (
                    <MoviesCard key={movie.id} movie={movie} handleSaveFilm={handleSaveFilm} handleDeleteFilm={handleDeleteFilm} deleteType={deleteType} />
                ))}
            </ul>
        </section>
    );
}

export default MoviesCardList;