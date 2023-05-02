import axios from "axios";
import React, {useEffect, useState} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";

export default function Albums() {
    const [albums, setAlbums] = useState([]);
    const [isReady, setIsReady] = React.useState(false);

    let { albumname,usersid } = useParams();
    useEffect(() => {
        loadUser();
    }, []);



    const loadUser = async () => {
        const result = await axios.get(
            `http://localhost:8080/search/album/${albumname}`
        );
        setAlbums(result.data);
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
                <h2 className="text-center text-light mt-2 display-6">Albums </h2>
                <div className={''}>
                    {albums.map(album =>
                        <a target="_blank" href={`/album/${album.mbid}/${usersid}`}>
                            <img className={'search_img'} src={`${album.image}`} alt={"album"}/>
                        </a>
                    )}
                </div>
                <br/>
            </div>
        </div>
    );
}


