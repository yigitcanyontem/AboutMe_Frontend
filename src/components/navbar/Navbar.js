import {useEffect, useState} from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import {useNavigate} from "react-router-dom";
export default function Navbar({ userid }){
    const [search, setSearch] = useState('null');
    const [category, setCategory] = useState('Select a Category');
    const [inputvar, setInput] = useState("");
    const navigate = useNavigate()
    const [log1,setLog1] = useState("Sign Up");
    const [log2,setLog2] = useState("|");
    const [log3,setLog3] = useState("Log In");
    const [log4,setLog4] = useState("");
    const [logbool,setLogbool] = useState(true);

    useEffect(() =>{
        var dropdown = document.querySelector('.dropdown-menu');
        dropdown.addEventListener('click', function(event) {
            event.preventDefault();
            var option = event.target;
            setSearch(option.id)
            setCategory(option.id)
        })
        if (userid !== ""){
            setLogbool(false);
            handleLogChange()
        }
    }, )

    const handleLogChange = (event) => {
        if (logbool){
            setLog1("Sign Up")
            setLog2("|")
            setLog3("Log In")
            setLog4("")
        }else {
            setLog1("")
            setLog2("")
            setLog3("")
            setLog4("Log Out")
        }
    };
    const handleInputChange = (event) => {
        const target = event.target;
        const value = target.value;
        setInput(value)
    };

    const buttonChange = (event) => {
        switch (search) {
            case 'Movie':
                navigate(`/search/movie/${inputvar}/${userid}`)
                break;
            case 'User':
                navigate(`/search/user/${inputvar}/${userid}`)
                break;
            case 'TV':
                navigate(`/search/tv/${inputvar}/${userid}`)
                break;
            case 'Album':
                navigate(`/search/album/${inputvar}/${userid}`)
                break;
            case 'Book':
                navigate(`/search/book/${inputvar}/${userid}`)
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
                <a className="navbar-brand" href="/signup" >{log1}</a>
                <a className="navbar-brand" >{log2}</a>
                <a className="navbar-brand" href="/login">{log3}</a>
                <a className="navbar-brand" href={`/`} onClick={handleLogChange}>{log4}</a>

            </span>
            </div>
        </nav>
    );
}



