import "./Movies.css";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";
import Further from "../Further/Further";
import { useEffect, useRef, useState } from "react";
import { apiUrl, fetchMovies } from "../../utils/MoviesApi";

function getLoadingDisplay(screenWidth) {
    if (screenWidth >= 1280) {
        return { defaultCount: 7, loadMoreCount: 1 };
    }
    return { defaultCount: 5, loadMoreCount: 1 };
}

const localStorageKeys = {
    search: "lastSearch",
    shortMovie: "lastShortMovie",
};

function Movies(props) {
    const { savedMovies, handleSaveFilm, handleDeleteFilm, loggedIn } = props;
    const [showPreloader, setShowPreloader] = useState(false);
    const loadingDisplayRef = useRef(getLoadingDisplay(window.innerWidth));
    const [movies, setMovies] = useState(null);
    const [visibleCount, setVisibleCount] = useState(loadingDisplayRef.current.defaultCount);
    const [errorMessage, setErrorMessage] = useState(null);
    const [searchValue, setSearchValue] = useState(localStorage.getItem(localStorageKeys.search) || "");
    const [shortFilmsOnly, setshortFilmsOnly] = useState(JSON.parse(localStorage.getItem(localStorageKeys.shortMovie) || "false") || false);
    const isLoadingRef = useRef(false);

    const onSearchImpl = async () => {
        if (isLoadingRef.current) {
            return;
        }

        isLoadingRef.current = true;

        try {
            if (searchValue.length === 0) {
                setErrorMessage("Нужно ввести ключевое слово");
                setMovies([]);
                return;
            }

            setShowPreloader(true);
            setMovies([]);
            setErrorMessage(null);

            const movies = await fetchMovies();
            const foundMovies = movies.filter((x) => !shortFilmsOnly || x.duration <= 40).filter((x) => x.nameRU.toLowerCase().includes(searchValue.toLowerCase()));

            if (foundMovies.length === 0) {
                setErrorMessage("Ничего не найдено");
                return;
            }

            setVisibleCount(loadingDisplayRef.current.defaultCount);
            setMovies(foundMovies);
        } catch (e) {
            setErrorMessage("Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз");
        } finally {
            setShowPreloader(false);
            isLoadingRef.current = false;
        }
    };

    useEffect(() => {
        let timeoutId = null;
        const onResize = () => {
            if (timeoutId) {
                clearTimeout(timeoutId);
            }

            timeoutId = setTimeout(() => {
                const newLoadingDisplay = getLoadingDisplay(window.innerWidth);
                loadingDisplayRef.current = newLoadingDisplay;
                setVisibleCount((prevVal) => Math.max(newLoadingDisplay.defaultCount, prevVal));
            }, 100);
        };

        window.addEventListener("resize", onResize);

        return () => {
            if (timeoutId) {
                clearTimeout(timeoutId);
            }

            window.removeEventListener("resize", onResize);
        };
    }, []);

    useEffect(() => {
        localStorage.setItem(localStorageKeys.search, searchValue);
        setErrorMessage("Нужно ввести ключевое сssssлово");
        onSearchImpl();
    }, [searchValue]);

    useEffect(() => {
        localStorage.setItem(localStorageKeys.shortMovie, JSON.stringify(shortFilmsOnly));
        onSearchImpl();
    }, [shortFilmsOnly]);

    useEffect(() => {
        setErrorMessage(null);
    }, [loggedIn]);

    return (
        <div className="movies">
            <SearchForm
                onSearch={(value) => {
                    if (value === "" && value === searchValue) {
                        onSearchImpl();
                    } else {
                        setSearchValue(value);
                    }
                }}
                defaultValue={searchValue}
                defaultShortFilmValue={shortFilmsOnly}
                onShortFilmToggle={setshortFilmsOnly}
            />
            {movies && movies.length !== 0 ? (
                <MoviesCardList
                    handleSaveFilm={(movieId) => {
                        handleSaveFilm(movies.find((m) => m.id === movieId));
                    }}
                    handleDeleteFilm={handleDeleteFilm}
                    movies={movies.slice(0, visibleCount).map((movie) => ({
                        nameRU: movie.nameRU,
                        duration: movie.duration,
                        imageUrl: `${apiUrl}/${movie.image.url}`,
                        id: movie.id,
                        saved: savedMovies.find((x) => x.movieId === movie.id) !== undefined,
                        trailerLink: movie.trailerLink,
                    }))}
                />
            ) : null}
            <span className="movies-errorMessage">{errorMessage}</span>
            {showPreloader ? <Preloader /> : null}
            {movies && visibleCount < movies.length ? <Further onClick={() => setVisibleCount(visibleCount + loadingDisplayRef.current.loadMoreCount)} /> : null}
        </div>
    );
}

export default Movies;