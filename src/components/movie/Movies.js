import axios from "axios";
import React, {useEffect, useState} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";

export default function Movies() {
    const [movies, setMovies] = useState([]);
    const [isReady, setIsReady] = React.useState(false);

    let { moviename } = useParams();
    useEffect(() => {
        loadUser();
    }, []);



    const loadUser = async () => {
        const result = await axios.get(
            `http://localhost:8080/search/movie/${moviename}`
        );
        setMovies(result.data);
        setIsReady(true)
    };

    if(!isReady) {
        return (
            <div className="text-center">
                <div className="spinner-border spinner" role="status">
                    <span className="sr-only"></span>
                </div>
            </div>
        )
    }

    return (
        <div className={"page"}>
            <div className="container ">
                <h2 className="text-center text-light  display-6">Movie Details</h2>
                <div className={''}>
                    {movies.map(movie =>
                        <a target="_blank" href={`/movie/${movie.id}`}>
                            <img className={'search_img'} src={`${movie.poster_path}`} alt={"movie"}/>
                        </a>
                    )}
                </div>
                <br/>
            </div>
        </div>
    );
}


