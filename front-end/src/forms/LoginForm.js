import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

import BackendApiRequest from "../apis/backendApi";
import useLocalStorage from "../hooks/useLocalStorage";


const LoginForm = ({ setToken }) => {

    const [localStoreToken, localRemoveToken, localRetrieveToken, localDecodeTokenn] = useLocalStorage()

    const navigate = useNavigate();


    const INITIAL_STATE = {
        'username': '',
        'password': '',
    }
    const [formData, setFormData] = useState(INITIAL_STATE)


    
    const handleChange = evt => {
        const { name, value } = evt.target;
        setFormData(data => ({
            ...data,
            [name]: value
        }));
    };

    const handleSubmit = async (evt) => {
        evt.preventDefault();
        const request = await BackendApiRequest.login(formData)
        const token = request.data.token
        setToken(token)
        localStoreToken(token)
        setFormData(INITIAL_STATE)
        navigate('/')
    }


    return (
        <>
            <form onSubmit={handleSubmit}>

                <label htmlFor="username" className="col-md-6">username: </label>
                <input
                    required
                    id={formData.username}
                    type="text"
                    name="username"
                    placeholder="username"
                    value={formData.username}
                    onChange={handleChange}
                    className="col-md-6"
                /><br></br><br></br>

                <label htmlFor="password" className="col-md-6">password: </label>
                <input
                    required
                    id={formData.password}
                    type="text"
                    name="password"
                    placeholder="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="col-md-6"
                /><br></br><br></br>

                <button>Submit</button>
            </form>
        </>
        
    )
}

export default LoginForm;