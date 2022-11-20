import './App.css';
import React from "react"; 
import { useEffect, useState } from "react";
import { Route, Routes, useNavigate, Navigate  } from 'react-router-dom';
import mainApi from '../../utils/MainApi';

import Header from "../Header/Header.js";
import Main from "../Main/Main.js";
import Footer from "../Footer/Footer.js";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import Login from "../Login/Login.js";
import Register from "../Register/Register.js";
import PageNotFound from "../PageNotFound/PageNotFound.js";

function App() {
  const CurrentUserContext = React.createContext();

  const navigate = useNavigate()
  const [loggedIn, setLoggedIn] = useState(localStorage.getItem("token") !== null);
  const [currentUser, setCurrentUser] = useState({});
  const [saveCards, setSaveCards] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [blockInput, setBlockInput] = useState(false);
  const [showPreloader, setShowPreloader] = useState(false);
  const [editProfile, setEditProfile] = useState(false);
  const [successEditProfile, setSuccessEditProfile] = useState(false);

  useEffect(() => {
    if (loggedIn) {
      mainApi.getUserInfo()
        .then((userData) => {
          setCurrentUser(userData);
        })
        .catch((err) => {
          handleloggedOutClick();
          console.log(err);
        });
    }
  }, [loggedIn]);

  function registration(name, email, password) {
    setShowPreloader(true);
    setBlockInput(true);
    mainApi.register(name, email, password)
      .then((res) => {
        if (email === res.email) {
          authorization(email, password);
          navigate('/movies');
        }
      })
      .catch((err) => {
        setErrorMessage(err.message);
      })
      .finally(() => {
        setShowPreloader(false);
        setBlockInput(false);
      });
  }

  function authorization(email, password) {
    setShowPreloader(true);
    setBlockInput(true);
    mainApi.authorize(email, password)
      .then((data) => {
        if (data.token) {
          localStorage.setItem("token", data.token);
          setLoggedIn(true);
          navigate('/movies');
        }
      })
      .catch((err) => {
        setErrorMessage(err.message);
      })
      .finally(() => {
        setShowPreloader(false);
        setBlockInput(false);
      });
  }

  function handleUpdateUser(name, email) {
    setShowPreloader(true);
    setBlockInput(true);
    mainApi.patchUserInfo(name, email)
      .then((response) => {
        setCurrentUser(response);
        setErrorMessage("");
        setEditProfile(false);
        setSuccessEditProfile(true);
      })
      .catch((err) => {
        setErrorMessage(err.message);
        setEditProfile(true);
        setSuccessEditProfile(false);
      })
      .finally(() => {
        setShowPreloader(false);
        setBlockInput(false);
      });
  }

  function handleloggedOutClick() {
    localStorage.removeItem("filterCards");
    localStorage.removeItem("moviesTumbler");
    localStorage.removeItem("savedMoviesTumbler");
    localStorage.removeItem("moviesInputValue");
    localStorage.removeItem("savedMoviesInputValue");
    localStorage.removeItem("token");
    localStorage.removeItem("lastSearch");
    localStorage.removeItem("lastShortFilm");
    setLoggedIn(false);
    setShowPreloader(false);
    navigate('/');
  }

  function handleSaveFilm(card) {
    setShowPreloader(true);
    setBlockInput(true);
    mainApi.saveFilm(card)
      .then((res) => {
        setSaveCards([...saveCards, res]);
      })
      .catch((err) => {
        console.log(err);
        setErrorMessage("Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен.")
      })
      .finally(() => {
        setShowPreloader(false);
        setBlockInput(false);
      });
  }

  function handleDeleteFilm(movieId) {
    const movieData = saveCards.find(savedCard => savedCard.movieId === movieId);
    setShowPreloader(true);
    setBlockInput(true);
    mainApi.deleteFilm(movieData._id)
      .then(() => {
        setSaveCards(saveCards.filter(savedCard => savedCard.movieId !== movieId));
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setShowPreloader(false);
        setBlockInput(false);
      });
  }

  const loadMovies = async () => {
    try {
      setSaveCards(await mainApi.getFilms());
    } catch (err) {
      console.log(err);
    } finally {
      setShowPreloader(false);
    }
  };

  useEffect (() =>{
    if (!loggedIn) {
      setSaveCards([])
      return
    }
    loadMovies();
  }, [loggedIn, currentUser])

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <section className="page">
          <Routes>
          <Route path='/' index element={
              <>
                <Header path='/' loggedIn={loggedIn} />
                <Main loggedIn={true} />
                <Footer />
              </>
            }
          />
            <Route path="*" element={<PageNotFound />} />
            {/* <Route path="/movies" element={
              <>
              <Header path='/movies' loggedIn={true} />
              <Movies />
              </>
              } 
            />
            <Route path="/saved-movies" element={
            <>
              <Header path='/saved-movies' loggedIn={true} />
              <SavedMovies />
              </>
              } 
            />
            <Route path="/profile" element={<Profile loggedIn={true} />} />
            <Route path="/signup" element={<Register />} /> */}
                      <Route
            path="/movies"
            element={loggedIn ? <Movies savedMovies={saveCards} handleSaveFilm={handleSaveFilm} handleDeleteFilm={handleDeleteFilm} loggedIn={loggedIn}/> : <Navigate to="/" replace />}
          />

          <Route
            path="/saved-movies"
            element={loggedIn ? <SavedMovies savedMovies={saveCards} handleDeleteFilm={handleDeleteFilm}/> : <Navigate to="/" replace />}
          />

          <Route
            path="/profile"
            element={
              loggedIn
                ? <Profile
                  loggedIn={loggedIn}
                  setEditProfile={setEditProfile}
                  handleUpdateUser={handleUpdateUser}
                  handleloggedOutClick={(e) => {
                    e.preventDefault()
                    handleloggedOutClick()
                    }}
                  setSuccessEditProfile={setSuccessEditProfile}
                  editProfile={editProfile}
                  errorMessage={errorMessage}
                  blockInput={blockInput}
                  successEditProfile={successEditProfile}
                  showPreloader={showPreloader}

                />
                : <Navigate to="/" replace />
            }
          />
            <Route path="/signin"
            element={
              loggedIn? 
              <Navigate to="/" replace />
              :
              <Login
                errorMessage={errorMessage}
                handleSubmit={authorization}
                blockInput={blockInput}
                showPreloader={showPreloader}
              />}
          />
            {/* <Route path="/signin" element={<Login />} /> */}
            <Route path="/signup"
            element={
              loggedIn? 
              <Navigate to="/" replace />
              :
              <Register
                errorMessage={errorMessage}
                handleSubmit={registration}
                blockInput={blockInput}
                showPreloader={showPreloader}
              />}
          />
          </Routes>
      </section>
    </CurrentUserContext.Provider>
  );
}

export default App;