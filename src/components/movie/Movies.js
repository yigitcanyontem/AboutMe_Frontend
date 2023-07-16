import axios from "axios";
import React, {useEffect, useState} from "react";
import { useParams} from "react-router-dom";

export default function Movies() {
    const [movies, setMovies] = useState([]);
    const [isReady, setIsReady] = React.useState(false);
    const [hasError, setHasError] = useState(false);

    let { moviename } = useParams();
    useEffect(() => {
        loadUser();
    }, []);



    const loadUser = async () => {
        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        };
        const endpointUrl =
            `http://localhost:8080/search/movie/${moviename}`

        await axios.get(endpointUrl, config).then((result) => {
            setMovies(result.data);
        }).catch((error) => {
            if (error.response.data.message === "No Movie Found"){
                setHasError(true);
            }
        });
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
    if (hasError){
        return (
            <div className={"page"}>
                <div className="container ">
                    <h2 className="text-center mx-auto display-2 text-light">No Movie Found</h2>
                    <br/>
                </div>
            </div>

        );
    }else {
    return (
        <div className={"page"}>
            <div className="container ">
                <h2 className="text-center text-light mt-2 display-6">Movies</h2>
                <div className={''}>
                    {movies.map(movie =>
                        <a href={`/movie/${movie.id}`}>
                            <img className={'search_img'} src={`${movie.poster_path}`} alt={"movie"}/>
                        </a>
                    )}
                </div>
                <br/>
            </div>
        </div>
    );
    }
}


