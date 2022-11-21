// export const BASE_URL = "https://api.nomoreparties.co/beatfilm-movies";

// class MoviesApi {
//     constructor({ baseUrl, headers }) {
//         this._headers = headers;
//         this._baseUrl = baseUrl;
//     }

//     _checkResponse(res) {
//         if (res.ok) {
//             return res.json();
//         }
//         return Promise.reject(`Ошибка: ${res.status}`);
//     }

//     getInitialMovies() {
//         return fetch(`${this._baseUrl}`, {
//             headers: {
//                 "Content-Type": "application/json",
//             },
//         }).then(this._checkResponse);
//     }
// }
// export const moviesApi = new MoviesApi({
//     baseUrl: BASE_URL,
// });
export const apiUrl = "https://api.nomoreparties.co";
const HTTP_REGEX = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/;

let moviesCache = null;

export async function fetchMovies() {
    if (moviesCache !== null) {
        return moviesCache;
    }

    moviesCache = fetch(`${apiUrl}/beatfilm-movies`)
        .then((response) => {
            if (!response.ok) {
                throw new Error("Response is not ok");
            }
            return response.json();
        })
        .then((movies) => movies.map((movie) => (HTTP_REGEX.test(movie.trailerLink) ? movie : { ...movie, trailerLink: movie.image })))
        .catch((e) => {
            moviesCache = null;
            throw e;
        });
    return moviesCache;
}