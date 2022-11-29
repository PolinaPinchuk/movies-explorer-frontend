import { useRef } from "react";
import "./SearchForm.css";
import searchIcon from "../../images/search-icon.svg";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

function SearchForm(props) {
    const { onSearch, defaultValue, onShortFilmToggle, defaultShortFilm } = props;

    const searchInputRef = useRef();

    const onFormSubmit = async (e) => {
        e.preventDefault();

        if (!searchInputRef.current) {
            return;
        }

        const searchString = searchInputRef.current.value.trim();
        onSearch(searchString);
    };

    return (
        <section className="searchForm">
            <form className="searchForm__container" onSubmit={onFormSubmit} noValidate>
                <img src={searchIcon} className="searchForm__icon" alt="Иконка поиска"></img>
                <input className="searchForm__input" required placeholder="Фильм" ref={searchInputRef} defaultValue={defaultValue}></input>
                <button className="searchForm__button">Найти</button>
            </form>
            <div className="searchForm__format-side">
                <FilterCheckbox defaultValue={defaultShortFilm} onChange={onShortFilmToggle} />
                <h2 className="searchForm__format-title">Короткометражки</h2>
            </div>
        </section>
    );
}

export default SearchForm;