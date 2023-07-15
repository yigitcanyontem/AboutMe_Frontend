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
        username:'',
        password:''
    })

    const {firstName,lastName,date_of_birth,country,email,username,password}=user;
    const onInputChange=(e)=>{
        setUser({...user,[e.target.name]:e.target.value})
    }
    const onSubmit= async (e)=>{
        e.preventDefault();
        const { data: result } = await axios.post("http://localhost:8080/api/v1/auth/register",user);
        localStorage.setItem('userid', result.id);
        localStorage.setItem('token',result.access_token)
        navigate(`/user/${result.id}`)
        navigate("/");
    }

    return (
    <div className={"page text-light"}>
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
                            <div id="emailHelp" className="form-text text-light">We'll never share your email with anyone else.</div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input type="password" className="form-control" aria-describedby="emailHelp" name={"password"} value={password} onChange={(e)=>onInputChange(e)}/>
                        </div>
                        <button type="submit" className="btn btn-success">Submit</button>
                        <Link type="submit" className="btn btn-danger mx-2" to={"/"}>Cancel</Link>
                    </form>
                </div>

            </div>
        </div>
    </div>
    );
}

export default AddUser;