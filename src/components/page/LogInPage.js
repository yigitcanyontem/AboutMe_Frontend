import React, { useState} from 'react';
import axios from "axios";
import {useNavigate} from "react-router-dom";

function LogInPage({ setUserId }) {

    let navigate=useNavigate()

    const [user,setUser] = useState({
        username:'',
        password:''
    })

    const {username,password}=user;
    const onInputChange=(e)=>{
        setUser({...user,[e.target.name]:e.target.value})
    }
    const onSubmit= async (e)=>{
        e.preventDefault();
        const result = await axios.put("http://localhost:8080/user/login",user);
        if (result.data !== "Error"){
            setUserId(result.data);
            navigate(`/user/${result.data}`)
        }else {
            alert("Wrong Password on Username")
        }
    }

    return (
        <div className={"page text-light"}>
            <div className={"container pt-5 "}>
                <div className={"row"}>
                    <div className={"col-md-6 offset-md-3 border rounded p-4 mt-2 shadow"}>
                        <h2 className={"display-5 text-center m-4"}>Log In</h2>
                        <form onSubmit={(e)=>onSubmit(e)}>
                            <div className="mb-3">
                                <label htmlFor="username" className="form-label">Username</label>
                                <input type="text" className="form-control" name={"username"} value={username} onChange={(e)=>onInputChange(e)}/>
                            </div>
                            <div className="mb-3 ">
                                <label htmlFor="password" className="form-label">Password</label>
                                <input type="password" className="form-control" name={"password"} value={password} onChange={(e)=>onInputChange(e)}/>
                            </div>
                            <button type="submit" className="btn btn-success">Log In</button>
                        </form>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default LogInPage;