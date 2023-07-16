import axios from "axios";
import React, {useEffect, useState} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";

export default function Albums() {
    const [albums, setAlbums] = useState([]);
    const [isReady, setIsReady] = React.useState(false);
    const [hasError, setHasError] = useState(false);
    let { albumname } = useParams();
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
            `http://localhost:8080/search/album/${albumname}`

        await axios.get(endpointUrl, config).then((result) => {
            setAlbums(result.data);
        }).catch((error) => {
            if (error.response.data.message === "No Album Found"){
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
                    <h2 className="text-center mx-auto display-2 text-light">No Album Found</h2>
                    <br/>
                </div>
            </div>

        );
    }else{
    return (
        <div className={"page"}>
            <div className="container ">
                <h2 className="text-center text-light mt-2 display-6">Albums </h2>
                <div className={''}>
                    {albums.map(album =>
                        <a href={`/album/${album.mbid}`}>
                            <img className={'search_img'} src={`${album.image}`} alt={"album"}/>
                        </a>
                    )}
                </div>
                <br/>
            </div>
        </div>
    );
    }
}


