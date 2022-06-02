import React, { useRef } from 'react'
import { useNavigate } from "react-router-dom";



function Login(props) {
    
    document.title = "Login - iNotebook"
    const refEmail = useRef(null);
    const refPassword = useRef(null);

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        let tmpData = { "email": refEmail.current.value, "password": refPassword.current.value };
        let url = `http://localhost:5000/api/auth/login`;
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(tmpData)
        });
        const data = await response.json();
        console.log(data);

        if (data.success) {
            localStorage.setItem('token', data.authToken);
            props.showAlert("success", "Logged in Succesfully", "fa-solid fa-circle-check")
            navigate("/")
        }
        else {
            props.showAlert("error", "Invalid Credentials!", "fa-solid fa-circle-xmark")
        }
    }

    return (
        <div className='container my-3' >
            <h2>Login to continue to iNotebook</h2>
            <form onSubmit={handleSubmit} >
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" ref={refEmail} className="form-control" id="email" name='email' aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" ref={refPassword} className="form-control" id="password" name='password' />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Login    