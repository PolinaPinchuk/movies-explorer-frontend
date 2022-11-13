import "./SavedMovies.css";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import savedMovies from "../../utils/savedMovies";

const SavedMovies = () => {
    return (
        <div className="savedMovies">
            <SearchForm />
            <MoviesCardList cards={savedMovies} buttonMore={false} />
        </div>
    );
};

export default SavedMovies;