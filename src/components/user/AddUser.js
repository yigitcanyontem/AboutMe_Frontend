import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";

function AddUser() {
    const [countries, setCountries] = useState([]);
    let navigate=useNavigate()

    useEffect(() => {
        loadCountries();
    }, []);

    const loadCountries = async () => {
        const result = await axios.get(`http://localhost:8080/countries`);
        setCountries(result.data);
    };

    const [user,setUser] = useState({
        firstName:'',
        lastName:'',
        date_of_birth:'',
        country:'',
        email: '',
        username:''
    })

    const {firstName,lastName,date_of_birth,country,email,username}=user;
    const onInputChange=(e)=>{
        setUser({...user,[e.target.name]:e.target.value})
    }
    const onSubmit= async (e)=>{
        e.preventDefault();
        await axios.post("http://localhost:8080/user/create",user);
        navigate("/");
    }

    return (
    <div className={"grad"}>
        <div className={"container pt-5 "}>
            <div className={"row"}>
                <div className={"col-md-6 offset-md-3 border rounded p-4 mt-2 shadow "}>
                    <h2 className={"display-5 text-center m-4"}>REGISTER USER</h2>
                    <form onSubmit={(e)=>onSubmit(e)}>
                        <div className="mb-3">
                            <label htmlFor="username" className="form-label">Username</label>
                            <input type="text" className="form-control" name={"username"} value={username} onChange={(e)=>onInputChange(e)}/>
                        </div>
                        <div className="mb-3 ">
                            <label htmlFor="firstName" className="form-label">First Name</label>
                            <input type="text" className="form-control" name={"firstName"} value={firstName} onChange={(e)=>onInputChange(e)}/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="lastName" className="form-label">Last Name</label>
                            <input type="text" className="form-control" name={"lastName"} value={lastName} onChange={(e)=>onInputChange(e)}/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="date_of_birth" className="form-label">Date of Birth</label>
                            <input type="date" className="form-control" name={"date_of_birth"} value={date_of_birth} onChange={(e)=>onInputChange(e)}/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="country" className="form-label">Country</label>
                            <select id="country" name={"country"} className="form-select" value={country} onChange={(e)=>onInputChange(e)}>
                                <option>Select the Country</option>
                                {countries.map(count =>
                                    <option value={count.id}>{count.name}</option>
                                )}
                            </select>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email address</label>
                            <input type="email" className="form-control" aria-describedby="emailHelp" name={"email"} value={email} onChange={(e)=>onInputChange(e)}/>
                            <div id="emailHelp" className="form-text text-black">We'll never share your email with anyone else.</div>
                        </div>
                        <button type="submit" className="btn btn-dark">Submit</button>
                        <Link type="submit" className="btn btn-danger mx-2" to={"/"}>Cancel</Link>
                    </form>
                </div>

            </div>
        </div>
    </div>
    );
}

export default AddUser;