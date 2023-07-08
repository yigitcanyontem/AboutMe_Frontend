import axios from "axios";
import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";

export default function Show() {
    const [shows, setShows] = useState([]);
    const [btn, setBtn] = useState("btn-primary");
    const { showid } = useParams();
    const [hasError, setHasError] = useState(false);
    const [defname, setDefname] = useState('Set Favorite');
    const [isReady, setIsReady] = useState(false);
    let navigate=useNavigate()

    useEffect(() => {
        loadUser();
    }, []);
    const myStyle={
        backgroundImage:
            `url(${shows.backdrop_path})`,
        width: '100%',
        height: '100%',
        overflow: 'auto'
    };

    const loadUser = async () => {
        try {
            const result = await axios.get(
                `http://localhost:8080/tv/${showid}`
            );
            const response = await axios.get(
                `http://localhost:8080/user/favshows/${localStorage.getItem('userid')}`
            );
            setShows(result.data);
            response.data.map(
                value => {
                    if (value.id === showid){
                        setDefname("Remove Favorite")
                        setBtn("btn-danger")
                    }
                }
            )
            setIsReady(true)
            document.title = result.data.original_title
        } catch (error) {
            setHasError(true);
        }
    };
    const onPress= async (e)=>{
        e.preventDefault();
        if (defname === "Remove Favorite"){
            await axios.delete(`http://localhost:8080/user/favshows/delete/${localStorage.getItem('userid')}/${showid}`);
            navigate(`/user/${localStorage.getItem('userid')}`)
        }else if (defname === "Set Favorite"){
            await axios.put(`http://localhost:8080/user/favshows/${localStorage.getItem('userid')}/${showid}`);
            navigate(`/user/${localStorage.getItem('userid')}`);
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
            <div className="container ">
                <div className="row">
                    <div className="col-md-6 offset-md-3 border rounded p-4 mt-5 shadow text-bg-dark">
                        <h2 className="text-center mx-auto display-6">The show with id "{showid}" doesnt exist</h2>
                    </div>
                </div>
            </div>
        );
    }else{
        return (
            <div style={myStyle}>
                <div className="col-md-6 offset-md-3 mb-3 border rounded p-4 mt-5 shadow text-bg-dark">
                    <div className="card-header">
                        {[shows].map(show =>
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item">
                                    <h1>{show.original_title}</h1>
                                </li>
                                <li className="list-group-item ">
                                    <b>First Air Date: </b>
                                    {show.first_air_date}
                                </li>
                                <li className="list-group-item">
                                    <b>Overview: </b>
                                    {show.overview}
                                </li>
                                <li className="list-group-item ">
                                    <a target={"_blank"} href={show.imdb_url}>
                                        Website
                                    </a>
                                </li>
                                <li className="list-group-item ">
                                    <button type="button" onClick={onPress}  className={`btn ${btn}`}>{defname}</button>
                                </li>
                                <li className="list-group-item ">
                                    <img src={`${show.poster_path}`} alt={"show"}/>
                                </li>
                            </ul>
                        )}
                    </div>
                </div>
            </div>
        )
    }
}