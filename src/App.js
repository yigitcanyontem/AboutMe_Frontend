import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import Movies from "./components/movie/Movies";
import MainPage from "./components/page/MainPage";
import AddUser from "./components/user/AddUser";
import Movie from "./components/movie/Movie";
import Show from "./components/show/Show";
import Shows from "./components/show/Shows";
import Users from "./components/page/Users";
import Navbar from "./components/navbar/Navbar";
function App() {
  return (
      <div className={"App"}>
        <Navbar></Navbar>
        <Router>
          <Routes>
            <Route exact path={"/search/movie/:moviename/:year"} element={<Movies/>}></Route>
            <Route exact path={"/search/movie/:moviename"} element={<Movies/>}></Route>
            <Route exact path={"/movie/:movieid"} element={<Movie/>}></Route>

              <Route exact path={"/search/tv/:showname/:year"} element={<Shows/>}></Route>
              <Route exact path={"/search/tv/:showname"} element={<Shows/>}></Route>
              <Route exact path={"/tv/:showid"} element={<Show/>}></Route>

            <Route exact path={"/"} element={<MainPage/>}></Route>
            <Route exact path={"/user/create"} element={<AddUser/>}></Route>
            <Route exact path={"/user/:usersid"} element={<Users/>}></Route>
          </Routes>
        </Router>
      </div>
  );
}

export default App;
