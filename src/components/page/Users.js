import React, { useEffect, useState } from "react";
import axios from "axios";
import {Link, useNavigate, useParams} from "react-router-dom";

export default function Users() {
    let [btn1,  setBtn1] = useState("");
    let [btn2,  setBtn2] = useState("");
    let [btn3,  setBtn3] = useState("");
    let [users,  setUsers] = useState([]);
    let [movies, setMovies] = useState([]);
    let [shows,  setShows] = useState([]);
    let [books,  setBooks] = useState([]);
    let [albums, setAlbums] = useState([]);
    let [socialMedia, setSocialMedia] = useState([]);
    let [description, setDescription] = useState([]);
    const [isReady, setIsReady] = React.useState(false);
    const [hasError, setHasError] = React.useState();
    useEffect(() => {
        loadUsers();
    }, []);

    const fetchData = async (endpoint) =>{
        const response = await axios.get(`http://localhost:8080/user/${endpoint}`).catch((error) => {
            if (error.response.status === 500 && endpoint === `${localStorage.getItem('userid')}`) {
                setHasError(true)
            }
        });
        return response.data;
    }

    const loadUsers = async () => {
        const usersData = fetchData(`${localStorage.getItem('userid')}`);
        const moviesData = fetchData(`favmovie/${localStorage.getItem('userid')}`);
        const showsData = fetchData(`favshows/${localStorage.getItem('userid')}`);
        const booksData = fetchData(`favbooks/${localStorage.getItem('userid')}`);
        const albumsData = fetchData(`favalbums/${localStorage.getItem('userid')}`);
        const socialMediaData = fetchData(`socialmedia/${localStorage.getItem('userid')}`);
        const descriptionData = fetchData(`description/${localStorage.getItem('userid')}`);

        [users,movies,shows,books,albums,socialMedia,description] = await Promise.all([usersData,moviesData,showsData,booksData,albumsData,socialMediaData,descriptionData])
        setUsers(users)
        setMovies(movies)
        setShows(shows)
        setBooks(books)
        setAlbums(albums)
        setSocialMedia(socialMedia)
        setDescription(description)
        if (users.id === localStorage.getItem('userid')){
            setBtn1("button")
            setBtn2("btn btn-secondary")
            setBtn3("Update")
        }
        setIsReady(true)
        document.title = users.username
    };


    if (hasError){
        return(
            <div className={"page text-light"}>
                <h1 className={"display-1 mt-5"}>
                    No User Found
                </h1>
            </div>
        )
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
    if (!hasError){
        return (
            <div className={"lib_bg"}>
                <div>
                    <br></br>
                    <div className={"social-icons"}>
                        <div>
                            <a target="_blank" href={`https://www.instagram.com/${socialMedia.instagram}`}><img src="https://ytuspark.com/wp-content/uploads/2020/09/instagram-logo-png-2428.png" alt="Instagram"/></a>
                            <a target="_blank" href={`https://tr.pinterest.com/${socialMedia.pinterest}`}><img src="https://www.freepnglogos.com/uploads/pinterest-logo-emblem-png-11.png" alt="Pinterest"/></a>
                            <a target="_blank" href={`https://www.linkedin.com/in/${socialMedia.linkedin}`}><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/LinkedIn_logo_initials.png/640px-LinkedIn_logo_initials.png" alt="LinkedIn"/></a>
                            <a target="_blank" href={`https://twitter.com/${socialMedia.twitter}`}><img src="https://png.pngtree.com/png-vector/20221018/ourmid/pngtree-twitter-social-media-round-icon-png-image_6315985.png" alt="Twitter"/></a>
                        </div>
                    </div>

                    <div className={"text-light list_container mt-5"}>
                        <img className={'portrait'} src={`https://lh3.googleusercontent.com/u/0/drive-viewer/AFGJ81pRtNTxSCgYSMPwz1ocAXGYgyjUhjkx62K1A7FCqJxaqVNMaSe5-uHrK2HNIHuxBjbUod09NN58xAvmdTneRyvhWH2q=w1920-h1080`} alt={"portrait"}/>
                        <ul className={"text-start"}>
                            <li>
                                <p>Username: {users.username}</p>
                            </li>
                            <li>
                                <p>First Name: {users.firstName}</p>
                            </li>
                            <li>
                                <p>Last Name: {users.lastName}</p>
                            </li>
                            <li>
                                <p>Email: {users.email}</p>
                            </li>
                            <li>
                                <p>Country: {users.country.name}</p>
                            </li>
                            <li>
                                <p>Date of Birth: {users.date_of_birth}</p>
                            </li>
                            <Link type={`${btn1}`} to={`/user/update/${localStorage.getItem('userid')}`} cl
                                  className={`${btn2}`}>{`${btn3}`}
                            </Link>
                        </ul>
                    </div>

                    <h1 className={"display-6 text-light mt-5 text-light "}>Who am I?</h1>
                    <div className={'container  text-light'}>
                        <p>{description.description}</p>
                    </div>

                    <h1 className={"display-5 text-light mt-5 "}>Favorite Movies</h1>
                    <div className={'list_container'}>
                        {movies.map(movie =>
                            <a target="_blank" href={`/movie/${movie.id}`}>
                                <img className={'img'} src={`${movie.poster_path}`} alt={"movie"}/>
                            </a>
                        )}
                    </div>

                    <h1 className={"display-5 text-light mt-5"}>Favorite Shows</h1>
                    <div className={'list_container'}>
                        {shows.map(show =>
                            <a target="_blank" href={`/tv/${show.id}`}>
                                <img className={'img'} src={`${show.poster_path}`} alt={"show"}/>
                            </a>
                        )}
                    </div>

                    <h1 className={"display-5 text-light mt-5"}>Favorite Books</h1>
                    <div className={'list_container'}>
                        {books.map(book =>
                            <a target="_blank" href={`/book/${book.id}`}>
                                <img className={'img'} src={`${book.cover_url}`} alt={"book"}/>
                            </a>
                        )}
                    </div>

                    <h1 className={"display-5 text-light mt-5 "}>Favorite Albums</h1>
                    <div className={'list_container'}>
                        {albums.map(album =>
                            <a target="_blank" href={`/album/${album.mbid}`}>
                                <img className={'img mb-5'} src={`${album.image}`} alt={"album"}/>
                            </a>

                        )}
                    </div>
                </div>
            </div>
        );
    }



}