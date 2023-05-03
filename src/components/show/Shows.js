import axios from "axios";
import React, {useEffect, useState} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";

export default function Shows({ setUserId }) {
    const [shows, setShows] = useState([]);
    let { showname,usersid } = useParams();
    const [isReady, setIsReady] = React.useState(false);

    useEffect(() => {
        loadUser();
    }, []);



    const loadUser = async () => {
        const result = await axios.get(
            `http://localhost:8080/search/tv/${showname}`
        );
        setShows(result.data);
        setUserId(usersid);
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
                <h2 className="text-center text-light mt-2 display-6">Shows</h2>
                <div className={''}>
                    {shows.map(show =>
                        <a target="_blank" href={`/tv/${show.id}/${usersid}`}>
                            <img className={'search_img'} src={`${show.poster_path}`} alt={"show"}/>
                        </a>
                    )}
                </div>
                <br/>
            </div>
        </div>
    );

}


