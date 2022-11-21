// import React from "react"; 
// import { useEffect, useState } from "react";
// import { Route, Switch, useHistory, Redirect } from 'react-router-dom';
// import * as MainApi from "../../utils/MainApi";

// import './App.css';
// import Header from "../Header/Header.js";
// import Main from "../Main/Main.js";
// import Footer from "../Footer/Footer.js";
// import Movies from "../Movies/Movies";
// import SavedMovies from "../SavedMovies/SavedMovies";
// import Profile from "../Profile/Profile";
// import Login from "../Login/Login.js";
// import Register from "../Register/Register.js";
// import PageNotFound from "../PageNotFound/PageNotFound.js";

// function App() {
//   const CurrentUserContext = React.createContext();

//   const history = useHistory()
//   const [loggedIn, setLoggedIn] = useState(localStorage.getItem("jwt") !== null);
//   const [currentUser, setCurrentUser] = useState({});
//   const [saveCards, setSaveCards] = useState([]);
//   const [errorMessage, setErrorMessage] = useState("");
//   const [blockInput, setBlockInput] = useState(false);
//   const [showPreloader, setShowPreloader] = useState(false);
//   const [editProfile, setEditProfile] = useState(false);
//   const [successEditProfile, setSuccessEditProfile] = useState(false);

//   useEffect(() => {
//     if (loggedIn) {
//       MainApi.getUserInfo()
//         .then((userData) => {
//           setCurrentUser(userData);
//         })
//         .catch((err) => {
//           handleloggedOutClick();
//           console.log(err);
//         });
//     }
//   }, [loggedIn]);

//   function registration(name, email, password) {
//     setShowPreloader(true);
//     setBlockInput(true);
//     MainApi.register(name, email, password)
//       .then((res) => {
//         if (email === res.email) {
//           authorization(email, password);
//           history.push('/movies');
//         }
//       })
//       .catch((err) => {
//         setErrorMessage(err.message);
//       })
//       .finally(() => {
//         setShowPreloader(false);
//         setBlockInput(false);
//       });
//   }

//   function authorization(email, password) {
//     setShowPreloader(true);
//     setBlockInput(true);
//     MainApi.authorize(email, password)
//       .then((data) => {
//         if (data.token) {
//           localStorage.setItem("jwt", data.token);
//           setLoggedIn(true);
//           history.push('/movies');
//         }
//       })
//       .catch((err) => {
//         setErrorMessage(err.message);
//       })
//       .finally(() => {
//         setShowPreloader(false);
//         setBlockInput(false);
//       });
//   }

//   function handleUpdateUser(name, email) {
//     setShowPreloader(true);
//     setBlockInput(true);
//     MainApi.patchUserInfo(name, email)
//       .then((response) => {
//         setCurrentUser(response);
//         setErrorMessage("");
//         setEditProfile(false);
//         setSuccessEditProfile(true);
//       })
//       .catch((err) => {
//         setErrorMessage(err.message);
//         setEditProfile(true);
//         setSuccessEditProfile(false);
//       })
//       .finally(() => {
//         setShowPreloader(false);
//         setBlockInput(false);
//       });
//   }

//   function handleloggedOutClick() {
//     localStorage.removeItem("filterCards");
//     localStorage.removeItem("moviesTumbler");
//     localStorage.removeItem("savedMoviesTumbler");
//     localStorage.removeItem("moviesInputValue");
//     localStorage.removeItem("savedMoviesInputValue");
//     localStorage.removeItem("token");
//     localStorage.removeItem("lastSearch");
//     localStorage.removeItem("lastShortFilm");
//     setLoggedIn(false);
//     setShowPreloader(false);
//     history.push('/');
//   }

//   function handleSaveFilm(card) {
//     setShowPreloader(true);
//     setBlockInput(true);
//     MainApi.saveMovie(card)
//       .then((res) => {
//         setSaveCards([...saveCards, res]);
//       })
//       .catch((err) => {
//         console.log(err);
//         setErrorMessage("Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен.")
//       })
//       .finally(() => {
//         setShowPreloader(false);
//         setBlockInput(false);
//       });
//   }

