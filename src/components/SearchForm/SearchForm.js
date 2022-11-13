import "./SearchForm.css";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

function SearchForm(props) {
    const { onShortFilmToggle, defaultShortFilmValue } = props;

    return (
        <form className="searchForm">
            <div className="searchForm__container">
                <input className="searchForm__input" placeholder="Фильм" type="text" required />
                <div className="searchForm__button_border">
                    <button type="submit" className="searchForm__button">
                        Найти
                    </button>
                </div>
                <div className="searchForm__format-side">
                    <FilterCheckbox defaultValue={defaultShortFilmValue} onChange={onShortFilmToggle} />
                    <h2 className="searchForm__format-title">Короткометражки</h2>
                </div>
            </div>
        </form>
    );
};

export default SearchForm;