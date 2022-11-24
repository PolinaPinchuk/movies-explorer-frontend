export const BASE_URL = "https://api.polina.movies.nomoredomains.icu";
export const FILM_URL = "https://api.nomoreparties.co";

const checkResponse = (res) => (res.ok ? res.json() : Promise.reject("Ошибка на сервере: " + res.status + " - " + res.statusText));

export const register = (name, email, password) => {
    return fetch(`${BASE_URL}/signup`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name,
            email,
            password,
        }),
    }).then(checkResponse);
};

export const authorize = (email, password) => {
    return fetch(`${BASE_URL}/signin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            email,
            password,
        }),
    }).then(checkResponse);
};

export const getUserInfo = (token) => {
    return fetch(`${BASE_URL}/users/me`, {
        method: "GET",
        headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
        },
    }).then(checkResponse);
};

export const patchUserInfo = (name, email) => {
    return fetch(`${BASE_URL}/users/me`, {
        method: "PATCH",
        headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name,
            email,
        }),
    }).then(checkResponse);
};

export const saveMovie = (card) => {
    return fetch(`${BASE_URL}/movies`, {
        method: "POST",
        headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            country: card.country || "",
            director: card.director,
            duration: card.duration,
            year: card.year,
            description: card.description,
            image: `${FILM_URL + card.image.url}`,
            trailerLink: card.trailerLink,
            thumbnail: `https://api.nomoreparties.co/${card.image.formats.thumbnail.url}`,
            movieId: card.id,
            nameRU: card.nameRU,
            nameEN: card.nameEN || "",
        }),
    }).then(checkResponse);
};

export const getSavedMovies = () => {
    return fetch(`${BASE_URL}/movies`, {
        method: "GET",
        headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
        },
    }).then(checkResponse);
};

export const deleteSaveMovie = (cardId) => {
    return fetch(`${BASE_URL}/movies/${cardId}`, {
        method: "DELETE",
        headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
        },
    }).then(checkResponse);
};