import axios from "axios";
import React, {useEffect, useState} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";

export default function Shows() {
    const [shows, setShows] = useState([]);
    let { showname } = useParams();
    const [isReady, setIsReady] = React.useState(false);

    useEffect(() => {
        loadUser();
    }, []);



    const loadUser = async () => {
        const result = await axios.get(
            `http://localhost:8080/search/tv/${showname}`
        );
        setShows(result.data);
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
                <h2 className="text-center text-light  display-6">Show Details</h2>
                <div className={''}>
                    {shows.map(show =>
                        <a target="_blank" href={`/tv/${show.id}`}>
                            <img className={'search_img'} src={`${show.poster_path}`} alt={"show"}/>
                        </a>
                    )}
                </div>
                <br/>
            </div>
        </div>
    );

}


