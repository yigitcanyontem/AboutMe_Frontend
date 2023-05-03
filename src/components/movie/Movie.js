import axios from "axios";
import React, {useEffect, useState} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";

export default function Movie({ setUserId }) {
    const [movies, setMovies] = useState([]);
    const [btn, setBtn] = useState("btn-primary");
    const { movieid,usersid } = useParams();
    const [hasError, setHasError] = useState(false);
    const [defname, setDefname] = useState('Set Favorite');
    const [isReady, setIsReady] = useState(false);

    let navigate=useNavigate()

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
            const response = await axios.get(
                `http://localhost:8080/user/favmovie/${usersid}`
            );
            setMovies(result.data);
            response.data.map(
                value => {
                    if (value.id === movieid){
                        setDefname("Remove Favorite")
                        setBtn("btn-danger")
                    }
                }
            )
            setIsReady(true)
            setUserId(usersid);
            document.title = result.data.original_title
        } catch (error) {
            setHasError(true);
        }
    };
    const onPress= async (e)=>{
        e.preventDefault();
        if (defname === "Remove Favorite"){
            await axios.delete(`http://localhost:8080/user/favmovie/delete/${usersid}/${movieid}`);
            navigate(`/user/${usersid}`)
        }else if (defname === "Set Favorite"){
            await axios.put(`http://localhost:8080/user/favmovie/${usersid}/${movieid}`);
            navigate(`/user/${usersid}`);
        }

    }
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
                                    <a target={"_blank"} href={movie.imdb_url}>
                                        IMDB
                                    </a>
                                </li>
                                <li className="list-group-item ">
                                    <button type="button" onClick={onPress}  className={`btn ${btn}`}>{defname}</button>
                                </li>
                                <li className="list-group-item">
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