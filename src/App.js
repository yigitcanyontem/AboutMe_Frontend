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

function App() {
    const [userid, setUserId] = useState("");
    return (
        <div className={"App"}>
          <Router>
              <Navbar userid={userid}></Navbar>
              <Routes>
                  <Route exact path={"/"} element={<Welcome/>}></Route>
                  <Route exact path={`/search/movie/:moviename/:usersid`} element={<Movies/>}></Route>
                  <Route exact path={`/movie/:movieid/:usersid`} element={<Movie/>}></Route>

                  <Route exact path={`/search/tv/:showname/:usersid`} element={<Shows/>}></Route>
                  <Route exact path={`/tv/:showid/:usersid`} element={<Show/>}></Route>

                  <Route exact path={`/search/album/:albumname/:usersid`} element={<Albums/>}></Route>
                  <Route exact path={`/album/:albumid/:usersid`} element={<Album/>}></Route>

                  <Route exact path={`/search/book/:bookname/:usersid`} element={<Books/>}></Route>
                  <Route exact path={`/book/:bookid/:usersid`} element={<Book/>}></Route>

                  <Route exact path={`/search/user/:username`} element={<SearchUsers/>}></Route>
                  <Route exact path={`/signup`} element={<AddUser/>}></Route>
                  <Route exact path={`/login`} element={<LogInPage setUserId={setUserId}/>}></Route>

                  <Route exact path={`/user/:usersid`} element={<Users/>}></Route>
                  <Route exact path={`/user/update/:usersid`} element={<UpdateUsers/>}></Route>
            </Routes>
          </Router>
        </div>
    );
}

export default App;
