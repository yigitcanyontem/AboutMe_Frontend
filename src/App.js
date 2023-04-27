import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import Movies from "./Movies";
import MainPage from "./MainPage";
import AddUser from "./AddUser";
function App() {
  return (
      <div className={"App"}>
        <Router>
          <Routes>
            <Route exact path={"/movie/:moviename/:year"} element={<Movies/>}></Route>
            <Route exact path={"/movie/:moviename"} element={<Movies/>}></Route>
            <Route exact path={"/"} element={<MainPage/>}></Route>
            <Route exact path={"/user"} element={<AddUser/>}></Route>
          </Routes>
        </Router>
      </div>
  );
}

export default App;
