import axios from "axios";
import {useEffect, useState} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import MainPage from "../page/MainPage";

export default function Shows() {
    const [shows, setShows] = useState([]);
    let { showname,year } = useParams();
    useEffect(() => {
        loadUser();
    }, []);



    const loadUser = async () => {
        const result = await axios.get(
            `http://localhost:8080/search/tv/${showname}/${year}`
        );
        setShows(result.data);
    };
    return (

        <div className="container ">
            <MainPage/>
            <div className="row">
                <div className="col-md-6 offset-md-3 border rounded p-4 mt-5 shadow text-bg-dark">
                    <h2 className="text-center m-4 display-6">Show Details</h2>
                    <div className="card  text-start " >
                        <div className="card-header">
                            {shows.map(show =>
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item">
                                        <b>Title: </b>
                                        <Link to={`/tv/${show.id}`}>{show.original_title}</Link>
                                    </li>
                                    <li className="list-group-item">
                                        <img src={`${show.poster_path}`} alt={"show"}/>
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


