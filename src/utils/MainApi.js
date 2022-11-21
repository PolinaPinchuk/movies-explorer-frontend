export const BASE_URL = "https://api.polina.movies.nomoredomains.icu";
export const BEATFILM_URL = "https://api.nomoreparties.co";

const checkResponse = (response) => (response.ok ? response.json() : Promise.reject("Ошибка на сервере: " + response.status + " - " + response.statusText));
const getToken = () => {
    return `Bearer ${localStorage.getItem("jwt")}`;
};

export const getSavedMovies = () => {
    return fetch(`${BASE_URL}/movies`, {
        method: "GET",
        headers: {
            Authorization: getToken(),
            "Content-Type": "application/json",
        },
    }).then(checkResponse);
};

export const getUserInfo = () => {
    return fetch(`${BASE_URL}/users/me`, {
        method: "GET",
        headers: {
            Authorization: getToken(),
            "Content-Type": "application/json",
        },
    }).then(checkResponse);
};

export const patchUserInfo = (name, email) => {
    return fetch(`${BASE_URL}/users/me`, {
        method: "PATCH",
        headers: {
            Authorization: getToken(),
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
            Authorization: getToken(),
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            nameRU: card.nameRU,
            nameEN: card.nameEN || "",
            country: card.country || "",
            director: card.director,
            duration: card.duration,
            year: card.year,
            description: card.description,
            image: `${BEATFILM_URL + card.image.url}`,
            trailer: card.trailer,
            thumbnail: `https://api.nomoreparties.co/${card.image.formats.thumbnail.url}`,
            movieId: card.movieId,
        }),
    }).then(checkResponse);
};

export const deleteSaveMovie = (cardId) => {
    return fetch(`${BASE_URL}/movies/${cardId}`, {
        method: "DELETE",
        headers: {
            Authorization: getToken(),
            "Content-Type": "application/json",
        },
    }).then(checkResponse);
};

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
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email,
            password,
        }),
    }).then(checkResponse);
};