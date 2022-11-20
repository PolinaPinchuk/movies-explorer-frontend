// export const BASE_URL = "https://api.polina.movies.nomoredomains.icu";
class MainApi {
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

    getSavedMovies() {
        return fetch(`${this._baseUrl}/movies`, {
            headers: {
                Authorization: getToken(),
                "Content-Type": "application/json",
            },
        }).then(this._checkResponse);
    }
    getUserInfo() {
        return fetch(`${this._baseUrl}/users/me`, {
            headers: {
                Authorization: getToken(),
                "Content-Type": "application/json",
            },
        }).then(this._checkResponse);
    }
    patchUserInfo(userName, userEmail) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: "PATCH",
            headers: {
                Authorization: getToken(),
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: userName,
                email: userEmail,
            }),
        }).then(this._checkResponse);
    }
    saveMovie(nameRU, nameEN, country, director, duration, year, description, image, trailer, thumbnail, movieId) {
        return fetch(`${this._baseUrl}/movies`, {
            method: "POST",
            headers: {
                Authorization: getToken(),
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                nameRU: nameRU,
                nameEN: nameEN,
                country: country,
                director: director,
                duration: duration,
                year: year,
                description: description,
                image: image,
                trailer: trailer,
                thumbnail: thumbnail,
                movieId: movieId,
            }),
        }).then(this._checkResponse);
    }
    deleteSaveMovie(id) {
        return fetch(`${this._baseUrl}/movies/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: getToken(),
                "Content-Type": "application/json",
            },
        });
    }

    register = (name, email, password) => {
        return fetch(`${this._baseUrl}/signup`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: name,
                email: email,
                password: password,
            }),
        }).then(this._checkResponse);
    };

    authorize = (email, password) => {
        return fetch(`${this._baseUrl}/signin`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                password: `${password}`,
                email: `${email}`,
            }),
        }).then(this._checkResponse);
    };
    checkToken() {
        return fetch(`${this._baseUrl}/users/me`, {
            method: "GET",
            headers: {
                Authorization: getToken(),
                "Content-Type": "application/json",
            },
        }).then(this._checkResponse);
    }
}
const getToken = () => {
    return `Bearer ${localStorage.getItem("jwt")}`;
};
// export const mainApi = new MainApi({
//     baseUrl: BASE_URL,
// });
const mainApi = new MainApi({
    baseUrl: 'https://api.polina.movies.nomoredomains.icu',
    // headers: {
    //     'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
    //     'Content-Type': 'application/json',
    // },
});
export default mainApi;