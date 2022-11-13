import './App.css';
import { Route, Routes } from 'react-router-dom';

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
  return (
      <section className="page">
        <Header loggedIn={false} />
          <Routes>
            <Route path="/" index element={<Main loggedIn={true} />} />
            <Route path="*" element={<PageNotFound />} />
            <Route path="/movies" element={<Movies loggedIn={true} />} />
            <Route path="/saved-movies" element={<SavedMovies loggedIn={true} />} />
            <Route path="/profile" element={<Profile loggedIn={true} />} />
            <Route path="/signup" element={<Register />} />
            <Route path="/signin" element={<Login />} />
          </Routes>
          <Footer />
      </section>
  );
}

export default App;