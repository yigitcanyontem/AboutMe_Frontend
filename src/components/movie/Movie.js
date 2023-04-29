import axios from "axios";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";

export default function Movie() {
    const [movies, setMovies] = useState([]);
    const { movieid } = useParams();
    const [hasError, setHasError] = useState(false);
    useEffect(() => {
        loadUser();
    }, []);

    const myStyle={
        backgroundImage:
            `url(${movies.backdrop_path})`,
        width: '100%',
        height: '100%',
        overflow: 'auto'
    };
    const loadUser = async () => {
        try {
            const result = await axios.get(
                `http://localhost:8080/movie/${movieid}`
            );
            setMovies(result.data);
            document.title = result.data.original_title
        } catch (error) {
            setHasError(true);
        }
    };
    if (hasError){
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-6 offset-md-3 border rounded p-4 mt-5 shadow text-bg-dark">
                        <h2 className="text-center mx-auto display-6">The movie with id "{movieid}" doesnt exist</h2>
                    </div>
                </div>
            </div>
        );
    }else{
        return (
            <div style={myStyle}>
                <div className="col-md-6 offset-md-3 mb-3 border rounded p-4 mt-5 shadow text-bg-dark">
                    <div className="card-header">
                        {[movies].map(movie =>
                            <ul className="list-group list-group-flush ">
                                <li className="list-group-item ">
                                    <h1>{movie.original_title}</h1>
                                </li>
                                <li className="list-group-item ">
                                    <b>Date: </b>
                                    {movie.release_date}
                                </li>
                                <li className="list-group-item ">
                                    <b>Overview: </b>
                                    {movie.overview}
                                </li>
                                <li className="list-group-item ">
                                    <img src={`${movie.poster_path}`} alt={"movie"}/>
                                </li>
                            </ul>
                        )}
                    </div>
                </div>
            </div>
        );
    }
}