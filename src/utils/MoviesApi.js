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