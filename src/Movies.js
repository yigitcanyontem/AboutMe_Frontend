import axios from "axios";
import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import MainPage from "./MainPage";

export default function Movies() {
    const [movies, setMovies] = useState([]);
    let { moviename,year } = useParams();
    useEffect(() => {
        loadUser();
    }, []);



    const loadUser = async () => {
        const result = await axios.get(
            `http://localhost:8080/search/movie/${moviename}/${year}`
        );
        setMovies(result.data);
    };
    return (

        <div className="container ">
            <MainPage/>
            <div className="row">
                <div className="col-md-6 offset-md-3 border rounded p-4 mt-5 shadow text-bg-dark">
                    <h2 className="text-center m-4 display-6">Movie Details</h2>
                    <div className="card  text-start " >
                        <div className="card-header">
                            {movies.map(movie =>
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item">
                                        <b>Title: </b>
                                        {movie.original_title}
                                    </li>
                                    <li className="list-group-item">
                                        <img src={`${movie.poster_path}`} alt={"movie"}/>
                                    </li>
                                </ul>
                            )}
                        </div>
                    </div>
                    <br/>

                </div>
            </div>
        </div>
    );
}


