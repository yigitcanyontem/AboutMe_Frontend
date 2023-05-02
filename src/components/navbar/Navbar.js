import {useEffect, useState} from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import {useNavigate} from "react-router-dom";
export default function Navbar({ userid }){
    const [search, setSearch] = useState('null');
    const [category, setCategory] = useState('Select a Category');
    const [inputvar, setInput] = useState("");
    const navigate = useNavigate()


    useEffect(() =>{
        var dropdown = document.querySelector('.dropdown-menu');
        dropdown.addEventListener('click', function(event) {
            event.preventDefault();
            var option = event.target;
            setSearch(option.id)
            setCategory(option.id)
        })
    })
    const handleInputChange = (event) => {
        const target = event.target;
        const value = target.value;
        setInput(value)
    };

    const buttonChange = (event) => {
        switch (search) {
            case 'Movie':
                navigate(`/search/movie/${inputvar}/${userid}`)
                window.location.reload()
                break;
            case 'User':
                navigate(`/search/user/${inputvar}/${userid}`)
                window.location.reload()
                break;
            case 'TV':
                navigate(`/search/tv/${inputvar}/${userid}`)
                window.location.reload()
                break;
            case 'Album':
                navigate(`/search/album/${inputvar}/${userid}`)
                window.location.reload()
                break;
            case 'Book':
                navigate(`/search/book/${inputvar}/${userid}`)
                window.location.reload()
                break;
            default:
                console.log('Invalid option selected');
        }
    };
    return(
        <nav className="navbar navbar-dark navbar_color sticky-top">
            <div className={"container-fluid"}>
                <a className="navbar-brand mx-4" href="/">AboutMe</a>
                <form className="form-inline my-2 my-lg-0 list_container">
                    <div className="dropdown mx-2">
                        <button className="btn btn-close-white dropdown-toggle" role="button" id="dropdownMenuButton"
                                data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            {category}
                        </button>
                        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                            <a className="dropdown-item" id="User" >User</a>
                            <a className="dropdown-item" id="Movie">Movie</a>
                            <a className="dropdown-item" id="TV" >TV</a>
                            <a className="dropdown-item" id="Album" >Album</a>
                            <a className="dropdown-item" id="Book" >Book</a>
                        </div>
                    </div>
                    <input className="form-control mr-sm-2  search_bar" onChange={handleInputChange} size={50} value={inputvar}  type="search" placeholder="Search" aria-label="Search"/>
                    <button className="btn btn-outline-light my-2 my-sm-0 mx-2" type="submit"  onClick={buttonChange} >Search</button>
                </form>
                <span>
                <a className="navbar-brand" href="/signup">Sign Up</a>
                <a className="navbar-brand" >|</a>
                <a className="navbar-brand" href="/login">Log In</a>
            </span>
            </div>
        </nav>
    );
}



