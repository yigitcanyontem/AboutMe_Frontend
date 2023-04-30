import axios from "axios";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";

export default function Book() {
    const [books, setBooks] = useState([]);
    const { bookname } = useParams();
    const [hasError, setHasError] = useState(false);
    useEffect(() => {
        loadUser();
    }, []);

    const myStyle={
        backgroundImage:
            `url(${books.cover_url})`,
        width: '100%',
        height: '100%',
        overflow: 'auto'
    };
    const loadUser = async () => {
        try {
            const result = await axios.get(
                `http://localhost:8080/book/${bookname}`
            );
            setBooks(result.data);
            document.title = result.data.title
        } catch (error) {
            setHasError(true);
        }
    };
    if (hasError){
        return (
            <div className="container ">
                <div className="row">
                    <div className="col-md-6 offset-md-3 border rounded p-4 mt-5 shadow text-bg-dark">
                        <h2 className="text-center mx-auto display-6">The book with id "{bookname}" doesnt exist</h2>
                    </div>
                </div>
            </div>
        );
    }else{
        return (
            <div style={myStyle}>
                <div className="col-md-6 offset-md-3 mb-3 border rounded p-4 mt-5 shadow text-bg-dark">
                    <div className="card-header">
                        {[books].map(book =>
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item">
                                    <b>ID: </b>
                                    <span>{book.id}</span>
                                </li>
                                <li className="list-group-item">
                                    <b>Title: </b>
                                    {book.title}
                                </li>
                                <li className="list-group-item">
                                    <b>Author: </b>
                                    {book.authors}
                                </li>
                                <li className="list-group-item">
                                    <b>Description: </b>
                                    {book.description}
                                </li>
                                <li className="list-group-item">
                                    <a target={"_blank"} href={`${book.webReaderLink}`} />
                                </li>
                                <li className="list-group-item">
                                    <img src={`${book.cover_url}`} alt={"movie"}/>
                                </li>
                            </ul>
                        )}
                    </div>
                </div>
            </div>
        );
    }
}