//   function handleDeleteFilm(movieId) {
//     const movieData = saveCards.find(savedCard => savedCard.movieId === movieId);
//     setShowPreloader(true);
//     setBlockInput(true);
//     MainApi.deleteSaveMovie(movieData._id)
//       .then(() => {
//         setSaveCards(saveCards.filter(savedCard => savedCard.movieId !== movieId));
//       })
//       .catch((err) => {
//         console.log(err);
//       })
//       .finally(() => {
//         setShowPreloader(false);
//         setBlockInput(false);
//       });
//   }

//   const loadMovies = async () => {
//     try {
//       setSaveCards(await MainApi.getSavedMovies());
//     } catch (err) {
//       console.log(err);
//     } finally {
//       setShowPreloader(false);
//     }
//   };

//   useEffect (() =>{
//     if (!loggedIn) {
//       setSaveCards([])
//       return
//     }
//     loadMovies();
//   }, [loggedIn, currentUser])

//   return (
//     <CurrentUserContext.Provider value={currentUser}>
//       <section className="page">
//           <Switch>
//           <Route path='/' index element={
//               <>
//                 <Header path='/' loggedIn={loggedIn} />
//                 <Main loggedIn={true} />
//                 <Footer />
//               </>
//             }
//           />
//             <Route path="*" element={<PageNotFound />} />
//             {/* <Route path="/movies" element={
//               <>
//               <Header path='/movies' loggedIn={true} />
//               <Movies />
//               </>
//               } 
//             />
//             <Route path="/saved-movies" element={
//             <>
//               <Header path='/saved-movies' loggedIn={true} />
//               <SavedMovies />
//               </>
//               } 
//             />
//             <Route path="/profile" element={<Profile loggedIn={true} />} />
//             <Route path="/signup" element={<Register />} /> */}
//                       <Route
//             path="/movies"
//             element={loggedIn ? <Movies savedMovies={saveCards} handleSaveFilm={handleSaveFilm} handleDeleteFilm={handleDeleteFilm} loggedIn={loggedIn}/> : <Redirect to="/movies" />}
//           />

//           <Route
//             path="/saved-movies"
//             element={loggedIn ? <SavedMovies savedMovies={saveCards} handleDeleteFilm={handleDeleteFilm}/> : <Redirect to="/" />}
//           />

//           <Route
//             path="/profile"
//             element={
//               loggedIn
//                 ? <Profile
//                   loggedIn={loggedIn}
//                   setEditProfile={setEditProfile}
//                   handleUpdateUser={handleUpdateUser}
//                   handleloggedOutClick={(e) => {
//                     e.preventDefault()
//                     handleloggedOutClick()
//                     }}
//                   setSuccessEditProfile={setSuccessEditProfile}
//                   editProfile={editProfile}
//                   errorMessage={errorMessage}
//                   blockInput={blockInput}
//                   successEditProfile={successEditProfile}
//                   showPreloader={showPreloader}

//                 />
//                 : <Redirect to="/" />
//             }
//           />
//             <Route path="/signin"
//             element={
//               loggedIn? 
//               <Redirect to="/" />
//               :
//               <Login
//                 errorMessage={errorMessage}
//                 handleSubmit={authorization}
//                 blockInput={blockInput}
//                 showPreloader={showPreloader}
//               />}
//           />
//             {/* <Route path="/signin" element={<Login />} /> */}
//             <Route path="/signup"
//             element={
//               loggedIn? 
//               <Redirect to="/" />
//               :
//               <Register
//                 errorMessage={errorMessage}
//                 handleSubmit={registration}
//                 blockInput={blockInput}
//                 showPreloader={showPreloader}
//               />}
//           />
//           </Switch>
//       </section>
//     </CurrentUserContext.Provider>
//   );
// }

// export default App;

import './App.css';
import React, { useState, useEffect } from 'react';
import { Route, Switch, useLocation, useHistory, withRouter, Redirect } from 'react-router-dom';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Profile from '../Profile/Profile';
import PageNotFound from '../PageNotFound/PageNotFound';
import Preloader from '../Preloader/Preloader';
import * as MainApi from "../../utils/MainApi";

