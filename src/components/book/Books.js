import axios from "axios";
import React, {useEffect, useState} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";

export default function Books() {
    const [books, setBooks] = useState([]);
    const [isReady, setIsReady] = React.useState(false);

    let { bookname,usersid } = useParams();
    useEffect(() => {
        loadUser();
    }, []);



    const loadUser = async () => {
        const result = await axios.get(
            `http://localhost:8080/search/book/${bookname}`
        );
        setBooks(result.data);
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
                <h2 className="text-center text-light mt-2 display-6">Books</h2>
                <div className={''}>
                    {books.map(book =>
                        <a target="_blank" href={`/book/${book.id}/${usersid}`}>
                            <img className={'search_img'} src={`${book.cover_url}`} alt={"movie"}/>
                        </a>
                    )}
                </div>
                <br/>
            </div>
        </div>
    );
}


