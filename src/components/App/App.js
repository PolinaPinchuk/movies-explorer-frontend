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
          <Routes>
          <Route path='/' index element={
              <>
                <Header path='/' loggedIn={false} />
                <Main loggedIn={true} />
                <Footer />
              </>
            }
          />
            <Route path="*" element={<PageNotFound />} />
            <Route path="/movies" element={
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
            <Route path="/signup" element={<Register />} />
            <Route path="/signin" element={<Login />} />
          </Routes>
      </section>
  );
}

export default App;