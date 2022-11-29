import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import { useEffect, useState } from "react";
import "./SavedMovies.css";

function SavedMovies(props) {
    const { savedMovies, handleDeleteFilm } = props;
    const [filteredMovies, setFilteredMovies] = useState([]);
    const [errorMessage, setErrorMessage] = useState(null);
    const [searchValue, setSearchValue] = useState("");
    const [shortFilmsOnly, setShortFilmsOnly] = useState(false);

    useEffect(() => {
        setErrorMessage(null);

        const foundMovies = savedMovies.filter((x) => !shortFilmsOnly || x.duration <= 40).filter((x) => x.nameRU.toLowerCase().includes(searchValue.toLowerCase()));

        setFilteredMovies(foundMovies);

        if (foundMovies.length === 0) {
            setErrorMessage("Вы еще не сохранили ни одного фильма");
        }
    }, [searchValue, savedMovies, shortFilmsOnly]);

    return (
        <div className="savedMovies">
            <SearchForm onSearch={setSearchValue} defaultValue={searchValue} defaultShortFilmValue={shortFilmsOnly} onShortFilmToggle={setShortFilmsOnly} />
            {filteredMovies.length !== 0 ? (
                <MoviesCardList
                    deleteType="cross"
                    handleDeleteFilm={handleDeleteFilm}
                    movies={filteredMovies.map((movie) => ({
                        nameRU: movie.nameRU,
                        duration: movie.duration,
                        imageUrl: movie.image,
                        id: movie.movieId,
                        trailerLink: movie.trailerLink,
                        saved: true,
                    }))}
                />
            ) : null}
            <span className="movies-errorMessage">{errorMessage}</span>
        </div>
    );
}

export default SavedMovies;