function App() {
  const CurrentUserContext = React.createContext();
    const [isOpenPopup, setIsOpenPopup] = useState(false);
    const [popupTitle, setPopupTitle] = useState('');
    const [currentUser, setCurrentUser] = useState({});
    const [loggedIn, setLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const { pathname } = useLocation();
    const history = useHistory();

    useEffect(() => {
        getUserInfo();
    }, []);

    function getUserInfo() {
        MainApi.getUserInfo()
            .then((data) => {
                setCurrentUser(data);
                setLoggedIn(true);
            })
            .catch((err) => {
                console.log(`Что-то пошло не так! Ошибка сервера ${err}`);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }

    function onRegister(formData) {
        MainApi.register(formData)
            .then((res) => {
                if (res._id) {
                    setPopupTitle('Вы успешно зарегистрировались!');
                    setIsOpenPopup(true);
                    onLogin(formData);
                }
            })
            .catch((err) => {
                setPopupTitle('Что-то пошло не так! Ошибка регистрации.');
                setIsOpenPopup(true);
            });
    }

    //   function authorization(email, password) {
//     setShowPreloader(true);
//     setBlockInput(true);
//     MainApi.authorize(email, password)
//       .then((data) => {
//         if (data.token) {
//           localStorage.setItem("jwt", data.token);
//           setLoggedIn(true);
//           history.push('/movies');
//         }
//       })
//       .catch((err) => {
//         setErrorMessage(err.message);
//       })
//       .finally(() => {
//         setShowPreloader(false);
//         setBlockInput(false);
//       });
//   }

    function onLogin(formData) {
        MainApi.authorize(formData)
            .then(({ token }) => {
                if (token) {
                  localStorage.saveToken(token);
                    MainApi.authorize();
                    setLoggedIn(true);
                    getUserInfo();
                    history.push('/movies');
                }
            })
            .catch((err) => {
                setPopupTitle('Что-то пошло не так! Ошибка авторизации.');
                setIsOpenPopup(true);
            });
    }

    function openPopup(textError) {
        setPopupTitle(textError);
        setIsOpenPopup(true);
    }

    function closePopup() {
        setIsOpenPopup(false);
        setPopupTitle('');
    }

    function onSignOut() {
      localStorage.removeToken();
        setLoggedIn(false);
        localStorage.removeItem('films');
        localStorage.removeItem('filmsTumbler');
        localStorage.removeItem('filmsInputSearch');
        localStorage.removeItem('savedFilms');
        localStorage.removeItem('savedFilmsTumbler');
        localStorage.removeItem('savedFilmsInputSearch');
    }

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div className="App">
                {pathname === '/' || pathname === '/movies' || pathname === '/saved-movies' || pathname === '/profile' ?
                    <Header loggedIn={loggedIn} isLoading={isLoading}/> : ''}

                <Switch>
                    <Route exact path="/">
                        <Main />
                    </Route>
{/* 
                    <ProtectedRoute
                        path="/movies"
                        loggedIn={loggedIn}
                        component={Movies}
                        isLoading={isLoading}
                        openPopup={openPopup}
                    />

                    <ProtectedRoute
                        path="/saved-movies"
                        loggedIn={loggedIn}
                        component={SavedMovies}
                        isLoading={isLoading}
                        openPopup={openPopup}
                    />

                    <ProtectedRoute
                        path="/profile"
                        loggedIn={loggedIn}
                        component={Profile}
                        isLoading={isLoading}
                        onSignOut={onSignOut}
                        openPopup={openPopup}
                    /> */}

                    <Route path="/signin">
                        {() =>
                            isLoading ? <Preloader /> : !loggedIn ? <Login onLogin={onLogin} /> : <Redirect to="/movies" />
                        }
                    </Route>

                    <Route path="/signup">
                        {() =>
                            isLoading ? (
                                <Preloader />
                            ) : !loggedIn ? (
                                <Register onRegister={onRegister} />
                            ) : (
                                <Redirect to="/movies" />
                            )
                        }
                    </Route>

                    <Route path="*">
                        <PageNotFound />
                    </Route>
                </Switch>

                {pathname === '/' || pathname === '/movies' || pathname === '/saved-movies' ? <Footer /> : ''}


            </div>
        </CurrentUserContext.Provider>
    );
}

export default withRouter(App);