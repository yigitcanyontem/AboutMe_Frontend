import axios from "axios";
import React, {useEffect, useState} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";

export default function SearchUsers({ setUserId }) {
    const [users, setUsers] = useState([]);
    const [isReady, setIsReady] = React.useState(false);

    let { username,usersid } = useParams();
    useEffect(() => {
        loadUser();
    }, []);



    const loadUser = async () => {
        const result = await axios.get(
            `http://localhost:8080/search/user/${username}`
        );
        setUsers(result.data);
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
                <h2 className="text-center text-light mt-4 mb-5 display-6">Search Results</h2>
                <div className={''}>
                    {users.map(user =>
                        <a href={`/user/${user.id}`}>
                            <h4>{user.username}</h4>
                            <br/>
                        </a>

                    )}
                </div>
                <br/>
            </div>
        </div>
    );
}


