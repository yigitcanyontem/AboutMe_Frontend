import axios from "axios";
import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";

export default function Album({ setUserId }) {
    const [albums, setAlbums] = useState([]);
    const [btn, setBtn] = useState("btn-primary");
    const { albumid,usersid } = useParams();
    const [hasError, setHasError] = useState(false);
    const [defname, setDefname] = useState('Set Favorite');
    const [isReady, setIsReady] = useState(false);

    let navigate=useNavigate()
    useEffect(() => {
        loadUser();
    }, []);

    const myStyle={
        backgroundImage:
            `url(${albums.image})`,
        width: '100vm',
        height: '100vh',
        overflow: 'auto'
    };

    const loadUser = async () => {
        try {
            const result = await axios.get(
                `http://localhost:8080/album/${albumid}`
            );
            const response = await axios.get(
                `http://localhost:8080/user/favalbums/${usersid}`
            );
            setAlbums(result.data);
            response.data.map(
                value => {
                    if (value.mbid === albumid){
                        setDefname("Remove Favorite")
                        setBtn("btn-danger")
                    }
                }
            )
            setUserId(usersid);
            setIsReady(true)
            document.title = result.data.name
        } catch (error) {
            setHasError(true);
        }
    };
    const onPress= async (e)=>{
        e.preventDefault();
        if (defname === "Remove Favorite"){
            await axios.delete(`http://localhost:8080/user/favalbums/delete/${usersid}/${albumid}`);
            navigate(`/user/${usersid}`)
        }else if (defname === "Set Favorite"){
            await axios.put(`http://localhost:8080/user/favalbums/${usersid}/${albumid}`);
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
            <div className="container ">
                <div className="row">
                    <div className="col-md-6 offset-md-3 border rounded p-4 mt-5 shadow text-bg-dark">
                        <h2 className="text-center mx-auto display-6">The album with id "{albumid}" doesnt exist</h2>
                    </div>
                </div>
            </div>
        );
    }else{
        return (
            <div style={myStyle}>
                <div className="col-md-6 offset-md-3 mb-3 border rounded p-4 mt-5 shadow text-bg-dark">
                    <div className="card-header">
                        {[albums].map(album =>
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item">
                                    <b>ID: </b>
                                    <span>{album.mbid}</span>
                                </li>
                                <li className="list-group-item">
                                    <b>Name: </b>
                                    {album.name}
                                </li>
                                <li className="list-group-item">
                                    <b>Artist: </b>
                                    {album.artist}
                                </li>
                                <li className="list-group-item">
                                    <a target={"_blank"} href={`${album.url}`} >
                                        Listen
                                    </a>
                                </li>
                                <li className="list-group-item ">
                                    <button type="button" onClick={onPress}  className={`btn ${btn}`}>{defname}</button>
                                </li>
                                <li className="list-group-item">
                                    <img src={`${album.image}`} alt={"movie"}/>
                                </li>

                            </ul>
                        )}
                    </div>
                </div>
            </div>
        )
    }
}