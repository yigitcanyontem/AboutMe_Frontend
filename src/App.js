import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import Movies from "./components/movie/Movies";
import AddUser from "./components/user/AddUser";
import Movie from "./components/movie/Movie";
import Show from "./components/show/Show";
import Shows from "./components/show/Shows";
import Users from "./components/page/Users";
import Navbar from "./components/navbar/Navbar";
import Album from "./components/album/Album";
import Albums from "./components/album/Albums";
import Books from "./components/book/Books";
import Book from "./components/book/Book";
import Welcome from "./components/Welcome";
import SearchUsers from "./components/page/SearchUsers";
import UpdateUsers from "./components/page/UpdateUsers";
import LogInPage from "./components/page/LogInPage";
import {useState} from "react";
import HomePage from "./components/HomePage";

function App() {

    return (
        <div className={"App"}>
          <Router>
              <Navbar></Navbar>
              <Routes >
                  <Route exact path={"/"} element={<HomePage/>}></Route>
                  <Route exact path={`/search/movie/:moviename`} element={<Movies />}></Route>
                  <Route exact path={`/movie/:movieid`} element={<Movie />}></Route>

                  <Route exact path={`/search/tv/:showname`} element={<Shows />}></Route>
                  <Route exact path={`/tv/:showid/`} element={<Show />}></Route>

                  <Route exact path={`/search/album/:albumname`} element={<Albums/>}></Route>
                  <Route exact path={`/album/:albumid`} element={<Album/>}></Route>

                  <Route exact path={`/search/book/:bookname`} element={<Books/>}></Route>
                  <Route exact path={`/book/:bookid`} element={<Book/>}></Route>

                  <Route exact path={`/search/user/:username`} element={<SearchUsers />}></Route>
                  <Route exact path={`/signup`} element={<AddUser/>}></Route>
                  <Route exact path={`/login`} element={<LogInPage/>}></Route>

                  <Route exact path={`/user/:usersid`} element={<Users/>}></Route>
                  <Route exact path={`/user/update`} element={<UpdateUsers />}></Route>
            </Routes>
          </Router>
        </div>
    );
}

export default App;
