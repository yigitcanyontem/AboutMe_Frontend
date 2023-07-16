import axios from "axios";
import React, {useEffect, useState} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";

export default function SearchUsers() {
    const [users, setUsers] = useState([]);
    const [isReady, setIsReady] = React.useState(false);
    const [hasError, setHasError] = useState(false);

    let { username } = useParams();
    useEffect(() => {
        loadUser();
    }, []);



    const loadUser = async () => {
        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        };
        const endpointUrl = `http://localhost:8080/search/user/${username}`;

        await axios.get(endpointUrl, config).then((result) => {
            setUsers(result.data);
        }).catch((error) => {
            if (error.response.data.message === "No Users Found"){
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
    }else {
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
}


