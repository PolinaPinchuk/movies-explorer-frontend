import "./SearchForm.css";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import searchIcon from "../../images/search-icon.svg";

function SearchForm(props) {
    const { onShortFilmToggle, defaultShortFilmValue } = props;

    return (
        <div className="searchForm">
            <form className="searchform__container">
                <img src={searchIcon} alt="иконка лупы поиска" className="searchform__icon" />
                <input type="text" placeholder="Фильм" className="searchform__input" required />
                <button type="submit" className="searchForm__button">
                    Найти
                </button>
            </form>
            <div className="searchForm__format-side">
                <FilterCheckbox defaultValue={defaultShortFilmValue} onChange={onShortFilmToggle} />
                <h2 className="searchForm__format-title">Короткометражки</h2>
            </div>
        </div>
    );
}

export default SearchForm;