import axios from "axios";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";

export default function Show() {
    const [shows, setShows] = useState([]);
    const { showid } = useParams();
    const [hasError, setHasError] = useState(false);
    useEffect(() => {
        loadUser();
    }, []);

    const loadUser = async () => {
        try {
            const result = await axios.get(
                `http://localhost:8080/tv/${showid}`
            );
            setShows(result.data);
            console.log(result.data)
            document.title = result.data.original_title
        } catch (error) {
            setHasError(true);
        }
    };
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
            <div className="container ">
                <div className="row">
                    <div className="col-md-6 offset-md-3 border rounded p-4 mt-5 shadow text-bg-dark">
                        <h2 className="text-center m-4 display-6">Show Details</h2>
                        <div className="card  text-start " >
                            <div className="card-header">
                                {[shows].map(show =>
                                    <ul className="list-group list-group-flush">
                                        <li className="list-group-item">
                                            <span>{show.original_title}</span>
                                        </li>
                                        <li className="list-group-item">
                                            <b>First Air Date: </b>
                                            {show.first_air_date}
                                        </li>
                                        <li className="list-group-item">
                                            <b>Overview: </b>
                                            {show.overview}
                                        </li>
                                        <li className="list-group-item">
                                            <img src={`${show.poster_path}`} alt={"show"}/>
                                        </li>
                                        <li className="list-group-item">
                                            <img src={`${show.backdrop_path}`} alt={"show"}/>
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
}