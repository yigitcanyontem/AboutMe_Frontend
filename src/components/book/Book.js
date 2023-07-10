import axios from "axios";
import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";

export default function Book() {
    const [books, setBooks] = useState([]);
    const [btn, setBtn] = useState("btn-primary");
    const { bookid } = useParams();
    const [hasError, setHasError] = useState(false);
    const [defname, setDefname] = useState('Set Favorite');
    const [isReady, setIsReady] = useState(false);
    let navigate=useNavigate()

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

            const config = {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            };

            const endpointUrl1 = `http://localhost:8080/book/${bookid}`;
            const endpointUrl= `http://localhost:8080/user/favbooks/${localStorage.getItem('userid')}`;

            const response = await axios.get(endpointUrl, config).catch((error) => {

            });
            const result = await axios.get(endpointUrl1, config).catch((error) => {

            });

            setBooks(result.data);
            response.data.map(
                value => {
                    if (value.id === bookid){
                        setDefname("Remove Favorite")
                        setBtn("btn-danger")
                    }
                }
            )
            setIsReady(true)
            document.title = result.data.title
        } catch (error) {
            setHasError(true);
        }
    };
    const onPress= async (e)=>{
        e.preventDefault();
        if (defname === "Remove Favorite"){
            const response = await axios.get(`http://localhost:8080/user/favbooks/${localStorage.getItem('userid')}`);
            if (response.data.length === 1){
                alert("You need at least 1 favorite")
            }else {
                await axios.delete(`http://localhost:8080/user/favbooks/delete/${localStorage.getItem('userid')}/${bookid}`);
                navigate(`/user/${localStorage.getItem('userid')}`)
            }
            }else if (defname === "Set Favorite"){
            await axios.put(`http://localhost:8080/user/favbooks/${localStorage.getItem('userid')}/${bookid}`);
            navigate(`/user/${localStorage.getItem('userid')}`);
        }

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
    if (hasError){
        return (
            <div className="container ">
                <div className="row">
                    <div className="col-md-6 offset-md-3 border rounded p-4 mt-5 shadow text-bg-dark">
                        <h2 className="text-center mx-auto display-6">The book with id "{bookid}" doesnt exist</h2>
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
                                    <a target={"_blank"} href={`${book.webReaderLink}`} >
                                        Read
                                    </a>
                                </li>
                                <li className="list-group-item ">
                                    <b>Favorite Counter: </b>
                                    {book.favorite_count}
                                </li>
                                <li className="list-group-item ">
                                    <button type="button" onClick={onPress}  className={`btn ${btn}`}>{defname}</button>
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