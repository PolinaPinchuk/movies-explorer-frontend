export const BASE_URL = "https://api.nomoreparties.co/beatfilm-movies";

class MoviesApi {
    constructor({ baseUrl, headers }) {
        this._headers = headers;
        this._baseUrl = baseUrl;
    }

    _checkResponse(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    }

    getInitialMovies() {
        return fetch(`${this._baseUrl}`, {
            headers: {
                "Content-Type": "application/json",
            },
        }).then(this._checkResponse);
    }
}
export const moviesApi = new MoviesApi({
    baseUrl: BASE_URL,
});