import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import Movies from "./components/movie/Movies";
import MainPage from "./components/page/MainPage";
import AddUser from "./AddUser";
import Movie from "./components/movie/Movie";
import Show from "./components/show/Show";
import Shows from "./components/show/Shows";
function App() {
  return (
      <div className={"App"}>
        <Router>
          <Routes>
            <Route exact path={"/search/movie/:moviename/:year"} element={<Movies/>}></Route>
            <Route exact path={"/search/movie/:moviename"} element={<Movies/>}></Route>
            <Route exact path={"/movie/:movieid"} element={<Movie/>}></Route>

              <Route exact path={"/search/tv/:showname/:year"} element={<Shows/>}></Route>
              <Route exact path={"/search/tv/:showname"} element={<Shows/>}></Route>
              <Route exact path={"/tv/:showid"} element={<Show/>}></Route>

            <Route exact path={"/"} element={<MainPage/>}></Route>
            <Route exact path={"/user"} element={<AddUser/>}></Route>
          </Routes>
        </Router>
      </div>
  );
}

export default App;
