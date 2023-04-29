import axios from "axios";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";

export default function Album() {
    const [albums, setAlbums] = useState([]);
    const { albumid } = useParams();
    const [hasError, setHasError] = useState(false);
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
            setAlbums(result.data);
            document.title = result.data.name
        } catch (error) {
            setHasError(true);
        }
    };
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
                                    <a target={"_blank"} href={`${album.url}`} />
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