import axios from "axios";
import React, {useEffect, useState} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";

export default function UpdateUsers() {
    let [users,  setUsers] = useState([]);
    let [movies, setMovies] = useState([]);
    let [shows,  setShows] = useState([]);
    let [books,  setBooks] = useState([]);
    let [albums, setAlbums] = useState([]);
    let [socialMedia, setSocialMedia] = useState([]);
    let [descriptions, setDescriptions] = useState([]);
    let navigate=useNavigate()

    const [isReady, setIsReady] = React.useState(false);
    useEffect(() => {
        loadUsers();
    }, []);


    const [assign,setAssign] = useState({
        username:"",
        description:"",
        instagramuser:"",
        pinterestuser:"",
        linkedinuser:"",
        twitteruser:""
    })

        const {username,description,instagramuser,pinterestuser,linkedinuser,twitteruser}=assign;

    const onInputChange=(e)=>{
        setAssign({...assign,[e.target.name]:e.target.value})
    }

    const onSubmit= async (e)=>{
        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
        };

        const endpointUrl = `http://localhost:8080/user/update`;

        const result = await axios.patch(endpointUrl, assign, config).catch((error) => {});

        e.preventDefault();
        navigate(`/user/${localStorage.getItem('userid')}`);
    }

    const fetchData = async (endpoint) =>{
        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        };
        const endpointUrl =
            `http://localhost:8080/user/${endpoint}`

        const response = await axios.get(endpointUrl, config).catch((error) => {});

        return response.data;
    }
    const onDelete= async (e)=>{
        e.preventDefault();
        const confirmDelete = window.confirm("Are you sure you want to delete your account?");
        if (confirmDelete) {
            await axios.delete(`http://localhost:8080/user/delete/${localStorage.getItem('userid')}`);
            localStorage.removeItem('userid');
            navigate(`/`);
        }
    }

    const loadUsers = async () => {
        const usersData = fetchData(`${localStorage.getItem('userid')}`);
        const moviesData = fetchData(`favmovie/${localStorage.getItem('userid')}`);
        const showsData = fetchData(`favshows/${localStorage.getItem('userid')}`);
        const booksData = fetchData(`favbooks/${localStorage.getItem('userid')}`);
        const albumsData = fetchData(`favalbums/${localStorage.getItem('userid')}`);
        const socialMediaData = fetchData(`socialmedia/${localStorage.getItem('userid')}`);
        const descriptionData = fetchData(`description/${localStorage.getItem('userid')}`);

        [users,movies,shows,books,albums,socialMedia,descriptions] = await Promise.all([usersData,moviesData,showsData,booksData,albumsData,socialMediaData,descriptionData])

        setUsers(users)
        setMovies(movies)
        setShows(shows)
        setBooks(books)
        setAlbums(albums)
        setSocialMedia(socialMedia)
        setDescriptions(descriptions)
        setAssign({...assign,['username']:users.username})
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
            <div className="container mt-5">
                <div className="row gutters">
                    <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12 ">
                        <div className="card h-100">
                            <div className="card-body">
                                    <div className={"text-black "}>
                                            <img className={'portrait mb-2'} src={`https://lh3.googleusercontent.com/u/0/drive-viewer/AFGJ81pRtNTxSCgYSMPwz1ocAXGYgyjUhjkx62K1A7FCqJxaqVNMaSe5-uHrK2HNIHuxBjbUod09NN58xAvmdTneRyvhWH2q=w1920-h1080`} alt={"portrait"}/>
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
                                        </ul>
                                        <div id="emailHelp" className="form-text text-black">You can't change these detailst</div>
                                    </div>

                            </div>
                        </div>
                    </div>
                    <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12 col-12">
                        <div className="card h-100">
                            <div className="card-body">
                                <h1 className={"display-5"}>Account Details</h1>
                                <form onSubmit={(e)=>onSubmit(e)}>
                                    <div className="form-group mb-3">
                                        <label htmlFor="description">Description</label>
                                        <textarea className="form-control" id="description" name="description" rows="3"
                                            value={description}        placeholder={descriptions.description} onChange={(e)=>onInputChange(e)}></textarea>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label htmlFor="instagramuser">Instagram User</label>
                                        <input type="text" className="form-control" id="instagramuser"
                                               value={instagramuser}   name="instagramuser" placeholder={socialMedia.instagram} onChange={(e)=>onInputChange(e)}/>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label htmlFor="pinterestuser">Pinterest User</label>
                                        <input type="text" className="form-control" id="pinterestuser"
                                               value={pinterestuser}    name="pinterestuser" placeholder={socialMedia.pinterest} onChange={(e)=>onInputChange(e)}/>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label htmlFor="linkedinuser">LinkedIn User</label>
                                        <input type="text" className="form-control" id="linkedinuser"
                                               value={linkedinuser} name="linkedinuser" placeholder={socialMedia.linkedin} onChange={(e)=>onInputChange(e)}/>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label htmlFor="twitteruser">Twitter User</label>
                                        <input type="text" className="form-control" id="twitteruser" name="twitteruser"
                                               value={twitteruser}  placeholder={socialMedia.twitter} onChange={(e)=>onInputChange(e)}/>
                                    </div>
                                    <div className="row gutters">
                                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                            <div className="text-right">
                                                <button type="submit" id="submit" name="submit"
                                                        className="btn btn-primary">Update
                                                </button>
                                                <Link type="button" to={`/user/${localStorage.getItem('userid')}`}
                                                      className="btn btn-secondary m-2">Cancel
                                                </Link>
                                                <button type="button" onClick={onDelete}  className="btn btn-danger">Delete Account</button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    );
}