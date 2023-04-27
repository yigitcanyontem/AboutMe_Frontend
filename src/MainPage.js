import { useEffect, useState } from "react";
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";

export default function MainPage() {
    const [year, setYear] = useState("");
    const [moviename, setMoviename] = useState("");
    const navigate = useNavigate()

    const handleInputChange = (event) => {
        const target = event.target;
        const name = target.name;
        const value = target.value;
        if (name === "keyword") {
            setMoviename(value);
        } else if (name === "year") {
            setYear(value);
        }
    };
    const buttonChange = (event) => {
        navigate(`/movie/${moviename}/${year}`)
        window.location.reload()
    };

    return (
        <div id="main-search" className="content-dark hidden-sm hidden-xs">
            <input
                name="keyword"
                autoComplete="off"
                type="search"
                value={moviename}
                onChange={handleInputChange}
            />
            <div className="form-outline">
                <input min="1900" max="2023" type="number" id="typeNumber" className="form-control" name={"year"} onChange={handleInputChange}/>
                <label className="form-label" htmlFor="typeNumber">
                    Year
                </label>
            </div>
            <button
                type="submit"
                className="btn btn-danger mx-2"
                onClick={buttonChange}
            >
                Search
            </button>
        </div>
    );
}